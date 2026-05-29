/* Scroll-to-top button.
   Shown after the user scrolls past ~400px; clicking smoothly returns
   them to the top. Honors prefers-reduced-motion by jumping instead
   of animating. Loaded on index.html, blog1.html, blog2.html — not on
   cv.html (print-oriented, short).

   The button is injected by JS rather than baked into each HTML file so
   the markup stays in one place. Styling lives in css/style.css under
   the "Scroll-to-top button" section. */
(function () {
    'use strict';

    var THRESHOLD = 400; // px scrolled before the button appears

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'scrollToTopBtn';
    btn.className = 'scroll-to-top';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.setAttribute('aria-hidden', 'true'); // hidden from AT until visible
    btn.tabIndex = -1; // not in the tab order until visible
    btn.innerHTML =
        '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" ' +
        'stroke="currentColor" stroke-width="2.5" stroke-linecap="round" ' +
        'stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M18 15l-6-6-6 6"/></svg>';

    document.body.appendChild(btn);

    var visible = false;
    function update() {
        var shouldShow = window.scrollY > THRESHOLD;
        if (shouldShow === visible) return;
        visible = shouldShow;
        btn.classList.toggle('is-visible', visible);
        btn.setAttribute('aria-hidden', visible ? 'false' : 'true');
        btn.tabIndex = visible ? 0 : -1;
    }

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    btn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: reduceMotion ? 'auto' : 'smooth'
        });
    });

    // Passive listener — scroll handlers should never block scrolling.
    window.addEventListener('scroll', update, { passive: true });
    update();
})();
