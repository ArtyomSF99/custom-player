import { useCallback, useMemo, useRef, useState } from "react";

import type { Chapter, HoveredTimelineState } from "../lib/types";
import { clamp, getChapterForTime } from "../lib/utils";

export function useTimelineHover(chapters: Chapter[], currentTime: number, duration: number, onSeek: (time: number) => void) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hoveredState, setHoveredState] = useState<HoveredTimelineState | null>(null);

  const buildHoverState = useCallback(
    (clientX: number) => {
      const track = trackRef.current;

      if (!track) {
        return null;
      }

      const rect = track.getBoundingClientRect();
      const percent = clamp((clientX - rect.left) / rect.width, 0, 1);
      const time = percent * duration;
      const chapter = getChapterForTime(chapters, time, duration);

      return {
        chapter,
        percent,
        time,
      } satisfies HoveredTimelineState;
    },
    [chapters, duration],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      setHoveredState(buildHoverState(event.clientX));
    },
    [buildHoverState],
  );

  const handlePointerLeave = useCallback(() => {
    setHoveredState(null);
  }, []);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) {
        return;
      }

      const nextHoverState = buildHoverState(event.clientX);

      if (!nextHoverState) {
        return;
      }

      onSeek(nextHoverState.time);
      setHoveredState(nextHoverState);
    },
    [buildHoverState, onSeek],
  );

  const playheadPercent = useMemo(() => clamp((currentTime / duration) * 100, 0, 100), [currentTime, duration]);
  const hoverLeftPercent = useMemo(() => (hoveredState ? clamp(hoveredState.percent * 100, 7, 93) : 0), [hoveredState]);

  return {
    handlePointerDown,
    handlePointerLeave,
    handlePointerMove,
    hoverLeftPercent,
    hoveredState,
    playheadPercent,
    trackRef,
  };
}