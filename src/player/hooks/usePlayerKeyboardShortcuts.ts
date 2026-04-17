import { useCallback } from "react";
import type { KeyboardEvent } from "react";

import { PLAYER_INTERACTION, PLAYER_SHORTCUTS } from "../lib/constants";

export function usePlayerKeyboardShortcuts(
  currentTime: number,
  onSeek: (time: number) => void,
  onTogglePlayback: () => Promise<void>,
  onToggleFullscreen: () => Promise<void>,
  onToggleMute: () => void,
) {
  return useCallback(
    async (event: KeyboardEvent<HTMLElement>) => {
      const normalizedKey = event.key.toLowerCase();

      if (event.key === PLAYER_SHORTCUTS.playPausePrimary || normalizedKey === PLAYER_SHORTCUTS.playPauseAlternate) {
        event.preventDefault();
        await onTogglePlayback();
        return;
      }

      if (normalizedKey === PLAYER_SHORTCUTS.seekForward) {
        event.preventDefault();
        onSeek(currentTime + PLAYER_INTERACTION.seekStepSeconds);
        return;
      }

      if (normalizedKey === PLAYER_SHORTCUTS.seekBackward) {
        event.preventDefault();
        onSeek(currentTime - PLAYER_INTERACTION.seekStepSeconds);
        return;
      }

      if (normalizedKey === PLAYER_SHORTCUTS.fullscreen) {
        event.preventDefault();
        await onToggleFullscreen();
        return;
      }

      if (normalizedKey === PLAYER_SHORTCUTS.mute) {
        event.preventDefault();
        onToggleMute();
      }
    },
    [currentTime, onSeek, onToggleFullscreen, onToggleMute, onTogglePlayback],
  );
}