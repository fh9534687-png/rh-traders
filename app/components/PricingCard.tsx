"use client";

export type PricingPlan = {
  id: "basic" | "premium" | "signals";
  title: string;
  subtitle: string;
  label: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  buttonText: string;
  featured?: boolean;
};

export function PricingCard({
  plan,
  onSelect,
}: {
  plan: PricingPlan;
  onSelect: (plan: PricingPlan) => void;
}) {
  return (
    <article
      className={[
        "rh-card group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 sm:p-8",
        "transition duration-200",
        "hover:-translate-y-0.5",
        plan.featured
          ? "border-sky-400/50 shadow-[0_0_40px_rgba(37,99,235,0.25)]"
          : "",
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-none absolute inset-0 transition-opacity duration-300",
          "bg-[radial-gradient(circle_at_30%_10%,rgba(37,99,235,0.15),transparent_55%)]",
          plan.featured ? "opacity-100" : "opacity-50",
          "group-hover:opacity-100",
        ].join(" ")}
      />

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold tracking-[0.18em] text-slate-500">
              {plan.label.toUpperCase()}
            </p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white">
              {plan.title}
            </h3>
            <p className="mt-2 text-sm font-semibold text-slate-400">
              {plan.subtitle}
            </p>
          </div>
          {plan.featured ? (
            <span className="rounded-full border border-sky-400/50 bg-blue-500/15 px-3 py-1 text-xs font-extrabold tracking-wide text-sky-300">
              Best Value
            </span>
          ) : null}
        </div>

        <div className="mt-5">
          <div className="text-4xl font-extrabold tracking-tight text-white">
            {plan.price}
          </div>
          <p className="mt-2 text-sm text-slate-500">{plan.duration}</p>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            {plan.description}
          </p>
        </div>

        <ul className="mt-6 grid gap-x-8 gap-y-3 text-slate-300 sm:grid-cols-2">
          {plan.features.map((f) => (
            <li key={f} className="flex gap-3">
              <span className="mt-[0.35rem] h-2 w-2 shrink-0 rounded-full bg-[color:var(--rh-accent-bright)] shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <span className="text-sm leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => onSelect(plan)}
          className={[
            "mt-auto w-full rounded px-5 py-3.5 text-base font-extrabold tracking-wide text-white",
            "rh-btn-primary",
            plan.featured ? "shadow-md" : "",
          ].join(" ")}
        >
          {plan.buttonText}
        </button>
      </div>
    </article>
  );
}
