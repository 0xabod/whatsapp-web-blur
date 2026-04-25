// ==UserScript==
// @name         WhatsApp Web Privacy Blur Pro
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Blur chats, messages, media with hover reveal + toggle
// @match        https://web.whatsapp.com/*
// @downloadURL https://raw.githubusercontent.com/0xabod/whatsapp-web-blur/main/whatsapp-blur.user.js
// @updateURL   https://raw.githubusercontent.com/0xabod/whatsapp-web-blur/main/whatsapp-blur.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let blurEnabled = true;
    let blurStrength = 8;

    const style = document.createElement('style');
    document.head.appendChild(style);

    function applyBlur() {
        style.innerHTML = blurEnabled ? `
            /* Chat list */
            [data-testid="cell-frame-container"] {
                filter: blur(${blurStrength}px);
                transition: 0.2s;
            }

            [data-testid="cell-frame-container"]:hover {
                filter: blur(0);
            }

            /* Messages */
            [data-testid="msg-container"] {
                filter: blur(${blurStrength}px);
                transition: 0.2s;
            }

            [data-testid="msg-container"]:hover {
                filter: blur(0);
            }

            /* Images / videos */
            img, video {
                filter: blur(${blurStrength}px);
                transition: 0.2s;
            }

            img:hover, video:hover {
                filter: blur(0);
            }

            /* Profile names */
            [data-testid="conversation-info-header-chat-title"] {
                filter: blur(${blurStrength}px);
            }

            [data-testid="conversation-info-header-chat-title"]:hover {
                filter: blur(0);
            }
        ` : '';
    }

    // Toggle with CTRL + B
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === 'b') {
            blurEnabled = !blurEnabled;
            applyBlur();
            console.log("Blur:", blurEnabled ? "ON" : "OFF");
        }
    });

    // Increase blur with CTRL + ↑
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'ArrowUp') {
            blurStrength += 2;
            applyBlur();
        }
    });

    // Decrease blur with CTRL + ↓
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'ArrowDown') {
            blurStrength = Math.max(2, blurStrength - 2);
            applyBlur();
        }
    });

    // Reapply on dynamic load
    const observer = new MutationObserver(() => applyBlur());
    observer.observe(document.body, { childList: true, subtree: true });

    applyBlur();

})();
