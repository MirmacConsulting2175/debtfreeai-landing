export default function PricingCard({ title, price, features }) {
  return (
    <div className="border rounded-lg p-6 shadow">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-3xl mt-2">${price}</p>
      <ul className="mt-4">
        {features?.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </div>
  );
}