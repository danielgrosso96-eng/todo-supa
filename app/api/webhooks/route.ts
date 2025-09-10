// /app/api/webhooks/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // Let the SDK use its bundled API version (do NOT pass apiVersion)
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  // Stripe needs the raw body
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  // Service-role client to bypass RLS on server
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId as string | undefined;
        const customerId = (session.customer as string) ?? null;

        if (userId) {
          const updates: {
            id: string;
            is_pro: boolean;
            stripe_customer_id?: string | null;
          } = {
            id: userId,
            is_pro: true,
          };
          if (customerId) updates.stripe_customer_id = customerId;

          await admin.from("profiles").upsert(updates);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = sub.customer as string;

        const { data, error } = await admin
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (!error && data) {
          await admin
            .from("profiles")
            .update({ is_pro: false })
            .eq("id", data.id);
        }
        break;
      }

      default:
        // Ignore other events for now
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    console.error("Webhook handler error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
