import type { QualityOption } from "../../lib/types";

export interface SettingsMenuProps {
  buttonClassName?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSelectQuality: (levelIndex: number) => void;
  options: QualityOption[];
  selectedLevel: number;
}

export interface SettingsMenuListProps {
  isMobile: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSelectQuality: (levelIndex: number) => void;
  options: QualityOption[];
  selectedLevel: number;
}