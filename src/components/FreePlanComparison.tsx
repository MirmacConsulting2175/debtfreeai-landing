// components/FreePlanComparison.tsx
"use client";

import { useMemo, useState } from "react";

type Inputs = {
  loanBalance: number;
  interestRate: number; // %
  agi: number;
  familySize: number;
  state: string;
};

function formatUSD(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

// Lightweight preview math (NOT your final repayment engine).
// Real repayment logic should live in your Spring Boot service.
function quickPreview(inputs: Inputs) {
  const r = inputs.interestRate / 100;
  const annualInterest = inputs.loanBalance * r;

  // “Payment estimate” placeholders for preview
  const savePaymentMonthly = Math.max(0, (inputs.agi - 25000) * 0.05 / 12); // simplistic
  const ibrPaymentMonthly = Math.max(0, (inputs.agi - 25000) * 0.10 / 12);

  // “Total cost” placeholder: interest drag + payments
  const saveAnnualPaid = savePaymentMonthly * 12;
  const ibrAnnualPaid = ibrPaymentMonthly * 12;

  const saveNet = saveAnnualPaid + annualInterest * 0.6; // pretend SAVE reduces interest burden
  const ibrNet = ibrAnnualPaid + annualInterest * 1.0;

  const recommended = saveNet <= ibrNet ? "SAVE" : "IBR";
  const estSavings = Math.max(0, Math.abs(saveNet - ibrNet));

  return {
    recommended,
    savePaymentMonthly,
    ibrPaymentMonthly,
    estSavingsAnnual: estSavings,
  };
}

export default function FreePlanComparison() {
  const [inputs, setInputs] = useState<Inputs>({
    loanBalance: 40000,
    interestRate: 6.0,
    agi: 65000,
    familySize: 1,
    state: "GA",
  });

  const [email, setEmail] = useState("");
  const [resultSent, setResultSent] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const preview = useMemo(() => quickPreview(inputs), [inputs]);

  async function submitLead() {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          inputs,
          preview,
          source: "landing_calculator",
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to save");
      }

      const data = (await res.json()) as { leadId: string };
      setLeadId(data.leadId);
      setResultSent(true);
    } catch (e: any) {
      setErr(e?.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function startCheckout(plan: "premium" | "premium_plus") {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          leadId,
          email,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Checkout failed");
      }
      const data = (await res.json()) as { url: string };
      window.location.href = data.url;
    } catch (e: any) {
      setErr(e?.message || "Could not start checkout");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Inputs */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-1">
        <div className="text-sm font-medium">Your inputs</div>

        <div className="mt-4 grid gap-4">
          <Field
            label="Loan balance"
            value={inputs.loanBalance}
            onChange={(v) => setInputs({ ...inputs, loanBalance: v })}
          />
          <Field
            label="Interest rate (%)"
            value={inputs.interestRate}
            step={0.1}
            onChange={(v) => setInputs({ ...inputs, interestRate: v })}
          />
          <Field
            label="AGI (income)"
            value={inputs.agi}
            onChange={(v) => setInputs({ ...inputs, agi: v })}
          />
          <Field
            label="Family size"
            value={inputs.familySize}
            onChange={(v) => setInputs({ ...inputs, familySize: v })}
          />
          <div>
            <label className="text-xs text-slate-500">State</label>
            <input
              className="mt-1 w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm"
              value={inputs.state}
              onChange={(e) => setInputs({ ...inputs, state: e.target.value.toUpperCase() })}
            />
          </div>
        </div>
      </div>

      {/* Preview Results */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 lg:col-span-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-medium">Your comparison (preview)</div>
            <p className="mt-1 text-sm text-slate-600">
              This is a quick preview. Premium unlocks lifetime projections, forgiveness timeline,
              tax estimate, and deadline tracking.
            </p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 text-right shadow-sm">
            <div className="text-xs text-slate-500">Recommended</div>
            <div className="text-lg font-semibold">{preview.recommended}</div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Metric
            label="SAVE est. payment"
            value={`${formatUSD(preview.savePaymentMonthly)}/mo`}
          />
          <Metric
            label="IBR est. payment"
            value={`${formatUSD(preview.ibrPaymentMonthly)}/mo`}
          />
          <Metric
            label="Est. savings (annual)"
            value={formatUSD(preview.estSavingsAnnual)}
          />
        </div>

        {/* Paywall preview */}
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5">
          <div className="text-sm font-medium">Unlock the full plan</div>
          <p className="mt-1 text-sm text-slate-600">
            Save your strategy, view lifetime projections, track deadlines, and get calm checkups.
          </p>

          {!resultSent ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <label className="text-xs text-slate-500">Email to send your full report</label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                onClick={submitLead}
                disabled={busy || !email.includes("@")}
                className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? "Saving…" : "Send report"}
              </button>
            </div>
          ) : (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="text-sm text-slate-700">
                Report saved. Lead ID: <span className="font-mono text-xs">{leadId}</span>
              </div>
              <button
                onClick={() => startCheckout("premium")}
                disabled={busy}
                className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
              >
                Start Premium
              </button>
              <button
                onClick={() => startCheckout("premium_plus")}
                disabled={busy}
                className="rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-50 disabled:opacity-60"
              >
                Start Premium Plus
              </button>
            </div>
          )}

          {err && <p className="mt-3 text-sm text-red-600">{err}</p>}

          <p className="mt-4 text-xs text-slate-500">
            Educational software; not financial advice. We do not sell refinancing leads.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  step,
  onChange,
}: {
  label: string;
  value: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="text-xs text-slate-500">{label}</label>
      <input
        type="number"
        step={step ?? 1}
        className="mt-1 w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm"
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}