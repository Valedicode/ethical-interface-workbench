# Ethical Interface Workbench

An interactive AI face simulator and design-ethics lab. It renders an abstract, animated "face" whose expressiveness, behavior, and ethical posture are driven by a set of live sliders — letting you explore how interface design choices for an AI agent translate into real ethical trade-offs across different social contexts.

## What it does

- **Animated face** — an abstract face (eyes, mouth, glow) built with Framer Motion whose blink rate, gaze movement, pupil size, mouth curvature, opacity, and outline weight are all derived in real time from the current configuration.
- **8 design sliders** across three groups:
  - **Expression** — Transparency, Expressiveness, Anthropomorphism
  - **Behavior** — Gaze Directness, Response Latency, Privacy Mode
  - **Ethics** — Authority Level, Uncertainty Display
- **Scenario presets** — Healthcare, Education, and Security contexts, each with a curated configuration and a per-slider ethical rationale.
- **Ethical analysis panel** — for the active scenario, every dimension is labeled Ethical, Caution, or Risk with an explanation, and flags when your manual adjustments deviate significantly from the recommended preset.
- **Light/dark mode** toggle.

The goal is to make abstract questions about AI interface design — how human-like should an assistant look? how much authority should it project? how visible should its uncertainty be? — tangible and explorable, and to show how the "right" answer shifts depending on context (a clinical assistant vs. a tutor vs. a surveillance system).

## Tech stack

- [Next.js](https://nextjs.org) (App Router) with TypeScript
- React 19
- [Tailwind CSS](https://tailwindcss.com) v4
- [Framer Motion](https://www.framer.com/motion/) for animation
- [lucide-react](https://lucide.dev) for icons
- [pnpm](https://pnpm.io) as the package manager

## Getting Started

Install dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Available Scripts

- `pnpm dev` — start the development server
- `pnpm build` — build for production
- `pnpm start` — run the production build
- `pnpm lint` — run ESLint

## Project Structure

```
src/
  app/                    Next.js App Router entry (layout, page, global styles)
  components/
    layout/Dashboard.tsx      Top-level layout: header, face viewport, panels
    controls/                 Slider UI (ControlPanel, EthicalSlider)
    face/                     Animated face (FaceCanvas, Eyes, Mouth)
    scenarios/                Scenario picker and ethical analysis panel
  hooks/useFaceState.ts   Central state: config, derived animation state, blink/gaze timers
  lib/
    types.ts                  Shared types (FaceConfig, PresetDefinition, AnimState, ...)
    ethicalPresets.ts         Slider metadata and the Healthcare/Education/Security presets
```

## Note on Next.js version

This project pins a Next.js release whose APIs and conventions may differ from what you'd expect from older documentation or training data. Before making framework-level changes, check the docs bundled in `node_modules/next/dist/docs/`.
