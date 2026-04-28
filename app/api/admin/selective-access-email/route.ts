import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

type Payload = {
  toEmail: string;
  name: string;
  dashboard: "basic" | "premium" | "signals";
  requestedBy?: string;
  origin?: string;
};

function label(d: Payload["dashboard"]) {
  if (d === "basic") return "Basic Dashboard";
  if (d === "premium") return "Premium Dashboard";
  return "Signals Dashboard";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Payload>;
    const toEmail = String(body.toEmail ?? "").trim().toLowerCase();
    const name = String(body.name ?? "").trim();
    const dashboard = body.dashboard === "basic" || body.dashboard === "premium" || body.dashboard === "signals"
      ? body.dashboard
      : null;
    const requestedBy = String(body.requestedBy ?? "").trim();
    const origin = String(body.origin ?? "").trim();

    if (!toEmail || !isEmail(toEmail)) {
      return new NextResponse("Valid toEmail is required.", { status: 400 });
    }
    if (!name) {
      return new NextResponse("Name is required.", { status: 400 });
    }
    if (!dashboard) {
      return new NextResponse("Dashboard is required.", { status: 400 });
    }

    const host = mustEnv("SMTP_HOST");
    const portRaw = mustEnv("SMTP_PORT");
    const port = Number(portRaw);
    if (!Number.isFinite(port) || port <= 0) throw new Error("Invalid env var: SMTP_PORT");
    const user = mustEnv("SMTP_USER");
    const pass = mustEnv("SMTP_PASS");
    const fromEmail = process.env.SMTP_FROM ?? user;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const site = origin || "https://rh-traders.vercel.app";
    const loginUrl = `${site}/auth?mode=login&next=/profile`;

    const subject = `[RH Traders] Admin access request: ${label(dashboard)}`;

    await transporter.sendMail({
      from: `"RH Traders" <${fromEmail}>`,
      to: toEmail,
      subject,
      text: [
        `Hi ${name},`,
        "",
        `An admin invited you to access: ${label(dashboard)}.`,
        requestedBy ? `Requested by: ${requestedBy}` : "",
        "",
        `Login to view and accept the request:`,
        loginUrl,
        "",
        "If you didn’t request this, you can ignore this email.",
      ]
        .filter(Boolean)
        .join("\n"),
      html: [
        `<p>Hi <strong>${escapeHtml(name)}</strong>,</p>`,
        `<p>An admin invited you to access: <strong>${escapeHtml(label(dashboard))}</strong>.</p>`,
        requestedBy ? `<p><strong>Requested by:</strong> ${escapeHtml(requestedBy)}</p>` : "",
        `<p><a href="${escapeHtml(loginUrl)}" style="display:inline-block;padding:10px 16px;border-radius:9999px;background:#0ea5e9;color:#fff;text-decoration:none;font-weight:700;">Login to accept</a></p>`,
        `<p style="color:#64748b;font-size:12px;">If you didn’t request this, you can ignore this email.</p>`,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg =
      typeof e === "object" && e && "message" in e
        ? String((e as { message: unknown }).message)
        : "Failed to send selective access email.";
    return new NextResponse(msg, { status: 500 });
  }
}

