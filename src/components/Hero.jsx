import { useParallax } from '../hooks/useParallax.js';
import { SITE_CONFIG } from '../content.js';

export function Hero({ daysTogether }) {
  const parallaxRef = useParallax(0.35);

  return (
    <section id="hero">
      <div className="hero-bg" ref={parallaxRef} />
      <div className="hero-orb hero-orb--one" aria-hidden="true" />
      <div className="hero-orb hero-orb--two" aria-hidden="true" />
      <div className="hero-orb hero-orb--three" aria-hidden="true" />

      <p className="hero-eyebrow">{SITE_CONFIG.heroEyebrow}</p>
      <h1 className="hero-name">{SITE_CONFIG.recipientName}</h1>
      <p className="hero-sub">
        {SITE_CONFIG.heroSubtitle[0]}
        <br />
        {SITE_CONFIG.heroSubtitle[1]}
      </p>

      <div className="hero-divider" aria-hidden="true">
        <span />
        <span className="diamond" />
        <span />
      </div>

      <div className="counter-wrap">
        <div className="petal-ring" />
        <p className="counter-eyebrow">Together For</p>
        <div className="counter-num">
          <span>{daysTogether}</span>
          <span className="unit">days</span>
        </div>
        <p className="counter-since">Since {SITE_CONFIG.startDateLabel}</p>
      </div>

      <div className="scroll-cue">
        <span>Scroll to Discover</span>
        <div className="scroll-bar" />
      </div>
    </section>
  );
}
