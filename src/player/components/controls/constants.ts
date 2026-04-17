export const controlsClassNames = {
  container:
    "pointer-events-auto relative z-[1] grid w-full gap-[0.7rem] px-4 pb-[max(1.1rem,env(safe-area-inset-bottom))] pt-4 max-[720px]:gap-[0.55rem] max-[720px]:px-[0.8rem] max-[720px]:pb-[max(0.9rem,env(safe-area-inset-bottom))] max-[720px]:pt-3",
  group: "flex items-center gap-[0.65rem] max-[720px]:gap-[0.35rem]",
  overlay:
    "pointer-events-none absolute inset-0 flex items-end transition-all duration-[160ms] ease-linear before:absolute before:inset-x-0 before:bottom-0 before:h-[36%] before:bg-[linear-gradient(180deg,rgba(11,13,18,0)_0%,rgba(11,13,18,0.1)_24%,rgba(11,13,18,0.72)_100%)] before:content-['']",
  row: "flex items-center justify-between gap-4 max-[720px]:gap-3",
  timeDisplay:
    "text-[clamp(1.05rem,1vw+0.75rem,1.5rem)] font-medium tracking-[0.01em] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.24)] max-[720px]:text-base",
  hidden: "translate-y-[0.4rem] opacity-0",
  visible: "translate-y-0 opacity-100",
} as const;

export const iconButtonClassName =
  "inline-flex h-[2.6rem] w-[2.6rem] items-center justify-center rounded-full border-none bg-transparent text-white transition duration-[120ms] ease-linear hover:bg-white/10 active:scale-95 max-[720px]:h-[2.35rem] max-[720px]:w-[2.35rem]";