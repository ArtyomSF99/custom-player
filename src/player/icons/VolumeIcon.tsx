import type { SVGProps } from "react";

export function VolumeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4.5 9.75h3.42L12 6.25v11.5l-4.08-3.5H4.5v-4.5Z" />
      <path d="M16.25 9.25a4 4 0 0 1 0 5.5" />
      <path d="M18.75 7a7 7 0 0 1 0 10" />
    </svg>
  );
}
