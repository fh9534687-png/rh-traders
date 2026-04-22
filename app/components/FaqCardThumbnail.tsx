/** Dark premium FAQ thumbnails — navy + electric blue. */
export function FaqCardThumbnail({
  variant,
  title,
  className = "",
}: {
  variant: number;
  title: string;
  className?: string;
}) {
  const v = variant % 9;
  const short =
    title.length > 52 ? `${title.slice(0, 50)}…` : title;

  return (
    <svg
      className={className}
      viewBox="0 0 640 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={`faq-bg-${v}`} x1="0" y1="0" x2="640" y2="280">
          <stop stopColor="#020617" />
          <stop offset="0.45" stopColor="#0f172a" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <linearGradient id={`faq-glow-${v}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#3b82f6" stopOpacity="0.35" />
          <stop offset="1" stopColor="#38bdf8" stopOpacity="0.12" />
        </linearGradient>
        <filter id={`faq-blur-${v}`}>
          <feGaussianBlur stdDeviation="24" />
        </filter>
      </defs>

      <rect width="640" height="280" fill={`url(#faq-bg-${v})`} />
      <circle
        cx="520"
        cy="40"
        r="120"
        fill={`url(#faq-glow-${v})`}
        filter={`url(#faq-blur-${v})`}
        opacity="0.9"
      />
      <circle
        cx="80"
        cy="220"
        r="90"
        fill="#2563eb"
        opacity="0.08"
        filter={`url(#faq-blur-${v})`}
      />

      {/* Grid */}
      <g opacity="0.12" stroke="#94a3b8" strokeWidth="0.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={24 + i * 22} x2="640" y2={24 + i * 22} />
        ))}
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={`v-${i}`} x1={20 + i * 36} y1="56" x2={20 + i * 36} y2="280" />
        ))}
      </g>

      {/* Title strip */}
      <text
        x="320"
        y="34"
        textAnchor="middle"
        fill="#e2e8f0"
        style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em" }}
      >
        {short}
      </text>
      <line x1="48" y1="44" x2="592" y2="44" stroke="#38bdf8" strokeOpacity="0.45" strokeWidth="1" />

      {/* Variant-specific chart art */}
      {v === 0 && <CandlesA />}
      {v === 1 && <LineTrend />}
      {v === 2 && <Platforms markerId={`faq-mk-${v}`} />}
      {v === 3 && <CandlesB />}
      {v === 4 && <SpotFut />}
      {v === 5 && <RiskArc />}
      {v === 6 && <Indicators />}
      {v === 7 && <Shield />}
      {v === 8 && <Roadmap />}
    </svg>
  );
}

function CandlesA() {
  return (
    <g transform="translate(100, 72)">
      {[
        { x: 0, h: 44, up: true },
        { x: 28, h: 32, up: false },
        { x: 56, h: 56, up: true },
        { x: 84, h: 28, up: false },
        { x: 112, h: 48, up: true },
        { x: 140, h: 36, up: true },
        { x: 168, h: 40, up: false },
        { x: 196, h: 52, up: true },
        { x: 224, h: 30, up: false },
        { x: 252, h: 46, up: true },
        { x: 280, h: 38, up: true },
        { x: 308, h: 34, up: false },
        { x: 336, h: 50, up: true },
      ].map((c, i) => {
        const y = 120 - c.h;
        const fill = c.up ? "#38bdf8" : "#64748b";
        const wick = c.up ? "#e9d5ff" : "#94a3b8";
        return (
          <g key={i}>
            <line x1={c.x + 6} y1={y - 8} x2={c.x + 6} y2={y + c.h + 8} stroke={wick} strokeWidth="2" />
            <rect x={c.x} y={y} width="12" height={c.h} rx="1" fill={fill} opacity="0.9" />
          </g>
        );
      })}
      <path
        d="M 96 118 Q 200 88 340 102 T 520 78"
        stroke="#f87171"
        strokeWidth="2"
        fill="none"
        strokeOpacity="0.7"
      />
    </g>
  );
}

function LineTrend() {
  return (
    <g transform="translate(80, 80)">
      <path
        d="M 0 120 L 80 96 L 140 108 L 200 72 L 260 88 L 320 48 L 400 64 L 480 32"
        stroke="#38bdf8"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 0 140 L 120 118 L 220 130 L 340 100 L 480 90"
        stroke="#2563eb"
        strokeWidth="1.5"
        fill="none"
        strokeOpacity="0.5"
        strokeDasharray="6 4"
      />
      <circle cx="480" cy="32" r="6" fill="#38bdf8" />
    </g>
  );
}

