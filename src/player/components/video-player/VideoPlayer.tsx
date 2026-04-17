import { useCallback, useMemo, useRef, useState } from "react";

import { useControlsVisibility } from "../../hooks/useControlsVisibility";
import { useFullscreen } from "../../hooks/useFullscreen";
import { useHls } from "../../hooks/useHls";
import { usePlayerKeyboardShortcuts } from "../../hooks/usePlayerKeyboardShortcuts";
import { usePlayerState } from "../../hooks/usePlayerState";
import { PLAYER_INTERACTION } from "../../lib/constants";
import { Controls } from "../controls/Controls";
import { videoPlayerClassNames } from "./constants";
import type { VideoPlayerProps } from "./types";

export function VideoPlayer({ source }: VideoPlayerProps) {
  const shellRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { isFullscreen, toggleFullscreen } = useFullscreen(shellRef);
  const { error, qualityOptions, selectedLevel, setQuality } = useHls(videoRef, source.hlsPlaylistUrl);
  const { bufferedTime, currentTime, duration, isPlaying, muted, seekTo, toggleMute, togglePlayback } = usePlayerState(
    videoRef,
    source.videoLength,
  );

  const resolvedDuration = useMemo(() => (duration > 0 ? duration : source.videoLength), [duration, source.videoLength]);
  const { controlsVisible, revealControls, scheduleControlsHide } = useControlsVisibility(isFullscreen, isPlaying, isSettingsOpen);

  const handleTogglePlayback = useCallback(async () => {
    revealControls();
    await togglePlayback();
  }, [revealControls, togglePlayback]);

  const handleSeek = useCallback(
    (time: number) => {
      seekTo(time);
      revealControls();
    },
    [revealControls, seekTo],
  );

  const handleToggleMute = useCallback(() => {
    toggleMute();
    revealControls();
  }, [revealControls, toggleMute]);

  const handleToggleFullscreen = useCallback(async () => {
    revealControls();
    await toggleFullscreen();
  }, [revealControls, toggleFullscreen]);

  const handleKeyDown = usePlayerKeyboardShortcuts(
    currentTime,
    handleSeek,
    handleTogglePlayback,
    handleToggleFullscreen,
    handleToggleMute,
  );

  const shouldShowControls = !isFullscreen || controlsVisible || !isPlaying || isSettingsOpen;
  const shellClassName = isFullscreen ? videoPlayerClassNames.fullscreenShell : videoPlayerClassNames.defaultShell;
  const frameClassName = isFullscreen ? videoPlayerClassNames.fullscreenFrame : videoPlayerClassNames.defaultFrame;
  const videoClassName = `${videoPlayerClassNames.videoBase} ${
    isFullscreen ? videoPlayerClassNames.videoContain : videoPlayerClassNames.videoCover
  }`;

  return (
    <section
      ref={shellRef}
      className={shellClassName}
      tabIndex={0}
      onDoubleClick={() => void handleToggleFullscreen()}
      onKeyDown={(event) => void handleKeyDown(event)}
      onMouseLeave={() => scheduleControlsHide(PLAYER_INTERACTION.mouseLeaveHideDelayMs)}
      onPointerDown={revealControls}
      onPointerMove={revealControls}
    >
      <div className={frameClassName}>
        <video
          ref={videoRef}
          className={videoClassName}
          playsInline
          preload="metadata"
          onClick={() => void handleTogglePlayback()}
        />

        {error ? (
          <div className={videoPlayerClassNames.errorBanner}>
            {error}
          </div>
        ) : null}

        <Controls
          bufferedTime={bufferedTime}
          chapters={source.chapters}
          currentTime={currentTime}
          duration={resolvedDuration}
          isFullscreen={isFullscreen}
          isMuted={muted}
          isPlaying={isPlaying}
          isSettingsOpen={isSettingsOpen}
          onOpenSettingsChange={setIsSettingsOpen}
          onSeek={handleSeek}
          onSelectQuality={setQuality}
          onToggleFullscreen={() => void handleToggleFullscreen()}
          onToggleMute={handleToggleMute}
          onTogglePlayback={() => void handleTogglePlayback()}
          qualityOptions={qualityOptions}
          selectedLevel={selectedLevel}
          visible={shouldShowControls}
        />
      </div>
    </section>
  );
}