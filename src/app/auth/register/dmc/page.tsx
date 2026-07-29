'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { registerDMC } from "@/app/actions/auth"

export default function RegisterDMC() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError("")
    try {
      await registerDMC(formData)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-2xl border-gray-200 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">DMC Registration</CardTitle>
          <CardDescription>Join the DMC Hub to reach thousands of agents worldwide</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}
          <form action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input id="companyName" name="companyName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input id="contactPerson" name="contactPerson" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work Email *</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" name="phone" type="tel" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input id="country" name="country" required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Office Address *</Label>
                <Input id="address" name="address" required />
              </div>
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-11" disabled={loading}>
                {loading ? "Registering..." : "Complete Registration"}
              </Button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 font-semibold hover:underline">Sign In</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
