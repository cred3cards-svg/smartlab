"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { Phone, Mail, Lock, User, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

const signupSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  phone: z.string().min(10, "Enter a valid 10-digit phone number").max(10, "Enter a valid 10-digit phone number"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (!res.ok) {
        const errorMsg = result.debug ? `${result.message}: ${result.debug}` : (result.message || "Something went wrong");
        throw new Error(errorMsg);
      }

      // Automatically sign in after signup
      const signInRes = await signIn("credentials", {
        email: data.phone, // We use phone as identifier
        password: data.password,
        redirect: false,
      });

      if (signInRes?.error) {
        router.push("/login?success=account-created");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-block">
             <Logo size="lg" />
          </div>
          <h1 className="text-3xl font-heading font-black text-text-primary tracking-tight">Create your account</h1>
          <p className="text-text-secondary text-sm italic italic-accent">
            Join 50k+ users and claim your <span className="text-brand-blue font-bold">₹500 Welcome Bonus</span>.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-surface-border/40 p-8 md:p-10 border border-surface-border">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-status-danger text-xs font-bold p-4 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted px-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-brand-blue" size={18} />
                <input
                  {...register("name")}
                  className="w-full bg-surface-soft border-transparent focus:bg-white focus:border-brand-blue/30 rounded-2xl py-3.5 pl-12 pr-4 text-sm transition-all outline-none"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-[10px] text-status-danger font-bold mt-1 px-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted px-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input
                  {...register("phone")}
                  className="w-full bg-surface-soft border-transparent focus:bg-white focus:border-brand-blue/30 rounded-2xl py-3.5 pl-12 pr-4 text-sm transition-all outline-none"
                  placeholder="9876543210"
                />
              </div>
              {errors.phone && <p className="text-[10px] text-status-danger font-bold mt-1 px-1">{errors.phone.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted px-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input
                  {...register("email")}
                  className="w-full bg-surface-soft border-transparent focus:bg-white focus:border-brand-blue/30 rounded-2xl py-3.5 pl-12 pr-4 text-sm transition-all outline-none"
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && <p className="text-[10px] text-status-danger font-bold mt-1 px-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted px-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
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
              className="py-4 rounded-2xl bg-brand-blue text-white hover:bg-brand-blue-dark font-black tracking-wide text-lg mt-4 shadow-lg shadow-brand-blue/20"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Sign Up Now"}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-surface-border text-center">
             <div className="flex items-center justify-center gap-2 text-status-success mb-6">
                <ShieldCheck size={18} />
                <span className="text-xs font-extrabold uppercase tracking-widest italic">100% Secure & HIPAA Compliant</span>
             </div>
             <p className="text-text-secondary text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-brand-blue font-bold hover:underline underline-offset-4 transition-all">
                  Log In
                </Link>
             </p>
          </div>
        </div>

        <p className="text-[10px] text-text-muted text-center px-8 leading-relaxed">
          By signing up, you agree to our Terms of Service and Privacy Policy. Your welcome bonus will be credited as digital wallet balance.
        </p>
      </div>
    </div>
  );
}
