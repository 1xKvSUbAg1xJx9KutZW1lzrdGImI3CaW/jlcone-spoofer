// ==UserScript==
// @name         JLCOne spoofer
// @namespace    Violentmonkey Scripts
// @version      6.7.0
// @match        *://*.jlcpcb.com/*
// @match        *://jlcpcb.com/*
// @match        *://*.jlcone.com/*
// @match        *://jlcone.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    const seed = [
        navigator.userAgent,
        navigator.hardwareConcurrency,
        navigator.platform,
        screen.width + screen.height + screen.pixelDepth,
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        navigator.language,
    ].join('67');


    crypto.subtle.digest('sha-256', new TextEncoder().encode(seed)).then(function (buf) {
        Object.defineProperty(window, 'appClient', {
            value: {
                getDeviceId: () => Array.prototype.map.call(new Uint8Array(buf), x => ('0' + x.toString(16)).slice(-2)).join(''),
                gotoLogin: () => {},
            },
            writable: false,
            enumerable: true,
            configurable: false,
        });
    });
})();
