'use client'

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Clock, Globe, MapPin, CheckCircle2, AlertCircle } from "lucide-react"
import BookingForm from "@/components/agent/BookingForm"
import ItineraryViewer from "@/components/agent/itinerary/ItineraryViewer"

export default function PackageDetailsClient({ pkg, existingHold }: { pkg: any, existingHold: any }) {
  const [totalAddOn, setTotalAddOn] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>({})

  const [movedItems, setMovedItems] = useState<Record<string, number>>({})

  const handleItineraryChange = (addOn: number, options: Record<string, any>, moved: Record<string, number> = {}) => {
    setTotalAddOn(addOn)
    setSelectedOptions(options)
    setMovedItems(moved)
  }

  const hasTiers = pkg.hotelTiers && pkg.hotelTiers.length > 0;
  const [selectedTierId, setSelectedTierId] = useState<string | null>(hasTiers ? pkg.hotelTiers[0].id : null);
  
  const selectedTier = hasTiers ? pkg.hotelTiers.find((t: any) => t.id === selectedTierId) : null;
  const currentBasePrice = selectedTier ? selectedTier.pricePerPerson : pkg.pricePerPerson;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Left Column: Details & Itinerary */}
      <div className="lg:col-span-2 space-y-12 min-w-0">
        <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.12)]">
          {pkg.images && pkg.images.length > 0 ? (
            <img src={pkg.images[0].url} alt={pkg.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center">No Image</div>
          )}
          <div className="absolute top-6 left-6 flex gap-3">
            <Badge className="bg-white/95 backdrop-blur-sm text-slate-900 text-sm font-bold uppercase tracking-widest px-4 py-2 shadow-xl">{pkg.destination}</Badge>
            <Badge className="bg-blue-600/95 backdrop-blur-sm text-white text-sm font-bold uppercase tracking-widest px-4 py-2 shadow-xl">{pkg.targetNationalities} Targeted</Badge>
          </div>
        </div>

        <div className="space-y-6 px-2">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 leading-tight">{pkg.title}</h1>
          <div className="flex flex-wrap gap-8 text-slate-500 font-bold text-sm tracking-wide uppercase">
            <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-blue-600" /> {pkg.durationDays} Days / {pkg.durationNights} Nights</div>
            <div className="flex items-center gap-2"><Globe className="w-5 h-5 text-emerald-600" /> {pkg.seasonality} Season</div>
            <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-rose-500" /> {pkg.destination}</div>
          </div>
        </div>

        {/* Hotel Pricing Tiers */}
        {hasTiers && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Select Hotel Tier</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pkg.hotelTiers.map((tier: any) => (
                <div 
                  key={tier.id}
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${selectedTierId === tier.id ? 'border-blue-600 bg-blue-50/50 shadow-md' : 'border-slate-200 hover:border-blue-300 bg-white'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-slate-800">{tier.tierName}</h3>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">per person</p>
                      <p className="font-black text-blue-600 text-lg">{pkg.currency} {tier.pricePerPerson}</p>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 bg-white/50 p-3 rounded-lg border border-slate-100 whitespace-pre-line">
                    <span className="font-semibold block mb-1">Hotels Included:</span>
                    {tier.hotelsList}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Day-by-Day Itinerary Viewer */}
        {pkg.itineraryDays && pkg.itineraryDays.length > 0 ? (
          <ItineraryViewer 
            days={pkg.itineraryDays} 
            onChange={handleItineraryChange} 
          />
        ) : (
          <div className="bg-slate-50 p-8 rounded-3xl border border-gray-100 text-center text-slate-500">
            No detailed itinerary available for this package.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" /> What's Included
              </h3>
              <div className="whitespace-pre-line text-gray-600 leading-relaxed">
                {pkg.inclusions}
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-gray-100 space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2 text-slate-400">
                <AlertCircle className="w-6 h-6" /> What's Excluded
              </h3>
              <div className="whitespace-pre-line text-gray-500 leading-relaxed">
                {pkg.exclusions}
              </div>
            </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 space-y-4">
          <h3 className="text-xl font-bold text-blue-900">Cultural & Lifestyle Notes</h3>
          <p className="text-blue-800 italic text-lg">
            "{pkg.culturalNotes || "This package is optimized for " + pkg.targetNationalities + " travelers with specific attention to dietary and cultural needs."}"
          </p>
        </div>

        {pkg.dmc && (
          <div className="p-8 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">DMC PARTNER</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-black">
                {pkg.dmc.companyName?.[0]}
              </div>
              <div>
                <p className="font-bold text-lg">{pkg.dmc.companyName}</p>
                <p className="text-sm text-gray-500">{pkg.dmc.country} • Verified Partner</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Booking Form */}
      <div className="lg:col-span-1">
        <div className="sticky top-20 space-y-4">
          {existingHold && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-900 font-bold text-sm">Package already on hold</p>
                <p className="text-amber-700 text-xs mt-0.5">
                  You have an active hold for this package expiring on {new Date(existingHold.holdExpires).toLocaleString()}.
                </p>
              </div>
            </div>
          )}
          <BookingForm 
            pkg={pkg} 
            existingHold={existingHold} 
            customAddOnPrice={totalAddOn} 
            selectedOptions={selectedOptions}
            basePricePerPerson={currentBasePrice}
            movedItems={movedItems}
          />
        </div>
      </div>
    </div>
  )
}
