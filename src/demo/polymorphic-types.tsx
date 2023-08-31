export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

export type AsProp<C extends React.ElementType> = {
  as?: C;
};

export type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProp<
  C extends React.ElementType,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  Props = any,
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  Props = any,
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };
