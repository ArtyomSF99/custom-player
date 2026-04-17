export type ChapterTooltipAlignment = "start" | "center" | "end";

export interface ChapterTooltipProps {
  alignment: ChapterTooltipAlignment;
  leftPercent: number;
  time: number;
  title: string;
}