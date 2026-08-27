'use client'

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileSpreadsheet, Copy, Share2, Printer, Check, Sparkles, DollarSign, Percent, Mail, Send, CheckCircle2, User, Hotel, Car, Compass, Edit3 } from "lucide-react"
import QuotationSheet from "./QuotationSheet"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface QuotationModalProps {
  pkg: any
  basePrice: number
}

export default function QuotationModal({ pkg, basePrice }: QuotationModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"setup" | "itinerary" | "preview">("setup")

  // Customer & Contact Details
  const [customerName, setCustomerName] = useState("Mr. John & Sarah Smith")
  const [customerEmail, setCustomerEmail] = useState("john.smith@example.com")
  const [travelDates, setTravelDates] = useState("Nov 15 - Nov 20, 2026")
  const [adultsCount, setAdultsCount] = useState<number>(2)
  const [childrenCount, setChildrenCount] = useState<number>(0)
  
  // Markup State
  const [markupType, setMarkupType] = useState<"fixed" | "percent">("fixed")
  const [markupInput, setMarkupInput] = useState<number>(150)
  const [appliedMarkup, setAppliedMarkup] = useState<number>(150)

  // Itinerary Customizer State (cloned from pkg.itineraryDays)
  const [customDays, setCustomDays] = useState<any[]>([])
  const [copied, setCopied] = useState(false)
  const [emailSending, setEmailSending] = useState(false)

  // Initialize customDays from package
  useEffect(() => {
    if (pkg.itineraryDays) {
      const initialDays = pkg.itineraryDays.map((day: any) => ({
        ...day,
        items: day.items.map((item: any) => {
          const defaultOpt = item.options && item.options.length > 0 ? item.options[0].product : null
          const defaultAddOn = item.options && item.options.length > 0 ? item.options[0].priceAddOn : 0
          return {
            ...item,
            selectedOptionId: defaultOpt ? defaultOpt.id : null,
            selectedOption: defaultOpt ? { ...defaultOpt, priceAddOn: defaultAddOn } : null
          }
        })
      }))
      setCustomDays(initialDays)
    }
  }, [pkg])

  // Calculate Total Option Add-On Price Per Person
  const totalAddOnPerPerson = customDays.reduce((accDays, day) => {
    return accDays + (day.items || []).reduce((accItems: number, item: any) => {
      return accItems + (item.selectedOption ? item.selectedOption.priceAddOn || 0 : 0)
    }, 0)
  }, 0)

  const computedMarkup = markupType === "fixed" ? appliedMarkup : (basePrice * appliedMarkup) / 100
  const subtotalPerPerson = basePrice + totalAddOnPerPerson + computedMarkup
  const totalPax = adultsCount + childrenCount
  const grandTotalQuote = subtotalPerPerson * totalPax

  const handleApplyMarkup = () => {
    setAppliedMarkup(markupInput)
    toast.success(`Markup of ${markupType === 'fixed' ? '$' + markupInput : markupInput + '%'} applied to quote total!`)
  }

  // Option Swap Handler for Agent
  const handleOptionSelect = (dayIndex: number, itemIndex: number, productId: string) => {
    const updatedDays = [...customDays]
    const item = updatedDays[dayIndex].items[itemIndex]
    const matchedOpt = item.options.find((o: any) => o.inventoryProductId === productId || o.product?.id === productId)
    
    if (matchedOpt) {
      item.selectedOptionId = productId
      item.selectedOption = {
        ...(matchedOpt.product || matchedOpt),
        priceAddOn: matchedOpt.priceAddOn || 0
      }
    } else {
      item.selectedOptionId = null
      item.selectedOption = null
    }
    setCustomDays(updatedDays)
    toast.info("Itinerary option updated!")
  }

  // Handle Option Price Adjustment by Agent
  const handleOptionPriceEdit = (dayIndex: number, itemIndex: number, newAddOnPrice: number) => {
    const updatedDays = [...customDays]
    const item = updatedDays[dayIndex].items[itemIndex]
    if (item.selectedOption) {
      item.selectedOption.priceAddOn = newAddOnPrice
    }
    setCustomDays(updatedDays)
  }

  const handleSendEmail = () => {
    if (!customerEmail) {
      toast.error("Please enter client email address!")
      return
    }
    setEmailSending(true)
    setTimeout(() => {
      setEmailSending(false)
      toast.success(`Detailed Quotation sent to ${customerName} (${customerEmail})!`)
      const subject = `Official Travel Quotation: ${pkg.title}`
      const body = `Dear ${customerName},\n\nPlease find your customized travel quotation for ${pkg.title}.\nTotal Package Quote: $${grandTotalQuote.toLocaleString()} (${totalPax} travelers)\nTravel Dates: ${travelDates}\n\nView Quote Online: ${window.location.href}`
      window.open(`mailto:${customerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank')
    }, 800)
  }

  const handleCopyLink = () => {
    const url = `${window.location.origin}/agent/packages/${pkg.id}?quote=true&customer=${encodeURIComponent(customerName)}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success("Quotation link copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareWhatsApp = () => {
    const message = `📋 *CUSTOM TRAVEL QUOTATION*\nPrepared For: *${customerName}*\n📍 *Destination:* ${pkg.destination}\n⏳ *Duration:* ${pkg.durationDays} Days / ${pkg.durationNights} Nights\n👥 *Travelers:* ${adultsCount} Adults ${childrenCount > 0 ? `, ${childrenCount} Child` : ''}\n\n💰 *Total Customized Quote:* ${pkg.currency || "USD"} $${grandTotalQuote.toLocaleString()} ($${subtotalPerPerson.toLocaleString()} / person)\n\nView detailed day-by-day quote: ${window.location.href}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button className="h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4" />
          Send Quotation
        </Button>
      </DialogTrigger>

      {/* FULL-SIZE WIDE HIGH-END MODAL */}
      <DialogContent className="sm:max-w-6xl w-[96vw] max-h-[94vh] overflow-y-auto p-0 rounded-3xl border-none shadow-2xl bg-slate-950 text-white">
        {/* Sticky Header */}
        <DialogHeader className="p-6 bg-slate-900 text-white rounded-t-3xl border-b border-slate-800 sticky top-0 z-30 flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-black flex items-center gap-3 text-white tracking-tight">
            <Edit3 className="w-6 h-6 text-blue-400" /> Interactive Quote Customizer & Generator
          </DialogTitle>
          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" size="sm" onClick={handleCopyLink} className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 font-semibold text-xs h-10 px-4">
              {copied ? <Check className="w-4 h-4 mr-1.5 text-emerald-400" /> : <Copy className="w-4 h-4 mr-1.5" />}
              {copied ? "Copied" : "Copy Quote Link"}
            </Button>
            <Button type="button" size="sm" onClick={handleShareWhatsApp} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10 px-4">
              <Share2 className="w-4 h-4 mr-1.5" /> WhatsApp Quote
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10 px-4">
              <Printer className="w-4 h-4 mr-1.5" /> Print / PDF Quote
            </Button>
          </div>
        </DialogHeader>

        {/* Tabbed Navigation Bar */}
        <div className="p-6 sm:p-8 space-y-6">
          <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="space-y-6">
            <TabsList className="grid grid-cols-3 bg-slate-900 p-1.5 rounded-2xl max-w-2xl mx-auto border border-slate-800">
              <TabsTrigger value="setup" className="rounded-xl font-bold text-xs text-slate-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">1. Client Details & Markup</TabsTrigger>
              <TabsTrigger value="itinerary" className="rounded-xl font-bold text-xs text-slate-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">2. Customize Day-by-Day Plan</TabsTrigger>
              <TabsTrigger value="preview" className="rounded-xl font-bold text-xs text-slate-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">3. Large Live Quote Sheet</TabsTrigger>
            </TabsList>

            {/* TAB 1: Client & Markup Setup */}
            <TabsContent value="setup" className="space-y-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Client Contact Info */}
                <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-blue-400 flex items-center gap-2">
                    <User className="w-4 h-4" /> Client & Trip Details
                  </h4>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label className="text-xs font-bold text-slate-300">Client Full Name *</Label>
                      <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="e.g. Mr. John Smith" className="h-10 bg-slate-950 border-slate-800 text-white font-semibold rounded-xl text-sm" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-bold text-slate-300">Client Email Address *</Label>
                      <Input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="e.g. john@example.com" className="h-10 bg-slate-950 border-slate-800 text-white font-semibold rounded-xl text-sm" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-bold text-slate-300">Planned Travel Dates</Label>
                      <Input value={travelDates} onChange={(e) => setTravelDates(e.target.value)} placeholder="e.g. Nov 15 - Nov 20, 2026" className="h-10 bg-slate-950 border-slate-800 text-white font-semibold rounded-xl text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <Label className="text-xs font-bold text-slate-300">Adult Pax</Label>
                        <Input type="number" min="1" value={adultsCount} onChange={(e) => setAdultsCount(parseInt(e.target.value) || 1)} className="h-10 bg-slate-950 border-slate-800 text-white font-bold rounded-xl text-sm" />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-slate-300">Child Pax</Label>
                        <Input type="number" min="0" value={childrenCount} onChange={(e) => setChildrenCount(parseInt(e.target.value) || 0)} className="h-10 bg-slate-950 border-slate-800 text-white font-bold rounded-xl text-sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Markup & Dynamic Price Summary */}
                <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-amber-400 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Agency Markup & Price Summary
                  </h4>

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
                      />
                    </div>
                  </div>

                  {/* APPLY MARKUP BUTTON */}
                  <Button 
                    type="button" 
                    onClick={handleApplyMarkup}
                    className="w-full h-11 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Apply Markup to Quote Total
                  </Button>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Base Package Net Rate:</span>
                      <span className="font-bold text-white">${basePrice.toLocaleString()} / pax</span>
                    </div>
                    {totalAddOnPerPerson !== 0 && (
                      <div className="flex justify-between text-slate-400">
                        <span>Selected Hotel/Activity Adjustments:</span>
                        <span className={`font-bold ${totalAddOnPerPerson >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {totalAddOnPerPerson >= 0 ? `+$${totalAddOnPerPerson}` : `-$${Math.abs(totalAddOnPerPerson)}`} / pax
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-400">
                      <span>Agency Management Fee:</span>
                      <span className="font-bold text-white">+${computedMarkup.toLocaleString()} / pax</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-black">
                      <span className="text-slate-300">Quote Price per Person:</span>
                      <span className="text-emerald-400 text-base">${subtotalPerPerson.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Grand Total Bar */}
                  <div className="bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-500/30 p-4 rounded-2xl flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Grand Total Quote ({totalPax} Pax)</span>
                      <span className="text-2xl font-black text-emerald-400">${grandTotalQuote.toLocaleString()}</span>
                    </div>
                    <Button type="button" onClick={handleSendEmail} disabled={emailSending} className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 h-10 rounded-xl shadow-md">
                      <Send className="w-3.5 h-3.5 mr-1.5" /> {emailSending ? "Sending..." : "Send Email Quote"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="button" onClick={() => setActiveTab("itinerary")} className="bg-slate-800 hover:bg-blue-600 text-white font-bold px-8 h-11 rounded-xl">
                  Next: Customize Day-by-Day Plan ➔
                </Button>
              </div>
            </TabsContent>

            {/* TAB 2: Interactive Day-by-Day Itinerary Customizer */}
            <TabsContent value="itinerary" className="space-y-6">
              <div className="bg-blue-950/80 p-4 rounded-2xl border border-blue-900 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-white">Customize Day-by-Day Hotel & Activity Options</h4>
                  <p className="text-xs text-slate-300">Swap hotel tiers (3★ vs 4★ vs 5★), change room types, or adjust add-on prices for this client.</p>
                </div>
                <Button type="button" onClick={() => setActiveTab("preview")} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 h-10 rounded-xl">
                  Preview Final Quote Sheet ➔
                </Button>
              </div>

              <div className="space-y-6">
                {customDays.map((day: any, dIdx: number) => (
                  <div key={dIdx} className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-lg">Day {day.dayNumber}</span>
                        <Input 
                          value={day.title} 
                          onChange={(e) => {
                            const updated = [...customDays]
                            updated[dIdx].title = e.target.value
                            setCustomDays(updated)
                          }}
                          className="h-9 font-extrabold text-sm w-72 bg-slate-950 border-slate-800 text-white"
                        />
                      </div>
                      {day.destinationName && (
                        <span className="text-xs font-bold text-blue-400 bg-blue-900/50 px-3 py-1 rounded-full border border-blue-800">{day.destinationName}</span>
                      )}
                    </div>

                    {/* Slots for this day */}
                    <div className="space-y-3">
                      {day.items.map((item: any, iIdx: number) => (
                        <div key={iIdx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                            <div className="flex items-center gap-2.5 font-bold text-xs text-slate-200">
                              {item.type === 'HOTEL' ? <Hotel className="w-4 h-4 text-amber-400" /> : <Car className="w-4 h-4 text-emerald-400" />}
                              <span>{item.title}</span>
                            </div>

                            {/* Options Dropdown Selector */}
                            {item.options && item.options.length > 0 && (
                              <div className="flex items-center gap-3">
                                <Select 
                                  value={item.selectedOptionId || ''} 
                                  onValueChange={(val) => handleOptionSelect(dIdx, iIdx, val)}
                                >
                                  <SelectTrigger className="h-9 text-xs font-bold w-72 bg-slate-900 border-slate-700 text-white">
                                    <SelectValue placeholder="Select Option" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-slate-900 text-white border-slate-800">
                                    {item.options.map((opt: any) => {
                                      const prod = opt.product || opt
                                      return (
                                        <SelectItem key={prod.id} value={prod.id} className="text-xs focus:bg-slate-800 focus:text-white">
                                          {prod.name} {prod.starRating ? `(★ ${prod.starRating})` : ''} {prod.roomType ? `[${prod.roomType}]` : ''} - {opt.priceAddOn > 0 ? `+$${opt.priceAddOn}` : opt.priceAddOn < 0 ? `-$${Math.abs(opt.priceAddOn)}` : 'Included'}
                                        </SelectItem>
                                      )
                                    })}
                                  </SelectContent>
                                </Select>

                                {/* Custom Price Add-On Override */}
                                {item.selectedOption && (
                                  <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Delta:</span>
                                    <Input 
                                      type="number" 
                                      className="h-7 w-20 text-xs font-bold bg-slate-950 text-emerald-400 border-slate-800 p-1"
                                      value={item.selectedOption.priceAddOn || 0}
                                      onChange={(e) => handleOptionPriceEdit(dIdx, iIdx, parseFloat(e.target.value) || 0)}
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* TAB 3: Large Live Final Quotation Preview */}
            <TabsContent value="preview" className="space-y-6">
              <div className="bg-slate-900 p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-2xl">
                <QuotationSheet 
                  pkg={pkg}
                  customerName={customerName}
                  travelDates={travelDates}
                  adultsCount={adultsCount}
                  childrenCount={childrenCount}
                  customDays={customDays}
                  basePricePerPerson={basePrice}
                  totalAddOnPerPerson={totalAddOnPerPerson}
                  agentMarkup={computedMarkup}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
