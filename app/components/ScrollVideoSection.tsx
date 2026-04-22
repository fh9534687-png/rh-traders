"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/** Seconds — drives on-screen caption + plan highlights (same clock as video) */
const TIMELINE = [
  { time: 0, text: "Start your crypto trading journey with confidence." },
  { time: 5, text: "Learn the mechanism of trading and candlestick patterns." },
  { time: 10, text: "Understand technical and fundamental analysis." },
  { time: 15, text: "Explore market cycles, manipulation, and liquidity." },
  { time: 22, text: "Upgrade to premium for advanced strategies." },
  { time: 28, text: "Psychology, mindset, liquidity, and order flow." },
  { time: 35, text: "FVG, order blocks, market mapping, and scalping." },
  { time: 45, text: "Get signals and mentorship." },
  { time: 52, text: "Choose your plan and start today." },
] as const;

const BASIC_FEATURES = [
  "Mechanism of Trading",
  "Candlestick Patterns",
  "Technical Analysis Basics",
  "Fundamental Analysis Basics",
  "Market Cycles",
  "Market Manipulation",
  "Liquidity Basics",
] as const;

const PREMIUM_FEATURES = [
  "Smart Moves of the Market",
  "Trading Psychology",
  "Mindset",
  "Liquidity",
  "Order Flow",
  "FVG & OB",
  "Market Mapping",
  "Scalping Tricks",
  "Market Structure (BOS, CHoCH)",
  "Risk Management",
  "Live Trading Practice",
  "Signals + Mentorship",
] as const;

/** One continuous script — no gaps between lines (single TTS utterance) */
const FULL_NARRATION = TIMELINE.map((e) => e.text).join(" ");

const PROMO_DURATION_SEC = 60;

function activeTimelineIndex(t: number): number {
  let idx = 0;
  for (let i = 0; i < TIMELINE.length; i++) {
    if (t >= TIMELINE[i].time) idx = i;
    else break;
  }
  return idx;
}

