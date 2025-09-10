"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Todo = {
  id: string;
  content: string;
  done: boolean;
  created_at: string;
  user_id: string;
};
type Profile = {
  id: string;
  email: string | null;
  is_pro: boolean;
  stripe_customer_id: string | null;
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/login";
        return;
      }
      setUserId(user.id);
      await Promise.all([loadProfile(user.id), loadTodos()]);
      setLoading(false);
    })();
  }, []);

  async function loadProfile(uid: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", uid)
      .single();
    if (!error) setProfile(data as Profile);
  }

  async function loadTodos() {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setTodos(data as Todo[]);
  }

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || !userId) return;
    const { data, error } = await supabase
      .from("todos")
      .insert([{ content, user_id: userId }])
      .select()
      .single();
    if (!error && data) setTodos((prev) => [data as Todo, ...prev]);
    setContent("");
  }

  async function toggleDone(id: string, done: boolean) {
    const { data, error } = await supabase
      .from("todos")
      .update({ done: !done })
      .eq("id", id)
      .select()
      .single();
    if (!error && data)
      setTodos((prev) => prev.map((t) => (t.id === id ? (data as Todo) : t)));
  }

  async function removeTodo(id: string) {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (!error) setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  async function startCheckout() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return (window.location.href = "/login");
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, email: user.email }),
    });
    const json = await res.json();
    if (json.url) window.location.href = json.url;
  }

  async function openBillingPortal() {
    const res = await fetch("/api/portal", { method: "POST" });
    const json = await res.json();
    if (json.url) window.location.href = json.url;
  }

  const pro = !!profile?.is_pro;

  if (loading) return <p>Loading…</p>;

  return (
    <main>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1 style={{ fontSize: 28 }}>Your Dashboard</h1>
        <button
          onClick={signOut}
          style={{
            background: "transparent",
            border: "1px solid #444",
            borderRadius: 10,
            padding: "8px 12px",
            color: "#fff",
          }}
        >
          Sign out
        </button>
      </div>

      <section
        style={{
          marginBottom: 16,
          padding: 16,
          border: "1px solid #222",
          borderRadius: 12,
        }}
      >
        <p style={{ margin: 0 }}>Plan: {pro ? "Pro ✅" : "Free 🚀"}</p>
        {!pro ? (
          <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
            <button
              onClick={startCheckout}
              style={{
                padding: "10px 16px",
                background: "#b3abff",
                color: "#000",
                borderRadius: 10,
                border: 0,
              }}
            >
              Upgrade to Pro
            </button>
          </div>
        ) : (
          <div style={{ marginTop: 12 }}>
            <button
              onClick={openBillingPortal}
              style={{
                padding: "10px 16px",
                background: "#76cfd3",
                color: "#000",
                borderRadius: 10,
                border: 0,
              }}
            >
              Manage billing
            </button>
          </div>
        )}
      </section>

      <form
        onSubmit={addTodo}
        style={{ display: "flex", gap: 8, marginBottom: 16 }}
      >
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a todo…"
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #333",
            background: "#12121a",
            color: "#fff",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 16px",
            background: "#b3abff",
            color: "#000",
            borderRadius: 10,
            border: 0,
          }}
        >
          Add
        </button>
      </form>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gap: 8,
        }}
      >
        {todos.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: "1px solid #222",
              borderRadius: 10,
              padding: 12,
            }}
          >
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleDone(t.id, t.done)}
            />
            <span
              style={{
                textDecoration: t.done ? "line-through" : "none",
                opacity: t.done ? 0.6 : 1,
              }}
            >
              {t.content}
            </span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button
                onClick={() => removeTodo(t.id)}
                style={{
                  border: "1px solid #333",
                  background: "transparent",
                  color: "#fff",
                  borderRadius: 8,
                  padding: "6px 10px",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {todos.length === 0 && <p>No todos yet — add one above.</p>}
      </ul>
    </main>
  );
}
