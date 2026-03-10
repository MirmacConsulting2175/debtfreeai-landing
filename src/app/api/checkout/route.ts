// app/api/checkout/route.ts
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });

}

const PRICE_PREMIUM = process.env.STRIPE_PRICE_PREMIUM!;
const PRICE_PREMIUM_PLUS = process.env.STRIPE_PRICE_PREMIUM_PLUS!;

export async function POST(req: Request) {
  const { plan, email, leadId } = await req.json();

  const price =
    plan === "premium_plus" ? PRICE_PREMIUM_PLUS : PRICE_PREMIUM;

  // Optional: attach metadata for analytics + linking lead to subscription
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: email,
    line_items: [{ price, quantity: 1 }],
    success_url: `${process.env.APP_URL}/onboarding?success=1&leadId=${encodeURIComponent(
      leadId ?? ""
    )}`,
    cancel_url: `${process.env.APP_URL}/?canceled=1`,
    metadata: {
      leadId: leadId ?? "",
      plan,
    },
  });

  return NextResponse.json({ url: session.url });
}