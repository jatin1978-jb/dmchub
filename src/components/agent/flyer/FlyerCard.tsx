'use client'

import { Clock, Globe, MapPin, CheckCircle2, XCircle, ShieldCheck, Phone, Mail, Award, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FlyerCardProps {
  pkg: any
  customPricePerPerson: number
  agentBranding?: {
    agencyName?: string
    contactPerson?: string
    phone?: string
    email?: string
    address?: string
  }
  customMessage?: string
}

export default function FlyerCard({ pkg, customPricePerPerson, agentBranding, customMessage }: FlyerCardProps) {
  const inclusionsList = pkg.inclusions 
    ? pkg.inclusions.split('\n').filter((i: string) => i.trim().length > 0)
    : ["4-Star Hotel Accommodation", "Daily Breakfast", "Airport Transfers (Private/SIC)", "Guided City Sightseeing"]

  const exclusionsList = pkg.exclusions
    ? pkg.exclusions.split('\n').filter((i: string) => i.trim().length > 0)
    : ["International Airfare", "Personal Expenses", "Visa Fees", "Travel Insurance"]

  return (
    <div id="flyer-card-printable" className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-2xl mx-auto print:shadow-none print:border-none print:max-w-full print:rounded-none">
      {/* Hero Image Header */}
      <div className="relative h-72 sm:h-80 w-full overflow-hidden">
        {pkg.images && pkg.images.length > 0 ? (
          <img src={pkg.images[0].url} alt={pkg.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-xl">
            {pkg.destination} Getaway
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          <Badge className="bg-white/95 text-slate-900 font-extrabold uppercase text-xs tracking-wider px-3 py-1.5 shadow-md">
            <MapPin className="w-3.5 h-3.5 mr-1 text-rose-500 inline" /> {pkg.destination}
          </Badge>
          <Badge className="bg-blue-600 text-white font-bold uppercase text-xs tracking-wider px-3 py-1.5 shadow-md">
            <Clock className="w-3.5 h-3.5 mr-1 inline" /> {pkg.durationDays} Days / {pkg.durationNights} Nights
          </Badge>
        </div>

        {/* Floating Price Pill */}
        <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-2xl shadow-2xl text-right">
          <p className="text-[10px] uppercase font-bold text-slate-300 tracking-widest">Starting From</p>
          <p className="text-2xl font-black text-emerald-400">
            {pkg.currency || "USD"} ${customPricePerPerson.toLocaleString()} <span className="text-xs font-normal text-slate-300">/ person</span>
          </p>
        </div>

        <div className="absolute bottom-4 left-4 right-32 text-white pr-2">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-md leading-tight">{pkg.title}</h2>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Optional Custom Message from Agent */}
        {customMessage && (
          <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-100 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-blue-950 leading-relaxed italic">
              "{customMessage}"
            </p>
          </div>
        )}

        {/* Quick Details Bar */}
        <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400">Duration</p>
            <p className="text-sm font-black text-slate-800">{pkg.durationDays}D / {pkg.durationNights}N</p>
          </div>
          <div className="border-x border-slate-200">
            <p className="text-[10px] font-bold uppercase text-slate-400">Seasonality</p>
            <p className="text-sm font-black text-slate-800">{pkg.seasonality || "Year-round"}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400">Target Pax</p>
            <p className="text-sm font-black text-blue-600">{pkg.targetNationalities || "Global"}</p>
          </div>
        </div>

        {/* Overview Paragraph */}
        {pkg.description && (
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Experience Overview</h4>
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{pkg.description}</p>
          </div>
        )}

        {/* Inclusions & Exclusions Side-by-Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Inclusions */}
          <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 space-y-3">
            <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Key Package Inclusions
            </h4>
            <ul className="space-y-2">
              {inclusionsList.map((item: string, idx: number) => (
                <li key={idx} className="text-xs font-medium text-slate-700 flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
            <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-slate-400 shrink-0" /> Exclusions
            </h4>
            <ul className="space-y-2">
              {exclusionsList.map((item: string, idx: number) => (
                <li key={idx} className="text-xs text-slate-500 flex items-start gap-2">
                  <span className="text-slate-400 shrink-0">•</span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Agent Branding Footer */}
        <div className="pt-6 border-t border-slate-200">
          <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="font-extrabold text-base text-white tracking-tight">
                  {agentBranding?.agencyName || "Global Travel Agency"}
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified Partner
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Contact: <span className="font-semibold text-white">{agentBranding?.contactPerson || "Travel Advisor"}</span>
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-1 text-xs text-slate-300 text-center sm:text-right shrink-0">
              <div className="flex items-center gap-1.5 justify-center sm:justify-end">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-mono text-white">{agentBranding?.phone || "+1 555-0199"}</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center sm:justify-end">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-slate-200">{agentBranding?.email || "booking@agency.com"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
