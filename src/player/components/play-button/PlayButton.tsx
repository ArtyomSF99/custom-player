import { PauseIcon } from "../../icons/PauseIcon";
import { PlayIcon } from "../../icons/PlayIcon";
import { PLAYER_TEXT } from "../../lib/text";
import type { PlayButtonProps } from "./types";

export function PlayButton({ className, isPlaying, onClick }: PlayButtonProps) {
  const ariaLabel = isPlaying ? PLAYER_TEXT.playButton.pause : PLAYER_TEXT.playButton.play;
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