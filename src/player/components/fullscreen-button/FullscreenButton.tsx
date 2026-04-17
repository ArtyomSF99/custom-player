import { ExitFullscreenIcon } from "../../icons/ExitFullscreenIcon";
import { FullscreenIcon } from "../../icons/FullscreenIcon";
import type { FullscreenButtonProps } from "./types";

export function FullscreenButton({ className, isFullscreen, onClick }: FullscreenButtonProps) {
  return (
    <button
      type="button"
      className={className}
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      aria-pressed={isFullscreen}
      onClick={onClick}
    >
      {isFullscreen ? <ExitFullscreenIcon width={22} height={22} /> : <FullscreenIcon width={22} height={22} />}
    </button>
  );
}