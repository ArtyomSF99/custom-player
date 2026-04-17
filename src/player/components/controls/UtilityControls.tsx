import { FullscreenButton } from "../fullscreen-button/FullscreenButton";
import { SettingsMenu } from "../settings-menu/SettingsMenu";
import { controlsClassNames } from "./constants";
import type { UtilityControlsProps } from "./types";

export function UtilityControls({
  buttonClassName,
  isFullscreen,
  isSettingsOpen,
  onOpenSettingsChange,
  onSelectQuality,
  onToggleFullscreen,
  qualityOptions,
  selectedLevel,
}: UtilityControlsProps) {
  return (
    <div className={controlsClassNames.group}>
      <SettingsMenu
        buttonClassName={buttonClassName}
        isOpen={isSettingsOpen}
        onOpenChange={onOpenSettingsChange}
        onSelectQuality={onSelectQuality}
        options={qualityOptions}
        selectedLevel={selectedLevel}
      />

      <FullscreenButton className={buttonClassName} isFullscreen={isFullscreen} onClick={onToggleFullscreen} />
    </div>
  );
}