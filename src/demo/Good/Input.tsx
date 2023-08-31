import React from "react";

import styles from "./Input.module.css";

export type InputProps = JSX.IntrinsicElements["input"];

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }: InputProps, ref) => {
    return (
      <input className={`${styles.Input} ${className}`} {...props} ref={ref} />
    );
  }
);

Input.displayName = "Input";
