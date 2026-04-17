import { formatTime } from "../../lib/utils";
import type { TimeDisplayProps } from "./types";

export function TimeDisplay({ className, currentTime, duration }: TimeDisplayProps) {
  return <span className={className}>{`${formatTime(currentTime)} / ${formatTime(duration)}`}</span>;
}