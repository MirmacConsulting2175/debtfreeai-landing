// app/page.tsx
import Link from "next/link";
import FreePlanComparison from "@/components/FreePlanComparison";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-slate-900" aria-hidden />
            <span className="font-semibold tracking-tight">DebtfreeAI</span>
          </div>
          <nav className="flex items-center gap-3">
            <a href="#how" className="text-sm text-slate-600 hover:text-slate-900">How it works</a>
            <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900">Pricing</a>
            <Link
              href="/onboarding"
              className="rounded-xl border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
            >
              Sign in / Start
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">
              Your federal student loan strategy, structured.
            </h1>
            <p className="mt-4 max-w-prose text-lg text-slate-600">
              Compare SAVE vs IBR vs Standard in minutes. Get a calm, personalized projection,
              deadline tracking, and a plan you can trust.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#calculator"
                className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
              >
                Run free comparison
              </a>
              <a
                href="#how"
                className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                See how it works
              </a>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="font-medium text-slate-900">Clarity</div>
                <div className="mt-1">Side-by-side plan comparisons.</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="font-medium text-slate-900">Automation</div>
                <div className="mt-1">Recertification + deadline tracking.</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="font-medium text-slate-900">Confidence</div>
                <div className="mt-1">Explainable projections, not guesswork.</div>
              </div>
            </div>
          </div>

          {/* Calm “OS dashboard” preview */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-slate-900">Strategy Overview</div>
              <div className="text-xs text-slate-500">Preview</div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-4">
                <div className="text-xs text-slate-500">Recommended plan</div>
                <div className="mt-1 text-lg font-semibold">SAVE (preview)</div>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <div className="text-xs text-slate-500">Recertification</div>
                <div className="mt-1 text-lg font-semibold">92 days</div>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <div className="text-xs text-slate-500">Forgiveness progress</div>
                <div className="mt-1 text-lg font-semibold">34 / 120</div>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <div className="text-xs text-slate-500">Projected savings</div>
                <div className="mt-1 text-lg font-semibold">$12,480</div>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-600">
              This is what Premium unlocks: saved scenarios, lifetime projections, deadline tracking,
              and continuous checkups.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold tracking-tight">
            Free plan comparison
          </h2>
          <p className="mt-2 max-w-prose text-slate-600">
            Enter a few details and get a structured comparison. No login required.
          </p>

          <div className="mt-6">
            <FreePlanComparison />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="text-sm font-medium">1) Compare</div>
              <p className="mt-2 text-sm text-slate-600">
                Run a free comparison across major repayment strategies to see a clear recommendation.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="text-sm font-medium">2) Save & track</div>
              <p className="mt-2 text-sm text-slate-600">
                Upgrade to save scenarios, track deadlines, and monitor progress toward forgiveness.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="text-sm font-medium">3) Stay optimized</div>
              <p className="mt-2 text-sm text-slate-600">
                Get calm checkups and updates when your situation—or rules—change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold tracking-tight">Pricing</h2>
          <p className="mt-2 max-w-prose text-slate-600">
            Simple subscriptions. Cancel anytime.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 p-6">
              <div className="text-sm font-medium">Premium</div>
              <div className="mt-2 text-3xl font-semibold">$9.99<span className="text-base font-normal text-slate-500">/mo</span></div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Full lifetime projection</li>
                <li>Saved scenario + edits</li>
                <li>Recertification reminders</li>
                <li>Plan checkup prompts</li>
              </ul>
              <Link
                href="/onboarding?plan=premium"
                className="mt-6 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
              >
                Start Premium
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm font-medium">Premium Plus</div>
              <div className="mt-2 text-3xl font-semibold">$29.99<span className="text-base font-normal text-slate-500">/mo</span></div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Everything in Premium</li>
                <li>Advanced scenario library</li>
                <li>Tax impact estimate</li>
                <li>Priority modeling features</li>
              </ul>
              <Link
                href="/onboarding?plan=premium_plus"
                className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-medium text-slate-900 ring-1 ring-slate-300 hover:bg-slate-100"
              >
                Start Premium Plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500">
          © {new Date().getFullYear()} DebtfreeAI. Educational software; not financial advice.
        </div>
      </footer>
    </main>
  );
}