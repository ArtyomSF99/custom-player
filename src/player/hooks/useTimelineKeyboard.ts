import { useCallback } from "react";
import type { KeyboardEvent } from "react";

import { PLAYER_INTERACTION, PLAYER_SHORTCUTS } from "../lib/constants";

export function useTimelineKeyboard(currentTime: number, duration: number, onSeek: (time: number) => void) {
  return useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const normalizedKey = event.key.toLowerCase();
      let nextTime: number | null = null;

      if (normalizedKey === PLAYER_SHORTCUTS.seekForward) {
        nextTime = currentTime + PLAYER_INTERACTION.seekStepSeconds;
      }

      if (normalizedKey === PLAYER_SHORTCUTS.seekBackward) {
        nextTime = currentTime - PLAYER_INTERACTION.seekStepSeconds;
      }

      if (normalizedKey === PLAYER_SHORTCUTS.seekStart) {
        nextTime = 0;
      }

      if (normalizedKey === PLAYER_SHORTCUTS.seekEnd) {
        nextTime = duration;
      }

      if (nextTime === null) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      onSeek(nextTime);
    },
    [currentTime, duration, onSeek],
  );
}