// app/api/lead/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // TODO: validate input
  // Forward to Spring Boot
  const backendUrl = process.env.BACKEND_URL; // e.g. https://api.debtfree-ai.com
  if (!backendUrl) {
    // Dev fallback: return a mock id
    return NextResponse.json({ leadId: crypto.randomUUID() });
  }

  const res = await fetch(`${backendUrl}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (!res.ok) return new NextResponse(text, { status: res.status });

  return new NextResponse(text, { status: 200 });
}