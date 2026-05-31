import { useEffect, useState } from 'react';

interface Certificate {
  title: string;
  issuer: string;
  year: string;
  href?: string;
  inProgress?: boolean;
}

// Notched (cut-corner) card shape — techy, echoes the stagger-testimonials look.
const NOTCH = 'polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 0 100%)';

/**
 * Certificate fan (hydrated client:visible). Horizontal staggered cards, the
 * active one centered + lifted, neighbours rotated and fanned out. Click a side
 * card to centre it. A11y: prev/next buttons, ArrowLeft/Right keys, aria-live.
 * prefers-reduced-motion → static grid. No framer-motion (plain React + CSS).
 */
export default function CertStack({ certificates }: { certificates: Certificate[] }) {
  const n = certificates.length;
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [cardW, setCardW] = useState(330);

  useEffect(() => {
    const mqM = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqW = window.matchMedia('(min-width: 640px)');
    const update = () => { setReduced(mqM.matches); setCardW(mqW.matches ? 330 : 268); };
    update();
    mqM.addEventListener('change', update);
    mqW.addEventListener('change', update);
    return () => { mqM.removeEventListener('change', update); mqW.removeEventListener('change', update); };
  }, []);

  const go = (dir: number) => setActive((a) => (a + dir + n) % n);
  const half = Math.floor(n / 2);

  // Reduced-motion / robust fallback: static grid, all cards visible.
  if (reduced) {
    return (
      <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
        {certificates.map((c) => (
          <li key={c.title} className="bg-base p-6">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-crimson-link">{c.inProgress ? 'In progress' : c.issuer}</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">{c.title}</h3>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-mono text-xs text-muted">{c.inProgress ? 'Credential pending' : c.year}</span>
              {c.href && (
                <a href={c.href} target="_blank" rel="noopener" className="font-mono text-xs text-crimson-link underline underline-offset-4">View credential →</a>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Certificates and awards"
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      }}
    >
      <div className="relative mx-auto h-[340px]" style={{ maxWidth: cardW }}>
        {certificates.map((c, i) => {
          let pos = i - active;
          if (pos > half) pos -= n;
          if (pos < -half) pos += n;
          const center = pos === 0;
          const wip = !!c.inProgress;
          const lit = center && !wip; // crimson "achieved" highlight only for earned certs
          return (
            <article
              key={c.title}
              aria-hidden={!center}
              onClick={() => !center && setActive(i)}
              className={`absolute left-1/2 top-1/2 flex flex-col justify-between p-6 transition-all duration-500 ease-out ${
                lit ? 'bg-crimson-dark text-ink' : 'cursor-pointer bg-card text-ink hover:bg-elevated'
              }`}
              style={{
                width: cardW,
                height: 300,
                clipPath: NOTCH,
                zIndex: n - Math.abs(pos),
                transform: `translate(-50%, -50%) translateX(${pos * (cardW / 1.7)}px) translateY(${center ? -22 : pos % 2 ? 14 : -14}px) rotate(${center ? 0 : pos % 2 ? 2.5 : -2.5}deg)`,
                boxShadow: lit ? '0 24px 70px -22px rgba(215,38,61,0.6)' : 'none',
                border: lit ? 'none' : wip ? '1px dashed var(--color-line-strong)' : '1px solid var(--color-line)',
              }}
            >
              <p className={`font-mono text-xs uppercase tracking-[0.14em] ${lit ? 'text-ink/80' : 'text-crimson-link'}`}>
                {wip ? 'In progress' : c.issuer}
              </p>
              <h3 className="text-2xl font-semibold leading-tight tracking-tight">{c.title}</h3>
              <div className="flex items-end justify-between">
                <span className={`font-mono text-xs ${lit ? 'text-ink/70' : 'text-muted'}`}>{wip ? 'Credential pending' : c.year}</span>
                {c.href && (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener"
                    tabIndex={center ? 0 : -1}
                    className={`font-mono text-xs underline underline-offset-4 ${lit ? 'text-ink hover:text-ink/80' : 'text-crimson-link'}`}
                  >
                    View credential →
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous certificate"
          className="flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:border-crimson hover:text-crimson"
        >
          <span aria-hidden="true">←</span>
        </button>
        <span className="font-mono text-xs text-muted">
          {String(active + 1).padStart(2, '0')} <span className="text-faint">/</span> {String(n).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next certificate"
          className="flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:border-crimson hover:text-crimson"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        {`Certificate ${active + 1} of ${n}: ${certificates[active].title}, ${certificates[active].issuer}`}
      </p>
    </div>
  );
}
