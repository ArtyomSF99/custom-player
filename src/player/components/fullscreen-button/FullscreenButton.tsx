import { ExitFullscreenIcon } from "../../icons/ExitFullscreenIcon";
import { FullscreenIcon } from "../../icons/FullscreenIcon";
import { PLAYER_TEXT } from "../../lib/text";
import type { FullscreenButtonProps } from "./types";

export function FullscreenButton({ className, isFullscreen, onClick }: FullscreenButtonProps) {
  const ariaLabel = isFullscreen ? PLAYER_TEXT.fullscreenButton.exit : PLAYER_TEXT.fullscreenButton.enter;
  const icon = isFullscreen ? <ExitFullscreenIcon width={22} height={22} /> : <FullscreenIcon width={22} height={22} />;

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      aria-pressed={isFullscreen}
      title={ariaLabel}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}