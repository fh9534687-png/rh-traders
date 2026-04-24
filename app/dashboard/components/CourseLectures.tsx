"use client";

import { useEffect, useMemo, useState } from "react";
import { onValue, ref } from "firebase/database";
import { getDb, type CourseLectureRow, type LectureData } from "../../lib/firebase/db";

type Tier = "basic" | "premium";

function isYouTube(url: string) {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url.trim());
}

function getYouTubeEmbedUrl(url: string) {
  const u = url.trim();
  try {
    const parsed = new URL(u);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "").trim();
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

function isVideoFile(url: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url.trim());
}

function LecturePlayer({ url, title }: { url: string; title: string }) {
  if (isYouTube(url)) {
    const embed = getYouTubeEmbedUrl(url);
    if (embed) {
      return (
        <div className="aspect-video overflow-hidden rounded-2xl border border-sky-400/15 bg-black/30">
          <iframe
            className="h-full w-full"
            src={embed}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
  }

  if (isVideoFile(url)) {
    return (
      <div className="overflow-hidden rounded-2xl border border-sky-400/15 bg-black/30">
        <video className="w-full" controls preload="metadata" src={url} />
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-between rounded-2xl border border-sky-400/15 bg-slate-950/30 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-slate-900/40"
    >
      Open video link →
      <span className="text-xs font-extrabold text-slate-500">External</span>
    </a>
  );
}

export function CourseLectures({ tier }: { tier: Tier }) {
  const [items, setItems] = useState<LectureData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDb();
    if (!db) {
      setItems([]);
      setLoading(false);
      return;
    }

    function rowsToLectures(
      plan: "basic" | "premium",
      raw: Record<string, Partial<CourseLectureRow>> | null,
    ): LectureData[] {
      if (!raw) return [];
      return Object.entries(raw)
        .map(([id, r]) => {
          const title = String(r.title ?? "").trim();
          const videoUrl = String(r.videoUrl ?? "").trim();
          const category = String(r.category ?? "General").trim() || "General";
          const createdAt = typeof r.createdAt === "number" ? r.createdAt : 0;
          const zoom = typeof r.zoom === "string" ? r.zoom : undefined;
          return {
            id,
            plan,
            title,
            module: category,
            url: videoUrl,
            zoom,
            createdAt,
          } satisfies LectureData;
        })
        .filter((l) => Boolean(l.title) && Boolean(l.url))
        .sort((a, b) => b.createdAt - a.createdAt);
    }

    let stopped = false;
    let basicRows: LectureData[] = [];
    let premiumRows: LectureData[] = [];

    const unsubscribers: Array<() => void> = [];

    const basicRef = ref(db, "courses/basic");
    unsubscribers.push(
      onValue(
        basicRef,
        (snap) => {
          basicRows = rowsToLectures(
            "basic",
            (snap.exists() ? (snap.val() as Record<string, Partial<CourseLectureRow>>) : null) ??
              null,
          );
          if (stopped) return;
          if (tier === "basic") {
            setItems(basicRows);
          } else {
            setItems([...premiumRows, ...basicRows].sort((a, b) => b.createdAt - a.createdAt));
          }
          setLoading(false);
        },
        () => {
          if (!stopped) setLoading(false);
        },
      ),
    );

    if (tier === "premium") {
      const premiumRef = ref(db, "courses/premium");
      unsubscribers.push(
        onValue(
          premiumRef,
          (snap) => {
            premiumRows = rowsToLectures(
              "premium",
              (snap.exists()
                ? (snap.val() as Record<string, Partial<CourseLectureRow>>)
                : null) ?? null,
            );
            if (stopped) return;
            setItems([...premiumRows, ...basicRows].sort((a, b) => b.createdAt - a.createdAt));
            setLoading(false);
          },
          () => {
            if (!stopped) setLoading(false);
          },
        ),
      );
    }

    return () => {
      stopped = true;
      unsubscribers.forEach((u) => u());
    };
  }, [tier]);

  const grouped = useMemo(() => {
    const map = new Map<string, LectureData[]>();
    for (const l of items) {
      const m = (l.module || "General").trim() || "General";
      map.set(m, [...(map.get(m) ?? []), l]);
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [items]);

  return (
    <div className="rounded-3xl border border-sky-400/20 bg-slate-950/40 p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
            Lectures
          </p>
          <p className="mt-2 text-lg font-extrabold text-white">Video library</p>
          <p className="mt-1 text-sm text-slate-400">
            {tier === "premium"
              ? "Premium can access all Basic + Premium lectures."
              : "Basic can access Basic lectures only."}
          </p>
        </div>
        <p className="rounded-full border border-sky-400/20 bg-slate-900/40 px-3 py-1 text-xs font-extrabold text-slate-300">
          {loading ? "Loading…" : `${items.length} total`}
        </p>
      </div>

      {loading ? (
        <div className="mt-5 rounded-2xl border border-sky-400/15 bg-slate-900/30 px-4 py-4 text-sm text-slate-400">
          Fetching lectures from Firebase…
        </div>
      ) : items.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-sky-400/15 bg-slate-900/30 px-4 py-4 text-sm text-slate-400">
          No lectures uploaded yet. Admin can add them from the admin panel.
        </div>
      ) : (
        <div className="mt-5 space-y-6">
          {grouped.map(([module, list]) => (
            <div key={module}>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                {module}
              </p>
              <div className="mt-3 grid gap-4 lg:grid-cols-2">
                {list
                  .slice()
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .map((l) => (
                    <div
                      key={l.id}
                      className="rounded-3xl border border-sky-400/15 bg-slate-900/25 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-extrabold text-white">
                            {l.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            Module:{" "}
                            <span className="font-semibold text-slate-200">
                              {module}
                            </span>
                          </p>
                        </div>
                        <a
                          href={l.url}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 rounded-full border border-sky-400/15 bg-slate-950/30 px-3 py-1 text-xs font-extrabold text-slate-200 transition hover:bg-slate-900/45"
                        >
                          Open →
                        </a>
                      </div>

                      <div className="mt-4">
                        <LecturePlayer url={l.url} title={l.title} />
                      </div>

                      {l.zoom ? (
                        <div className="mt-4 rounded-2xl border border-sky-400/15 bg-slate-950/30 px-4 py-3">
                          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                            Live / Zoom
                          </p>
                          <a
                            href={l.zoom}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-flex text-sm font-extrabold text-sky-300 hover:text-sky-200"
                          >
                            Join link →
                          </a>
                        </div>
                      ) : null}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

