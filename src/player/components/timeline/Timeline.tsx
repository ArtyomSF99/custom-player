import { useMemo } from "react";

import { useTimelineHover } from "../../hooks/useTimelineHover";
import { useTimelineKeyboard } from "../../hooks/useTimelineKeyboard";
import { formatTime, getChapterVisualEnd } from "../../lib/utils";
import { ChapterTooltip } from "../chapter-tooltip/ChapterTooltip";
import type { TimelineProps } from "./types";
import { TimelineTrack } from "./TimelineTrack";

export function Timeline({ bufferedTime, chapters, currentTime, duration, onSeek }: TimelineProps) {
  const chapterSegments = useMemo(
    () =>
      chapters.map((chapter, index) => {
        const end = getChapterVisualEnd(chapters, index, duration);
        return {
          ...chapter,
          length: Math.max(0.001, end - chapter.start),
        };
      }),
    [chapters, duration],
  );
  const ariaValueText = useMemo(() => `${formatTime(currentTime)} of ${formatTime(duration)}`, [currentTime, duration]);
  const handleKeyDown = useTimelineKeyboard(currentTime, duration, onSeek);

  const {
    handleLostPointerCapture,
    handlePointerCancel,
    handlePointerDown,
    handlePointerLeave,
    handlePointerMove,
    handlePointerUp,
    hoverLeftPercent,
    hoveredState,
    playheadPercent,
    trackRef,
  } = useTimelineHover(chapters, currentTime, duration, onSeek);

  return (
    <div className="relative pt-[0.2rem]">
      {hoveredState?.chapter ? (
        <ChapterTooltip leftPercent={hoverLeftPercent} time={hoveredState.time} title={hoveredState.chapter.title} />
      ) : null}

      <TimelineTrack
        ariaValueText={ariaValueText}
        bufferedTime={bufferedTime}
        chapterSegments={chapterSegments}
        currentTime={currentTime}
        duration={duration}
        hoveredState={hoveredState}
        onKeyDown={handleKeyDown}
        onLostPointerCapture={handleLostPointerCapture}
        onPointerCancel={handlePointerCancel}
        onPointerDown={handlePointerDown}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        playheadPercent={playheadPercent}
        trackRef={trackRef}
      />
    </div>
  );
}