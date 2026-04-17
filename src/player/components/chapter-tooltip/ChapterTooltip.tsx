import { formatTime } from "../../lib/utils";
import type { ChapterTooltipProps } from "./types";

export function ChapterTooltip({ alignment, leftPercent, time, title }: ChapterTooltipProps) {
  const formattedTime = formatTime(time);
  const tooltipStyle = { left: `${leftPercent}%` };
  const alignmentClassName =
    alignment === "start"
      ? "translate-x-0 after:left-6 after:-translate-x-1/2"
      : alignment === "end"
        ? "-translate-x-full after:left-auto after:right-6 after:translate-x-1/2"
        : "-translate-x-1/2 after:left-1/2 after:-translate-x-1/2";
  const tooltipClassName = `pointer-events-auto absolute bottom-[calc(100%+0.9rem)] z-[3] grid min-w-[12rem] max-w-[min(18rem,calc(100%-0.5rem))] gap-[0.15rem] rounded-[0.85rem] bg-[rgba(22,23,29,0.96)] px-4 py-[0.8rem] text-[#f8f9ff] shadow-[0_16px_40px_rgba(5,9,20,0.35)] after:absolute after:bottom-[-0.35rem] after:h-[0.8rem] after:w-[0.8rem] after:rotate-45 after:rounded-[0.1rem] after:bg-[rgba(22,23,29,0.96)] after:content-[''] ${alignmentClassName}`;

  return (
    <div
      className={tooltipClassName}
      style={tooltipStyle}
    >
      <span className="text-[0.95rem] font-medium leading-[1.3]">{title}</span>
      <span className="text-base font-semibold tracking-[0.01em]">{formattedTime}</span>
    </div>
  );
}