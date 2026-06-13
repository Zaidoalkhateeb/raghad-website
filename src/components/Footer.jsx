import { ICONS } from '../data.js';
import { FOOTER_CONTENT, REASONS, SITE_CONFIG } from '../content.js';

function FooterRow({ icon, label, value, isQuote }) {
  return (
    <div className="footer-row">
      <span className="footer-row-label">
        <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: icon }} />
        {label}
      </span>
      {isQuote ? <em>{value}</em> : <span>{value}</span>}
    </div>
  );
}

export function Footer({ daysTogether, memoriesCount }) {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-left">
          <h2 className="footer-headline">
            {FOOTER_CONTENT.headlineBefore}
            <em>{FOOTER_CONTENT.headlineEmphasis}</em>
            {FOOTER_CONTENT.headlineAfter}
            <br />
            {FOOTER_CONTENT.headlineLine2}
          </h2>
          <p className="footer-tagline">
            {FOOTER_CONTENT.tagline[0]}
            <br />
            {FOOTER_CONTENT.tagline[1]}
          </p>
        </div>

        <div className="footer-col">
          <FooterRow icon={ICONS.clock} label="Days together" value={daysTogether} />
          <FooterRow icon={ICONS.sparkle} label="Reasons listed" value={`${REASONS.length} of infinity`} />
          <FooterRow icon={ICONS.image} label="Memories saved" value={memoriesCount} />
        </div>

        <div className="footer-col">
          <FooterRow icon={ICONS.calendar} label="Founded" value={SITE_CONFIG.founded} isQuote />
          <FooterRow icon={ICONS.heart} label="Status" value={SITE_CONFIG.status} isQuote />
        </div>
      </div>
    </footer>
  );
}
