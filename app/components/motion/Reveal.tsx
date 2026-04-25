"use client";

export function Reveal({
  children,
  // Kept for API compatibility across the app (motion disabled).
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delay = 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  y = 18,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scale = 0.98,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  scale?: number;
  className?: string;
}) {
  // Render immediately to avoid "empty space" and scroll-based reveal jank.
  return <div className={className}>{children}</div>;
}

