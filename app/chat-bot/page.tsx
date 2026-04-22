"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Role = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
};

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

async function sendToAssistant(prompt: string): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: prompt }),
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(err?.error || "Failed to get response");
  }

  const data = (await res.json()) as { reply?: string };
  return (data.reply ?? "").trim() || "No reply.";
}

export default function ChatBotPage() {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: uid(),
      role: "assistant",
      content:
        "Ask me anything about crypto trading. I can explain coins, charts, patterns, indicators, and risk management in simple language.",
      createdAt: Date.now(),
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  const canSend = input.trim().length > 0 && !sending;

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, sending]);

  const onSend = useCallback(async () => {
    const text = input.trim();
    if (!text || sending) return;

    const userMsg: ChatMessage = {
      id: uid(),
      role: "user",
      content: text,
      createdAt: Date.now(),
    };
    setInput("");
    setMessages((m) => [...m, userMsg]);
    setSending(true);

    try {
      const reply = await sendToAssistant(text);
      setMessages((m) => [
        ...m,
        {
          id: uid(),
          role: "assistant",
          content: reply,
          createdAt: Date.now(),
        },
      ]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Request failed";
      setMessages((m) => [
        ...m,
        {
          id: uid(),
          role: "assistant",
          content: `Error: ${msg}`,
          createdAt: Date.now(),
        },
      ]);
    } finally {
      setSending(false);
    }
  }, [input, sending]);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#020617] text-slate-100">
      <main className="mx-auto max-w-[1000px] px-5 py-12">
        <header className="rh-card rounded-3xl p-6">
          <h1 className="text-balance text-3xl font-black tracking-tight text-white sm:text-4xl">
            Ask Anything About Crypto Trading
          </h1>
          <p className="mt-3 text-lg leading-8 text-slate-400">
            Get simple answers about crypto, charts, coins, and trading basics.
          </p>
        </header>

        <section className="rh-card mt-5 overflow-hidden rounded-3xl">
          <div
            ref={listRef}
            className="h-[65vh] min-h-[520px] max-h-[760px] overflow-y-auto scroll-smooth bg-slate-950/50 px-6 py-6"
            aria-label="Chat messages"
          >
            <div className="space-y-4">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={msg.id}
                    className={[
                      "flex w-full",
                      isUser ? "justify-end" : "justify-start",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "max-w-[85%] rounded-xl px-4 py-3 text-sm leading-7 sm:text-base",
                        "transition",
                        isUser
                          ? "border border-sky-400/40 bg-blue-600/20 text-slate-100 shadow-[0_0_20px_rgba(37,99,235,0.15)]"
                          : "border border-slate-700/80 bg-slate-900/80 text-slate-300 shadow-md",
                      ].join(" ")}
                      style={{ animation: "rh-fade-up 420ms both" }}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}

              {sending ? (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-500 sm:text-base">
                    Thinking…
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="border-t border-sky-500/15 bg-slate-950/80 px-5 py-4">
            <div className="flex items-center gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSend();
                  }
                }}
                placeholder="Ask a question about crypto..."
                className="h-12 w-full rounded border border-sky-500/25 bg-slate-950/90 px-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-400/50 focus:shadow-[0_0_0_2px_rgba(56,189,248,0.15)] sm:text-base"
                aria-label="Message input"
              />

              <button
                type="button"
                onClick={onSend}
                disabled={!canSend}
                className={[
                  "h-12 rounded px-5 text-sm font-extrabold sm:text-base",
                  "transition",
                  canSend
                    ? "rh-btn-primary text-white"
                    : "cursor-not-allowed border border-slate-700 bg-slate-900 text-slate-600",
                ].join(" ")}
                aria-label="Send message"
              >
                Send
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
