export default function LightBlobs() {
  return (
    <>
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(125,211,252,0.55), transparent 60%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(52,211,153,0.45), transparent 60%)" }}
      />
    </>
  );
}
