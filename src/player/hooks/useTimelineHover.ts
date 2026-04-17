import { useCallback, useMemo, useRef, useState } from "react";

import type { Chapter, HoveredTimelineState } from "../lib/types";
import { clamp, getChapterForTime } from "../lib/utils";

export function useTimelineHover(chapters: Chapter[], currentTime: number, duration: number, onSeek: (time: number) => void) {
  const trackRef = useRef<HTMLDivElement>(null);
  const activePointerIdRef = useRef<number | null>(null);
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
      const nextHoverState = buildHoverState(event.clientX);

      if (!nextHoverState) {
        return;
      }

      setHoveredState(nextHoverState);

      if (activePointerIdRef.current === event.pointerId) {
        onSeek(nextHoverState.time);
      }
    },
    [buildHoverState, onSeek],
  );

  const handlePointerLeave = useCallback(() => {
    if (activePointerIdRef.current !== null) {
      return;
    }

    setHoveredState(null);
  }, []);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      event.currentTarget.setPointerCapture(event.pointerId);
      activePointerIdRef.current = event.pointerId;

      const nextHoverState = buildHoverState(event.clientX);

      if (!nextHoverState) {
        return;
      }

      onSeek(nextHoverState.time);
      setHoveredState(nextHoverState);
    },
    [buildHoverState, onSeek],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (activePointerIdRef.current !== event.pointerId) {
        return;
      }

      const nextHoverState = buildHoverState(event.clientX);

      if (nextHoverState) {
        onSeek(nextHoverState.time);
        setHoveredState(nextHoverState);
      }

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      activePointerIdRef.current = null;
    },
    [buildHoverState, onSeek],
  );

  const handlePointerCancel = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerIdRef.current !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    activePointerIdRef.current = null;
    setHoveredState(null);
  }, []);

  const handleLostPointerCapture = useCallback(() => {
    activePointerIdRef.current = null;
  }, []);

  const playheadPercent = useMemo(() => clamp((currentTime / duration) * 100, 0, 100), [currentTime, duration]);

  return {
    handleLostPointerCapture,
    handlePointerCancel,
    handlePointerDown,
    handlePointerLeave,
    handlePointerMove,
    handlePointerUp,
    hoveredState,
    playheadPercent,
    trackRef,
  };
}