import { REASONS } from '../data.js';

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
          <div className="footer-row">
            <span>Days together</span>
            <span>{daysTogether}</span>
          </div>
          <div className="footer-row">
            <span>Reasons listed</span>
            <span>{REASONS.length} of infinity</span>
          </div>
          <div className="footer-row">
            <span>Memories saved</span>
            <span>{memoriesCount}</span>
          </div>
        </div>

        <div className="footer-col">
          <div className="footer-row">
            <span>Founded</span>
            <em>Jul 30, 2025</em>
          </div>
          <div className="footer-row">
            <span>Status</span>
            <em>in love</em>
          </div>
        </div>
      </div>
    </footer>
  );
}
