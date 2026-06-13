import { LOVE_LETTER } from '../content.js';

export function LoveLetter() {
  return (
    <section id="letter">
      <div className="letter-card reveal">
        <span className="big-quote">&#10077;</span>
        <p className="letter-greeting">{LOVE_LETTER.greeting}</p>
        <div className="letter-body">
          {LOVE_LETTER.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="letter-sig">
          <span className="sig-forever">{LOVE_LETTER.signatureScript}</span>
          <span className="sig-name">{LOVE_LETTER.signatureName}</span>
        </div>
      </div>
    </section>
  );
}
