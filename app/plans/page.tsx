"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { PricingCard, type PricingPlan } from "../components/PricingCard";
import { setRhPlan } from "../lib/rhEntitlements";

export default function PlansPage() {
  const router = useRouter();

  const plans = useMemo<PricingPlan[]>(
    () => [
      {
        id: "signals",
        title: "Signals Dashboard",
        subtitle: "Live Setups + Execution",
        label: "Signals Plan",
        price: "$35/month",
        duration: "Duration: Monthly",
        description:
          "For traders who want active setups with clear entries, SL/TP, and a professional signal workflow.",
        features: [
          "Active signals (entry, SL, TP)",
          "Signal status tracking",
          "Latest + past signals history",
          "Telegram/WhatsApp contact",
          "Book live session option",
        ],
        buttonText: "Buy Signals",
      },
      {
        id: "basic",
        title: "Basic Course",
        subtitle: "Beginner Friendly",
        label: "Monthly Plan",
        price: "$20/month",
        duration: "Duration: 1 Month",
        description:
          "Perfect for beginners who want to understand how trading works from scratch.",
        features: [
          "Mechanism of Trading",
          "Candlestick Basics",
          "Technical Analysis Basics",
          "Fundamental Analysis Basics",
          "Market Cycle",
          "Market Manipulation",
          "Liquidity",
        ],
        buttonText: "Buy Plan",
      },
      {
        id: "premium",
        title: "Advanced / Premium Course",
        subtitle: "Pro Level Mastery",
        label: "Full Course Access",
        price: "$140",
        duration: "Duration: 2–3 Months (complete mastery path)",
        description:
          "Best for serious learners who want to master crypto trading and earn professionally.",
        features: [
          "Smart Moves of the Market",
          "Trading Psychology",
          "Mindset",
          "Liquidity",
          "Order Flow",
          "FVG & OB",
          "Market Mapping",
          "Scalping Tricks",
          "Market Structure (BOS, CHoCH)",
          "Risk Management",
          "Live Trading Examples",
          "Signals + Mentorship",
        ],
        featured: true,
        buttonText: "Buy Plan",
      },
    ],
    [],
  );

  function onSelect(plan: PricingPlan) {
    setRhPlan(plan.id);
    router.push("/payment");
  }

  return (
    <main className="rh-accent-blue relative flex-1 px-5 py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.12),transparent_58%)]" />

      <div className="rh-wrap relative">
        <header className="mx-auto max-w-[820px] text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Choose a plan for your crypto trading course
          </h1>
          <p className="mt-3 text-base text-slate-400 sm:text-lg">
            RH Traders is a trading platform built for structured learning. Pick a plan to learn trading online
            through guided lessons, a practical dashboard, and (if you choose) trading signals with clear execution notes.
          </p>
        </header>

        <section
          id="rh-pricing"
          className="mx-auto mt-10 grid max-w-[1200px] gap-6 md:grid-cols-2 lg:grid-cols-3"
          aria-labelledby="rh-pricing-heading"
        >
          <h2 id="rh-pricing-heading" className="sr-only">
            Plans and pricing
          </h2>
          {plans.map((plan) => (
            <div key={plan.id}>
              <PricingCard plan={plan} onSelect={onSelect} />
            </div>
          ))}
        </section>

        <section className="mx-auto mt-12 max-w-[820px] text-center">
          <h2 className="text-lg font-extrabold tracking-tight text-white">
            What happens after you choose a plan
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            You will complete a secure checkout and then get access to your dashboard. From there you can open the
            lectures library, follow the course modules in order, and track what you have completed.
          </p>
        </section>
      </div>
    </main>
  );
}

