import { VolumeIcon } from "../../icons/VolumeIcon";
import { VolumeMuteIcon } from "../../icons/VolumeMuteIcon";
import type { VolumeControlProps } from "./types";

export function VolumeControl({ className, isMuted, onToggleMute }: VolumeControlProps) {
  return (
    <button
      type="button"
      className={className}
      aria-label={isMuted ? "Unmute video" : "Mute video"}
      onClick={onToggleMute}
    >
      {isMuted ? <VolumeMuteIcon width={22} height={22} /> : <VolumeIcon width={22} height={22} />}
    </button>
  );
}