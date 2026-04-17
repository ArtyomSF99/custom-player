import type { Chapter } from "./types";

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function formatTime(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const remainingSeconds = safeSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function getChapterEnd(chapters: Chapter[], index: number, duration: number) {
  const chapter = chapters[index];

  if (chapter) {
    return chapter.end;
  }

  return duration;
}

export function getChapterVisualEnd(chapters: Chapter[], index: number, duration: number) {
  const nextChapter = chapters[index + 1];
  return nextChapter ? nextChapter.start : duration;
}

export function getChapterForTime(chapters: Chapter[], time: number, duration: number) {
  return (
    chapters.find((chapter, index) => {
      const chapterEnd = getChapterEnd(chapters, index, duration);
      return time >= chapter.start && time < chapterEnd;
    }) ?? chapters.at(-1) ?? null
  );
}
