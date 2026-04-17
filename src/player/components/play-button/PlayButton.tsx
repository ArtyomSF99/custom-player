import { PauseIcon } from "../../icons/PauseIcon";
import { PlayIcon } from "../../icons/PlayIcon";
import type { PlayButtonProps } from "./types";

export function PlayButton({ className, isPlaying, onClick }: PlayButtonProps) {
  return (
    <button
      type="button"
      className={className}
      aria-label={isPlaying ? "Pause video" : "Play video"}
      onClick={onClick}
    >
      {isPlaying ? <PauseIcon width={22} height={22} /> : <PlayIcon width={22} height={22} />}
    </button>
  );
}