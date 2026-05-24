interface ChapterHdProps {
  n: string;
  label: string;
  accent?: boolean;
}

export default function ChapterHd({ n, label, accent }: ChapterHdProps) {
  return (
    <div className="chapter">
      <span className={`num${accent ? " accent" : ""}`}>{n}</span>
      <span className="rule" />
      <span className="label">{label}</span>
    </div>
  );
}
