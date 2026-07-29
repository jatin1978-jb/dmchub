'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { placeHold } from "@/app/actions/booking"
import { toast } from "sonner"
import { Users, Baby, CreditCard, BookmarkPlus, Zap } from "lucide-react"

interface BookingFormProps {
  pkg: any
  existingHold?: any
  customAddOnPrice?: number
  selectedOptions?: Record<string, string>
  basePricePerPerson: number
  movedItems?: Record<string, number>
}

export default function BookingForm({ pkg, existingHold, customAddOnPrice = 0, selectedOptions = {}, basePricePerPerson, movedItems = {} }: BookingFormProps) {
  const router = useRouter()
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [loading, setLoading] = useState(false)

  const childPrice = basePricePerPerson * 0.7 // 70% for children as a default logic
  
  // Custom options are per person (adults and children)
  const totalTravelers = adults + children;
  const addonsTotal = customAddOnPrice * totalTravelers;
  const basePrice = (adults * basePricePerPerson) + (children * childPrice);
  const totalPrice = basePrice + addonsTotal;

  const handleHold = async () => {
    setLoading(true)
    if (isNaN(totalPrice) || totalPrice <= 0) {
      toast.error("Invalid price calculation. Please check traveler counts.")
      setLoading(false)
      return
    }

    try {
      const modifications = {
        selections: selectedOptions,
        movedItems: movedItems
      }
      await placeHold(pkg.id, adults, children, totalPrice, JSON.stringify(modifications))
      toast.success("Package placed on 48h hold successfully!")
      router.push("/agent/holds")
    } catch (err: any) {
      toast.error(err.message || "Failed to place hold. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-gray-200 shadow-xl rounded-3xl overflow-hidden">
      <CardHeader className="bg-slate-900 text-white p-6">
        <CardTitle className="text-xl">Book This Package</CardTitle>
        <p className="text-slate-400 text-xs mt-1">Select travelers to calculate final price</p>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-bold">
              <Users className="w-4 h-4 text-blue-500" /> Adults
            </Label>
            <Input 
              type="number" 
              min="1" 
              value={adults} 
              onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
              className="rounded-xl h-12"
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-bold">
              <Baby className="w-4 h-4 text-pink-500" /> Children
            </Label>
            <Input 
              type="number" 
              min="0" 
              value={children} 
              onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
              className="rounded-xl h-12"
            />
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-2xl space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Adult Price (x{adults})</span>
            <span className="font-bold">{pkg.currency} {basePricePerPerson * adults}</span>
          </div>
          {children > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Child Price (x{children})</span>
              <span className="font-bold">{pkg.currency} {(childPrice * children).toFixed(2)}</span>
            </div>
          )}
          {customAddOnPrice > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Customizations (x{totalTravelers})</span>
              <span className="font-bold text-blue-600">+{pkg.currency} {addonsTotal.toFixed(2)}</span>
            </div>
          )}
          <div className="pt-3 border-t border-blue-100 flex justify-between items-center">
            <span className="font-black text-blue-900">TOTAL PRICE</span>
            <span className="text-2xl font-black text-blue-600">{pkg.currency} {totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex flex-col gap-3">
        <Button 
          onClick={handleHold}
          disabled={loading || !!existingHold}
          className="w-full h-14 rounded-2xl text-lg font-black bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-900/20"
        >
          {loading ? "Placing Hold..." : existingHold ? "ALREADY ON HOLD" : "PLACE 48H HOLD"}
        </Button>
        <Button 
          className="w-full h-14 rounded-2xl bg-slate-900 text-white hover:bg-blue-600 font-black text-lg transition-colors"
          disabled={loading}
        >
          <Zap className="w-5 h-5 mr-2 fill-current" />
          BOOK NOW
        </Button>
        <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest mt-2">
          Hold expires automatically after 48 hours
        </p>
      </CardFooter>
    </Card>
  )
}
