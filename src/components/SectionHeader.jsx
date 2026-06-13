export function SectionHeader({ title, subtitle }) {
  return (
    <div className="sec-header reveal">
      <h2 className="sec-title">{title}</h2>
      <div className="sec-divider">
        <span />
        <span className="diamond" />
        <span />
      </div>
      <p className="sec-sub">{subtitle}</p>
    </div>
  );
}
