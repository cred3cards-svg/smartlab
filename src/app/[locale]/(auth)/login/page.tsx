"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { Mail, Lock, LogIn, Loader2, ShieldCheck, ArrowRight, User } from "lucide-react";

const loginSchema = z.object({
  identifier: z.string().min(1, "Email or Phone is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (searchParams.get("success") === "account-created") {
      setSuccess("Account created successfully! Please log in.");
    }
  }, [searchParams]);

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await signIn("credentials", {
        email: data.identifier, // auth.ts handles both email/phone under this key
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials. Please try again.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-4">
          <div className="inline-block transition-transform hover:scale-105 duration-500">
             <Logo size="lg" />
          </div>
          <h1 className="text-3xl font-heading font-black text-text-primary tracking-tight">Welcome back</h1>
          <p className="text-text-secondary text-sm italic italic-accent uppercase tracking-widest font-bold">
            Access your health intelligence
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-surface-border/40 p-8 md:p-10 border border-surface-border">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-status-danger text-xs font-bold p-4 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-status-success text-xs font-bold p-4 rounded-xl border border-green-100 animate-in fade-in slide-in-from-top-1">
                {success}
              </div>
            )}

            <div className="space-y-1 group">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted px-1 transition-colors group-focus-within:text-brand-blue">Email or Phone</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-brand-blue" size={18} />
                <input
                  {...register("identifier")}
                  className="w-full bg-surface-soft border-transparent focus:bg-white focus:border-brand-blue/30 rounded-2xl py-3.5 pl-12 pr-4 text-sm transition-all outline-none"
                  placeholder="name@email.com or 9876543210"
                />
              </div>
              {errors.identifier && <p className="text-[10px] text-status-danger font-bold mt-1 px-1">{errors.identifier.message}</p>}
            </div>

            <div className="space-y-1 group">
              <div className="flex items-center justify-between px-1">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted transition-colors group-focus-within:text-brand-blue">Password</label>
                <Link href="/forgot-password" className="text-[10px] font-bold text-brand-blue hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-brand-blue" size={18} />
                <input
                  {...register("password")}
                  type="password"
                  className="w-full bg-surface-soft border-transparent focus:bg-white focus:border-brand-blue/30 rounded-2xl py-3.5 pl-12 pr-4 text-sm transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-[10px] text-status-danger font-bold mt-1 px-1">{errors.password.message}</p>}
            </div>

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              className="py-4 rounded-2xl bg-brand-blue text-white hover:bg-brand-blue-dark font-black tracking-wide text-lg mt-2 shadow-lg shadow-brand-blue/20 transition-all active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <span className="flex items-center justify-center gap-2">
                  <LogIn size={20} /> Sign In
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-surface-border text-center">
             <div className="flex items-center justify-center gap-2 text-status-success mb-6">
                <ShieldCheck size={18} />
                <span className="text-xs font-extrabold uppercase tracking-widest italic">Encrypted & HIPAA Compliant Session</span>
             </div>
             <p className="text-text-secondary text-sm">
                New to SMARTLAB247?{" "}
                <Link href="/signup" className="text-brand-blue font-bold hover:underline underline-offset-4 transition-all">
                  Join Now & Get ₹500
                </Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
