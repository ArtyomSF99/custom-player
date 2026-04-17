import { useCallback } from "react";
import type { SyntheticEvent } from "react";

import { Timeline } from "../timeline/Timeline";
import { controlsClassNames, iconButtonClassName } from "./constants";
import { PlaybackControls } from "./PlaybackControls";
import type { ControlsProps } from "./types";
import { UtilityControls } from "./UtilityControls";

export function Controls({
  bufferedTime,
  chapters,
  currentTime,
  duration,
  isFullscreen,
  isMuted,
  isPlaying,
  isSettingsOpen,
  onOpenSettingsChange,
  onSeek,
  onSelectQuality,
  onToggleFullscreen,
  onToggleMute,
  onTogglePlayback,
  qualityOptions,
  selectedLevel,
  visible,
}: ControlsProps) {
  const overlayClassName = `${controlsClassNames.overlay} ${visible ? controlsClassNames.visible : controlsClassNames.hidden}`;
  const stopControlsPropagation = useCallback((event: SyntheticEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }, []);

  return (
    <div className={overlayClassName}>
      <div
        className={controlsClassNames.container}
        onClick={stopControlsPropagation}
        onDoubleClick={stopControlsPropagation}
        onPointerDown={stopControlsPropagation}
      >
        <Timeline bufferedTime={bufferedTime} chapters={chapters} currentTime={currentTime} duration={duration} onSeek={onSeek} />

        <div className={controlsClassNames.row}>
          <PlaybackControls
            buttonClassName={iconButtonClassName}
            currentTime={currentTime}
            duration={duration}
            isFullscreen={isFullscreen}
            isMuted={isMuted}
            isPlaying={isPlaying}
            onToggleMute={onToggleMute}
            onTogglePlayback={onTogglePlayback}
          />

          <UtilityControls
            buttonClassName={iconButtonClassName}
            isFullscreen={isFullscreen}
            isSettingsOpen={isSettingsOpen}
            onOpenSettingsChange={onOpenSettingsChange}
            onSelectQuality={onSelectQuality}
            onToggleFullscreen={onToggleFullscreen}
            qualityOptions={qualityOptions}
            selectedLevel={selectedLevel}
          />
        </div>
      </div>
    </div>
  );
}