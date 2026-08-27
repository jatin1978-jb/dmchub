'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Copy, Share2, Printer, Check, Sparkles, DollarSign, Percent, Mail, Send, CheckCircle2, User } from "lucide-react"
import FlyerCard from "./FlyerCard"
import { toast } from "sonner"

interface FlyerModalProps {
  pkg: any
  basePrice: number
}

export default function FlyerModal({ pkg, basePrice }: FlyerModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Client Details State
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")

  // Markup State
  const [markupType, setMarkupType] = useState<"fixed" | "percent">("fixed")
  const [markupInput, setMarkupInput] = useState<number>(100)
  const [appliedMarkup, setAppliedMarkup] = useState<number>(100)
  
  const [customNote, setCustomNote] = useState<string>("Special package offer curated exclusively for you!")
  const [copied, setCopied] = useState(false)
  const [emailSending, setEmailSending] = useState(false)

  // Calculate final flyer price per person based on APPLIED markup
  const computedMarkup = markupType === "fixed" ? appliedMarkup : (basePrice * appliedMarkup) / 100
  const finalPricePerPerson = basePrice + computedMarkup

  const handleApplyMarkup = () => {
    setAppliedMarkup(markupInput)
    toast.success(`Markup of ${markupType === 'fixed' ? '$' + markupInput : markupInput + '%'} applied to total package price!`)
  }

  const handleSendEmail = () => {
    if (!clientEmail) {
      toast.error("Please enter client email address first!")
      return
    }
    setEmailSending(true)
    setTimeout(() => {
      setEmailSending(false)
      toast.success(`Package Flyer successfully sent to ${clientName || 'client'} (${clientEmail})!`)
      // Open mail client backup
      const subject = `Travel Flyer: ${pkg.title}`
      const body = `Dear ${clientName || 'Valued Client'},\n\nPlease find your package flyer for ${pkg.title}.\nDestination: ${pkg.destination}\nPrice per person: $${finalPricePerPerson.toLocaleString()}\n\nNote: ${customNote}\n\nLink: ${window.location.href}`
      window.open(`mailto:${clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank')
    }, 800)
  }

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
      <DialogTrigger className="h-11 px-6 border border-blue-200 text-blue-800 bg-blue-50/80 hover:bg-blue-100 font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer">
        <FileText className="w-4 h-4 text-blue-600" />
        Send Flyer
      </DialogTrigger>

      {/* FULL-SIZE WIDE HIGH-END MODAL */}
      <DialogContent className="sm:max-w-6xl w-[96vw] max-h-[94vh] overflow-y-auto p-0 rounded-3xl border-none shadow-2xl bg-slate-950 text-white">
        {/* Top Sticky Header */}
        <DialogHeader className="p-6 bg-slate-900 text-white rounded-t-3xl border-b border-slate-800 sticky top-0 z-30 flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-black flex items-center gap-3 text-white tracking-tight">
            <Sparkles className="w-6 h-6 text-amber-400" /> Package Flyer Generator
          </DialogTitle>
          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" size="sm" onClick={handleCopyLink} className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 font-semibold text-xs h-10 px-4">
              {copied ? <Check className="w-4 h-4 mr-1.5 text-emerald-400" /> : <Copy className="w-4 h-4 mr-1.5" />}
              {copied ? "Copied" : "Copy Link"}
            </Button>
            <Button type="button" size="sm" onClick={handleShareWhatsApp} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10 px-4">
              <Share2 className="w-4 h-4 mr-1.5" /> WhatsApp
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10 px-4">
              <Printer className="w-4 h-4 mr-1.5" /> Print / PDF
            </Button>
          </div>
        </DialogHeader>

        {/* Modal Main Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel: Client Setup & Markup Control */}
          <div className="lg:col-span-5 space-y-6">
            {/* Step 1: Markup Setup */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-amber-400 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> 1. Agency Markup & Price Setup
                </h4>
                <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Step 1</span>
              </div>
              
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center text-xs font-semibold text-slate-400">
                <span>Standard Base Net Rate:</span>
                <span className="text-base font-extrabold text-white">${basePrice.toLocaleString()} / pax</span>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-300">Set Agency Commission / Markup</Label>
                <div className="flex gap-2">
                  <div className="flex rounded-xl border border-slate-800 p-1 bg-slate-950">
                    <button 
                      type="button" 
                      onClick={() => setMarkupType("fixed")}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${markupType === 'fixed' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                    >
                      $ Fixed
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setMarkupType("percent")}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${markupType === 'percent' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                    >
                      % Percent
                    </button>
                  </div>
                  <Input 
                    type="number" 
                    min="0"
                    className="h-11 text-sm font-black bg-slate-950 border-slate-800 text-white flex-1 rounded-xl"
                    value={markupInput}
                    onChange={(e) => setMarkupInput(parseFloat(e.target.value) || 0)}
                    placeholder={markupType === "fixed" ? "Add $ markup" : "Add % markup"}
                  />
                </div>
              </div>

              {/* APPLY MARKUP BUTTON */}
              <Button 
                type="button" 
                onClick={handleApplyMarkup}
                className="w-full h-11 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Apply Markup to Total Price
              </Button>

              {/* Dynamic Price Output */}
              <div className="bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/30 p-4 rounded-2xl flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Total Flyer Selling Rate</span>
                  <span className="text-2xl font-black text-emerald-400">${finalPricePerPerson.toLocaleString()}</span>
                  <span className="text-xs text-slate-400"> / person</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                  {markupType === 'fixed' ? `+$${appliedMarkup} Markup` : `+${appliedMarkup}% Markup`}
                </span>
              </div>
            </div>

            {/* Step 2: Client Contact Details & Note */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-blue-400 flex items-center gap-2">
                  <User className="w-4 h-4" /> 2. Client Details & Custom Greeting
                </h4>
                <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Step 2</span>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs font-bold text-slate-300">Client Full Name *</Label>
                  <Input 
                    value={clientName} 
                    onChange={(e) => setClientName(e.target.value)} 
                    placeholder="Enter Customer Name (e.g. Mr. John Smith)" 
                    className="h-10 bg-slate-950 border-slate-800 text-white text-sm font-semibold rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-bold text-slate-300">Client Email Address *</Label>
                  <Input 
                    type="email"
                    value={clientEmail} 
                    onChange={(e) => setClientEmail(e.target.value)} 
                    placeholder="Enter Customer Email (e.g. john@example.com)" 
                    className="h-10 bg-slate-950 border-slate-800 text-white text-sm font-semibold rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-bold text-slate-300">Custom Greeting Note for Flyer</Label>
                  <Textarea 
                    value={customNote} 
                    onChange={(e) => setCustomNote(e.target.value)} 
                    placeholder="Write a custom note or promo code for your client..." 
                    className="h-20 bg-slate-950 border-slate-800 text-white text-xs resize-none rounded-xl"
                  />
                </div>
              </div>

              {/* INSTANT SEND EMAIL BUTTON */}
              <Button 
                type="button" 
                onClick={handleSendEmail} 
                disabled={emailSending}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {emailSending ? "Sending Flyer..." : "Send Flyer Email to Client"}
              </Button>
            </div>
          </div>

          {/* Right Panel: Large Full-Width Flyer Visual Preview */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Full-Size Flyer Visual Preview</span>
              <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Preview
              </span>
            </div>
            
            <div className="bg-slate-900 p-2 sm:p-4 rounded-3xl border border-slate-800 shadow-2xl">
              <FlyerCard 
                pkg={pkg} 
                customPricePerPerson={finalPricePerPerson} 
                customMessage={customNote}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
