"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

async function sendToAssistant(_prompt: string): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: _prompt }),
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(err?.error || "Failed to get AI response");
  }

  const data = (await res.json()) as { reply?: string };
  return (data.reply || "").trim() || "No response returned.";
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

  const listRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !sending, [input, sending]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  async function onSend() {
    const text = input.trim();
    if (!text || sending) return;

    setSending(true);
    setInput("");

    const userMsg: ChatMessage = {
      id: uid(),
      role: "user",
      content: text,
      createdAt: Date.now(),
    };

    setMessages((m) => [...m, userMsg]);

    try {
      const reply = await sendToAssistant(text);
      const aiMsg: ChatMessage = {
        id: uid(),
        role: "assistant",
        content: reply,
        createdAt: Date.now(),
      };
      setMessages((m) => [...m, aiMsg]);
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Failed to get AI response";
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
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-black text-white">
      <main className="mx-auto max-w-[1000px] px-5 py-12">
        <header className="rh-card rounded-3xl p-6">
          <h1 className="text-balance text-3xl font-black tracking-tight sm:text-4xl">
            Ask Anything About Crypto Trading
          </h1>
          <p className="mt-3 text-lg leading-8 text-white/95">
            Get simple answers about crypto, charts, coins, and trading basics.
          </p>
        </header>

        <section className="rh-card mt-5 overflow-hidden rounded-3xl">
          <div
            ref={listRef}
            className="h-[65vh] min-h-[520px] max-h-[760px] overflow-y-auto scroll-smooth px-6 py-6"
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
                        "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 sm:text-base",
                        "transition",
                        isUser
                          ? "bg-[linear-gradient(90deg,rgba(255,26,26,0.40),rgba(139,0,0,0.40))] border border-[rgba(255,0,0,0.35)] shadow-[0_0_18px_rgba(255,26,26,0.14)]"
                          : "bg-[#151515] border border-white/10 shadow-[0_0_16px_rgba(0,0,0,0.35)]",
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
                  <div className="max-w-[85%] rounded-2xl border border-white/10 bg-[#151515] px-4 py-3 text-sm text-white/90 sm:text-base">
                    Thinking…
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="border-t border-white/10 bg-black/40 px-5 py-4">
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
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-[rgba(255,0,0,0.35)] focus:shadow-[0_0_18px_rgba(255,26,26,0.12)] sm:text-base"
                aria-label="Message input"
              />

              <button
                type="button"
                onClick={onSend}
                disabled={!canSend}
                className={[
                  "h-12 rounded-2xl px-5 text-sm font-extrabold sm:text-base",
                  "transition",
                  canSend
                    ? "rh-btn-primary"
                    : "bg-white/10 text-white/50 border border-white/10 cursor-not-allowed",
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

