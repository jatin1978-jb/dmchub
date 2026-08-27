'use client'

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileSpreadsheet, Copy, Share2, Printer, Check, Sparkles, DollarSign, Percent, Plus, Trash2, Edit3, Hotel, Car, Compass } from "lucide-react"
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

  // Customer & Pricing State
  const [customerName, setCustomerName] = useState("Mr. John & Sarah Smith")
  const [travelDates, setTravelDates] = useState("Nov 15 - Nov 20, 2026")
  const [adultsCount, setAdultsCount] = useState<number>(2)
  const [childrenCount, setChildrenCount] = useState<number>(0)
  
  const [markupType, setMarkupType] = useState<"fixed" | "percent">("fixed")
  const [markupValue, setMarkupValue] = useState<number>(100)

  // Itinerary Customizer State (cloned from pkg.itineraryDays)
  const [customDays, setCustomDays] = useState<any[]>([])
  const [copied, setCopied] = useState(false)

  // Initialize customDays from package
  useEffect(() => {
    if (pkg.itineraryDays) {
      const initialDays = pkg.itineraryDays.map((day: any) => ({
        ...day,
        items: day.items.map((item: any) => {
          // Preselect first available option or default
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

  const computedMarkup = markupType === "fixed" ? markupValue : (basePrice * markupValue) / 100

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

  const handleCopyLink = () => {
    const url = `${window.location.origin}/agent/packages/${pkg.id}?quote=true&customer=${encodeURIComponent(customerName)}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success("Quotation link copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareWhatsApp = () => {
    const totalPax = adultsCount + childrenCount
    const netPerPerson = basePrice + totalAddOnPerPerson + computedMarkup
    const grandTotal = netPerPerson * totalPax
    const message = `📋 *CUSTOM TRAVEL QUOTATION*\nPrepared For: *${customerName}*\n📍 *Destination:* ${pkg.destination}\n⏳ *Duration:* ${pkg.durationDays} Days / ${pkg.durationNights} Nights\n👥 *Travelers:* ${adultsCount} Adults ${childrenCount > 0 ? `, ${childrenCount} Child` : ''}\n\n💰 *Total Customized Quote:* ${pkg.currency || "USD"} $${grandTotal.toLocaleString()} ($${netPerPerson.toLocaleString()} / person)\n\nView detailed day-by-day quote: ${window.location.href}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button className="h-11 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4" />
          Send Quotation
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl max-h-[94vh] overflow-y-auto p-0 rounded-3xl border-none shadow-2xl">
        {/* Header Bar */}
        <DialogHeader className="p-6 bg-slate-900 text-white rounded-t-3xl border-b border-slate-800 sticky top-0 z-30 flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold flex items-center gap-2 text-white">
            <Edit3 className="w-5 h-5 text-blue-400" /> Interactive Quote Customizer & Generator
          </DialogTitle>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handleCopyLink} className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 font-semibold text-xs">
              {copied ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
              {copied ? "Copied" : "Copy Quote Link"}
            </Button>
            <Button type="button" size="sm" onClick={handleShareWhatsApp} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">
              <Share2 className="w-3.5 h-3.5 mr-1" /> WhatsApp Quote
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs">
              <Printer className="w-3.5 h-3.5 mr-1" /> Print / PDF Quote
            </Button>
          </div>
        </DialogHeader>

        {/* Tabbed Steps */}
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="space-y-6">
            <TabsList className="grid grid-cols-3 bg-slate-100 p-1.5 rounded-2xl max-w-xl mx-auto">
              <TabsTrigger value="setup" className="rounded-xl font-bold text-xs">1. Customer & Price Setup</TabsTrigger>
              <TabsTrigger value="itinerary" className="rounded-xl font-bold text-xs">2. Customize Day Itinerary</TabsTrigger>
              <TabsTrigger value="preview" className="rounded-xl font-bold text-xs">3. Live Quote Preview</TabsTrigger>
            </TabsList>

            {/* TAB 1: Customer & Pricing Setup */}
            <TabsContent value="setup" className="space-y-6 max-w-3xl mx-auto">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                <h3 className="text-base font-black text-slate-800 uppercase tracking-wider">Customer & Traveler Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-bold">Client / Customer Name *</Label>
                    <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="e.g. Mr. John Doe" className="h-10 text-sm font-semibold" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-bold">Planned Travel Dates</Label>
                    <Input value={travelDates} onChange={(e) => setTravelDates(e.target.value)} placeholder="e.g. Nov 15 - Nov 20, 2026" className="h-10 text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-bold">Adult Pax</Label>
                    <Input type="number" min="1" value={adultsCount} onChange={(e) => setAdultsCount(parseInt(e.target.value) || 1)} className="h-10 text-sm font-bold" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-bold">Child Pax (Opt)</Label>
                    <Input type="number" min="0" value={childrenCount} onChange={(e) => setChildrenCount(parseInt(e.target.value) || 0)} className="h-10 text-sm font-bold" />
                  </div>
                </div>
              </div>

              {/* Agency Commission / Markup Controls */}
              <div className="bg-blue-50/60 p-6 rounded-3xl border border-blue-100 shadow-xs space-y-4">
                <h3 className="text-base font-black text-blue-950 uppercase tracking-wider">Agency Commission & Management Fee</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div>
                    <Label className="text-xs font-bold text-slate-700">Base Net Rate</Label>
                    <p className="text-lg font-black text-slate-900">${basePrice.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ pax</span></p>
                  </div>

                  <div>
                    <Label className="text-xs font-bold text-slate-700">Markup Type</Label>
                    <div className="flex gap-2 mt-1">
                      <button 
                        type="button" 
                        onClick={() => setMarkupType("fixed")}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${markupType === 'fixed' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'}`}
                      >
                        $ Fixed
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setMarkupType("percent")}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${markupType === 'percent' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'}`}
                      >
                        % Percent
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-bold text-slate-700">Markup Amount</Label>
                    <Input 
                      type="number" 
                      min="0"
                      className="h-10 text-sm font-bold bg-white mt-1"
                      value={markupValue}
                      onChange={(e) => setMarkupValue(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button type="button" onClick={() => setActiveTab("itinerary")} className="bg-slate-900 hover:bg-blue-600 text-white font-bold px-8 h-11 rounded-xl">
                  Next: Customize Day Itinerary ➔
                </Button>
              </div>
            </TabsContent>

            {/* TAB 2: Interactive Day-by-Day Itinerary Customizer */}
            <TabsContent value="itinerary" className="space-y-6">
              <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-blue-950">Modify Day-by-Day Hotel & Activity Options</h4>
                  <p className="text-xs text-blue-800">Swap hotel tiers (3★ vs 4★ vs 5★), change room types, or adjust add-on prices for this client.</p>
                </div>
                <Button type="button" onClick={() => setActiveTab("preview")} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 h-9 rounded-lg">
                  Preview Final Quote ➔
                </Button>
              </div>

              <div className="space-y-6">
                {customDays.map((day: any, dIdx: number) => (
                  <div key={dIdx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center gap-3">
                        <span className="bg-slate-900 text-white text-xs font-black px-3 py-1 rounded-lg">Day {day.dayNumber}</span>
                        <Input 
                          value={day.title} 
                          onChange={(e) => {
                            const updated = [...customDays]
                            updated[dIdx].title = e.target.value
                            setCustomDays(updated)
                          }}
                          className="h-8 font-extrabold text-sm w-72"
                        />
                      </div>
                      {day.destinationName && (
                        <span className="text-xs font-bold text-blue-600">{day.destinationName}</span>
                      )}
                    </div>

                    {/* Slots for this day */}
                    <div className="space-y-3">
                      {day.items.map((item: any, iIdx: number) => (
                        <div key={iIdx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                            <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                              {item.type === 'HOTEL' ? <Hotel className="w-4 h-4 text-amber-600" /> : <Car className="w-4 h-4 text-emerald-600" />}
                              <span>{item.title}</span>
                            </div>

                            {/* Options Dropdown Selector */}
                            {item.options && item.options.length > 0 && (
                              <div className="flex items-center gap-3">
                                <Select 
                                  value={item.selectedOptionId || ''} 
                                  onValueChange={(val) => handleOptionSelect(dIdx, iIdx, val)}
                                >
                                  <SelectTrigger className="h-8 text-xs font-semibold w-64 bg-white">
                                    <SelectValue placeholder="Select Option" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {item.options.map((opt: any) => {
                                      const prod = opt.product || opt
                                      return (
                                        <SelectItem key={prod.id} value={prod.id} className="text-xs">
                                          {prod.name} {prod.starRating ? `(★ ${prod.starRating})` : ''} {prod.roomType ? `[${prod.roomType}]` : ''} - {opt.priceAddOn > 0 ? `+$${opt.priceAddOn}` : opt.priceAddOn < 0 ? `-$${Math.abs(opt.priceAddOn)}` : 'Included'}
                                        </SelectItem>
                                      )
                                    })}
                                  </SelectContent>
                                </Select>

                                {/* Custom Price Add-On Override */}
                                {item.selectedOption && (
                                  <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Delta ($):</span>
                                    <Input 
                                      type="number" 
                                      className="h-6 w-16 text-xs font-bold text-slate-900 p-1"
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

            {/* TAB 3: Live Final Quotation Preview */}
            <TabsContent value="preview" className="space-y-6">
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
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
