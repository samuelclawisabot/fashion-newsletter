export default function Interlude({ count }: { count: number }) {
  return (
    <div className="interlude">
      <div className="glyph">§</div>
      <div className="txt">
        and <em>{count}</em> further pieces, none of them sponsored.
      </div>
    </div>
  );
}
