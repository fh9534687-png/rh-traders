"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getLectures, type LectureData } from "../../lib/firebase/firestore";

type Tier = "basic" | "premium";

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      animate={{ rotate: open ? 90 : 0 }}
      transition={{ duration: 0.18 }}
      className="text-slate-400"
    >
      ›
    </motion.span>
  );
}

export function CourseLecturesPage({ tier }: { tier: Tier }) {
  const [items, setItems] = useState<LectureData[]>([]);
  const [loading, setLoading] = useState(true);

  // Start closed; user opens a section explicitly.
  const [openModule, setOpenModule] = useState<string>("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    void (async () => {
      try {
        if (tier === "basic") {
          const basic = await getLectures("basic");
          if (alive) setItems(basic);
        } else {
          const [premium, basic] = await Promise.all([getLectures("premium"), getLectures("basic")]);
          if (alive) setItems([...premium, ...basic].sort((a, b) => b.createdAt - a.createdAt));
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [tier]);

  const grouped = useMemo(() => {
    const map = new Map<string, LectureData[]>();
    for (const l of items) {
      const m = (l.module || "General").trim() || "General";
      map.set(m, [...(map.get(m) ?? []), l]);
    }
    return [...map.entries()]
      .map(([module, list]) => ({
        module,
        list: list.slice().sort((a, b) => b.createdAt - a.createdAt),
      }))
      .sort((a, b) => a.module.localeCompare(b.module));
  }, [items]);

  return (
    <main className="relative flex-1 bg-[#020617] px-5 py-7 sm:py-9">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_-10%,rgba(37,99,235,0.14),transparent_55%)]" />
      <div className="rh-wrap relative max-w-[1280px]">
        <header className="mb-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
            Course content
          </p>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Lectures
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            {tier === "premium"
              ? "Premium can access all Basic + Premium lectures."
              : "Basic can access Basic lectures only."}
          </p>
        </header>

        <section className="overflow-hidden rounded-3xl border border-sky-400/25 bg-slate-900/45 p-5 shadow-[0_0_60px_rgba(37,99,235,0.10)] backdrop-blur-sm sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
              Sections
            </p>
            <p className="rounded-full border border-sky-400/20 bg-slate-900/40 px-3 py-1 text-xs font-extrabold text-slate-300">
              {loading ? "Loading…" : `${items.length} total`}
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {loading ? (
              <div className="rounded-2xl border border-sky-400/15 bg-slate-950/30 px-4 py-4 text-sm text-slate-400">
                Fetching lectures from Firebase…
              </div>
            ) : grouped.length === 0 ? (
              <div className="rounded-2xl border border-sky-400/15 bg-slate-950/30 px-4 py-4 text-sm text-slate-400">
                No lectures uploaded yet. Admin can add them from the admin panel.
              </div>
            ) : (
              grouped.map((g) => {
                const open = openModule === g.module;
                return (
                  <div
                    key={g.module}
                    className="overflow-hidden rounded-3xl border border-sky-400/15 bg-slate-950/25"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenModule((cur) => (cur === g.module ? "" : g.module))}
                      className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-extrabold text-white">{g.module}</p>
                        <p className="mt-1 text-xs font-bold text-slate-500">
                          ({g.list.length}) items
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border border-sky-400/15 bg-slate-950/30 px-3 py-1 text-xs font-extrabold text-slate-200">
                          {g.list.length}
                        </span>
                        <Chevron open={open} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 px-4 pb-4">
                            {g.list.map((l) => (
                              <a
                                key={l.id}
                                href={l.url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between gap-3 rounded-2xl border border-sky-400/10 bg-slate-950/30 px-4 py-3 text-sm font-extrabold text-slate-100 transition hover:bg-slate-900/45"
                              >
                                <span className="min-w-0 truncate">{l.title}</span>
                                <span className="shrink-0 rounded-full border border-sky-400/15 bg-slate-950/30 px-3 py-1 text-xs font-extrabold text-sky-200">
                                  Open →
                                </span>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

