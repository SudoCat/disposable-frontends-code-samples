import React, {
  type RefCallback,
  createContext,
  useCallback,
  useState,
} from "react";
import { useFormId } from "./use-form-id";

export const defaultFieldContext: FieldContextValue = {
  labelProps: {},
  controlProps: {},
  errorProps: {
    ref: null,
  },
};

const FieldContext = createContext<FieldContextValue>(defaultFieldContext);

type FieldContextValue = {
  labelProps: {
    htmlFor?: string;
    id?: string;
  };
  controlProps: {
    id?: string;
    name?: string;
    "aria-invalid"?: string;
    "aria-describedby"?: string;
  };
  errorProps: {
    id?: string;
    role?: "alert";
    ref: RefCallback<HTMLParagraphElement> | null;
  };
  createFieldId?: (...args: (string | number)[]) => string;
};

type FieldProviderProps = {
  name: string;
  children: React.ReactNode;
};

export function FieldProvider({ name, children }: FieldProviderProps) {
  if (!name) {
    throw new Error("Field Provider must have a valid name");
  }
  const createId = useFormId();
  const createFieldId = useCallback(
    (...args: (string | number)[]) => createId(name, ...args),
    [createId, name]
  );
  const [hasError, setHasError] = useState(false);
  const value = React.useMemo<FieldContextValue>(
    () => ({
      labelProps: {
        id: createFieldId("label"),
        htmlFor: createFieldId("control"),
      },
      controlProps: {
        id: createFieldId("control"),
        name,
        "aria-invalid": hasError ? "true" : "false",
        "aria-describedby": hasError ? createFieldId("error") : undefined,
      },
      errorProps: {
        id: createFieldId("error"),
        role: "alert",
        ref: (el) => setHasError(!!el),
      },
      createFieldId,
    }),
    [name, createFieldId, hasError]
  );
  return (
    <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
  );
}

export function useField(): FieldContextValue {
  return React.useContext(FieldContext);
}
