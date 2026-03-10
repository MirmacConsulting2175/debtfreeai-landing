import Link from "next/link";

export default function BillingCancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Checkout canceled</h1>
        <p className="mt-3 text-slate-600">
          No charge was completed. You can return to pricing and try again whenever you are ready.
        </p>
        <div className="mt-6">
          <Link href="/pricing" className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white">
            Return to pricing
          </Link>
        </div>
      </div>
    </main>
  );
}
