'use client';

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, ShieldCheck, Building2, Briefcase, User } from "lucide-react";
import Logo from "@/components/Logo";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<'AGENT' | 'PCO' | 'DMC'>('AGENT');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (role === 'PCO') {
      window.location.href = "/pco";
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
      } else {
        window.location.href = role === 'AGENT' ? "/agent" : "/dmc";
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border border-[#C5A059]/40 bg-[#0B1B2D] text-slate-100 shadow-2xl rounded-3xl overflow-hidden">
      <CardHeader className="space-y-4 text-center pb-2 pt-8">
        <div className="flex justify-center pb-2">
          <Logo size="lg" darkNav={true} />
        </div>
        <div className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] bg-[#C5A059]/10 py-1 px-3 rounded-full inline-block border border-[#C5A059]/30">
          Official B2B Platform Authentication
        </div>
        <CardDescription className="text-slate-300 text-xs font-medium">
          Select your role to access congress allotments, PCO tools, or travel agent dashboards
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-[#162B44] p-1 rounded-xl border border-slate-700 text-xs">
          <button
            type="button"
            onClick={() => { setRole('AGENT'); setEmail('agent@example.com'); }}
            className={`py-2 px-1 rounded-lg font-bold transition-all flex flex-col items-center gap-1 ${
              role === 'AGENT' ? 'bg-[#C5A059] text-[#0B1B2D] shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" /> Travel Agent
          </button>
          <button
            type="button"
            onClick={() => { setRole('PCO'); setEmail('pco@example.com'); }}
            className={`py-2 px-1 rounded-lg font-bold transition-all flex flex-col items-center gap-1 ${
              role === 'PCO' ? 'bg-[#C5A059] text-[#0B1B2D] shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" /> PCO Portal
          </button>
          <button
            type="button"
            onClick={() => { setRole('DMC'); setEmail('dmc@example.com'); }}
            className={`py-2 px-1 rounded-lg font-bold transition-all flex flex-col items-center gap-1 ${
              role === 'DMC' ? 'bg-[#C5A059] text-[#0B1B2D] shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" /> DMC Partner
          </button>
        </div>

        {registered && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl flex items-center gap-3 text-emerald-300 text-xs">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            <span>Registration successful! Your account is pending admin approval.</span>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl flex items-center gap-3 text-red-300 text-xs">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold text-slate-200">Corporate Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@agency.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="bg-[#162B44] border-slate-700 text-white focus:border-[#C5A059] rounded-xl h-11 text-xs"
              required 
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-semibold text-slate-200">Password</Label>
              <Link href="#" className="text-xs text-[#C5A059] hover:underline">Forgot password?</Link>
            </div>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="bg-[#162B44] border-slate-700 text-white focus:border-[#C5A059] rounded-xl h-11 text-xs"
              required 
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#C5A059] text-[#0B1B2D] font-bold hover:bg-[#D4AF37] shadow-lg transition-all h-12 rounded-xl text-xs uppercase tracking-wider" 
            disabled={loading}
          >
            {loading ? "Authenticating..." : `Sign In as ${role}`}
          </Button>
        </form>

        {/* Merchant Disclaimer */}
        <div className="bg-[#162B44]/60 p-3 rounded-xl border border-slate-700/80 flex items-start gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
          <p>
            PCOXchange software engine. Bookings & merchant transactions are fulfilled by licensed Preferred Travel Agents.
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-3 text-center border-t border-slate-800 py-4 bg-[#061121]">
        <div className="text-xs text-slate-400">
          New Travel Partner or PCO Organizer?
        </div>
        <div className="flex justify-center gap-4 text-xs font-semibold text-[#C5A059]">
          <Link href="/auth/register/agent" className="hover:underline">Travel Agent Registration</Link>
          <span className="text-slate-700">|</span>
          <Link href="/auth/register/dmc" className="hover:underline">DMC Onboarding</Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC] px-4 py-12">
      <Suspense fallback={
        <Card className="w-full max-w-md border border-slate-200 bg-[#0B1B2D] p-8 text-center text-slate-300 rounded-3xl">
          <div>Loading PCOXchange Portal...</div>
        </Card>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
