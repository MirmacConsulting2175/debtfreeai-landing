"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function BillingSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Payment received</h1>
        <p className="mt-3 text-slate-600">
          Your payment was submitted successfully. DebtfreeAI will unlock paid access after Stripe confirms the event.
        </p>
        {sessionId ? (
          <p className="mt-3 break-all rounded-lg bg-slate-100 p-3 text-xs text-slate-600">
            Stripe session: {sessionId}
          </p>
        ) : null}
        <div className="mt-6 flex gap-3">
          <Link href="/dashboard" className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white">
            Go to dashboard
          </Link>
          <Link href="/pricing" className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900">
            Back to pricing
          </Link>
        </div>
      </div>
    </main>
  );
}
