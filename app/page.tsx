"use client";

// /app/page.tsx
export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <h1>Organise more. Stress less.</h1>
          <p className="tagline">
            A super simple todo application, no learning curve, just list.
          </p>

          <div className="cta">
            <a
              className="btn btn-primary"
              href="/login"
              aria-label="Get started – sign up or log in"
            >
              Get started
            </a>
            <a
              className="btn btn-ghost"
              href="/dashboard"
              aria-label="View your dashboard"
            >
              View dashboard
            </a>
          </div>

          <p className="sub">No credit card needed for the free plan.</p>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="section">
        <h2>Why you’ll like it</h2>
        <div className="grid">
          <div className="card">
            <div className="icon">🔐</div>
            <h3>Secure sign-in</h3>
            <p>
              Supabase Auth with Row-Level Security so only you can access your
              data.
            </p>
          </div>
          <div className="card">
            <div className="icon">⚡</div>
            <h3>Fast & simple</h3>
            <p>
              Add, check, and delete todos in seconds. No clutter, just the
              essentials.
            </p>
          </div>
          <div className="card">
            <div className="icon">💳</div>
            <h3>Stripe-powered</h3>
            <p>
              Upgrade to Pro using Stripe Checkout. Clean, safe payments and
              easy management.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section">
        <h2>Pricing</h2>
        <p className="muted">Start free. Upgrade any time.</p>

        <div className="pricing">
          <div className="price-card">
            <h3>Free</h3>
            <p className="price">
              £0<span>/mo</span>
            </p>
            <ul>
              <li>✔ Email login</li>
              <li>✔ Create & manage todos</li>
              <li>✔ Secure storage</li>
            </ul>
            <a className="btn btn-outline" href="/login">
              Get started
            </a>
          </div>

          <div className="price-card pro">
            <div className="badge">Most popular</div>
            <h3>Pro</h3>
            <p className="price">
              £5<span>/mo</span>
            </p>
            <ul>
              <li>✔ Everything in Free</li>
              <li>✔ Priority updates</li>
              <li>✔ Support the project</li>
            </ul>
            <a className="btn btn-primary" href="/dashboard">
              Upgrade in app
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Layout */
        main {
          display: grid;
          gap: 64px;
        }
        .section {
          display: grid;
          gap: 20px;
        }
        h2 {
          font-size: 28px;
          margin: 0;
        }

        /* Hero */
        .hero {
          position: relative;
          border: 1px solid #1a1a24;
          border-radius: 20px;
          padding: 56px 24px;
          background: radial-gradient(
              80% 60% at 20% 10%,
              rgba(179, 171, 255, 0.18),
              rgba(0, 0, 0, 0) 60%
            ),
            radial-gradient(
              70% 60% at 90% 20%,
              rgba(118, 207, 211, 0.16),
              rgba(0, 0, 0, 0) 60%
            ),
            #0b0b0f;
        }
        .hero-inner {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        .hero h1 {
          margin: 0 0 10px;
          font-size: clamp(32px, 6vw, 54px);
          line-height: 1.07;
          letter-spacing: -0.02em;
        }
        .tagline {
          margin: 0 auto 22px;
          opacity: 0.8;
          font-size: 18px;
          max-width: 720px;
        }
        .cta {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 8px;
        }
        .sub {
          margin: 10px 0 0;
          font-size: 14px;
          opacity: 0.7;
        }

        /* Benefits */
        .grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        @media (max-width: 900px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
        .card {
          border: 1px solid #1a1a24;
          background: #0e0e14;
          border-radius: 16px;
          padding: 18px;
          display: grid;
          gap: 8px;
        }
        .card h3 {
          margin: 0;
          font-size: 18px;
        }
        .card p {
          margin: 0;
          opacity: 0.85;
        }
        .icon {
          font-size: 22px;
        }

        /* Pricing */
        .muted {
          margin: -6px 0 8px;
          opacity: 0.7;
        }
        .pricing {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }
        @media (max-width: 900px) {
          .pricing {
            grid-template-columns: 1fr;
          }
        }
        .price-card {
          position: relative;
          border: 1px solid #1a1a24;
          background: #0e0e14;
          border-radius: 16px;
          padding: 20px;
          display: grid;
          gap: 12px;
        }
        .price-card h3 {
          margin: 0;
          font-size: 20px;
        }
        .price {
          margin: 2px 0 6px;
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .price span {
          font-size: 16px;
          font-weight: 500;
          opacity: 0.7;
          margin-left: 4px;
        }
        .price-card ul {
          list-style: none;
          padding: 0;
          margin: 0 0 8px;
          display: grid;
          gap: 6px;
          opacity: 0.95;
        }
        .pro {
          background: radial-gradient(
              80% 60% at 20% 10%,
              rgba(179, 171, 255, 0.08),
              rgba(0, 0, 0, 0) 60%
            ),
            radial-gradient(
              70% 60% at 90% 20%,
              rgba(118, 207, 211, 0.07),
              rgba(0, 0, 0, 0) 60%
            ),
            #0e0e14;
          border-color: #26263a;
        }
        .badge {
          position: absolute;
          top: 12px;
          right: 12px;
          font-size: 12px;
          color: #000;
          background: #b3abff;
          padding: 4px 8px;
          border-radius: 999px;
          font-weight: 700;
        }

        /* Buttons */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 10px;
          text-decoration: none;
          line-height: 1;
          transition: transform 0.04s ease, box-shadow 0.2s ease,
            background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
          border: 1px solid #2a2a3b;
          color: #fff;
          background: #12121a;
        }
        .btn:hover {
          transform: translateY(-1px);
        }
        .btn:active {
          transform: translateY(0);
        }

        .btn-primary {
          background: #b3abff;
          border-color: #b3abff;
          color: #000;
        }
        .btn-primary:hover {
          filter: brightness(1.05);
        }

        .btn-ghost {
          background: transparent;
          border-color: #2a2a3b;
          color: #fff;
        }
        .btn-ghost:hover {
          background: #151521;
        }

        .btn-outline {
          background: transparent;
          border-color: #3a3a4f;
          color: #fff;
        }
        .btn-outline:hover {
          background: #161626;
        }
      `}</style>
    </main>
  );
}
