import React, { type ForwardRefExoticComponent } from "react";
import clsx from "clsx";

import type {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from "../polymorphic-types";

import styles from "./Button.module.css";

export type ButtonOwnProps = {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "default" | "small" | "large";
  fullWidth?: boolean;
};

export type ButtonProps<C extends React.ElementType = "button"> =
  PolymorphicComponentPropWithRef<C, ButtonOwnProps>;

interface ButtonComponent<C extends React.ElementType = "button">
  extends ForwardRefExoticComponent<ButtonProps<C>> {
  <C extends React.ElementType = "button">(
    /* eslint-disable-next-line no-unused-vars */
    props: ButtonProps<C>
  ): React.ReactNode;
}

export const Button: ButtonComponent = React.forwardRef(
  <C extends React.ElementType = "button">(
    {
      children,
      as,
      variant,
      size,
      fullWidth = false,
      className,
      ...props
    }: ButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || "button";
    return (
      <Component
        className={clsx(styles.root, className)}
        data-variant={variant}
        data-size={size}
        data-full-width={fullWidth}
        {...props}
        ref={ref}
      >
        <span className={styles.text}>{children}</span>
      </Component>
    );
  }
);

Button.displayName = "Button";
