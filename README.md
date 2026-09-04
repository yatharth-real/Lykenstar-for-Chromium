# Lykenstar

> A minimalist, non-auditory Dynamic Island productivity heads-up display (HUD) for modern web browsers.

Lykenstar injects an organic, distraction-free control deck into any web document. Designed around a pure OLED true-black glass aesthetic, fluid spring-curve mechanics, and an isolated Shadow DOM host, it brings core productivity utilities right to the top shelf of your viewport without intrusive modals or ambient audio distractions.

---

## Architecture & Design Principles

- **True-Black OLED Glassmorph**: Pure `#000000` base layered with 32px backdrop blur, specular top-edge highlighting, and high-contrast monochrome typography. Zero saturated gradients or distracting color accents.
- **Wordless Sensory Pill (Collapsed)**: A resting pill anchored top-center showing only a real-time digital chronometer and a breathing status orb. No persistent brand tags or text clutter.
- **Isolated Shadow DOM**: Mounted directly inside `document.documentElement` to prevent host-site stylesheet leaks, layout breaks, or z-index collisions across diverse web frameworks.
- **Silent & Non-Auditory**: Exclusively focused on visual and cognitive flow. Completely stripped of audio hooks, media controllers, and volume interceptors.
- **Fluid Morphing Carousel**: An expanded 3-deck sliding bay driven by `cubic-bezier(0.16, 1, 0.3, 1)` spring physics.

---

## Feature Overview

### 1. Deep Work (Pomodoro Engine)
- Dedicated 25-minute interval timer for uninterrupted focus blocks.
- One-click Start/Pause controls with instant numeral sync.
- Tabular numeric typography to eliminate layout jitter while counting down.

### 2. Session Memo (Ephemeral Scratchpad)
- Fast-capture scratchpad that persists locally across sessions via `localStorage`.
- Live character counter with an instant **Copy All** clipboard trigger.
- Isolated keystroke handlers to prevent accidental page-level shortcut conflicts.

### 3. System Shelf (Utility Deck)
- **Clean Link**: One-click URL copying that strips common analytics and marketing tracking queries (`utm_*`, `fbclid`, `gclid`, `ref`).
- **Read Metrics**: Instant calculation of total page words and estimated reading duration.
- **Top Apex**: Smooth, hardware-accelerated scroll to the top of the page.
- **Hard Reload**: Quick-trigger cache re-render for development and research workflows.

---

## Extension Structure

```text
lykenstar/
├── manifest.json       # Manifest V3 configuration (all_urls permission)
└── content.js          # Shadow DOM injector, UI deck, and productivity engine
