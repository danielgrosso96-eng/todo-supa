// import Stripe from "stripe";
import { NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function POST() {
  try {
    // Get current user via Supabase access token from cookies (client just calls this)
    // Simpler: ask the client to be logged in and send the JWT on the cookie automatically
    // const supabase = createClient(
    //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
    //   process.env.SUPABASE_SERVICE_ROLE_KEY! // service role so we can read regardless of RLS
    // );

    // Instead of reading from cookies, ask the client to rely on server reading profile by their auth uid.
    // We need the user id; the simplest is: client is authenticated, and we store stripe_customer_id in profiles.
    // In a real app, verify the JWT; for this MVP, we can’t easily access it here, so we accept a simpler flow:
    // The client does not send userId. We'll show a simple version requiring customer id in DB keyed by a query param.
    // But better MVP: require the user to be Pro already and store 1 mapping per session. To keep it simple:
    // We'll just return a 400 if we can't find a unique user. A production version should verify auth in the route.

    return NextResponse.json(
      { error: "Add auth verification for portal in production." },
      { status: 400 }
    );
  } catch (err) {
    console.error(err);
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
