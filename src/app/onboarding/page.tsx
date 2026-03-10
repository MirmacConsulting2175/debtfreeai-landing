// app/onboarding/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function OnboardingPage() {
  const sp = useSearchParams();
  const success = sp.get("success") === "1";

  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    servicer: "",
    recertDate: "",
    pslf: false,
  });

  useEffect(() => {
    if (success) {
      setMsg("Subscription active. Let’s set up your repayment system.");
    }
  }, [success]);

  async function save() {
    setBusy(true);
    setMsg(null);
    try {
      // TODO: send to Spring Boot to persist onboarding settings
      await new Promise((r) => setTimeout(r, 600));
      setMsg("Setup complete. Your first Optimization Checkup is ready.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          {success ? "Welcome to DebtfreeAI" : "Get started"}
        </h1>
        <p className="mt-2 text-slate-600">
          We’ll set up your repayment operating system: deadlines, tracking, and checkups.
        </p>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6">
          <div className="grid gap-4">
            <div>
              <label className="text-xs text-slate-500">Loan servicer (optional)</label>
              <input
                className="mt-1 w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm"
                value={form.servicer}
                onChange={(e) => setForm({ ...form, servicer: e.target.value })}
                placeholder="MOHELA, Aidvantage, Nelnet…"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500">Recertification due date (recommended)</label>
              <input
                type="date"
                className="mt-1 w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm"
                value={form.recertDate}
                onChange={(e) => setForm({ ...form, recertDate: e.target.value })}
              />
              <p className="mt-1 text-xs text-slate-500">
                This powers calm reminders (90/60/30 days).
              </p>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.pslf}
                onChange={(e) => setForm({ ...form, pslf: e.target.checked })}
              />
              I’m pursuing PSLF (optional)
            </label>

            <button
              onClick={save}
              disabled={busy}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {busy ? "Saving…" : "Finish setup"}
            </button>

            {msg && <p className="text-sm text-slate-700">{msg}</p>}
          </div>
        </div>
      </div>
    </main>
  );
}