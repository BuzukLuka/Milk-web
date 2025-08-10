// A simple SVG wave that inherits currentColor.
// Use className to set height and color via Tailwind (text-*).
export function MilkWave({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden
      style={{ display: "block", width: "100%", height: "60px" }}
    >
      <path
        d="M0,80 C240,120 480,0 720,40 C960,80 1200,20 1440,60 L1440,120 L0,120 Z"
        fill="currentColor"
      />
    </svg>
  );
}
