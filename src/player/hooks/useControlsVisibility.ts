import { useCallback, useEffect, useRef, useState } from "react";

import { PLAYER_INTERACTION } from "../lib/constants";

export function useControlsVisibility(isFullscreen: boolean, isPlaying: boolean, isSettingsOpen: boolean) {
  const hideControlsTimerRef = useRef<number | null>(null);
  const [controlsVisible, setControlsVisible] = useState(true);

  const clearHideControlsTimer = useCallback(() => {
    if (hideControlsTimerRef.current !== null) {
      window.clearTimeout(hideControlsTimerRef.current);
      hideControlsTimerRef.current = null;
    }
  }, []);

  const scheduleControlsHide = useCallback(
    (delay: number = PLAYER_INTERACTION.autoHideControlsDelayMs) => {
      clearHideControlsTimer();

      if (!isFullscreen || !isPlaying || isSettingsOpen) {
        setControlsVisible(true);
        return;
      }

      hideControlsTimerRef.current = window.setTimeout(() => {
        setControlsVisible(false);
      }, delay);
    },
    [clearHideControlsTimer, isFullscreen, isPlaying, isSettingsOpen],
  );

  const revealControls = useCallback(() => {
    setControlsVisible(true);
    scheduleControlsHide();
  }, [scheduleControlsHide]);

  useEffect(() => {
    revealControls();

    return () => {
      clearHideControlsTimer();
    };
  }, [clearHideControlsTimer, revealControls]);

  return {
    controlsVisible,
    revealControls,
    scheduleControlsHide,
  };
}