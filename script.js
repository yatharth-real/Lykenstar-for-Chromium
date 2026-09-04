/**
 * Lykenstar - WebNotch Component
 * A standalone, dynamic-island-inspired web UI component.
 */
class WebNotch {
    constructor(elementId) {
        this.notch = document.getElementById(elementId);
        if (!this.notch) {
            console.error(`WebNotch: Element with id '${elementId}' not found.`);
            return;
        }

        this.dynamicArea = this.notch.querySelector('.web-notch-dynamic-area');
        this.titleArea = this.notch.querySelector('.web-notch-title');

        this.currentState = 'idle';
        this.stateTimeout = null;

        this.init();
    }

    init() {
        // Set initial state
        this.setState('idle');

        // Event listeners for interaction
        this.notch.addEventListener('click', (e) => this.handleClick(e));

        // Global listeners for accessibility and collapsing
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('click', (e) => this.handleGlobalClick(e));
    }

    /**
     * Core state management
     * Handles CSS class swapping and cleanup
     */
    setState(stateName, contentHTML = '', autoRevertDelay = 0) {
        // Clear any pending state reversions
        if (this.stateTimeout) {
            clearTimeout(this.stateTimeout);
            this.stateTimeout = null;
        }

        // Clean up previous state classes
        const stateClasses = ['is-idle', 'is-expanded', 'is-notification', 'is-progress', 'is-success', 'is-media'];
        stateClasses.forEach(cls => this.notch.classList.remove(cls));

        // Update state
        this.currentState = stateName;
        this.notch.classList.add(`is-${stateName}`);

        // Update content
        if (stateName === 'idle') {
            this.dynamicArea.innerHTML = '';
            this.notch.setAttribute('aria-expanded', 'false');
        } else {
            if (contentHTML) {
                this.dynamicArea.innerHTML = contentHTML;
            }
            if (stateName === 'expanded') {
                this.notch.setAttribute('aria-expanded', 'true');
            }
        }

        // Handle auto-revert to idle
        if (autoRevertDelay > 0) {
            this.stateTimeout = setTimeout(() => {
                this.collapse();
            }, autoRevertDelay);
        }
    }

    /**
     * Event Handlers
     */
    handleClick(e) {
        // Prevent click from propagating to global click handler
        e.stopPropagation();

        // If clicking a close button inside expanded state
        if (e.target.closest('.wn-close-btn')) {
            this.collapse();
            return;
        }

        // Default behavior: click to expand if idle or in a temporary state
        if (this.currentState !== 'expanded') {
            this.expand();
        }
    }

    handleKeyDown(e) {
        if (e.key === 'Escape' && this.currentState !== 'idle') {
            this.collapse();
        }
    }

    handleGlobalClick(e) {
        if (this.currentState === 'expanded' && !this.notch.contains(e.target)) {
            this.collapse();
        }
    }

    /**
     * PUBLIC API
     */

    collapse() {
        if (this.currentState !== 'idle') {
            this.setState('idle');
        }
    }

    expand() {
        const content = `
            <div class="wn-expanded-panel">
                <div class="wn-expanded-header">
                    <span class="wn-expanded-title">Lykenstar Control Center</span>
                    <button class="wn-close-btn" aria-label="Close" tabindex="0">✕</button>
                </div>
                <div class="wn-expanded-body">
                    <div class="wn-expanded-row">
                        <svg class="wn-icon-bell" viewBox="0 0 24 24">
                            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                        </svg>
                        <span>Build completed</span>
                    </div>
                    <div class="wn-expanded-row">
                        <div class="wn-progress-track">
                            <div class="wn-progress-bar" style="width: 75%;"></div>
                        </div>
                        <span class="wn-progress-text">75%</span>
                    </div>
                    <div class="wn-expanded-row wn-success-text">
                        <svg class="wn-icon-check" viewBox="0 0 24 24">
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                        </svg>
                        <span>System operational</span>
                    </div>
                </div>
            </div>
        `;
        this.setState('expanded', content);
    }

    notify(message, duration = 3000) {
        const content = `
            <div class="wn-notification">
                <svg class="wn-icon-bell" viewBox="0 0 24 24">
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                </svg>
                <span>${message}</span>
            </div>
        `;
        this.setState('notification', content, duration);
    }

