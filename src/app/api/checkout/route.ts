import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_PREMIUM = process.env.STRIPE_PRICE_PREMIUM!;
const PRICE_PREMIUM_PLUS = process.env.STRIPE_PRICE_PREMIUM_PLUS!;
const APP_URL = process.env.APP_URL!;

export async function POST(req: Request) {
  try {
    const { plan, email, leadId } = await req.json();

    const price =
      plan === "premium_plus" ? PRICE_PREMIUM_PLUS : PRICE_PREMIUM;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [{ price, quantity: 1 }],
      success_url: `${APP_URL}/onboarding?success=1&leadId=${encodeURIComponent(
        leadId ?? ""
      )}`,
      cancel_url: `${APP_URL}/?canceled=1`,
      metadata: {
        leadId: leadId ?? "",
        plan,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);

    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}