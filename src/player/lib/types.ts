export interface Chapter {
  title: string;
  start: number;
  end: number;
}

export interface PlayerSource {
  hlsPlaylistUrl: string;
  videoLength: number;
  chapters: Chapter[];
}

export interface QualityOption {
  label: string;
  levelIndex: number;
  height?: number;
  bitrate?: number;
  isAuto?: boolean;
}

export interface HoveredTimelineState {
  chapter: Chapter | null;
  percent: number;
  time: number;
}
