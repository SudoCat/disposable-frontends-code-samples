import { useCallback, useId } from "react";

export function useFormId() {
  const id = useId();
  const createId = useCallback(
    (...args: (string | number)[]) => `field${id}${args.join(".")}`,
    [id]
  );
  return createId;
}