function Platforms({ markerId }: { markerId: string }) {
  return (
    <g transform="translate(120, 88)">
      <defs>
        <marker id={markerId} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>
      <rect x="0" y="20" width="120" height="72" rx="8" stroke="#38bdf8" strokeWidth="2" fill="rgba(59,130,246,0.1)" />
      <text x="60" y="58" textAnchor="middle" fill="#e2e8f0" style={{ fontSize: "12px", fontWeight: 700 }}>
        CEX
      </text>
      <rect x="160" y="20" width="120" height="72" rx="8" stroke="#2563eb" strokeWidth="2" fill="rgba(37,99,235,0.12)" />
      <text x="220" y="58" textAnchor="middle" fill="#e2e8f0" style={{ fontSize: "12px", fontWeight: 700 }}>
        DEX
      </text>
      <path d="M 120 56 L 160 56" stroke="#64748b" strokeWidth="2" markerEnd={`url(#${markerId})`} />
    </g>
  );
}

function CandlesB() {
  return (
    <g transform="translate(140, 78)">
      {Array.from({ length: 16 }).map((_, i) => {
        const up = i % 3 !== 0;
        const h = 28 + (i % 5) * 8;
        const y = 130 - h;
        return (
          <g key={i} transform={`translate(${i * 22}, 0)`}>
            <line x1="6" y1={y - 6} x2="6" y2={y + h + 6} stroke={up ? "#f87171" : "#475569"} strokeWidth="1.5" />
            <rect x="0" y={y} width="12" height={h} rx="1" fill={up ? "#ef4444" : "#64748b"} opacity="0.85" />
          </g>
        );
      })}
    </g>
  );
}

function SpotFut() {
  return (
    <g transform="translate(160, 92)">
      <rect x="0" y="0" width="100" height="64" rx="6" stroke="#38bdf8" fill="rgba(59,130,246,0.12)" strokeWidth="1.5" />
      <text x="50" y="38" textAnchor="middle" fill="#f1f5f9" style={{ fontSize: "11px", fontWeight: 700 }}>
        SPOT
      </text>
      <rect x="120" y="0" width="100" height="64" rx="6" stroke="#2563eb" fill="rgba(254,226,226,0.6)" strokeWidth="1.5" />
      <text x="170" y="38" textAnchor="middle" fill="#f1f5f9" style={{ fontSize: "11px", fontWeight: 700 }}>
        FUTURES
      </text>
      <rect x="240" y="0" width="100" height="64" rx="6" stroke="#4ade80" fill="rgba(187,247,208,0.5)" strokeWidth="1.5" />
      <text x="290" y="38" textAnchor="middle" fill="#f1f5f9" style={{ fontSize: "11px", fontWeight: 700 }}>
        MARGIN
      </text>
    </g>
  );
}

function RiskArc() {
  return (
    <g transform="translate(200, 100)">
      <path d="M 20 100 A 120 120 0 0 1 220 100" stroke="#ef4444" strokeOpacity="0.35" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M 40 100 A 100 100 0 0 1 200 100" stroke="#38bdf8" strokeWidth="6" fill="none" strokeLinecap="round" />
      <text x="120" y="88" textAnchor="middle" fill="#f8fafc" style={{ fontSize: "13px", fontWeight: 800 }}>
        RISK
      </text>
    </g>
  );
}

function Indicators() {
  return (
    <g transform="translate(100, 88)">
      <path d="M 0 80 Q 120 40 240 70 T 440 50" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
      <path d="M 0 100 Q 140 120 280 85 T 440 95" stroke="#2563eb" strokeWidth="1.5" fill="none" strokeOpacity="0.6" />
      <circle cx="320" cy="68" r="4" fill="#38bdf8" />
      <text x="220" y="130" textAnchor="middle" fill="#94a3b8" style={{ fontSize: "10px", fontWeight: 600 }}>
        DCA · RSI · MA
      </text>
    </g>
  );
}

function Shield() {
  return (
    <g transform="translate(260, 78)">
      <path
        d="M 60 16 L 108 40 V 92 C 108 124 60 148 60 148 C 60 148 12 124 12 92 V 40 Z"
        stroke="#38bdf8"
        strokeWidth="2"
        fill="rgba(59,130,246,0.14)"
      />
      <path d="M 42 88 L 54 100 L 84 70" stroke="#f87171" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function Roadmap() {
  return (
    <g transform="translate(80, 100)">
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${i * 110}, 0)`}>
          <circle cx="20" cy="40" r="10" fill={i === 3 ? "#38bdf8" : "#1e293b"} stroke="#f87171" strokeWidth="2" />
          {i < 3 && (
            <line x1="32" y1="40" x2="98" y2="40" stroke="#334155" strokeWidth="2" />
          )}
        </g>
      ))}
      <text x="220" y="78" textAnchor="middle" fill="#94a3b8" style={{ fontSize: "10px", fontWeight: 600 }}>
        Learn → Practice → Risk → Pro
      </text>
    </g>
  );
}
