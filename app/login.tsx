// app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function LoginPage() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect logged-in users
  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } 
    else if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setMessage("Signup successful! Check your email for confirmation.");
    } 
    else if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) setError(error.message);
      else setMessage("Password reset email sent! Check your inbox.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          {mode === "login" && "Login"}
          {mode === "signup" && "Sign Up"}
          {mode === "forgot" && "Reset Password"}
        </h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && <p className="text-green-500 text-sm text-center">{message}</p>}

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="you@example.com"
          />
        </div>

        {mode !== "forgot" && (
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="••••••••"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          {loading ? "Please wait..." : 
            mode === "login" ? "Log In" : 
            mode === "signup" ? "Sign Up" : "Send Reset Email"}
        </button>

        <div className="text-center space-y-2">
          {mode === "login" && (
            <>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-blue-600 text-sm"
              >
                Don't have an account? Sign Up
              </button>
              <br />
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="text-blue-600 text-sm"
              >
                Forgot Password?
              </button>
            </>
          )}
          {mode === "signup" && (
            <button
              type="button"
              onClick={() => setMode("login")}
              className="text-blue-600 text-sm"
            >
              Already have an account? Log In
            </button>
          )}
          {mode === "forgot" && (
            <button
              type="button"
              onClick={() => setMode("login")}
              className="text-blue-600 text-sm"
            >
              Back to Log In
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

