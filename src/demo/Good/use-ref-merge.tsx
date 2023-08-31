import type { RefCallback, MutableRefObject } from "react";

export function useRefMerge<T>(
  ...refs: (RefCallback<T> | MutableRefObject<T | null> | null)[]
): RefCallback<T> {
  return (el) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    });
  };
}
