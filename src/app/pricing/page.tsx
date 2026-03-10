import PricingCard from "@/components/PricingCard";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">DebtfreeAI pricing</h1>
          <p className="mt-3 text-lg text-slate-600">
            Start with a one-time premium analysis or unlock ongoing monitoring and re-optimization.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <PricingCard
            title="Premium Report"
            description="Full optimization report, repayment path comparison, and program match analysis."
            price="$99"
            planCode="PREMIUM_REPORT"
            cta="Buy Premium Report"
          />
          <PricingCard
            title="Premium Monthly"
            description="Ongoing monitoring, alerts, yearly re-optimization, and premium feature access."
            price="$29/mo"
            planCode="PREMIUM_MONTHLY"
            cta="Start Premium Monthly"
          />
        </div>
      </div>
    </main>
  );
}
