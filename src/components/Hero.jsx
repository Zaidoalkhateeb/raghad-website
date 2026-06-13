import { useParallax } from '../hooks/useParallax.js';

export function Hero({ daysTogether }) {
  const parallaxRef = useParallax(0.35);

  return (
    <section id="hero">
      <div className="hero-bg" ref={parallaxRef} />
      <div className="hero-orb hero-orb--one" aria-hidden="true" />
      <div className="hero-orb hero-orb--two" aria-hidden="true" />

      <p className="hero-eyebrow">For My Dearest</p>
      <h1 className="hero-name">Raghad</h1>
      <p className="hero-sub">
        To the one who makes every day brighter
        <br />
        and my heart fuller.
      </p>

      <div className="counter-wrap">
        <div className="petal-ring" />
        <p className="counter-eyebrow">Together For</p>
        <div className="counter-num">
          <span>{daysTogether}</span>
          <span className="unit">days</span>
        </div>
        <p className="counter-since">Since July 30, 2025</p>
      </div>

      <div className="scroll-cue">
        <span>Scroll to Discover</span>
        <div className="scroll-bar" />
      </div>
    </section>
  );
}
