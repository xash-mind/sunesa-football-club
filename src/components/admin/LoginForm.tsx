import { useState } from "react";
import { supabase } from "@/lib/supabase";

const errorMessages = [
  "🧤 Great save! That login didn't make it past the keeper.",
  "❌ Offside! Check your email or password.",
  "🥅 No goal! Try your credentials again.",
  "⚽ Shot wide! Wrong credentials.",
  "🟥 Red card! Access denied.",
  "🚩 Flag's up! Something isn't right.",
  "🥶 Goalkeeper had that covered.",
];

function randomMessage(messages: string[]) {
  return messages[Math.floor(Math.random() * messages.length)];
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

   if (error) {
  setError(randomMessage(errorMessages));
}

    setLoading(false);
    
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl"
      >

        <h1 className="mb-2 font-display text-3xl text-gradient-gold">
          Sunesa Admin
        </h1>

        <p className="mb-8 text-sm text-muted-foreground">
          Sign in to manage your website.
        </p>

        <div className="mb-5">

          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-border bg-secondary px-4 py-3 outline-none transition focus:border-brand-primary"
            placeholder="admin@example.com"
            required
          />

        </div>

        <div className="mb-6">

          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-border bg-secondary px-4 py-3 outline-none transition focus:border-brand-primary"
            placeholder="••••••••"
            required
          />

        </div>

        {error && (
          <p className="mb-4 text-sm text-red-400">
            {error}
          </p>
        )}
        {success && (
         <p className="mb-4 text-sm text-green-400">
           {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-gold px-6 py-3 font-semibold text-primary-foreground transition hover:shadow-gold disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Login"}
        </button>

      </form>

    </div>
  );
}