export function ScrollVideoSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [inView, setInView] = useState(false);
  const [videoOk, setVideoOk] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [showCta, setShowCta] = useState(false);

  const syntheticStartRef = useRef<number | null>(null);
  const prevTimeRef = useRef(0);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lineIdxRef = useRef(0);
  const showCtaRef = useRef(false);
  const narrationStartedRef = useRef(false);

  const timeline = useMemo(() => TIMELINE, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (!inView) {
      v.pause();
      return;
    }
    void v.play().catch(() => {});
  }, [inView]);

  /** Continuous voice once per visit (no per-line cancel → no 6s dead air) */
  useEffect(() => {
    if (!inView) {
      narrationStartedRef.current = false;
      if (typeof window !== "undefined") {
        window.speechSynthesis?.cancel?.();
      }
      return;
    }

    if (narrationStartedRef.current) return;
    narrationStartedRef.current = true;

    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(FULL_NARRATION);
      u.rate = 1.02;
      u.pitch = 1;
      u.volume = 1;
      window.speechSynthesis.speak(u);
    } catch {
      // ignore
    }
  }, [inView]);

  useEffect(() => {
    if (!inView) {
      syntheticStartRef.current = null;
      prevTimeRef.current = 0;
      setLineIdx(0);
      lineIdxRef.current = 0;
      setShowCta(false);
      showCtaRef.current = false;
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
      return;
    }

    syntheticStartRef.current = performance.now();
    let raf = 0;

    const tick = () => {
      const v = videoRef.current;
      let t = 0;

      if (videoOk && v && v.readyState >= 2) {
        t = v.currentTime;
        const dur = v.duration;
        if (Number.isFinite(dur) && dur > 0) {
          const cycle = Math.min(PROMO_DURATION_SEC, dur);
          t = ((t % cycle) + cycle) % cycle;
        } else {
          t = ((t % PROMO_DURATION_SEC) + PROMO_DURATION_SEC) % PROMO_DURATION_SEC;
        }
      } else {
        const start = syntheticStartRef.current ?? performance.now();
        syntheticStartRef.current = start;
        t = ((performance.now() - start) / 1000) % PROMO_DURATION_SEC;
      }

      prevTimeRef.current = t;

      const nextIdx = activeTimelineIndex(t);
      const ctaOn = t >= 52;
      if (ctaOn !== showCtaRef.current) {
        showCtaRef.current = ctaOn;
        setShowCta(ctaOn);
      }

      if (nextIdx !== lineIdxRef.current) {
        lineIdxRef.current = nextIdx;
        setLineIdx(nextIdx);
        setTextVisible(false);
        if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = setTimeout(() => setTextVisible(true), 280);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [inView, videoOk]);

  function scrollToPricing() {
    if (typeof window === "undefined") return;
    document.getElementById("rh-pricing")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  const activeText = timeline[lineIdx]?.text ?? timeline[0].text;
  /** Basic: intro lines; Premium: upgrade section; CTA: both glow */
  const focusCta = lineIdx >= 8;
  const focusBasic = lineIdx <= 3 || focusCta;
  const focusPremium = (lineIdx >= 4 && lineIdx <= 7) || focusCta;

  return (
    <div className="relative mt-16 w-full px-5">
      <div className="rh-wrap">
        <section
          ref={(n) => {
            containerRef.current = n;
          }}
          className={[
            "mx-auto w-full max-w-[1100px] overflow-hidden rounded-[20px] bg-black",
            "border-[4px] border-white",
            "shadow-[0_0_50px_rgba(255,26,26,0.35),0_0_120px_rgba(255,26,26,0.08)]",
            "min-h-[70vh]",
            "rh-vid-fade-in",
            inView ? "is-inview" : "",
          ].join(" ")}
        >
          <div className="relative min-h-[70vh]">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              muted
              playsInline
              loop
              preload="auto"
              poster="/charts/candles.svg"
              onLoadedData={() => setVideoOk(true)}
              onCanPlay={() => setVideoOk(true)}
              onError={() => setVideoOk(false)}
            >
              <source src="/videos/trading.mp4" type="video/mp4" />
              <source src="/videos/rh-traders-loop.mp4" type="video/mp4" />
            </video>

            {!videoOk ? (
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                aria-hidden
              >
                <div className="absolute inset-0 rh-chart-pan">
                  <svg viewBox="0 0 1200 675" className="h-full w-full">
                    <defs>
                      <linearGradient id="rhVidLine" x1="0" y1="0" x2="1200" y2="0">
                        <stop stopColor="#2563eb" stopOpacity="0.15" />
                        <stop offset="1" stopColor="#3b82f6" stopOpacity="0.85" />
                      </linearGradient>
                    </defs>
                    {Array.from({ length: 24 }).map((_, i) => {
                      const x = 40 + i * 48;
                      const up = i % 3 !== 0;
                      return (
                        <g key={i}>
                          <rect
                            x={x}
                            y={400 - (i % 7) * 28}
                            width="10"
                            height={80 + (i % 5) * 12}
                            rx="3"
                            fill={
                              up ? "rgba(255,255,255,0.12)" : "rgba(255,26,26,0.2)"
                            }
                          />
                        </g>
                      );
                    })}
                    <path
                      d="M40 520 C 200 380, 400 420, 600 300 C 820 170, 980 240, 1160 140"
                      stroke="url(#rhVidLine)"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            ) : null}

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.62),rgba(0,0,0,0.92))]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,26,26,0.14),transparent_55%)]" />

            <div className="relative flex min-h-[70vh] flex-col justify-center px-4 py-8 sm:px-8 sm:py-10">
              <p className="text-center text-[10px] font-extrabold tracking-[0.22em] text-white/55 sm:text-xs">
                RH TRADERS • VIDEO GUIDE
              </p>

              {/* Current line — synced to video / clock */}
              <div
                className={[
                  "mx-auto mt-4 max-w-[920px] text-center transition-all duration-[400ms] ease-out",
                  textVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0",
                ].join(" ")}
              >
                <p
                  key={lineIdx}
                  className="text-balance text-lg font-extrabold leading-snug text-[#ffffff] sm:text-xl md:text-2xl lg:text-3xl"
                  style={{
                    textShadow:
                      "0 2px 20px rgba(0,0,0,0.95), 0 0 36px rgba(0,0,0,0.55)",
                  }}
                >
                  {activeText}
                </p>
              </div>

              {/* Plan lists — always visible while guide plays */}
              <div className="mx-auto mt-8 grid w-full max-w-[980px] gap-4 md:grid-cols-2 md:gap-5">
                <div
                  className={[
                    "rounded-2xl border-[3px] border-sky-500/40 bg-black/45 px-4 py-4 backdrop-blur-sm sm:px-5 sm:py-5",
                    "transition duration-500",
                    focusBasic
                      ? "border-[color:var(--rh-red)] shadow-[0_4px_24px_rgba(255,140,0,0.25)] opacity-100"
                      : "opacity-80",
                  ].join(" ")}
                >
                  <p className="text-center text-sm font-extrabold text-[color:var(--rh-red)] sm:text-base">
                    Basic Course (Beginner)
                  </p>
                  <ul className="mt-3 space-y-2 text-left text-xs text-[#ffffff] sm:text-sm">
                    {BASIC_FEATURES.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--rh-red)]" />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={[
                    "rounded-2xl border-[3px] border-sky-500/40 bg-black/45 px-4 py-4 backdrop-blur-sm sm:px-5 sm:py-5",
                    "transition duration-500",
                    focusPremium
                      ? "border-[color:var(--rh-red)] shadow-[0_4px_24px_rgba(255,140,0,0.25)] opacity-100"
                      : "opacity-80",
                  ].join(" ")}
                >
                  <p className="text-center text-sm font-extrabold text-[color:var(--rh-red)] sm:text-base">
                    Premium Course (Advanced)
                  </p>
                  <ul className="mt-3 space-y-2 text-left text-xs text-[#ffffff] sm:text-sm">
                    {PREMIUM_FEATURES.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--rh-red)]" />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {showCta ? (
                <div className="mt-8 flex justify-center animate-[rh-fade-up_600ms_both]">
                  <button
                    type="button"
                    onClick={scrollToPricing}
                    className="rh-btn-primary inline-flex items-center justify-center rounded-full px-10 py-3.5 text-sm font-extrabold text-white sm:text-base"
                  >
                    Choose Your Plan
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
