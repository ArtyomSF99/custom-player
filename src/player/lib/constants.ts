export const PLAYER_BREAKPOINTS = {
  mobileMaxWidth: 720,
} as const;

export const PLAYER_LAYOUT = {
  settingsMenuOffsetPx: 12,
  viewportPaddingPx: 12,
} as const;

export const PLAYER_INTERACTION = {
  autoHideControlsDelayMs: 1800,
  mouseLeaveHideDelayMs: 450,
  seekStepSeconds: 5,
} as const;

export const PLAYER_SHORTCUTS = {
  fullscreen: "f",
  mute: "m",
  playPauseAlternate: "k",
  playPausePrimary: " ",
  seekBackward: "arrowleft",
  seekEnd: "end",
  seekForward: "arrowright",
  seekStart: "home",
} as const;