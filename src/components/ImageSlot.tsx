"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";

interface ImageSlotProps {
  id: string;
  ratio?: string;
  tag?: string;
  placeholder?: string;
  caption?: string;
  captionRight?: string;
  height?: string;
  src?: string;
}

export default function ImageSlot({
  ratio = "4 / 5",
  tag,
  placeholder = "Drop image",
  caption,
  captionRight,
  height,
  src,
}: ImageSlotProps) {
  const [imageSrc, setImageSrc] = useState<string | undefined>(src);
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    }
  };

  const style: React.CSSProperties = height
    ? { height }
    : { aspectRatio: ratio };

  return (
    <div className="slotWrap">
      <div
        className="imgSlot"
        style={{
          ...style,
          width: "100%",
          outline: over ? "2px solid var(--accent)" : undefined,
        }}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={handleDrop}
        onClick={() => !imageSrc && inputRef.current?.click()}
      >
        {imageSrc ? (
          <img src={imageSrc} alt={placeholder} />
        ) : (
          <>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
            <span style={{ maxWidth: "80%", textAlign: "center" }}>{placeholder}</span>
          </>
        )}
        {tag && <span className="imgSlotTag">{tag}</span>}
        <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleChange} />
      </div>
      {(caption || captionRight) && (
        <div className="slotCap">
          <em>{caption}</em>
          <span>{captionRight}</span>
        </div>
      )}
    </div>
  );
}
