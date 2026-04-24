"use client";

import { useEffect, useMemo, useState } from "react";
import { getLectures, type LectureData, type Plan } from "../lib/firebase/firestore";

type CoursePlan = Exclude<Plan, "signals">;

function getCookie(name: string) {
  const key = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split(";").map((p) => p.trim());
  const hit = parts.find((p) => p.startsWith(key));
  if (!hit) return null;
  return decodeURIComponent(hit.slice(key.length));
}

export function LifetimeLectures() {
  const [items, setItems] = useState<LectureData[]>([]);

  useEffect(() => {
    void (async () => {
      const raw = (getCookie("rh_plan") ?? "basic").trim();
      const plan: CoursePlan = raw === "premium" ? "premium" : "basic";
      setItems(await getLectures(plan));
    })();
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, LectureData[]>();
    for (const l of items) {
      const key = l.module || "General";
      map.set(key, [...(map.get(key) ?? []), l]);
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [items]);

  return (
    <div className="rounded-3xl border border-sky-400/20 bg-slate-950/40 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
            Lifetime access
          </p>
          <p className="mt-2 text-lg font-extrabold text-white">Saved lectures</p>
          <p className="mt-1 text-sm text-slate-400">
            Lectures you saved will appear here for quick access.
          </p>
        </div>
        <p className="rounded-full border border-sky-400/20 bg-slate-900/40 px-3 py-1 text-xs font-extrabold text-slate-300">
          {items.length} total
        </p>
      </div>

      {items.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-sky-400/15 bg-slate-900/30 px-4 py-4 text-sm text-slate-400">
          No saved lectures yet. Admin-added lectures will show here once you refresh.
        </div>
      ) : (
        <div className="mt-5 space-y-5">
          {grouped.map(([module, list]) => (
            <div key={module}>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                {module}
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {list
                  .slice()
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .map((l) => (
                    <a
                      key={l.id}
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-2xl border border-sky-400/15 bg-slate-900/40 px-4 py-3 transition hover:border-sky-400/30 hover:bg-slate-900/55"
                    >
                      <p className="text-sm font-extrabold text-white">{l.title}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {l.zoom ? "Zoom/Meeting included" : "Video link"}
                      </p>
                      <p className="mt-2 text-xs font-extrabold text-[color:var(--rh-red)] group-hover:text-[color:var(--rh-red-hover)]">
                        Open →
                      </p>
                    </a>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

