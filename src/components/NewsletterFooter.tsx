export default function NewsletterFooter() {
  return (
    <footer className="emailFooter">
      <div className="mark">
        BIAS<span style={{ color: "var(--accent)" }}>.</span>
      </div>
      <div className="tease">
        Tomorrow: the t-shirt argument we shouldn&apos;t be having again.
      </div>
      <div className="links">
        <a href="#archive">archive</a> ·{" "}
        <a href="#prefs">prefs</a> ·{" "}
        <a href="#forward">forward</a> ·{" "}
        <a href="#unsub">unsubscribe</a>
      </div>
      <div
        className="mono"
        style={{
          marginTop: 14,
          fontSize: 9.5,
          color: "var(--ink-3)",
          letterSpacing: ".12em",
          textTransform: "uppercase",
        }}
      >
        you&apos;re reading because you signed up at bias.daily · we contain
        affiliate links · they don&apos;t influence what we pick
      </div>
    </footer>
  );
}
