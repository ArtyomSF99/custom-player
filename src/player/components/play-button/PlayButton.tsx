import { PauseIcon } from "../../icons/PauseIcon";
import { PlayIcon } from "../../icons/PlayIcon";
import type { PlayButtonProps } from "./types";

export function PlayButton({ className, isPlaying, onClick }: PlayButtonProps) {
  const ariaLabel = isPlaying ? "Pause video" : "Play video";
  const icon = isPlaying ? <PauseIcon width={22} height={22} /> : <PlayIcon width={22} height={22} />;

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}