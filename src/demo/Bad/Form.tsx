import React from "react";

interface Field {
  name: string;
  type:
    | "text"
    | "email"
    | "multiline"
    | "select"
    | "checkbox"
    | "checkbox"
    | "radiogroup";
  defaultValue: any;
  validation?: RegExp;
}

interface FormProps {
  onSubmit: () => {};
  fields: Field[];
}

type FieldState = {
  [name: string]: {
    value: any;
    valid: boolean;
  };
};

export function FormComponent({ onSubmit, fields }: FormProps) {
  // generate unique field names
  const getFieldName = (name: string) =>
    `form_field_${name.toLowerCase().replace(/\s/, "_")}`;

  // Create form state 
  const [formState, setFormState] = React.useState<FieldState>(
    fields.reduce<FieldState>(
      (state, field) => ({
        ...state,
        [field.name]: {
          value: field.defaultValue,
          valid: true,
        },
      }),
      {}
    )
  );

  const handleSubmit = () => {
    if (!Object.values(formState).every((v) => v.valid)) return;
    onSubmit();
  };

  const createFieldChangeHandler =
    (field: Field) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setFormState((value) => ({
        ...value,
        [field.name]: {
          value: e.currentTarget.value,
          valid: field.validation?.test(e.currentTarget.value) ?? false,
        },
      }));

  return (
    <form onSubmit={handleSubmit}>
      (
      {fields.map((field) => (
        <div className={`field ${field.type}`}>
          <label htmlFor={getFieldName(field.name)}>{field.name}</label>
          {field.type === "text" ? (
            <input
              type="text"
              name={getFieldName(field.name)}
              id={getFieldName(field.name)}
              onChange={createFieldChangeHandler(field)}
              value={formState[field.name].value}
              defaultValue={field.defaultValue}
              className={formState[field.name].valid ? "valid" : "invalid"}
            />
          ) : field.type === "email" ? (
            <input
              type="email"
              name={getFieldName(field.name)}
              id={getFieldName(field.name)}
              onChange={createFieldChangeHandler(field)}
              value={formState[field.name].value}
              defaultValue={field.defaultValue}
              className={formState[field.name].valid ? "valid" : "invalid"}
            />
          ) : field.type === "multiline" ? (
            <textarea
              name={getFieldName(field.name)}
              id={getFieldName(field.name)}
              onChange={createFieldChangeHandler(field)}
              className={formState[field.name].valid ? "valid" : "invalid"}
            >
              {formState[field.name].value}
            </textarea>
          ) : field.type === "checkbox" ? (
            <input
              type="checkbox"
              name={getFieldName(field.name)}
              id={getFieldName(field.name)}
              onChange={(e) =>
                setFormState((state) => ({
                  ...state,
                  [field.name]: {
                    value: e.currentTarget.checked,
                    valid: true,
                  },
                }))
              }
              className={formState[field.name].valid ? "valid" : "invalid"}
            />
          ) : null}
        </div>
      ))}
      )
    </form>
  );
}
