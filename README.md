# Lykenstar (WebNotch)

Lykenstar is a polished, standalone, dynamic-island-inspired web component called "WebNotch". It provides a premium, futuristic interface that sits at the top-center of a webpage and smoothly morphs between different interactive states.

This is a pure Vanilla JS and CSS solution designed to be lightweight, performant, and completely independent of any frameworks like React or Vue, and completely independent of browser extensions. It lives directly inside your website.

## Features

- **No Dependencies:** Built with just HTML, Vanilla CSS, and Vanilla JavaScript.
- **Lightweight & Performant:** Uses CSS transforms, opacity transitions, and minimal DOM manipulation. Hardware accelerated.
- **Responsive:** Works beautifully on desktop, tablet, and mobile devices.
- **Accessible:** Semantic HTML, ARIA labels, keyboard navigation (e.g., `Escape` to close), visible focus states, and respects `prefers-reduced-motion`.
- **7 Smooth States:** Idle, Hover, Expanded, Notification, Progress, Success, Media.
- **Developer Friendly API:** Simple JavaScript methods to trigger different UI states.

## Quick Start

Open `index.html` in your browser to see the interactive demo!

### Usage in your project

1. Include the HTML container in your body:

```html
<div id="web-notch" class="web-notch" aria-live="polite" role="status" tabindex="0">
    <div class="web-notch-content" id="web-notch-content">
        <span class="web-notch-title" id="web-notch-title">Lykenstar</span>
        <div class="web-notch-dynamic-area" id="web-notch-dynamic-area"></div>
    </div>
</div>
```

2. Include `style.css` in your head:
```html
<link rel="stylesheet" href="style.css">
```

3. Include `script.js` and initialize:
```html
<script src="script.js"></script>
```

## JavaScript API Reference

Once initialized (`const webNotch = new WebNotch('web-notch');`), you can call the following methods:

- `webNotch.notify(message, duration)`: Shows a notification. Auto-closes after `duration` ms (default 3000).
- `webNotch.progress(percentage)`: Shows a progress bar (0-100).
- `webNotch.success(message, duration)`: Shows a success message. Auto-closes after `duration` ms (default 3000).
- `webNotch.media({ title, artist, playing })`: Shows a media player state.
- `webNotch.expand()`: Opens the expanded view.
- `webNotch.collapse()`: Returns to the idle state.

## Architecture

- `index.html`: The demo page layout and component skeleton.
- `style.css`: Contains CSS variables, base styles, state classes (`.is-idle`, `.is-expanded`, etc.), and dynamic content styling.
- `script.js`: The `WebNotch` class handles state management, event listeners, DOM updates, and exposes the public API.

## License
MIT License
