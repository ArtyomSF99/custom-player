import type { Chapter, QualityOption } from "../../lib/types";

export interface ControlsProps {
  bufferedTime: number;
  chapters: Chapter[];
  currentTime: number;
  duration: number;
  isFullscreen: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  isSettingsOpen: boolean;
  onOpenSettingsChange: (isOpen: boolean) => void;
  onSeek: (time: number) => void;
  onSelectQuality: (levelIndex: number) => void;
  onToggleFullscreen: () => void;
  onToggleMute: () => void;
  onTogglePlayback: () => void;
  qualityOptions: QualityOption[];
  selectedLevel: number;
  visible: boolean;
}

export interface PlaybackControlsProps {
  buttonClassName: string;
  currentTime: number;
  duration: number;
  isFullscreen: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  onToggleMute: () => void;
  onTogglePlayback: () => void;
}

export interface UtilityControlsProps {
  buttonClassName: string;
  isFullscreen: boolean;
  isSettingsOpen: boolean;
  onOpenSettingsChange: (isOpen: boolean) => void;
  onSelectQuality: (levelIndex: number) => void;
  onToggleFullscreen: () => void;
  qualityOptions: QualityOption[];
  selectedLevel: number;
}