import type { RefObject } from "react";

import type { Chapter, HoveredTimelineState } from "../../lib/types";

export interface TimelineProps {
  bufferedTime: number;
  chapters: Chapter[];
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export interface ChapterSegment extends Chapter {
  length: number;
}

export interface TimelineTrackProps {
  ariaValueText: string;
  bufferedTime: number;
  chapterSegments: ChapterSegment[];
  currentTime: number;
  duration: number;
  hoveredState: HoveredTimelineState | null;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onLostPointerCapture: () => void;
  onPointerCancel: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: React.PointerEvent<HTMLDivElement>) => void;
  playheadPercent: number;
  trackRef: RefObject<HTMLDivElement | null>;
}