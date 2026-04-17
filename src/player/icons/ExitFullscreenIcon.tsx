import type { SVGProps } from "react";

export function ExitFullscreenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M8.25 4.75v3.5h-3.5" />
      <path d="M15.75 4.75v3.5h3.5" />
      <path d="M15.75 19.25v-3.5h3.5" />
      <path d="M8.25 19.25v-3.5h-3.5" />
    </svg>
  );
}