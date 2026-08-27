'use client'

import { Clock, MapPin, Calendar, Users, CheckCircle2, XCircle, ShieldCheck, Phone, Mail, Award, Hotel, Car, Compass } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface QuotationSheetProps {
  pkg: any
  customerName: string
  travelDates: string
  adultsCount: number
  childrenCount: number
  customDays: any[]
  basePricePerPerson: number
  totalAddOnPerPerson: number
  agentMarkup: number
  agentBranding?: {
    agencyName?: string
    contactPerson?: string
    phone?: string
    email?: string
    address?: string
  }
}

export default function QuotationSheet({
  pkg,
  customerName,
  travelDates,
  adultsCount,
  childrenCount,
  customDays,
  basePricePerPerson,
  totalAddOnPerPerson,
  agentMarkup,
  agentBranding
}: QuotationSheetProps) {
  const quoteRefNo = `QT-${Math.floor(100000 + Math.random() * 900000)}`
  const todayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  const totalPax = adultsCount + childrenCount
  const subtotalPerPerson = basePricePerPerson + totalAddOnPerPerson + agentMarkup
  const grandTotalQuote = subtotalPerPerson * totalPax

  const inclusionsList = pkg.inclusions 
    ? pkg.inclusions.split('\n').filter((i: string) => i.trim().length > 0)
    : ["Accommodation with Breakfast", "Private Airport & Inter-city Transfers", "All Sightseeing & Entry Tickets", "24/7 On-ground Agent Assistance"]

  const exclusionsList = pkg.exclusions
    ? pkg.exclusions.split('\n').filter((i: string) => i.trim().length > 0)
    : ["International Flights", "Visa Fees", "Personal Tipping & Expenses", "Travel Insurance"]

  return (
    <div id="quotation-sheet-printable" className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-w-3xl mx-auto print:shadow-none print:border-none print:max-w-full print:rounded-none">
      {/* Top Document Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">OFFICIAL TRAVEL QUOTATION</span>
            <span className="text-xs font-mono text-slate-400">Ref: {quoteRefNo}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{agentBranding?.agencyName || "Global Travel Agency"}</h1>
          <p className="text-xs text-slate-400 mt-1">Prepared by: {agentBranding?.contactPerson || "Travel Advisor"}</p>
        </div>

        <div className="bg-slate-800/90 border border-slate-700/80 p-4 rounded-2xl text-right text-xs text-slate-300 min-w-[200px] shrink-0">
          <p><span className="text-slate-400">Date:</span> <span className="font-bold text-white">{todayDate}</span></p>
          <p className="mt-1"><span className="text-slate-400">Valid Until:</span> <span className="font-bold text-emerald-400">7 Days from Issue</span></p>
        </div>
      </div>

      {/* Customer & Trip Meta Bar */}
      <div className="bg-blue-50/70 border-b border-blue-100 p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div>
          <p className="text-slate-400 uppercase font-bold text-[10px]">Prepared For</p>
          <p className="font-extrabold text-sm text-slate-900">{customerName || "Valued Client"}</p>
        </div>
        <div>
          <p className="text-slate-400 uppercase font-bold text-[10px]">Travel Dates</p>
          <p className="font-bold text-sm text-slate-900 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-blue-600 inline" /> {travelDates || "Flexible Dates"}
          </p>
        </div>
        <div>
          <p className="text-slate-400 uppercase font-bold text-[10px]">Travelers</p>
          <p className="font-bold text-sm text-slate-900 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-indigo-600 inline" /> {adultsCount} Adults {childrenCount > 0 ? `, ${childrenCount} Child` : ''}
          </p>
        </div>
        <div>
          <p className="text-slate-400 uppercase font-bold text-[10px]">Destination</p>
          <p className="font-bold text-sm text-blue-700 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-rose-500 inline" /> {pkg.destination}
          </p>
        </div>
      </div>

      {/* Hero Banner Card */}
      <div className="p-6 sm:p-8 space-y-8">
        <div className="relative h-64 rounded-2xl overflow-hidden shadow-md">
          {pkg.images && pkg.images.length > 0 ? (
            <img src={pkg.images[0].url} alt={pkg.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white font-bold">{pkg.title}</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <Badge className="bg-blue-600 text-white font-bold uppercase text-[10px] tracking-wider mb-2">Customized Itinerary Quote</Badge>
            <h2 className="text-2xl font-black tracking-tight">{pkg.title}</h2>
            <p className="text-xs text-slate-300 mt-1 flex items-center gap-3">
              <span><Clock className="w-3 h-3 inline mr-1" /> {pkg.durationDays} Days / {pkg.durationNights} Nights</span>
              <span>•</span>
              <span>{pkg.seasonality || "Year-round"}</span>
            </p>
          </div>
        </div>

        {/* Customized Day-by-Day Schedule Timeline */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-600" /> Customized Day-by-Day Itinerary
            </h3>
            <span className="text-xs text-slate-500 font-semibold">{customDays.length} Days Planned</span>
          </div>

          <div className="space-y-6 border-l-2 border-blue-200 pl-6 ml-2">
            {customDays.map((day: any, dIdx: number) => (
              <div key={dIdx} className="relative bg-slate-50/80 rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                {/* Timeline Dot */}
                <div className="absolute -left-[33px] top-6 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow-xs flex items-center justify-center" />

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-lg">Day {day.dayNumber}</span>
                    <h4 className="font-extrabold text-base text-slate-900">{day.title || `Day ${day.dayNumber}`}</h4>
                  </div>
                  {day.destinationName && (
                    <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-2.5 py-0.5 rounded-full">{day.destinationName}</span>
                  )}
                </div>

                {day.description && (
                  <p className="text-xs text-slate-600 leading-relaxed italic">{day.description}</p>
                )}

                {/* Day Items & Selected Options */}
                {day.items && day.items.length > 0 && (
                  <div className="space-y-2 pt-2">
                    {day.items.map((item: any, iIdx: number) => {
                      const selectedOpt = item.selectedOption
                      return (
                        <div key={iIdx} className="bg-white p-3 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2.5">
                            {item.type === 'HOTEL' ? (
                              <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0"><Hotel className="w-3.5 h-3.5" /></div>
                            ) : item.type === 'TRANSFER' ? (
                              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0"><Car className="w-3.5 h-3.5" /></div>
                            ) : (
                              <div className="p-2 rounded-lg bg-blue-100 text-blue-800 shrink-0"><Compass className="w-3.5 h-3.5" /></div>
                            )}

                            <div>
                              <p className="font-bold text-slate-800">{item.title}</p>
                              {selectedOpt && (
                                <p className="text-[11px] font-semibold text-blue-700 flex items-center gap-1.5 mt-0.5">
                                  <span>{selectedOpt.name}</span>
                                  {selectedOpt.starRating && <span className="bg-amber-100 text-amber-900 text-[9px] font-bold px-1.5 py-0.2 rounded">★ {selectedOpt.starRating}</span>}
                                  {selectedOpt.roomType && <span className="text-slate-500 font-normal">({selectedOpt.roomType})</span>}
                                </p>
                              )}
                            </div>
                          </div>

                          {selectedOpt && (
                            <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg shrink-0">
                              {selectedOpt.priceAddOn > 0 ? `+ $${selectedOpt.priceAddOn}` : selectedOpt.priceAddOn < 0 ? `- $${Math.abs(selectedOpt.priceAddOn)}` : 'Included ($0)'}
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary Breakdown */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <h3 className="text-lg font-black tracking-tight text-white border-b border-slate-800 pb-3">Price & Investment Breakdown</h3>
          
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center text-slate-300">
              <span>Standard Base Rate per Person:</span>
              <span className="font-bold text-white">${basePricePerPerson.toLocaleString()}</span>
            </div>

            {totalAddOnPerPerson !== 0 && (
              <div className="flex justify-between items-center text-slate-300">
                <span>Selected Hotel & Activity Upgrades / Adjustments:</span>
                <span className={`font-bold ${totalAddOnPerPerson >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {totalAddOnPerPerson >= 0 ? `+ $${totalAddOnPerPerson}` : `- $${Math.abs(totalAddOnPerPerson)}`}
                </span>
              </div>
            )}

            {agentMarkup > 0 && (
              <div className="flex justify-between items-center text-slate-300">
                <span>Service Fee & Agency Management:</span>
                <span className="font-bold text-white">+ ${agentMarkup.toLocaleString()}</span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm font-black text-white">
              <span>Net Custom Price per Person:</span>
              <span className="text-emerald-400 text-base">${subtotalPerPerson.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Total Package Price ({totalPax} Travelers)</p>
              <p className="text-2xl font-black text-emerald-400">${grandTotalQuote.toLocaleString()} <span className="text-xs text-slate-300 font-normal">{pkg.currency || "USD"} Total</span></p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs px-4 py-1.5 font-extrabold uppercase tracking-wider">
              Guaranteed Best Rate Quote
            </Badge>
          </div>
        </div>

        {/* Inclusions & Terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 space-y-2">
            <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Package Inclusions
            </h4>
            <ul className="space-y-1.5">
              {inclusionsList.map((inc: string, idx: number) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span> {inc}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-slate-400" /> Terms & Exclusions
            </h4>
            <ul className="space-y-1.5">
              {exclusionsList.map((exc: string, idx: number) => (
                <li key={idx} className="text-xs text-slate-500 flex items-start gap-1.5">
                  <span className="text-slate-400">•</span> {exc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Agent Footer */}
        <div className="pt-6 border-t border-slate-200 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            <p className="font-bold text-slate-800 text-sm">{agentBranding?.agencyName || "Global Travel Agency"}</p>
            <p>{agentBranding?.address || "Licensed Travel Partner"}</p>
          </div>
          <div className="flex gap-4">
            <span className="flex items-center gap-1 font-mono text-slate-700"><Phone className="w-3.5 h-3.5 text-blue-600" /> {agentBranding?.phone || "+1 555-0199"}</span>
            <span className="flex items-center gap-1 text-slate-700"><Mail className="w-3.5 h-3.5 text-blue-600" /> {agentBranding?.email || "quote@agency.com"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
