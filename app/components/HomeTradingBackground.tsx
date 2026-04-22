export function HomeTradingBackground() {
  return (
    <div className="rh-home-anim-bg pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* soft moving gradient blobs */}
      <div className="rh-home-blob rh-home-blob-1" />
      <div className="rh-home-blob rh-home-blob-2" />
      <div className="rh-home-blob rh-home-blob-3" />

      {/* subtle grid + particles */}
      <div className="rh-home-grid" />
      <div className="rh-home-particles" />

      {/* slow scanline */}
      <div className="rh-home-scanline" />
    </div>
  );
}

