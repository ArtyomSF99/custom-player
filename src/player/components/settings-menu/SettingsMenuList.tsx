import type { SettingsMenuListProps } from "./types";

export function SettingsMenuList({ isMobile, onOpenChange, onSelectQuality, options, selectedLevel }: SettingsMenuListProps) {
  return (
    <div
      className={`grid gap-[0.22rem] border shadow-[0_18px_40px_rgba(5,9,20,0.38)] ${
        isMobile
          ? "max-h-[min(22rem,calc(100vh-1.5rem-env(safe-area-inset-bottom)))] overflow-y-auto rounded-[1.35rem] border-white/12 bg-[rgba(10,12,18,0.98)] p-[0.7rem]"
          : "min-w-[10.5rem] rounded-2xl border-white/10 bg-[rgba(18,20,27,0.96)] p-[0.55rem]"
      }`}
      role="menu"
      aria-label="Quality settings"
    >
      <div
        className={`text-xs font-semibold uppercase tracking-[0.06em] text-white/60 ${
          isMobile
            ? "sticky top-0 z-[1] rounded-t-[0.95rem] bg-[rgba(10,12,18,0.98)] px-3 pb-2 pt-3"
            : "px-[0.55rem] pb-[0.25rem] pt-[0.45rem]"
        }`}
      >
        Resolution
      </div>

      {options.map((option) => {
        const isActive = option.isAuto ? selectedLevel === -1 : selectedLevel === option.levelIndex;

        return (
          <button
            key={option.label}
            type="button"
            className={`flex w-full items-center justify-between gap-3 border-none text-left text-[#f6f7fb] transition hover:bg-white/10 ${
              isMobile ? "rounded-[0.95rem] px-[0.95rem] py-[0.9rem]" : "rounded-[0.8rem] px-3 py-[0.68rem]"
            } ${
              isActive ? "bg-[rgba(119,157,255,0.18)]" : "bg-transparent"
            }`}
            role="menuitemradio"
            aria-checked={isActive}
            onClick={() => {
              onSelectQuality(option.levelIndex);
              onOpenChange(false);
            }}
          >
            <span>{option.label}</span>
            {isActive ? <span className="text-[0.78rem] text-[rgba(222,231,255,0.88)]">Active</span> : null}
          </button>
        );
      })}
    </div>
  );
}