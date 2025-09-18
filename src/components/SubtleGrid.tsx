export default function SubtleGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.08]"
      style={{
        backgroundImage:
          "url('data:image/svg+xml;utf8," +
          encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
  <defs>
    <pattern id="p" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M32 0H0v32" fill="none" stroke="rgba(11,18,32,0.35)" stroke-width="0.6"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#p)" />
</svg>`) +
          "')",
      }}
    />
  );
}
