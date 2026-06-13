import { ICONS, REASONS } from '../data.js';
import { SectionHeader } from './SectionHeader.jsx';

export function Reasons() {
  return (
    <section id="reasons">
      <SectionHeader title="Reasons I Love You" subtitle="Though a thousand more would still fall short." />

      <div className="reasons-grid">
        {REASONS.map((reason, index) => (
          <div
            className="rc reveal"
            key={reason.title}
            style={{ transitionDelay: `${(index % 4) * 0.08}s` }}
          >
            <div className="rc-icon">
              <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICONS[reason.icon] }} />
            </div>
            <h3 className="rc-title">{reason.title}</h3>
            <p className="rc-desc">{reason.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
