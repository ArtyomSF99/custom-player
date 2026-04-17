# Web Player

Standalone React + Vite HLS video player used for the assignment in this repository.

## Requirements

- Node.js 22+
- npm 10+

## Setup

```bash
cd web-player
npm install
```

## Run

Development server:

```bash
npm run dev
```

Type-check:

```bash
npm run typecheck
```

Production build:

```bash
npm run build
```

Local preview of the production build:

```bash
npm run preview
```

## Key Decisions

- `hls.js` is lazy-loaded so the player UI can render before the streaming runtime is downloaded.
- The quality picker is rendered through a portal so it works both in normal mode and browser fullscreen.
- Player logic is split into focused hooks for media state, fullscreen, controls visibility, timeline hover, keyboard shortcuts, and settings menu behavior.
- Tailwind v4 is used for styling to keep the player self-contained without external CSS modules.

## Challenges

- Mobile fullscreen required rendering overlays inside `document.fullscreenElement` instead of `document.body`.
- The quality menu needed separate desktop and mobile positioning to avoid clipping inside the video frame.
- Timeline behavior uses chapter metadata both for visual segmentation and for chapter lookup while preserving keyboard accessibility.