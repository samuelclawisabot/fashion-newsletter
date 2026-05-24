"use client";

import { useEffect, useState } from "react";
import Masthead from "@/components/Masthead";
import Featured from "@/components/Featured";
import Interlude from "@/components/Interlude";
import Pieces from "@/components/Pieces";
import TheLook from "@/components/TheLook";
import NewsletterFooter from "@/components/NewsletterFooter";
import TweaksPanel, { TweakValues } from "@/components/TweaksPanel";
import { SAMPLE_DATA } from "@/lib/data";

const DEFAULT_TWEAKS: TweakValues = {
  accent: "#b94a2e",
  density: "regular",
  pieces: 3,
  dark: false,
};

export default function Home() {
  const [tweaks, setTweaks] = useState<TweakValues>(DEFAULT_TWEAKS);
  const [panelOpen, setPanelOpen] = useState(false);

  const setTweak = (key: keyof TweakValues, value: string | number | boolean) => {
    setTweaks((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", tweaks.accent);
  }, [tweaks.accent]);

  useEffect(() => {
    document.body.dataset.pageDark = tweaks.dark ? "1" : "0";
    return () => { document.body.dataset.pageDark = "0"; };
  }, [tweaks.dark]);

  const data = SAMPLE_DATA;
  const pieces = data.pieces.slice(0, tweaks.pieces);

  return (
    <div className="page" data-density={tweaks.density}>
      <header className="pageHd">
        <div>
          <div className="crumb">Hi-Fi · Direction 03 · The Scroll</div>
          <h1>Daily fashion dispatch.</h1>
        </div>
        <div className="meta">
          Email · 640px<br />
          editable image slots<br />
          <button
            onClick={() => setPanelOpen((o) => !o)}
            style={{
              marginTop: 8,
              background: "none",
              border: "1px solid currentColor",
              color: "inherit",
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: 10,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              padding: "4px 10px",
              cursor: "pointer",
              opacity: .8,
            }}
          >
            Tweaks {panelOpen ? "▲" : "▼"}
          </button>
        </div>
      </header>

      <main className="stage">
        <div className="email" data-mode={tweaks.dark ? "dark" : "light"}>
          <Masthead issue={data.issue} />
          <Featured featured={data.featured} />
          <Interlude count={tweaks.pieces} />
          <Pieces pieces={pieces} />
          <TheLook outfit={data.outfit} />
          <NewsletterFooter />
        </div>
      </main>

      <footer className="pageFt">
        <span>fashion newsletter · hi-fi · direction 03 / scroll</span>
        <span>{data.issue.no} · {data.issue.date}</span>
      </footer>

      <TweaksPanel
        values={tweaks}
        onChange={setTweak}
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
      />
    </div>
  );
}
