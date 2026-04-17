import { formatTime } from "../../lib/utils";
import type { TimeDisplayProps } from "./types";

export function TimeDisplay({ className, currentTime, duration }: TimeDisplayProps) {
  const timeLabel = `${formatTime(currentTime)} / ${formatTime(duration)}`;

  return <span className={className}>{timeLabel}</span>;
}