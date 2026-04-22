import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import type { FaqItem } from "../../../data/faqData";
import { FaqCardThumbnail } from "../../components/FaqCardThumbnail";

const h2Base = "font-[Georgia,Times_New_Roman,Times,serif] text-2xl font-bold tracking-tight text-white";

export function FaqSectionH2({ children, className = "mt-10" }: { children: ReactNode; className?: string }) {
  return <h2 className={`${h2Base} ${className}`}>{children}</h2>;
}

export function FaqArticleShell({
  item,
  intro,
  imagePriority = false,
  children,
}: {
  item: FaqItem;
  intro: string;
  imagePriority?: boolean;
  children: ReactNode;
}) {
  return (
    <main className="relative flex-1 px-5 py-14">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#03045e_0%,#023e8a_18%,#0077b6_36%,#0096c7_52%,#00b4d8_66%,#48cae4_78%,#90e0ef_88%,#ade8f4_94%,#caf0f8_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(2,6,23,0.55),rgba(2,6,23,0.92)_62%)]" />

      <article className="rh-wrap relative mx-auto max-w-[860px]">
        <Link
          href="/faq"
          className="text-sm font-semibold text-[color:var(--rh-border-red)] transition hover:text-sky-300"
        >
          ← Back to FAQ
        </Link>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--rh-border-red)]">
          RH Academy · FAQ
        </p>
        <h1 className="mt-3 text-balance font-[Georgia,Times_New_Roman,Times,serif] text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.35rem]">
          {item.title}
        </h1>
        <p className="mt-4 max-w-3xl text-pretty text-base leading-8 text-slate-200/90 sm:text-lg">{intro}</p>

        <div className="relative mt-10 aspect-[2.15/1] w-full overflow-hidden rounded-2xl border-2 border-sky-400/30 bg-slate-950/50 shadow-[0_0_50px_rgba(56,189,248,0.14)]">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 900px) 100vw, 860px"
              className="object-cover object-center"
              priority={imagePriority}
            />
          ) : (
            <FaqCardThumbnail
              variant={item.thumbVariant}
              title={item.title}
              className="absolute inset-0 h-full w-full [shape-rendering:geometricPrecision]"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617]/85 via-transparent to-transparent" />
        </div>

        <div className="mt-12 space-y-6 text-base leading-8 text-slate-200/95">
          {children}
        </div>
      </article>
    </main>
  );
}

export function FaqFigure({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border-2 border-sky-400/25 bg-slate-950/50 p-4 shadow-[0_0_40px_rgba(56,189,248,0.12)]">
      <figcaption className="mb-3 text-sm font-extrabold text-white/90">{title}</figcaption>
      {children}
      {caption ? <p className="mt-3 text-sm leading-6 text-white/75">{caption}</p> : null}
    </figure>
  );
}

export function FaqCallout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border-2 border-sky-400/25 bg-slate-950/45 p-6">
      <h2 className="font-[Georgia,Times_New_Roman,Times,serif] text-xl font-bold text-white">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
