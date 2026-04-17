export const videoPlayerClassNames = {
  defaultFrame:
    "relative aspect-video w-full overflow-hidden rounded-[1.35rem] bg-[#06080d] shadow-[0_22px_40px_rgba(12,17,31,0.22)] max-[720px]:rounded-2xl",
  defaultShell:
    "w-full rounded-[1.9rem] border border-white/80 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.96),transparent_26%),linear-gradient(180deg,rgba(247,249,255,0.9),rgba(237,241,251,0.96))] p-[clamp(1rem,3vw,3rem)] outline-none shadow-[0_24px_60px_rgba(76,97,140,0.12),inset_0_1px_0_rgba(255,255,255,0.72)] focus-visible:ring-4 focus-visible:ring-[rgba(123,152,255,0.4)] max-[720px]:rounded-[1.25rem] max-[720px]:p-[0.8rem]",
  errorBanner:
    "absolute left-4 top-4 z-[2] max-w-[min(28rem,calc(100%-2rem))] rounded-[0.9rem] bg-[rgba(23,25,34,0.88)] px-[0.9rem] py-[0.7rem] text-[0.9rem] text-[rgba(250,252,255,0.92)] max-[720px]:left-3 max-[720px]:top-3 max-[720px]:max-w-[calc(100%-1.5rem)] max-[720px]:text-[0.82rem]",
  fullscreenFrame: "relative h-full w-full overflow-hidden rounded-none bg-[#06080d]",
  fullscreenShell: "fixed inset-0 z-50 h-screen w-screen bg-[#05070c] p-0",
  videoBase: "block h-full w-full bg-[#090b10]",
  videoContain: "object-contain",
  videoCover: "object-cover",
} as const;