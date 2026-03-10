import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const pricePremium = process.env.STRIPE_PRICE_PREMIUM;
    const pricePremiumPlus = process.env.STRIPE_PRICE_PREMIUM_PLUS;
    const appUrl = process.env.APP_URL;

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Missing STRIPE_SECRET_KEY" },
        { status: 500 }
      );
    }

    if (!pricePremium) {
      return NextResponse.json(
        { error: "Missing STRIPE_PRICE_PREMIUM" },
        { status: 500 }
      );
    }

    if (!appUrl) {
      return NextResponse.json(
        { error: "Missing APP_URL" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2026-02-25.clover",
    });

    const { plan, email, leadId } = await req.json();

    const price =
      plan === "premium_plus"
        ? pricePremiumPlus ?? pricePremium
        : pricePremium;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [{ price, quantity: 1 }],
      success_url: `${appUrl}/onboarding?success=1&leadId=${encodeURIComponent(
        leadId ?? ""
      )}`,
      cancel_url: `${appUrl}/?canceled=1`,
      metadata: {
        leadId: leadId ?? "",
        plan: plan ?? "premium",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}