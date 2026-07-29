'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Sparkles } from "lucide-react"

interface SearchTabsProps {
  onSearch: (params: any) => void
  isLoading: boolean
}

export default function SearchTabs({ onSearch, isLoading }: SearchTabsProps) {
  // Form State
  const [nationality, setNationality] = useState("")
  const [passportCountry, setPassportCountry] = useState("")
  const [destination, setDestination] = useState("")
  const [travelDate, setTravelDate] = useState("")
  const [nights, setNights] = useState("")
  
  const handleSearch = () => {
    onSearch({
      nationality,
      passportCountry,
      travelDate,
      destination: destination.trim() || undefined,
      nights: nights ? parseInt(nights) : undefined
    })
  }

  const isFormValid = nationality && passportCountry && travelDate

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">Smart Search</h2>
      </div>

      <div className="bg-slate-50/50 rounded-2xl p-6 border border-blue-100">
        <p className="text-xl text-slate-700 leading-loose flex flex-wrap items-center gap-2">
          <span>I am a</span>
          <Select value={nationality} onValueChange={setNationality}>
            <SelectTrigger className="w-[140px] h-10 bg-white border-blue-200 font-medium text-blue-700 focus:ring-blue-500">
              <SelectValue placeholder="Nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Indian">Indian</SelectItem>
              <SelectItem value="American">American</SelectItem>
              <SelectItem value="British">British</SelectItem>
              <SelectItem value="Saudi">Saudi</SelectItem>
            </SelectContent>
          </Select>
          
          <span>Resident of</span>
          <Select value={passportCountry} onValueChange={setPassportCountry}>
            <SelectTrigger className="w-[160px] h-10 bg-white border-blue-200 font-medium text-blue-700 focus:ring-blue-500">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="India">India</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="UK">UK</SelectItem>
              <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
              <SelectItem value="UAE">UAE</SelectItem>
            </SelectContent>
          </Select>

          <span>and want to travel to</span>
          <Input 
            type="text" 
            placeholder="Anywhere" 
            className="w-[150px] h-10 bg-white border-blue-200 font-medium text-blue-700 focus:ring-blue-500 text-center"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <span>on</span>
          <Input 
            type="date" 
            className="w-[150px] h-10 bg-white border-blue-200 font-medium text-blue-700 focus:ring-blue-500"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
          />

          <span>for</span>
          <Input 
            type="number" 
            placeholder="#" 
            className="w-[80px] h-10 bg-white border-blue-200 font-medium text-blue-700 focus:ring-blue-500 text-center"
            value={nights}
            onChange={(e) => setNights(e.target.value)}
          />
          <span>nights.</span>
        </p>

        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleSearch} 
            disabled={isLoading || !isFormValid}
            className="h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md text-white font-medium"
          >
            <Search className="w-4 h-4 mr-2" />
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>
    </div>
  )
}
