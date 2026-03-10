type PricingCardProps = {
  title: string;
  description: string;
  price: string;
  planCode: string;
  cta: string;
};

export default function PricingCard({
  title,
  description,
  price,
  planCode,
  cta,
}: PricingCardProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow">
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-3 text-slate-600">{description}</p>
      <p className="mt-4 text-3xl font-bold text-slate-900">{price}</p>

      <button
        type="button"
        data-plan={planCode}
        className="mt-6 rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
      >
        {cta}
      </button>
    </div>
  );
}