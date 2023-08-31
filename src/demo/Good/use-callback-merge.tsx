import { type SyntheticEvent } from "react";

export function useCallbackMerge<TEvent extends SyntheticEvent>(
  ...args: Array<((e: TEvent) => void) | undefined>
): (e: TEvent) => void {
  return (e) => {
    let propagationStopped = false;
    const { stopPropagation } = e;
    e.stopPropagation = () => {
      propagationStopped = true;
      stopPropagation();
    };
    args.some((cb) => {
      if (cb) cb(e);
      return propagationStopped;
    });
  };
}
