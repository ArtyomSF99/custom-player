import { PlayButton } from "../play-button/PlayButton";
import { TimeDisplay } from "../time-display/TimeDisplay";
import { VolumeControl } from "../volume-control/VolumeControl";
import { controlsClassNames } from "./constants";
import type { PlaybackControlsProps } from "./types";

export function PlaybackControls({
  buttonClassName,
  currentTime,
  duration,
  isFullscreen,
  isMuted,
  isPlaying,
  onToggleMute,
  onTogglePlayback,
}: PlaybackControlsProps) {
  const volumeControl = isFullscreen ? null : <VolumeControl className={buttonClassName} isMuted={isMuted} onToggleMute={onToggleMute} />;

  return (
    <div className={controlsClassNames.group}>
      <PlayButton className={buttonClassName} isPlaying={isPlaying} onClick={onTogglePlayback} />

      {volumeControl}

      <TimeDisplay
        className={controlsClassNames.timeDisplay}
        currentTime={currentTime}
        duration={duration}
      />
    </div>
  );
}