import React from "react";
import styles from "./Form.module.css";
import { useField } from "./FieldContext";
import clsx from "clsx";

type FormProps = {
  layout: "stack" | "column" | "inline";
} & JSX.IntrinsicElements["form"];

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ layout, children, className, ...props }: FormProps, ref) => {
    return (
      <form
        className={clsx(styles.form, className)}
        data-layout={layout}
        {...props}
        ref={ref}
      >
        {children}
      </form>
    );
  }
);

Form.displayName = "Form.Root";

export const Root = Form;

type FieldProps = JSX.IntrinsicElements["div"];

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ children, className, ...props }: FieldProps, ref) => {
    return (
      <div
        className={clsx(styles.field, className)}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

Field.displayName = "Form.Field";

type LabelProps = JSX.IntrinsicElements["label"];

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className, ...props }: LabelProps, ref) => {
    const field = useField();
    return (
      <label
        className={clsx(styles.label, className)}
        {...field.labelProps}
        {...props}
        ref={ref}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = "Form.Label";

type FieldsetProps = JSX.IntrinsicElements["fieldset"];

// notes - fieldsets don't play well with grid, thus we use a wrapping div and display contents
export const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({ children, className, ...props }: FieldsetProps, ref) => {
    return (
      <div className={clsx(styles.field, className)}>
        <fieldset {...props} ref={ref}>
          {children}
        </fieldset>
      </div>
    );
  }
);

Fieldset.displayName = "Form.Fieldset";

type LegendProps = JSX.IntrinsicElements["legend"];

export const Legend = React.forwardRef<HTMLLegendElement, LegendProps>(
  ({ children, className, ...props }: LegendProps, ref) => {
    return (
      <legend
        className={clsx(styles.label, className)}
        {...props}
        ref={ref}
      >
        {children}
      </legend>
    );
  }
);

Legend.displayName = "Form.Legend";

type ControlProps = JSX.IntrinsicElements["div"];

export const Control = React.forwardRef<HTMLDivElement, ControlProps>(
  ({ children, className, ...props }: ControlProps, ref) => {
    return (
      <div
        className={clsx(styles.control, className)}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

Control.displayName = "Form.Control";

type ErrorProps = JSX.IntrinsicElements["div"];

export const Error = React.forwardRef<HTMLParagraphElement, ErrorProps>(
  ({ children, className, ...props }: ErrorProps, ref) => {
    return (
      <p
        className={clsx(styles.error, className)}
        role="alert"
        {...props}
        ref={ref}
      >
        {children}
      </p>
    );
  }
);

Error.displayName = "Form.Error";

type ActionProps = JSX.IntrinsicElements["div"];

export const Actions = React.forwardRef<HTMLDivElement, ActionProps>(
  ({ children, className, ...props }: ActionProps, ref) => {
    return (
      <div
        className={clsx(styles.actions, className)}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

Actions.displayName = "Form.Actions";
