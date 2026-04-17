import type { SVGProps } from "react";

export function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m12 3.75 1.19 1.9 2.2.5 1.73-1.39 1.5 1.5-1.4 1.73.5 2.2 1.91 1.19v2.12l-1.9 1.19-.5 2.2 1.39 1.73-1.5 1.5-1.73-1.4-2.2.5L12 20.25l-1.19-1.9-2.2-.5-1.73 1.39-1.5-1.5 1.4-1.73-.5-2.2-1.91-1.19v-2.12l1.9-1.19.5-2.2L5.38 6.26l1.5-1.5 1.73 1.4 2.2-.5L12 3.75Z" />
      <circle cx="12" cy="12" r="2.9" />
    </svg>
  );
}
