import { useEffect } from "react";
import type { RefObject } from "react";

export function useSettingsMenuDismiss(
  isOpen: boolean,
  onOpenChange: (isOpen: boolean) => void,
  insideRefs: Array<RefObject<HTMLElement | null>>,
) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node) || insideRefs.some((ref) => ref.current?.contains(target))) {
        return;
      }

      onOpenChange(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [insideRefs, isOpen, onOpenChange]);
}