"use client";

import { useRef, useState, useCallback, useEffect } from "react";

export interface TweakValues {
  accent: string;
  density: "compact" | "regular" | "spacious";
  pieces: number;
  dark: boolean;
}

const ACCENTS = [
  { value: "#b94a2e", label: "Brick" },
  { value: "#5b6a4a", label: "Olive" },
  { value: "#3a4a6b", label: "Navy" },
  { value: "#a07a2a", label: "Saffron" },
];

const PANEL_STYLE = `
  .twk-panel {
    position: fixed; right: 16px; bottom: 16px; z-index: 9999;
    width: 280px; max-height: calc(100vh - 32px);
    display: flex; flex-direction: column;
    background: rgba(250,249,247,.9); color: #29261b;
    backdrop-filter: blur(24px) saturate(160%);
    border: .5px solid rgba(255,255,255,.6); border-radius: 14px;
    box-shadow: 0 1px 0 rgba(255,255,255,.5) inset, 0 12px 40px rgba(0,0,0,.18);
    font: 11.5px/1.4 ui-sans-serif, system-ui, -apple-system, sans-serif;
    overflow: hidden;
  }
  .twk-hd {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 8px 10px 14px; cursor: move; user-select: none;
  }
  .twk-hd b { font-size: 12px; font-weight: 600; }
  .twk-x {
    appearance: none; border: 0; background: transparent;
    color: rgba(41,38,27,.55); width: 22px; height: 22px;
    border-radius: 6px; cursor: pointer; font-size: 13px;
  }
  .twk-x:hover { background: rgba(0,0,0,.06); color: #29261b; }
  .twk-body {
    padding: 2px 14px 14px; display: flex; flex-direction: column; gap: 10px;
    overflow-y: auto;
  }
  .twk-sect {
    font-size: 10px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase;
    color: rgba(41,38,27,.45); padding: 10px 0 0;
  }
  .twk-row { display: flex; flex-direction: column; gap: 5px; }
  .twk-row-h { flex-direction: row; align-items: center; justify-content: space-between; gap: 10px; }
  .twk-lbl { display: flex; justify-content: space-between; color: rgba(41,38,27,.72); }
  .twk-lbl > span:first-child { font-weight: 500; }
  .twk-val { color: rgba(41,38,27,.5); }
  .twk-slider {
    appearance: none; width: 100%; height: 4px; margin: 6px 0;
    border-radius: 999px; background: rgba(0,0,0,.12); outline: none;
  }
  .twk-slider::-webkit-slider-thumb {
    -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%;
    background: #fff; border: .5px solid rgba(0,0,0,.12); box-shadow: 0 1px 3px rgba(0,0,0,.2);
  }
  .twk-seg {
    position: relative; display: flex; padding: 2px; border-radius: 8px;
    background: rgba(0,0,0,.06); user-select: none;
  }
  .twk-seg-thumb {
    position: absolute; top: 2px; bottom: 2px; border-radius: 6px;
    background: rgba(255,255,255,.9); box-shadow: 0 1px 2px rgba(0,0,0,.12);
    transition: left .15s, width .15s;
  }
  .twk-seg button {
    appearance: none; position: relative; z-index: 1; flex: 1; border: 0;
    background: transparent; color: inherit; font: inherit; font-weight: 500;
    min-height: 22px; border-radius: 6px; cursor: pointer; padding: 4px 6px;
  }
  .twk-toggle {
    position: relative; width: 32px; height: 18px; border: 0; border-radius: 999px;
    background: rgba(0,0,0,.15); transition: background .15s; cursor: pointer; padding: 0;
  }
  .twk-toggle[data-on="1"] { background: #34c759; }
  .twk-toggle i {
    position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; border-radius: 50%;
    background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.25); transition: transform .15s;
  }
  .twk-toggle[data-on="1"] i { transform: translateX(14px); }
  .twk-chips { display: flex; gap: 6px; }
  .twk-chip {
    flex: 1; height: 28px; border: 0; border-radius: 6px; cursor: pointer;
    box-shadow: 0 0 0 .5px rgba(0,0,0,.12);
    transition: transform .12s, box-shadow .12s;
  }
  .twk-chip:hover { transform: translateY(-1px); box-shadow: 0 0 0 .5px rgba(0,0,0,.18), 0 4px 10px rgba(0,0,0,.12); }
  .twk-chip[data-on="1"] { box-shadow: 0 0 0 2px rgba(0,0,0,.85); }
`;

interface TweaksPanelProps {
  values: TweakValues;
  onChange: (key: keyof TweakValues, value: string | number | boolean) => void;
  open: boolean;
  onClose: () => void;
}

function SegRadio({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const idx = Math.max(0, options.indexOf(value));
  const n = options.length;
  return (
    <div className="twk-row">
      <div className="twk-lbl"><span>{label}</span></div>
      <div className="twk-seg">
        <div
          className="twk-seg-thumb"
          style={{
            left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
            width: `calc((100% - 4px) / ${n})`,
          }}
        />
        {options.map((o) => (
          <button key={o} type="button" onClick={() => onChange(o)}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function TweaksPanel({ values, onChange, open, onClose }: TweaksPanelProps) {
  const dragRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 16, y: 16 });

  const clamp = useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    offsetRef.current = {
      x: Math.min(Math.max(16, window.innerWidth - w - 16), offsetRef.current.x),
      y: Math.min(Math.max(16, window.innerHeight - h - 16), offsetRef.current.y),
    };
    panel.style.right = offsetRef.current.x + "px";
    panel.style.bottom = offsetRef.current.y + "px";
  }, []);

  useEffect(() => { if (open) clamp(); }, [open, clamp]);

  const onDragStart = (e: React.MouseEvent) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev: MouseEvent) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clamp();
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  if (!open) return null;

  return (
    <>
      <style>{PANEL_STYLE}</style>
      <div ref={dragRef} className="twk-panel">
        <div className="twk-hd" onMouseDown={onDragStart}>
          <b>Tweaks</b>
          <button className="twk-x" onClick={onClose}>✕</button>
        </div>
        <div className="twk-body">
          <div className="twk-sect">Layout</div>

          <SegRadio
            label="Density"
            value={values.density}
            options={["compact", "regular", "spacious"]}
            onChange={(v) => onChange("density", v)}
          />

          <div className="twk-row">
            <div className="twk-lbl">
              <span>Supporting pieces</span>
              <span className="twk-val">{values.pieces}</span>
            </div>
            <input
              type="range"
              className="twk-slider"
              min={2} max={5} step={1}
              value={values.pieces}
              onChange={(e) => onChange("pieces", Number(e.target.value))}
            />
          </div>

          <div className="twk-sect">Style</div>

          <div className="twk-row">
            <div className="twk-lbl"><span>Accent</span></div>
            <div className="twk-chips">
              {ACCENTS.map((a) => (
                <button
                  key={a.value}
                  type="button"
                  className="twk-chip"
                  data-on={values.accent === a.value ? "1" : "0"}
                  style={{ background: a.value }}
                  title={a.label}
                  onClick={() => onChange("accent", a.value)}
                />
              ))}
            </div>
          </div>

          <div className="twk-row twk-row-h">
            <div className="twk-lbl"><span>Night edition</span></div>
            <button
              type="button"
              className="twk-toggle"
              data-on={values.dark ? "1" : "0"}
              onClick={() => onChange("dark", !values.dark)}
            >
              <i />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
