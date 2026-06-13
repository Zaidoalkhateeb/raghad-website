import { ICONS, REASONS } from '../data.js';

const CALENDAR_ICON = '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>';
const IMAGE_ICON = '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>';
const CLOCK_ICON = '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>';

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
            Built for <em>you</em>,
            <br />
            by me.
          </h2>
          <p className="footer-tagline">
            The whole point of this little place is that it grows.
            <br />
            Add a memory.
          </p>
        </div>

        <div className="footer-col">
          <FooterRow icon={CLOCK_ICON} label="Days together" value={daysTogether} />
          <FooterRow icon={ICONS.sparkle} label="Reasons listed" value={`${REASONS.length} of infinity`} />
          <FooterRow icon={IMAGE_ICON} label="Memories saved" value={memoriesCount} />
        </div>

        <div className="footer-col">
          <FooterRow icon={CALENDAR_ICON} label="Founded" value="Jul 30, 2025" isQuote />
          <FooterRow icon={ICONS.heart} label="Status" value="in love" isQuote />
        </div>
      </div>
    </footer>
  );
}
