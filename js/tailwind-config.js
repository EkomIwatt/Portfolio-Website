/* Shared Tailwind theme config — single source of truth for the palette and
   custom design tokens. Loaded by every page AFTER the Tailwind Play CDN
   script; the CDN picks up this assignment and compiles utilities
   (bg-deepBlue, text-warmLight, shadow-soft, animate-float, …) with the
   custom values.

   Stage 5 (maintainability): replaces inline config blocks that were
   duplicated (with subtle drift) across index.html, cv.html, blog1.html,
   blog2.html. A palette tweak here now propagates to all four pages.

   The extras below (skyBlue, imageWhite, shadow-soft, animations, keyframes,
   backgroundOpacity 85/75/65) are only referenced by index.html — but
   Tailwind JIT only emits CSS for utilities that appear in the markup, so
   the other pages pay zero CSS bytes for them.

   If you change colors here, also update the matching hex values in:
   - css/style.css (focus rings, scrollbar, tag chips, skip-link) */
tailwind.config = {
    theme: {
        extend: {
            colors: {
                deepBlue: '#213448',
                mutedBlue: '#547792',
                accentBlue: '#94B4C1',
                warmLight: '#EAE0CF',
                paperWhite: '#F9F7F2',
                imageWhite: '#EFF0EA',
                skyBlue: '#A3CEF1',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(33, 52, 72, 0.1)',
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'float': 'float 4s ease-in-out infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            },
            backgroundOpacity: {
                '85': '0.85',
                '75': '0.75',
                '65': '0.65',
            }
        }
    }
};