    progress(percentage) {
        // Clamp between 0 and 100
        const val = Math.max(0, Math.min(100, percentage));

        // If already in progress state, just update the bar to avoid HTML rewrite
        if (this.currentState === 'progress') {
            const bar = this.dynamicArea.querySelector('.wn-progress-bar');
            const text = this.dynamicArea.querySelector('.wn-progress-text');
            if (bar && text) {
                bar.style.width = `${val}%`;
                text.textContent = `${Math.round(val)}%`;
                return;
            }
        }

        const content = `
            <div class="wn-progress-container">
                <div class="wn-progress-track">
                    <div class="wn-progress-bar" style="width: ${val}%;"></div>
                </div>
                <span class="wn-progress-text">${Math.round(val)}%</span>
            </div>
        `;
        this.setState('progress', content);
    }

    success(message, duration = 3000) {
        const content = `
            <div class="wn-success">
                <svg class="wn-icon-check" viewBox="0 0 24 24">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
                <span>${message}</span>
            </div>
        `;
        this.setState('success', content, duration);
    }

    media(options) {
        const title = options.title || 'Unknown';
        const artist = options.artist || 'Unknown Artist';
        const isPlaying = options.playing !== undefined ? options.playing : true;

        const playPauseIcon = isPlaying
            ? `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>` // Pause
            : `<path d="M8 5v14l11-7z"/>`; // Play

        const content = `
            <div class="wn-media">
                <div class="wn-media-content-row">
                    <div class="wn-media-info">
                        <div class="wn-media-art"></div>
                        <div class="wn-media-text">
                            <span class="wn-media-title">${title}</span>
                            <span class="wn-media-artist">${artist}</span>
                        </div>
                    </div>
                    <div class="wn-media-controls">
                        <button class="wn-media-btn" aria-label="Previous">
                            <svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                        </button>
                        <button class="wn-media-btn" aria-label="${isPlaying ? 'Pause' : 'Play'}">
                            <svg viewBox="0 0 24 24">${playPauseIcon}</svg>
                        </button>
                        <button class="wn-media-btn" aria-label="Next">
                            <svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                        </button>
                    </div>
                </div>
                <div class="wn-media-progress">
                    <div class="wn-progress-track">
                        <div class="wn-progress-bar" style="width: 45%;"></div>
                    </div>
                </div>
            </div>
        `;
        this.setState('media', content);
    }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Instantiate WebNotch
    const webNotch = new WebNotch('web-notch');

    // Wire up demo buttons
    const btnNotify = document.getElementById('btn-notify');
    const btnProgress = document.getElementById('btn-progress');
    const btnSuccess = document.getElementById('btn-success');
    const btnMedia = document.getElementById('btn-media');
    const btnExpand = document.getElementById('btn-expand');
    const btnCollapse = document.getElementById('btn-collapse');
    const btnReset = document.getElementById('btn-reset');

    if (btnNotify) {
        btnNotify.addEventListener('click', () => {
            webNotch.notify("Build completed");
        });
    }

    if (btnProgress) {
        let currentProgress = 0;
        let progressInterval = null;

        btnProgress.addEventListener('click', () => {
            // Clear any existing demo progress
            if (progressInterval) clearInterval(progressInterval);

            currentProgress = 0;
            webNotch.progress(currentProgress);

            progressInterval = setInterval(() => {
                currentProgress += Math.random() * 15;
                if (currentProgress >= 100) {
                    currentProgress = 100;
                    webNotch.progress(currentProgress);
                    clearInterval(progressInterval);
                    setTimeout(() => webNotch.success("Process Complete", 2000), 500);
                } else {
                    webNotch.progress(currentProgress);
                }
            }, 400);
        });
    }

    if (btnSuccess) {
        btnSuccess.addEventListener('click', () => {
            webNotch.success("Deployment complete");
        });
    }

    if (btnMedia) {
        let isPlaying = true;
        btnMedia.addEventListener('click', () => {
            webNotch.media({
                title: "Synthwave Vibes",
                artist: "Retro Enigma",
                playing: isPlaying
            });
            isPlaying = !isPlaying; // Toggle on next click for demo purposes
        });
    }

    if (btnExpand) {
        btnExpand.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent global click from immediately closing
            webNotch.expand();
        });
    }

    if (btnCollapse) {
        btnCollapse.addEventListener('click', () => {
            webNotch.collapse();
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            webNotch.collapse(); // Alias for reset to idle
        });
    }
});
