"use client";

export function DashboardCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rh-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(37,99,235,0.12),transparent_55%)]" />
      <div className="relative">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-white">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-2 text-sm leading-7 text-slate-400">{subtitle}</p>
            ) : null}
          </div>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
