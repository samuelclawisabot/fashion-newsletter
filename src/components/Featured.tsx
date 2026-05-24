import ChapterHd from "./ChapterHd";
import ImageSlot from "./ImageSlot";
import { FeaturedItem } from "@/lib/data";

export default function Featured({ featured }: { featured: FeaturedItem }) {
  const F = featured;
  return (
    <section style={{ padding: "var(--section-gap) var(--pad) var(--section-gap)" }}>
      <ChapterHd n="01" label="TODAY'S OBSESSION" accent />

      <h1 className="display" style={{ marginTop: 14 }}>
        The&nbsp;
        <span
          style={{
            fontStyle: "italic",
            textDecoration: "underline",
            textDecorationThickness: "1px",
            textUnderlineOffset: "6px",
            textDecorationColor: "var(--accent)",
          }}
        >
          &lsquo;Whatever&rsquo;
        </span>
        <br /> Cardigan.
      </h1>

      <p className="mono up" style={{ marginTop: 14, color: "var(--ink-3)" }}>
        {F.category} · at{" "}
        <span style={{ color: "var(--ink)" }}>{F.where}</span>
      </p>

      <div style={{ marginTop: 26 }}>
        <ImageSlot
          id="featured-hero"
          ratio="4 / 5"
          tag="HERO · ON-MODEL"
          placeholder="Drop hero shot — model in cardigan, portrait"
          caption="Fig. 01 — the cardigan, photographed mid-yawn."
          captionRight={F.where.toUpperCase()}
        />
      </div>

      <div style={{ marginTop: 56 }}>
        <p className="body dropcap">{F.blurb}</p>
        <p className="lead" style={{ marginTop: 14 }}>{F.why}</p>
      </div>

      <div className="priceCard" style={{ marginTop: 28 }}>
        <div>
          <div className="mono up" style={{ color: "var(--ink-3)" }}>
            price · at {F.where.toLowerCase()}
          </div>
          <div className="pricelg" style={{ marginTop: 8, color: "var(--accent)" }}>
            {F.price}
          </div>
          <div className="body" style={{ marginTop: 6, color: "var(--ink-2)" }}>
            {F.name}, sized loosely.
          </div>
        </div>
        <div className="right">
          <a className="cta accent" href={F.url}>
            See it at {F.where} <span className="arr">→</span>
          </a>
          <span
            className="mono"
            style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".1em" }}
          >
            ships within 1–3 days · free returns
          </span>
        </div>
      </div>
    </section>
  );
}
