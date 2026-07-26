import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import { LoginForm } from "@/components/admin/LoginForm";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setLoggedIn(!!session);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        Loading...
      </div>
    );
  }

  return loggedIn ? <Outlet /> : <LoginForm />;
}