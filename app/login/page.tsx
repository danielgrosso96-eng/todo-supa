"use client";

import { supabase } from "../../lib/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) router.replace("/dashboard");
    });
    return () => sub.subscription.unsubscribe();
  }, [router]);

  return (
    <main>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>Login / Signup</h1>
      <div style={{ maxWidth: 420 }}>
        <Auth
          supabaseClient={supabase}
          providers={[]}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  // tweak these as you like
                  inputBackground: "#12121a",
                  inputBorder: "#333333",
                  inputText: "#ffffff",
                  inputPlaceholder: "#b3abff", // 👈 placeholder colour
                  brand: "#b3abff",
                  brandAccent: "#8f86ff",
                },
              },
            },
          }}
          redirectTo={`${
            process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
          }/dashboard`}
        />
      </div>
    </main>
  );
}
