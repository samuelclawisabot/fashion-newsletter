import ChapterHd from "./ChapterHd";
import ImageSlot from "./ImageSlot";
import { PieceItem } from "@/lib/data";

function PieceImage({ piece, index }: { piece: PieceItem; index: number }) {
  return (
    <ImageSlot
      id={`piece-${index}`}
      ratio="4 / 5"
      tag={`№ ${(index + 2).toString().padStart(2, "0")}`}
      placeholder={`Drop ${piece.category.toLowerCase()}`}
    />
  );
}

function PieceCopy({ piece, index }: { piece: PieceItem; index: number }) {
  const num = (index + 2).toString().padStart(2, "0");
  return (
    <div>
      <div className="pieceNum">
        <span>{num}</span>
        <span className="role">{piece.category}</span>
      </div>
      <h3 className="h2 pieceName">{piece.name}</h3>
      <p className="body" style={{ marginTop: 10 }}>{piece.blurb}</p>
      <div className="pieceMeta">
        <div>
          <div className="mono up" style={{ color: "var(--ink-3)", fontSize: 10 }}>
            at {piece.where}
          </div>
          <div className="price" style={{ marginTop: 4 }}>{piece.price}</div>
        </div>
        <a className="cta ghost" href={piece.url} style={{ padding: "8px 14px" }}>
          View <span className="arr">→</span>
        </a>
      </div>
    </div>
  );
}

export default function Pieces({ pieces }: { pieces: PieceItem[] }) {
  return (
    <section style={{ padding: "var(--section-gap) var(--pad)" }}>
      <ChapterHd n="02" label={`ALSO ON THE TABLE — ${pieces.length} PIECES`} />

      <div style={{ marginTop: 8 }}>
        {pieces.map((p, i) => (
          <article key={i} className={`piece${i % 2 === 1 ? " flipped" : ""}`}>
            {i % 2 === 0 ? (
              <>
                <PieceImage piece={p} index={i} />
                <PieceCopy piece={p} index={i} />
              </>
            ) : (
              <>
                <PieceCopy piece={p} index={i} />
                <PieceImage piece={p} index={i} />
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
