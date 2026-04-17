import { useLayoutEffect, useState } from "react";
import type { CSSProperties, RefObject } from "react";

import { PLAYER_BREAKPOINTS, PLAYER_LAYOUT } from "../lib/constants";

export function useSettingsMenuPosition(anchorRef: RefObject<HTMLElement | null>, isOpen: boolean) {
  const [desktopStyle, setDesktopStyle] = useState<CSSProperties>({});
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }

    const updatePosition = () => {
      const anchor = anchorRef.current;
      const nextIsMobile = window.innerWidth <= PLAYER_BREAKPOINTS.mobileMaxWidth;

      setIsMobile(nextIsMobile);

      if (!anchor || nextIsMobile) {
        setDesktopStyle({});
        return;
      }

      const rect = anchor.getBoundingClientRect();

      setDesktopStyle({
        position: "fixed",
        right: `${Math.max(PLAYER_LAYOUT.viewportPaddingPx, window.innerWidth - rect.right)}px`,
        top: `${Math.max(PLAYER_LAYOUT.viewportPaddingPx, rect.top - PLAYER_LAYOUT.settingsMenuOffsetPx)}px`,
        transform: "translateY(-100%)",
      });
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [anchorRef, isOpen]);

  return {
    desktopStyle,
    isMobile,
  };
}