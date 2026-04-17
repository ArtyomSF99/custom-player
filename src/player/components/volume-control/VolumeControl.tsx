import { VolumeIcon } from "../../icons/VolumeIcon";
import { VolumeMuteIcon } from "../../icons/VolumeMuteIcon";
import { PLAYER_TEXT } from "../../lib/text";
import type { VolumeControlProps } from "./types";

export function VolumeControl({ className, isMuted, onToggleMute }: VolumeControlProps) {
  const ariaLabel = isMuted ? PLAYER_TEXT.volumeControl.unmute : PLAYER_TEXT.volumeControl.mute;
  const icon = isMuted ? <VolumeMuteIcon width={22} height={22} /> : <VolumeIcon width={22} height={22} />;

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={onToggleMute}
    >
      {icon}
    </button>
  );
}