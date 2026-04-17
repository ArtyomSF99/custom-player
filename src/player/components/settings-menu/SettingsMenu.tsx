import { useMemo, useRef } from "react";
import { createPortal } from "react-dom";

import { useSettingsMenuDismiss } from "../../hooks/useSettingsMenuDismiss";
import { useSettingsMenuPosition } from "../../hooks/useSettingsMenuPosition";
import { SettingsIcon } from "../../icons/SettingsIcon";
import type { SettingsMenuProps } from "./types";
import { SettingsMenuList } from "./SettingsMenuList";

export function SettingsMenu({ buttonClassName, isOpen, onOpenChange, onSelectQuality, options, selectedLevel }: SettingsMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const insideRefs = useMemo(() => [rootRef, menuRef], []);

  useSettingsMenuDismiss(isOpen, onOpenChange, insideRefs);

  const { desktopStyle, isMobile } = useSettingsMenuPosition(buttonRef, isOpen);
  const portalTarget = typeof document !== "undefined" ? document.fullscreenElement ?? document.body : null;

  const menu =
    isOpen && portalTarget
      ? createPortal(
          isMobile ? (
            <div className="fixed inset-0 z-[90]">
              <button
                type="button"
                className="absolute inset-0 bg-[rgba(5,8,14,0.42)]"
                aria-label="Close quality settings"
                onClick={() => onOpenChange(false)}
              />

              <div ref={menuRef} className="absolute inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[1]">
                <SettingsMenuList
                  isMobile
                  onOpenChange={onOpenChange}
                  onSelectQuality={onSelectQuality}
                  options={options}
                  selectedLevel={selectedLevel}
                />
              </div>
            </div>
          ) : (
            <div className="fixed inset-0 z-[90] pointer-events-none">
              <div ref={menuRef} className="pointer-events-auto" style={desktopStyle}>
                <SettingsMenuList
                  isMobile={false}
                  onOpenChange={onOpenChange}
                  onSelectQuality={onSelectQuality}
                  options={options}
                  selectedLevel={selectedLevel}
                />
              </div>
            </div>
          ),
          portalTarget,
        )
      : null;

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        className={buttonClassName}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Open quality settings"
        onClick={() => onOpenChange(!isOpen)}
      >
        <SettingsIcon width={22} height={22} />
      </button>

      {menu}
    </div>
  );
}