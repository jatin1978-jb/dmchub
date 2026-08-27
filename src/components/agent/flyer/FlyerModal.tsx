'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Copy, Share2, Printer, Check, Sparkles, DollarSign, Percent } from "lucide-react"
import FlyerCard from "./FlyerCard"
import { toast } from "sonner"

interface FlyerModalProps {
  pkg: any
  basePrice: number
}

export default function FlyerModal({ pkg, basePrice }: FlyerModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [markupType, setMarkupType] = useState<"fixed" | "percent">("fixed")
  const [markupValue, setMarkupValue] = useState<number>(0)
  const [customNote, setCustomNote] = useState<string>("Special package offer curated exclusively for you!")
  const [copied, setCopied] = useState(false)

  // Calculate final flyer price per person
  const computedMarkup = markupType === "fixed" ? markupValue : (basePrice * markupValue) / 100
  const finalPricePerPerson = basePrice + computedMarkup

  const handleCopyLink = () => {
    const url = `${window.location.origin}/agent/packages/${pkg.id}?flyer=true&price=${finalPricePerPerson}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success("Flyer link copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareWhatsApp = () => {
    const message = `🌟 *${pkg.title}* 🌟\n📍 *Destination:* ${pkg.destination}\n⏳ *Duration:* ${pkg.durationDays} Days / ${pkg.durationNights} Nights\n💰 *Price:* ${pkg.currency || "USD"} $${finalPricePerPerson.toLocaleString()} / person\n\n"${customNote}"\n\nCheck out the flyer: ${window.location.href}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button variant="outline" className="h-11 px-5 border-blue-200 text-blue-800 bg-blue-50/60 hover:bg-blue-100 font-bold rounded-xl shadow-xs transition-all flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
          Send Flyer
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto p-0 rounded-3xl border-none shadow-2xl">
        <DialogHeader className="p-6 bg-slate-900 text-white rounded-t-3xl border-b border-slate-800 sticky top-0 z-20 flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5 text-amber-400" /> Package Flyer Generator
          </DialogTitle>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handleCopyLink} className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 font-semibold text-xs">
              {copied ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
              {copied ? "Copied" : "Copy Link"}
            </Button>
            <Button type="button" size="sm" onClick={handleShareWhatsApp} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">
              <Share2 className="w-3.5 h-3.5 mr-1" /> WhatsApp
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs">
              <Printer className="w-3.5 h-3.5 mr-1" /> Print / PDF
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-50/50">
          {/* Left Column: Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">1. Agency Pricing & Markup</h4>
              
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700">Base Net Rate / Person</Label>
                <div className="h-9 px-3 bg-slate-100 rounded-lg flex items-center justify-between text-sm font-bold text-slate-600">
                  <span>Standard Rate</span>
                  <span>${basePrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700">Agency Commission / Markup</Label>
                <div className="flex gap-2">
                  <div className="flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                    <button 
                      type="button" 
                      onClick={() => setMarkupType("fixed")}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${markupType === 'fixed' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
                    >
                      <DollarSign className="w-3 h-3 inline" /> $ Fixed
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setMarkupType("percent")}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${markupType === 'percent' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
                    >
                      <Percent className="w-3 h-3 inline" /> % Percent
                    </button>
                  </div>
                  <Input 
                    type="number" 
                    min="0"
                    className="h-9 text-sm font-bold flex-1"
                    value={markupValue}
                    onChange={(e) => setMarkupValue(parseFloat(e.target.value) || 0)}
                    placeholder={markupType === "fixed" ? "Add $ markup" : "Add % markup"}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-sm font-black">
                <span className="text-slate-500 text-xs">Flyer Price / Person:</span>
                <span className="text-emerald-600 text-lg">${finalPricePerPerson.toLocaleString()}</span>
              </div>
            </div>

            {/* Custom Note */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">2. Customer Greeting / Note</h4>
              <Textarea 
                value={customNote} 
                onChange={(e) => setCustomNote(e.target.value)} 
                placeholder="Write a custom headline or note for your traveler..." 
                className="h-24 text-xs resize-none" 
              />
            </div>
          </div>

          {/* Right Column: Live Flyer Preview */}
          <div className="lg:col-span-7">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Flyer Preview</span>
              <span className="text-emerald-600 font-semibold">Live Rendering</span>
            </div>
            <FlyerCard 
              pkg={pkg} 
              customPricePerPerson={finalPricePerPerson} 
              customMessage={customNote}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
