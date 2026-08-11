'use client'

import { Suspense, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import Logo from "@/components/Logo"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get("registered")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
        setLoading(false)
      } else {
        window.location.href = "/dashboard"
      }
    } catch (err) {
      setError("An unexpected error occurred")
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border border-[#C5A059]/40 bg-[#0B1B2D] text-slate-100 shadow-2xl">
      <CardHeader className="space-y-4 text-center pb-2">
        <div className="flex justify-center pb-2">
          <div className="rounded-2xl bg-white p-3 shadow-lg">
            <Logo size="lg" />
          </div>
        </div>
        <CardDescription className="text-slate-300 text-xs font-medium">Enter your credentials to access your portal</CardDescription>
      </CardHeader>
      <CardContent>
        {registered && (
          <div className="mb-4 p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-lg flex items-center gap-3 text-emerald-300 text-xs animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            <span>Registration successful! Your account is pending admin approval. You can log in once approved.</span>
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 rounded-lg flex items-center gap-3 text-red-300 text-xs">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-semibold text-slate-200">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="bg-[#162B44] border-slate-700 text-white focus:border-[#C5A059]"
              required 
            />
          </div>
          <div className="space-y-2">
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
              className="bg-[#162B44] border-slate-700 text-white focus:border-[#C5A059]"
              required 
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#C5A059] text-[#0B1B2D] font-bold hover:bg-[#D4AF37] shadow-lg transition-all py-5" 
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In to Marketplace"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 text-center border-t border-slate-800 pt-6">
        <div className="text-xs text-slate-400">
          Don't have an account yet?
        </div>
        <div className="flex gap-4">
          <Link href="/auth/register/agent" className="text-xs font-semibold text-[#C5A059] hover:underline">Register as Travel Agent</Link>
          <span className="text-slate-700">|</span>
          <Link href="/auth/register/dmc" className="text-xs font-semibold text-[#C5A059] hover:underline">Register as DMC</Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC] px-4">
      <Suspense fallback={
        <Card className="w-full max-w-md border border-slate-200 bg-[#0B1B2D] p-8 text-center text-slate-300">
          <div>Loading portal...</div>
        </Card>
      }>
        <LoginForm />
      </Suspense>
    </div>
  )
}
