import { ExitFullscreenIcon } from "../../icons/ExitFullscreenIcon";
import { FullscreenIcon } from "../../icons/FullscreenIcon";
import type { FullscreenButtonProps } from "./types";

export function FullscreenButton({ className, isFullscreen, onClick }: FullscreenButtonProps) {
  const ariaLabel = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";
  const icon = isFullscreen ? <ExitFullscreenIcon width={22} height={22} /> : <FullscreenIcon width={22} height={22} />;

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      aria-pressed={isFullscreen}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}