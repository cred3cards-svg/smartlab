"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-soft flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Logo size="xl" className="mb-4" />
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Admin Portal</h1>
          <p className="text-text-secondary">Enter your credentials to access the dashboard</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-surface-border shadow-modal space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-surface-soft border-transparent rounded-xl text-sm focus:ring-2 focus:ring-brand-teal focus:bg-white transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-surface-soft border-transparent rounded-xl text-sm focus:ring-2 focus:ring-brand-teal focus:bg-white transition-all outline-none"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              className="bg-brand-blue hover:bg-brand-blue-light py-6 rounded-xl font-bold shadow-lg shadow-brand-blue/20"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in to Dashboard"}
            </Button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-text-muted">
              Forgot your password? <span className="text-brand-teal font-medium hover:underline cursor-pointer">Contact System Admin</span>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-text-muted">
          &copy; {new Date().getFullYear()} SMARTLAB247 Health Pvt Ltd. All rights reserved.
        </p>
      </div>
    </div>
  );
}
