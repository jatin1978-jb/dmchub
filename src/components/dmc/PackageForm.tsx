'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createPackage, updatePackage } from "@/app/actions/packages"
import { toast } from "sonner"
import { Globe, Clock, ShieldCheck, MapPin, Plus, Trash2, CalendarDays, Box, CheckSquare, Image as ImageIcon } from "lucide-react"

export default function PackageForm({ initialData }: { initialData?: any }) {
  // Step 1: Basic Details
  const [isMultiDestination, setIsMultiDestination] = useState(initialData?.isMultiDestination || false)
  const [durationNights, setDurationNights] = useState(initialData?.durationNights || 1)
  const [packageImages, setPackageImages] = useState<any[]>(initialData?.images || [])

  // Step 2: Inventory Pool
  const [inventoryProducts, setInventoryProducts] = useState<any[]>(initialData?.inventoryProducts || [])

  // Step 3: Itinerary Days
  const [itineraryDays, setItineraryDays] = useState<any[]>(initialData?.itineraryDays || [])

  // Auto-generate days based on nights
  useEffect(() => {
    const targetDays = durationNights + 1;
    setItineraryDays(prev => {
      const newDays = [...prev];
      if (newDays.length < targetDays) {
        for (let i = newDays.length; i < targetDays; i++) {
          newDays.push({ dayNumber: i + 1, title: "", description: "", items: [] })
        }
      } else if (newDays.length > targetDays) {
        newDays.length = targetDays; // truncate
      }
      return newDays;
    })
  }, [durationNights])

  // --- Package Images Handlers ---
  const addPackageImage = () => {
    // Mock upload
    setPackageImages([...packageImages, { url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1600', isPrimary: packageImages.length === 0 }])
  }
  const removePackageImage = (index: number) => {
    setPackageImages(packageImages.filter((_, i) => i !== index))
  }

  // --- Inventory Handlers ---
  const addInventoryProduct = (type: string) => {
    setInventoryProducts([...inventoryProducts, { 
      id: crypto.randomUUID(), // Temp ID for matching in UI
      type, 
      name: "", 
      description: "", 
      media: [] 
    }])
  }
  const updateInventoryProduct = (index: number, field: string, value: any) => {
    const newInv = [...inventoryProducts]
    newInv[index][field] = value
    setInventoryProducts(newInv)
  }
  const removeInventoryProduct = (index: number) => {
    const prodId = inventoryProducts[index].id
    setInventoryProducts(inventoryProducts.filter((_, i) => i !== index))
    
    // Also remove any selections of this product from itinerary days
    const newDays = [...itineraryDays]
    newDays.forEach(day => {
      day.items.forEach((item: any) => {
        item.options = item.options.filter((opt: any) => opt.inventoryProductId !== prodId)
      })
    })
    setItineraryDays(newDays)
  }
  const addInventoryMedia = (index: number) => {
    const newInv = [...inventoryProducts]
    newInv[index].media.push({ url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800', type: 'IMAGE' })
    setInventoryProducts(newInv)
  }

  // --- Itinerary Handlers ---
  const updateDay = (dayIndex: number, field: string, value: string) => {
    const newDays = [...itineraryDays]
    newDays[dayIndex][field] = value
    setItineraryDays(newDays)
  }

  const addItem = (dayIndex: number) => {
    const newDays = [...itineraryDays]
    newDays[dayIndex].items.push({ 
      id: crypto.randomUUID(),
      type: "ACTIVITY", 
      title: "", 
      time: "", 
      options: [] 
    })
    setItineraryDays(newDays)
  }
  const updateItem = (dayIndex: number, itemIndex: number, field: string, value: any) => {
    const newDays = [...itineraryDays]
    newDays[dayIndex].items[itemIndex][field] = value
    setItineraryDays(newDays)
  }
  const removeItem = (dayIndex: number, itemIndex: number) => {
    const newDays = [...itineraryDays]
    newDays[dayIndex].items.splice(itemIndex, 1)
    setItineraryDays(newDays)
  }

  // Toggle option selection in a slot
  const toggleOption = (dayIndex: number, itemIndex: number, inventoryProductId: string) => {
    const newDays = [...itineraryDays]
    const item = newDays[dayIndex].items[itemIndex]
    
    const existingIndex = item.options.findIndex((opt: any) => opt.inventoryProductId === inventoryProductId)
    if (existingIndex >= 0) {
      item.options.splice(existingIndex, 1)
    } else {
      item.options.push({ inventoryProductId, priceAddOn: 0, isDefault: item.options.length === 0 })
    }
    setItineraryDays(newDays)
  }
  const updateOptionPrice = (dayIndex: number, itemIndex: number, inventoryProductId: string, price: number) => {
    const newDays = [...itineraryDays]
    const item = newDays[dayIndex].items[itemIndex]
    const opt = item.options.find((o: any) => o.inventoryProductId === inventoryProductId)
    if (opt) opt.priceAddOn = price
    setItineraryDays(newDays)
  }

  async function handleSubmit(formData: FormData) {
    try {
      formData.append("packageImages", JSON.stringify(packageImages))
      formData.append("inventoryProducts", JSON.stringify(inventoryProducts))
      formData.append("itineraryDays", JSON.stringify(itineraryDays))
      
      if (initialData) {
        await updatePackage(initialData.id, formData)
        toast.success("Package updated successfully!")
      } else {
        await createPackage(formData)
        toast.success("Package created successfully!")
      }
    } catch (err) {
      console.error(err);
      toast.error(initialData ? "Failed to update package." : "Failed to create package. Please try again.")
    }
  }

  return (
    <form action={handleSubmit} className="max-w-4xl mx-auto space-y-12 pb-24">
      {/* STEP 1: BASIC DETAILS */}
      <div className="space-y-6">
        <div className="border-b pb-2">
          <h2 className="text-2xl font-bold text-slate-800">1. Basic Package Details</h2>
          <p className="text-slate-500">The core information and hero images.</p>
        </div>
        
        <Card className="border-none shadow-sm">
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="title">Package Title *</Label>
              <Input id="title" name="title" defaultValue={initialData?.title} placeholder="e.g. 5 Days Dubai Luxury Getaway" required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="destination">Destination *</Label>
                <Input id="destination" name="destination" defaultValue={initialData?.destination} placeholder="e.g. Dubai, UAE" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input id="currency" name="currency" defaultValue={initialData?.currency || "USD"} required />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="durationNights">Nights *</Label>
                <Input 
                  id="durationNights" 
                  name="durationNights" 
                  type="number" 
                  min="1" 
                  value={durationNights}
                  onChange={(e) => setDurationNights(parseInt(e.target.value) || 1)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="durationDays">Days (Auto)</Label>
                <Input id="durationDays" name="durationDays" type="number" value={durationNights + 1} readOnly className="bg-slate-50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pricePerPerson">Starting Price / Person *</Label>
                <Input id="pricePerPerson" name="pricePerPerson" type="number" step="0.01" defaultValue={initialData?.pricePerPerson} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Overview Description *</Label>
              <Textarea id="description" name="description" defaultValue={initialData?.description} placeholder="Describe the overall experience..." className="h-32" required />
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <Label className="flex items-center gap-2 mb-2"><ImageIcon className="w-4 h-4 text-blue-600"/> Package Hero Images</Label>
              <div className="flex gap-2 flex-wrap">
                {packageImages.map((img, i) => (
                  <div key={i} className="relative w-32 h-32 rounded-lg overflow-hidden border">
                    <img src={img.url} className="w-full h-full object-cover" />
                    <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 w-6 h-6" onClick={() => removePackageImage(i)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                <div onClick={addPackageImage} className="w-32 h-32 rounded-lg border-2 border-dashed flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer transition-colors">
                  <Plus className="w-6 h-6 mb-1" />
                  <span className="text-xs">Mock Upload</span>
                </div>
              </div>
            </div>
            
            {/* Multi-Destination & Cultural Targeting */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <Checkbox 
                  id="isMultiDestination" 
                  name="isMultiDestination" 
                  checked={isMultiDestination}
                  onCheckedChange={(checked) => setIsMultiDestination(!!checked)}
                />
                <div>
                  <Label htmlFor="isMultiDestination" className="font-bold text-slate-800 cursor-pointer">Multi-Destination Package</Label>
                  <p className="text-xs text-slate-500">Check this if the package spans multiple destinations (e.g. Bangkok + Phuket or Dubai + Abu Dhabi)</p>
                </div>
              </div>

              {isMultiDestination && (
                <div className="space-y-2 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <Label htmlFor="destinationsList">Destinations List *</Label>
                  <Input id="destinationsList" name="destinationsList" defaultValue={initialData?.destinationsList} placeholder="e.g. Bangkok, Phuket, Chiang Mai" required={isMultiDestination} />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetNationalities">Target Nationalities *</Label>
                  <Input id="targetNationalities" name="targetNationalities" defaultValue={initialData?.targetNationalities || "All"} placeholder="e.g. Arab, Indian, European, All" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seasonality">Seasonality *</Label>
                  <Select name="seasonality" defaultValue={initialData?.seasonality || "Year-round"}>
                    <SelectTrigger><SelectValue placeholder="Select Season" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Summer">Summer (April - July)</SelectItem>
                      <SelectItem value="Winter">Winter (October - March)</SelectItem>
                      <SelectItem value="Year-round">Year-round (All Months)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* STEP 2: PRODUCTS INVENTORY */}
      <div className="space-y-6">
        <div className="border-b pb-2 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">2. Products Inventory</h2>
            <p className="text-slate-500">Define the pool of hotels, transfers, and activities available in this package.</p>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => addInventoryProduct("HOTEL")}>+ Hotel</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => addInventoryProduct("TRANSFER")}>+ Transfer</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => addInventoryProduct("ACTIVITY")}>+ Activity</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => addInventoryProduct("RESTAURANT")}>+ Restaurant</Button>
          </div>
        </div>
        
        {inventoryProducts.length === 0 ? (
          <div className="text-center p-12 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
            <Box className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            No products defined. Add products here to select them in the itinerary builder.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inventoryProducts.map((prod, pIdx) => (
              <Card key={prod.id} className="border-slate-200 shadow-sm relative group overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${prod.type === 'HOTEL' ? 'bg-indigo-500' : prod.type === 'TRANSFER' ? 'bg-emerald-500' : prod.type === 'RESTAURANT' ? 'bg-orange-500' : 'bg-pink-500'}`} />
                <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100" onClick={() => removeInventoryProduct(pIdx)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
                <CardContent className="pt-4 space-y-3">
                  <div className="text-xs font-bold text-slate-400 tracking-wider">{prod.type}</div>
                  <div className="space-y-1">
                    <Label className="text-xs">Product Name</Label>
                    <Input value={prod.name || ''} onChange={e => updateInventoryProduct(pIdx, 'name', e.target.value)} placeholder="e.g. Marriott Resort" className="h-8 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Description</Label>
                    <Textarea value={prod.description || ''} onChange={e => updateInventoryProduct(pIdx, 'description', e.target.value)} placeholder="Product description..." className="h-16 text-sm resize-none" />
                  </div>
                  {prod.type === 'HOTEL' && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Star Rating</Label>
                        <Select value={prod.starRating || '4-Star'} onValueChange={v => updateInventoryProduct(pIdx, 'starRating', v)}>
                          <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Rating" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3-Star">3-Star</SelectItem>
                            <SelectItem value="4-Star">4-Star</SelectItem>
                            <SelectItem value="5-Star">5-Star</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Room Type</Label>
                        <Input value={prod.roomType || ''} onChange={e => updateInventoryProduct(pIdx, 'roomType', e.target.value)} placeholder="e.g. Standard Room, Sea View Suite" className="h-8 text-sm" />
                      </div>
                    </div>
                  )}

                  {prod.type === 'TRANSFER' && (
                    <div className="space-y-1 mt-2">
                      <Label className="text-xs">Transfer Mode</Label>
                      <Select value={prod.transferType || 'Seat in Coach (SIC)'} onValueChange={v => updateInventoryProduct(pIdx, 'transferType', v)}>
                        <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Transfer Mode" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Seat in Coach (SIC)">Seat in Coach (SIC)</SelectItem>
                          <SelectItem value="Private Sedan">Private Sedan</SelectItem>
                          <SelectItem value="Private SUV">Private SUV</SelectItem>
                          <SelectItem value="Speedboat / Flight">Speedboat / Flight</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Nationality Restriction for Hotel / Product */}
                  <div className="space-y-1 mt-2 bg-slate-50 p-2 rounded border border-slate-100">
                    <Label className="text-xs font-semibold text-slate-700">Target Nationality Target</Label>
                    <Select value={prod.targetNationalities || 'All'} onValueChange={v => updateInventoryProduct(pIdx, 'targetNationalities', v)}>
                      <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Target Nationality" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Nationalities (Global)</SelectItem>
                        <SelectItem value="Arab">Arab / GCC Nationals Only</SelectItem>
                        <SelectItem value="Indian">Indian Nationals Only</SelectItem>
                        <SelectItem value="European">European Nationals Only</SelectItem>
                        <SelectItem value="Asian">Asian Nationals Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1 mt-2">
                    <Label className="text-xs flex justify-between items-center">
                      Product Media
                      <button type="button" onClick={() => addInventoryMedia(pIdx)} className="text-blue-600 hover:underline">Mock Upload</button>
                    </Label>
                    <div className="flex gap-2 flex-wrap mt-1">
                      {prod.media?.map((m: any, mIdx: number) => (
                        <div key={mIdx} className="w-12 h-12 rounded border overflow-hidden">
                          <img src={m.url} className="w-full h-full object-cover" />
                        </div>
                      ))}
                      {(!prod.media || prod.media.length === 0) && (
                        <div className="w-12 h-12 rounded border border-dashed flex items-center justify-center text-slate-300">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* STEP 3: ITINERARY BUILDER */}
      <div className="space-y-6">
        <div className="border-b pb-2">
          <h2 className="text-2xl font-bold text-slate-800">3. Day-by-Day Itinerary</h2>
          <p className="text-slate-500">Build the daily schedule by selecting from your Products Inventory.</p>
        </div>

        <div className="space-y-6 border-l-2 border-blue-100 pl-6 ml-2">
          {itineraryDays.map((day, dIdx) => (
            <div key={dIdx} className="relative bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="absolute -left-[37px] top-6 w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-600" />
              </div>
              
              <div className="flex gap-4 mb-4">
                <div className="bg-blue-50 text-blue-700 font-bold px-4 py-2 rounded-lg flex items-center justify-center shrink-0">
                  Day {day.dayNumber}
                </div>
                <div className="flex-grow space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Input value={day.title} onChange={e => updateDay(dIdx, 'title', e.target.value)} placeholder="Day Title (e.g. Arrival & Leisure)" className="font-semibold md:col-span-2" />
                    {isMultiDestination && (
                      <Input value={day.destinationName || ''} onChange={e => updateDay(dIdx, 'destinationName', e.target.value)} placeholder="Destination (e.g. Bangkok)" className="text-sm font-semibold border-blue-200 bg-blue-50/30" />
                    )}
                  </div>
                  <Input value={day.description} onChange={e => updateDay(dIdx, 'description', e.target.value)} placeholder="Brief description of the day's events..." className="text-sm text-slate-600" />
                </div>
              </div>

              {/* Day Items (Slots) */}
              <div className="space-y-4 mt-6">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" /> Day Activities & Services
                </h4>
                
                {day.items.map((item: any, iIdx: number) => (
                  <div key={iIdx} className="bg-slate-50 border border-slate-100 rounded-lg p-4 relative group">
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100" onClick={() => removeItem(dIdx, iIdx)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex gap-4">
                      <div className="w-32 space-y-1">
                        <Label className="text-xs">Type</Label>
                        <Select value={item.type} onValueChange={v => updateItem(dIdx, iIdx, 'type', v)}>
                          <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="HOTEL">Hotel</SelectItem>
                            <SelectItem value="TRANSFER">Transfer</SelectItem>
                            <SelectItem value="ACTIVITY">Activity</SelectItem>
                            <SelectItem value="RESTAURANT">Restaurant</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-grow space-y-1">
                        <Label className="text-xs">Slot Title</Label>
                        <Input value={item.title} onChange={e => updateItem(dIdx, iIdx, 'title', e.target.value)} placeholder="e.g. Check-in to Hotel" className="h-8 text-sm" />
                      </div>
                      <div className="w-24 space-y-1">
                        <Label className="text-xs">Time (Opt)</Label>
                        <Input value={item.time || ''} onChange={e => updateItem(dIdx, iIdx, 'time', e.target.value)} type="time" className="h-8 text-sm" />
                      </div>
                      {item.type !== 'HOTEL' && (
                        <div className="w-32 space-y-1">
                          <Label className="text-xs">Opt-out Discount ($)</Label>
                          <Input value={item.optOutDiscount || 0} onChange={e => updateItem(dIdx, iIdx, 'optOutDiscount', parseFloat(e.target.value) || 0)} type="number" min="0" className="h-8 text-sm" />
                        </div>
                      )}
                    </div>

                    {/* Options Selection from Inventory */}
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <Label className="text-xs mb-2 block">Select Options from Inventory (Check all that apply)</Label>
                      {inventoryProducts.filter(p => p.type === item.type).length === 0 ? (
                        <p className="text-xs text-red-500 italic">No {item.type}s in inventory. Go to Step 2 to add some.</p>
                      ) : (
                        <div className="space-y-2">
                          {inventoryProducts.filter(p => p.type === item.type).map(prod => {
                            const isSelected = item.options.some((o: any) => o.inventoryProductId === prod.id)
                            const optData = item.options.find((o: any) => o.inventoryProductId === prod.id)
                            return (
                              <div key={prod.id} className="flex items-center gap-3 bg-white border p-2 rounded">
                                <Checkbox checked={isSelected} onCheckedChange={() => toggleOption(dIdx, iIdx, prod.id)} />
                                <Label htmlFor={`opt-${dIdx}-${iIdx}-${prod.id}`} className="text-sm font-medium flex-1 cursor-pointer">
                                  {prod.name} {prod.roomType && <span className="text-slate-500 italic">({prod.roomType})</span>}
                                </Label>
                                {isSelected && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500">Price Add-on: $</span>
                                    <Input 
                                      type="number" 
                                      className="h-7 w-20 text-xs" 
                                      value={optData.priceAddOn} 
                                      onChange={e => updateOptionPrice(dIdx, iIdx, prod.id, parseFloat(e.target.value) || 0)} 
                                    />
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                <Button type="button" variant="outline" size="sm" onClick={() => addItem(dIdx)} className="w-full border-dashed">
                  <Plus className="w-4 h-4 mr-2" /> Add Slot for Day {day.dayNumber}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 4: INCLUSIONS / EXCLUSIONS */}
      <div className="space-y-6">
        <div className="border-b pb-2">
          <h2 className="text-2xl font-bold text-slate-800">4. Inclusions & Exclusions</h2>
        </div>
        <Card className="border-none shadow-sm">
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="inclusions">What's Included *</Label>
              <Textarea id="inclusions" name="inclusions" defaultValue={initialData?.inclusions} placeholder="List hotels, transfers, tours included..." required className="h-24" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exclusions">What's Not Included</Label>
              <Textarea id="exclusions" name="exclusions" defaultValue={initialData?.exclusions} placeholder="List exclusions like visas, tips, airfare..." className="h-24" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* STEP 5: TERMS & CONDITIONS */}
      <div className="space-y-6">
        <div className="border-b pb-2">
          <h2 className="text-2xl font-bold text-slate-800">5. Terms & Conditions</h2>
        </div>
        <Card className="border-none shadow-sm bg-slate-50/50">
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label>Payment Terms & Bank Details</Label>
              <Textarea name="paymentTerms" defaultValue={initialData?.paymentTerms} placeholder="e.g. 30% Advance..." className="h-24 bg-white" />
            </div>
            <div className="space-y-2">
              <Label>Cancellation Policy</Label>
              <Textarea name="cancellationPolicy" defaultValue={initialData?.cancellationPolicy} placeholder="e.g. 100% refund..." className="h-24 bg-white" />
            </div>
            <div className="space-y-2">
              <Label>General Terms & Conditions</Label>
              <Textarea name="termsConditions" defaultValue={initialData?.termsConditions} placeholder="Standard T&C..." className="h-24 bg-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-8 border-t border-slate-200 sticky bottom-0 bg-white/80 backdrop-blur-md p-4 -mx-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] rounded-t-2xl z-10">
        <Button type="submit" className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
          {initialData ? "Save Package Changes" : "Publish Package"}
        </Button>
      </div>
    </form>
  )
}
