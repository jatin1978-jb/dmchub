'use client'

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Edit2, MapPin, Building, Bus, Utensils, Activity, XCircle, ArrowRightLeft, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ItineraryItemOption {
  id: string;
  priceAddOn: number;
  isDefault: boolean;
  inventoryProduct?: {
    name: string;
    roomType?: string | null;
    description?: string | null;
    starRating?: string | null;
    targetNationalities?: string | null;
    transferType?: string | null;
    media: { url: string; type: string }[];
  }
}

interface ItineraryItemProps {
  item: {
    id: string;
    type: string;
    title: string;
    time: string | null;
    optOutDiscount?: number;
    options: ItineraryItemOption[];
  };
  selectedOptionId: string;
  onOptionChange: (itemId: string, optionId: string, addOnPrice: number) => void;
  availableDays?: number[];
  currentDayNumber?: number;
  onMoveItem?: (itemId: string, targetDayNumber: number) => void;
  travelerNationality?: string;
}

type ModifyMode = 'NONE' | 'HOTELS' | 'ROOMS' | 'STANDARD'

export default function ItineraryItemCard({ 
  item, 
  selectedOptionId, 
  onOptionChange,
  availableDays = [],
  currentDayNumber,
  onMoveItem,
  travelerNationality
}: ItineraryItemProps) {
  const [modifyMode, setModifyMode] = useState<ModifyMode>('NONE')
  const [viewingHotelName, setViewingHotelName] = useState<string | null>(null)

  // Inject a None option
  const mappedOptions = item.options.map(opt => ({
    id: opt.id,
    name: opt.inventoryProduct?.name || "Unnamed Product",
    roomType: opt.inventoryProduct?.roomType,
    starRating: opt.inventoryProduct?.starRating,
    targetNationalities: opt.inventoryProduct?.targetNationalities || "All",
    transferType: opt.inventoryProduct?.transferType,
    description: opt.inventoryProduct?.description,
    priceAddOn: opt.priceAddOn,
    isDefault: opt.isDefault,
    media: opt.inventoryProduct?.media || []
  }))
  
  const optionsWithNone = item.type !== 'HOTEL' 
    ? [...mappedOptions, { id: "NONE", name: "None (Opt-out)", roomType: null as string | null | undefined, starRating: null as string | null | undefined, targetNationalities: "All", transferType: null as string | null | undefined, priceAddOn: -(item.optOutDiscount || 0), isDefault: false, media: [], description: null }]
    : mappedOptions;
    
  const selectedOption = optionsWithNone.find(o => o.id === selectedOptionId) || optionsWithNone.find(o => o.isDefault) || optionsWithNone[0]

  const getIcon = () => {
    switch (item.type) {
      case 'HOTEL': return <Building className="w-5 h-5 text-indigo-500" />
      case 'TRANSFER': return <Bus className="w-5 h-5 text-amber-500" />
      case 'RESTAURANT': return <Utensils className="w-5 h-5 text-rose-500" />
      default: return <Activity className="w-5 h-5 text-emerald-500" />
    }
  }

  const handleSelect = (option: any) => {
    onOptionChange(item.id, option.id, option.priceAddOn)
    setModifyMode('NONE')
  }

  const uniqueHotels = Array.from(new Set(optionsWithNone.filter(o => o.id !== 'NONE').map(o => o.name)))

  return (
    <div className={cn("bg-white border-b border-slate-100 p-6 last:border-transparent transition-all relative group", selectedOption.id === "NONE" ? "opacity-60" : "")}>
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className="font-black text-slate-800 tracking-widest text-sm uppercase">{item.type}</span>
          {item.time && <span className="text-slate-400 text-xs font-bold">• {item.time}</span>}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Media */}
        {selectedOption.media && selectedOption.media.length > 0 && selectedOption.id !== "NONE" && (
          <div className="w-full md:w-56 shrink-0 space-y-2">
             <div className="w-full h-36 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-sm">
               <img src={selectedOption.media[0].url} className="w-full h-full object-cover" />
             </div>
             {selectedOption.media.length > 1 && (
               <div className="flex gap-2">
                 {selectedOption.media.slice(1, 4).map((m: any, i: number) => (
                   <div key={i} className="w-11 h-11 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                     <img src={m.url} className="w-full h-full object-cover" />
                   </div>
                 ))}
                 {selectedOption.media.length > 4 && (
                   <div className="w-11 h-11 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                     +{selectedOption.media.length - 4}
                   </div>
                 )}
               </div>
             )}
          </div>
        )}

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h4 className={cn("font-black text-xl text-slate-900 mb-2 leading-snug", selectedOption.id === "NONE" ? "line-through text-slate-400" : "")}>
            {selectedOption.name !== "None (Opt-out)" ? selectedOption.name : item.title}
          </h4>
          
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {selectedOption.starRating && (
              <span className="font-bold text-amber-800 text-xs bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                ★ {selectedOption.starRating}
              </span>
            )}
            {selectedOption.roomType && (
              <span className="font-bold text-blue-700 text-xs bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                {selectedOption.roomType}
              </span>
            )}
            {selectedOption.transferType && (
              <span className="font-bold text-emerald-700 text-xs bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
                🚌 {selectedOption.transferType}
              </span>
            )}
            {selectedOption.targetNationalities && selectedOption.targetNationalities !== "All" && (
              <span className="font-bold text-purple-700 text-xs bg-purple-50 border border-purple-100 px-2.5 py-0.5 rounded-full">
                👤 {selectedOption.targetNationalities} Nationals
              </span>
            )}
          </div>

          {selectedOption.name !== "None (Opt-out)" && !selectedOption.roomType && (
            <h5 className="font-bold text-slate-500 mb-3">{item.title}</h5>
          )}

          {selectedOption.description && (
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {selectedOption.description}
            </p>
          )}
        </div>

        {/* Right Action Column */}
        <div className="flex flex-col items-end justify-between shrink-0 min-w-[140px] md:border-l md:border-slate-100 md:pl-6 pt-4 md:pt-0 border-t border-slate-100 md:border-t-0 mt-4 md:mt-0">
          <div className="text-sm font-medium text-slate-600 flex flex-col items-end gap-1">
             <div className="flex items-center gap-1.5">
               {selectedOption.id === "NONE" ? <XCircle className="w-4 h-4 text-slate-400" /> : <Check className="w-4 h-4 text-emerald-500" />}
               {selectedOption.id === "NONE" ? "Removed" : "Included"}
             </div>
             {selectedOption.priceAddOn > 0 && <span className="text-sm text-blue-600 font-black mt-1">+$ {selectedOption.priceAddOn}</span>}
             {selectedOption.priceAddOn < 0 && <span className="text-sm text-emerald-600 font-black mt-1">-$ {Math.abs(selectedOption.priceAddOn)}</span>}
          </div>
          
          <div className="flex flex-col gap-3 mt-4 w-full">
            {item.type === 'HOTEL' ? (
              <>
                <Button size="sm" variant="outline" className="w-full text-xs font-bold text-blue-600 border-blue-200 hover:bg-blue-50" onClick={() => setModifyMode(modifyMode === 'HOTELS' ? 'NONE' : 'HOTELS')}>
                  CHANGE HOTEL
                </Button>
                <Button size="sm" variant="ghost" className="w-full text-xs font-bold text-slate-500 hover:text-blue-600" onClick={() => { setViewingHotelName(selectedOption.name); setModifyMode('ROOMS'); }}>
                  CHANGE ROOM
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" className="w-full text-xs font-bold text-blue-600 border-blue-200 hover:bg-blue-50" onClick={() => setModifyMode(modifyMode === 'STANDARD' ? 'NONE' : 'STANDARD')}>
                MODIFY
              </Button>
            )}
            {selectedOption.id !== "NONE" && item.type !== 'HOTEL' && (
              <button type="button" className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest text-right w-full" onClick={() => onOptionChange(item.id, "NONE", -(item.optOutDiscount || 0))}>
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {modifyMode !== 'NONE' && (
        <div className="mt-6 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
          
          {/* Day Mover Dropdown */}
          <div className="flex justify-end mb-4">
            {onMoveItem && availableDays.length > 0 && currentDayNumber && (
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-slate-400" />
                <Select
                  value={currentDayNumber.toString()}
                  onValueChange={(val: string | null) => {
                    if (val) {
                      onMoveItem(item.id, parseInt(val));
                      setModifyMode('NONE');
                    }
                  }}
                >
                  <SelectTrigger className="w-[140px] h-8 text-xs bg-slate-50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDays.map(dayNum => (
                      <SelectItem key={dayNum} value={dayNum.toString()}>
                        Move to Day {dayNum}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* HOTELS VIEW */}
          {modifyMode === 'HOTELS' && (
            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-800">Select Hotel</p>
              <div className="grid grid-cols-1 gap-3">
                {uniqueHotels.map(hotelName => {
                   const hotelRooms = optionsWithNone.filter(o => o.name === hotelName);
                   const baseRoom = hotelRooms.find(o => o.isDefault) || hotelRooms.sort((a,b) => a.priceAddOn - b.priceAddOn)[0];
                   const isSelectedHotel = selectedOption.name === hotelName;
                   
                   return (
                     <div key={hotelName} className={cn("border p-4 rounded-xl flex flex-col sm:flex-row gap-4 transition-all", isSelectedHotel ? "border-blue-500 bg-blue-50/30" : "bg-white hover:border-blue-300")}>
                        {baseRoom.media[0] && (
                          <img src={baseRoom.media[0].url} className="w-full sm:w-32 h-24 object-cover rounded-lg shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-bold text-slate-900 text-lg mb-1">{hotelName}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span className="text-sm text-slate-600">Includes {baseRoom.roomType}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs h-7 text-blue-600 border-blue-200 hover:bg-blue-50" onClick={() => { setViewingHotelName(hotelName); setModifyMode('ROOMS'); }}>
                              MORE ROOM OPTIONS
                            </Button>
                          </div>
                        </div>
                        <div className="text-right flex flex-col justify-between items-end sm:items-end sm:min-w-[100px]">
                          <p className={cn("font-black text-lg mb-2", baseRoom.priceAddOn > 0 ? "text-blue-600" : baseRoom.priceAddOn < 0 ? "text-emerald-600" : "text-slate-600")}>
                            {baseRoom.priceAddOn > 0 ? `+ $${baseRoom.priceAddOn}` : baseRoom.priceAddOn < 0 ? `- $${Math.abs(baseRoom.priceAddOn)}` : 'Included'}
                          </p>
                          <Button size="sm" className={cn("h-8 px-6 text-xs font-bold", isSelectedHotel ? "bg-emerald-500 hover:bg-emerald-600" : "bg-blue-600 hover:bg-blue-700")} onClick={() => handleSelect(baseRoom)}>
                            {isSelectedHotel ? 'SELECTED' : 'SELECT'}
                          </Button>
                        </div>
                     </div>
                   )
                })}
              </div>
            </div>
          )}

          {/* ROOMS VIEW */}
          {modifyMode === 'ROOMS' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-3">
                <Button variant="ghost" size="sm" onClick={() => setModifyMode('HOTELS')} className="text-blue-600 h-8 text-xs p-0 px-2 hover:bg-blue-50">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back to Hotels
                </Button>
                <p className="text-sm font-black text-slate-800 flex-1 text-right">{viewingHotelName} - Rooms</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {optionsWithNone.filter(o => o.name === viewingHotelName).map(opt => (
                    <div 
                      key={opt.id}
                      onClick={() => handleSelect(opt)}
                      className={cn(
                        "p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between",
                        selectedOption.id === opt.id 
                          ? "border-blue-500 bg-blue-50/50 shadow-sm" 
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      )}
                    >
                      <div className="mb-4">
                        <p className={cn("font-black text-lg mb-1", selectedOption.id === opt.id ? "text-blue-900" : "text-slate-800")}>
                          {opt.roomType || opt.name}
                        </p>
                        <div className="flex gap-2">
                          <span className="text-xs text-slate-500 flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> Breakfast included</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-end border-t border-slate-100 pt-3">
                        <div>
                          {opt.isDefault && <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Included by Default</p>}
                        </div>
                        <div className="text-right">
                          <p className={cn("font-black", opt.priceAddOn > 0 ? "text-blue-600" : opt.priceAddOn < 0 ? "text-emerald-600" : "text-slate-600")}>
                            {opt.priceAddOn > 0 ? `+$ ${opt.priceAddOn}` : opt.priceAddOn < 0 ? `-$ ${Math.abs(opt.priceAddOn)}` : 'Included'}
                          </p>
                        </div>
                      </div>
                    </div>
                 ))}
              </div>
            </div>
          )}

          {/* STANDARD VIEW */}
          {modifyMode === 'STANDARD' && (
            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-800">Available Options</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {optionsWithNone.map((opt) => (
                  <div 
                    key={opt.id}
                    onClick={() => handleSelect(opt)}
                    className={cn(
                      "p-3 rounded-xl border cursor-pointer transition-all flex justify-between items-center",
                      selectedOption.id === opt.id 
                        ? "border-blue-500 bg-blue-50/50 shadow-sm" 
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <div>
                      <p className={cn("text-sm font-bold", selectedOption.id === opt.id ? "text-blue-900" : "text-slate-700")}>
                        {opt.name}
                        {opt.roomType && <span className="ml-1 text-xs font-normal italic text-slate-500">({opt.roomType})</span>}
                      </p>
                      {opt.isDefault && <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Included</p>}
                    </div>
                    <div className="text-right">
                      {opt.id === "NONE" ? (
                        <span className="font-black text-slate-500 text-sm">Remove (-${Math.abs(opt.priceAddOn)})</span>
                      ) : opt.priceAddOn > 0 ? (
                        <span className="font-black text-blue-600 text-sm">+$ {opt.priceAddOn}</span>
                      ) : opt.priceAddOn < 0 ? (
                        <span className="font-black text-emerald-600 text-sm">-$ {Math.abs(opt.priceAddOn)}</span>
                      ) : (
                        <span className="font-black text-emerald-600 text-sm">Included</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  )
}
