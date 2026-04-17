import { clamp } from "../../lib/utils";
import type { TimelineTrackProps } from "./types";

export function TimelineTrack({
  ariaValueText,
  bufferedTime,
  chapterSegments,
  currentTime,
  duration,
  hoveredState,
  onKeyDown,
  onLostPointerCapture,
  onPointerCancel,
  onPointerDown,
  onPointerLeave,
  onPointerMove,
  onPointerUp,
  playheadPercent,
  trackRef,
}: TimelineTrackProps) {
  return (
    <div
      ref={trackRef}
      className="relative cursor-pointer select-none touch-none py-[0.4rem] pb-[0.65rem]"
      aria-label="Video progress"
      aria-orientation="horizontal"
      aria-valuemax={Math.round(duration)}
      aria-valuemin={0}
      aria-valuenow={Math.round(currentTime)}
      aria-valuetext={ariaValueText}
      role="slider"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onLostPointerCapture={onLostPointerCapture}
      onPointerCancel={onPointerCancel}
      onPointerDown={onPointerDown}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div className="flex gap-[0.32rem]">
        {chapterSegments.map((chapter) => {
          const playedRatio = clamp((currentTime - chapter.start) / chapter.length, 0, 1);
          const bufferedRatio = clamp((bufferedTime - chapter.start) / chapter.length, 0, 1);

          return (
            <div
              key={`${chapter.title}-${chapter.start}`}
              className="relative h-[0.35rem] basis-0 overflow-hidden rounded-full bg-[rgba(204,214,237,0.28)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
              style={{ flexGrow: chapter.length }}
            >
              <div
                className="absolute inset-y-0 left-0 rounded-[inherit] bg-[linear-gradient(90deg,rgba(119,157,255,0.78),rgba(146,174,255,0.74))]"
                style={{ width: `${bufferedRatio * 100}%` }}
              />
              <div
                className="absolute inset-y-0 left-0 rounded-[inherit] bg-[linear-gradient(90deg,rgba(255,255,255,1),rgba(255,255,255,0.94))] shadow-[0_0_10px_rgba(255,255,255,0.28)]"
                style={{ width: `${playedRatio * 100}%` }}
              />
            </div>
          );
        })}
      </div>

      <div
        className="absolute top-1/2 h-[1.55rem] w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.3)]"
        style={{ left: `${playheadPercent}%` }}
      />

      {hoveredState ? (
        <div
          className="absolute top-1/2 h-[1.15rem] w-[0.14rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/55"
          style={{ left: `${hoveredState.percent * 100}%` }}
        />
      ) : null}
    </div>
  );
}