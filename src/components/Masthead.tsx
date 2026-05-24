import { IssueData } from "@/lib/data";

export default function Masthead({ issue }: { issue: IssueData }) {
  return (
    <header style={{ padding: "32px var(--pad) 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 14,
        }}
        className="mono up"
      >
        <span>{issue.vol}</span>
        <span>{issue.no}</span>
        <span>{issue.date}</span>
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "6px 0 18px",
          borderTop: "1px solid var(--hair-strong)",
          borderBottom: "1px solid var(--hair-strong)",
        }}
      >
        <div className="logo" style={{ fontSize: 78, letterSpacing: ".06em" }}>
          BIAS<span style={{ color: "var(--accent)" }}>.</span>
        </div>
        <div className="mono up" style={{ marginTop: 6, color: "var(--ink-3)" }}>
          a daily fashion dispatch · est. mmxxiv
        </div>
      </div>

      <div style={{ padding: "20px 0 6px", textAlign: "center" }}>
        <span className="mono up" style={{ color: "var(--accent)" }}>
          EDITOR&apos;S NOTE
        </span>
        <p className="lead" style={{ margin: "10px auto 0", maxWidth: 460 }}>
          &ldquo;{issue.editorNote}&rdquo;&nbsp; Three pieces, one cardigan that started it,
          and an outfit we are not embarrassed about.{" "}
          <em>Read in roughly five minutes.</em>
        </p>
      </div>
    </header>
  );
}
