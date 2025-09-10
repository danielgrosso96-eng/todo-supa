// app/layout.tsx  (or src/app/layout.tsx)
export const metadata = {
  title: "Todo + Supabase + Stripe",
  description: "Tiny todo app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#0b0b0f",
          color: "#fff",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <a
              href="/"
              style={{ fontWeight: 700, textDecoration: "none", color: "#fff" }}
            >
              📝 TinyTodo
            </a>
            <nav style={{ display: "flex", gap: 12 }}>
              <a
                href="/login"
                style={{ color: "#b3abff", textDecoration: "none" }}
              >
                Login
              </a>
              <a
                href="/dashboard"
                style={{ color: "#b3abff", textDecoration: "none" }}
              >
                Dashboard
              </a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
