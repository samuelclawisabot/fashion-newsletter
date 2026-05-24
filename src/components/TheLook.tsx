import ChapterHd from "./ChapterHd";
import ImageSlot from "./ImageSlot";
import { OutfitData } from "@/lib/data";

export default function TheLook({ outfit }: { outfit: OutfitData }) {
  const items = outfit.items.slice(0, 4);

  return (
    <section
      style={{
        padding: "var(--section-gap) var(--pad) 60px",
        background: "var(--paper-2)",
        borderTop: "1px solid var(--hair)",
      }}
    >
      <ChapterHd n="03" label="THE LOOK — ASSEMBLED" accent />

      <div style={{ marginTop: 14 }}>
        <div className="mono up" style={{ color: "var(--accent)" }}>
          {outfit.name}
        </div>
        <h2 className="h1" style={{ marginTop: 6 }}>
          A long lunch,<br />
          possibly{" "}
          <span style={{ fontStyle: "italic", color: "var(--accent)" }}>into</span>{" "}
          a long evening.
        </h2>
      </div>

      <div style={{ marginTop: 26 }}>
        <ImageSlot
          id="look-hero"
          ratio="3 / 4"
          tag="FULL LOOK"
          placeholder="Drop full-outfit lifestyle shot"
          caption="Fig. 02 — the four items doing the job together."
          captionRight={`${items.length} pieces · 1 mood`}
        />
      </div>

      <div className="lookGrid" style={{ marginTop: 56 }}>
        {items.map((it, i) => (
          <a
            key={i}
            href={it.url ?? "#look-item"}
            className="lookItem"
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
          >
            <ImageSlot
              id={`look-item-${i}`}
              ratio="3 / 4"
              tag={String.fromCharCode(65 + i)}
              placeholder=" "
            />
            <div className="roleline">{it.role}</div>
            <div className="itemname">{it.name}</div>
            <div className="where">at {it.where}</div>
            <div className="lookPrice price">{it.price}</div>
            <div className="view">view →</div>
          </a>
        ))}
      </div>

      <div
        style={{
          marginTop: 36,
          padding: "26px 24px",
          background: "var(--paper)",
          border: "1px solid var(--hair-strong)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -10,
            left: 22,
            background: "var(--paper-2)",
            padding: "0 10px",
            color: "var(--ink-3)",
          }}
          className="mono up"
        >
          why it works
        </div>
        <p className="body" style={{ fontStyle: "italic" }}>
          &ldquo;{outfit.why}&rdquo;
        </p>
        <div
          style={{
            marginTop: 22,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <span className="mono up" style={{ color: "var(--ink-3)" }}>
            shop the whole {outfit.name.toLowerCase()}
          </span>
          <a className="cta accent" href="#shop-look">
            Add all to bag <span className="arr">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
