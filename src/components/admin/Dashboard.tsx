import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import { supabase } from "@/lib/supabase";

const successMessages = [
  "⚽ GOAL! Welcome back, Coach.",
  "🥅 Top bins! Access granted.",
  "🏆 Champions only. Welcome.",
  "🎉 Hat-trick! Login successful.",
  "🔥 Match day begins now.",
  "⭐ Straight into the starting XI.",
  "💛 Welcome back to Sunesa HQ.",
];

function randomMessage(messages: string[]) {
  return messages[Math.floor(Math.random() * messages.length)];
}

export function Dashboard() {
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    setWelcomeMessage(randomMessage(successMessages));

    const timer = setTimeout(() => {
      setWelcomeMessage("");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-6">
      {welcomeMessage && (
        <div className="fixed right-6 top-6 z-50 animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="rounded-xl border border-green-500/25 bg-brand-surface/90 px-5 py-3 backdrop-blur-xl shadow-2xl">
            <p className="text-sm font-medium text-green-400">
              {welcomeMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl rounded-3xl border border-border bg-card p-10 shadow-xl">
        <h1 className="font-display text-4xl text-gradient-gold">
          Sunesa Admin
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your website content.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/admin/news"
            className="block rounded-2xl border border-border bg-secondary p-8 text-left transition hover:border-brand-primary hover:shadow-gold"
          >
            <h2 className="font-display text-2xl">News</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage club news and announcements.
            </p>
          </Link>

          <Link
            to="/admin/gallery"
            className="block rounded-2xl border border-border bg-secondary p-8 text-left transition hover:border-brand-primary hover:shadow-gold"
          >
            <h2 className="font-display text-2xl">Gallery</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Upload and organise images.
            </p>
          </Link>

          <Link
            to="/admin/pages"
            className="block rounded-2xl border border-border bg-secondary p-8 text-left transition hover:border-brand-primary hover:shadow-gold"
          >
            <h2 className="font-display text-2xl">Pages</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Edit website content.
            </p>
          </Link>

          <Link
            to="/admin/forms"
            className="block rounded-2xl border border-border bg-secondary p-8 text-left transition hover:border-brand-primary hover:shadow-gold"
          >
            <h2 className="font-display text-2xl">Forms</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Review contact and trial submissions.
            </p>
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="mt-10 rounded-xl border border-brand-primary/40 px-6 py-3 text-brand-primary transition hover:bg-brand-primary/10"
        >
          Logout
        </button>
      </div>
    </div>
  );
}