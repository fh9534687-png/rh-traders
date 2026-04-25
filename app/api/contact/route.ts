import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<ContactPayload>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || name.length < 2) return new NextResponse("Name is required.", { status: 400 });
    if (!email || !isEmail(email)) return new NextResponse("Valid email is required.", { status: 400 });
    if (!subject) return new NextResponse("Subject is required.", { status: 400 });
    if (!message || message.length < 10) {
      return new NextResponse("Message should be at least 10 characters.", { status: 400 });
    }

    const toEmail = "rh6219289@gmail.com";

    // SMTP settings are required for sending email.
    const host = mustEnv("SMTP_HOST");
    const portRaw = mustEnv("SMTP_PORT");
    const port = Number(portRaw);
    if (!Number.isFinite(port) || port <= 0) {
      throw new Error("Invalid env var: SMTP_PORT");
    }
    const user = mustEnv("SMTP_USER");
    const pass = mustEnv("SMTP_PASS");

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const fromEmail = process.env.SMTP_FROM ?? user;

    await transporter.sendMail({
      from: `"RH Traders Contact" <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `[RH Traders] ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        message,
      ].join("\n"),
      html: [
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
        `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>`,
        "<hr/>",
        `<pre style="white-space:pre-wrap;font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${escapeHtml(
          message,
        )}</pre>`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg =
      typeof e === "object" && e && "message" in e
        ? String((e as { message: unknown }).message)
        : "Failed to send message.";
    return new NextResponse(msg, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

