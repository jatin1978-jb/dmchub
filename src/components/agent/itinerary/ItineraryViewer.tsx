'use client'

import { useState, useEffect } from "react"
import ItineraryItemCard from "./ItineraryItemCard"

interface ItineraryViewerProps {
  days: any[];
  onChange: (totalAddOn: number, selectedOptions: Record<string, string>, movedItems: Record<string, number>) => void;
}

export default function ItineraryViewer({ days, onChange }: ItineraryViewerProps) {
  // Map of itemId -> selectedOptionId
  const [selections, setSelections] = useState<Record<string, string>>({})
  const [localDays, setLocalDays] = useState<any[]>([])
  const [movedItems, setMovedItems] = useState<Record<string, number>>({})
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1)

  useEffect(() => {
    const initialSelections: Record<string, string> = {}
    days.forEach(day => {
      day.items.forEach((item: any) => {
        const defaultOpt = item.options.find((o: any) => o.isDefault) || item.options[0]
        if (defaultOpt) {
          initialSelections[item.id] = defaultOpt.id
        }
      })
    })
    setSelections(initialSelections)
    setLocalDays(JSON.parse(JSON.stringify(days)))
  }, [days])

  // Setup Intersection Observer for scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible intersecting day
        const visibleEntries = entries.filter(e => e.isIntersecting)
        if (visibleEntries.length > 0) {
          // If multiple are visible, pick the one that takes up the most space or is highest
          const target = visibleEntries[0].target
          const dayNum = parseInt(target.getAttribute('data-day') || '1', 10)
          setActiveDayNumber(dayNum)
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )

    document.querySelectorAll('.day-card-container').forEach(card => {
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [localDays])

  const scrollToDay = (dayNum: number) => {
    setTimeout(() => {
      const el = document.getElementById(`day-${dayNum}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 10)
  }

  useEffect(() => {
    let total = 0
    localDays.forEach(day => {
      day.items.forEach((item: any) => {
        const selectedId = selections[item.id]
        if (selectedId === "NONE") {
          total -= (item.optOutDiscount || 0)
        } else {
          const opt = item.options.find((o: any) => o.id === selectedId)
          if (opt && opt.priceAddOn) {
            total += opt.priceAddOn
          }
        }
      })
    })
    // Ensure we don't trigger this on first render before selections are set if they are empty
    if (Object.keys(selections).length > 0 || Object.keys(movedItems).length > 0) {
      onChange(total, selections, movedItems)
    }
  }, [selections, movedItems, localDays, onChange])

  const handleOptionChange = (itemId: string, optionId: string, _addOnPrice: number) => {
    setSelections(prev => ({
      ...prev,
      [itemId]: optionId
    }))
  }

  const handleMoveItem = (itemId: string, targetDayNumber: number) => {
    setLocalDays(prevDays => {
      const newDays = [...prevDays];
      let itemToMove: any = null;
      let sourceDayIndex = -1;
      let targetDayIndex = newDays.findIndex(d => d.dayNumber === targetDayNumber);

      if (targetDayIndex === -1) return prevDays; // Target day not found

      // Find and remove item
      for (let i = 0; i < newDays.length; i++) {
        const itemIndex = newDays[i].items.findIndex((item: any) => item.id === itemId);
        if (itemIndex !== -1) {
          itemToMove = newDays[i].items[itemIndex];
          sourceDayIndex = i;
          // Don't move if it's already on the target day
          if (sourceDayIndex === targetDayIndex) return prevDays;
          
          newDays[i].items = newDays[i].items.filter((_: any, idx: number) => idx !== itemIndex);
          break;
        }
      }

      // Add to target day
      if (itemToMove) {
        newDays[targetDayIndex].items.push(itemToMove);
        setMovedItems(prev => ({
          ...prev,
          [itemId]: targetDayNumber
        }));
      }

      return newDays;
    })
  }

  const availableDays = localDays.map(d => d.dayNumber)

  // Derived counts
  const transfersCount = localDays.flatMap(d => d.items).filter((i: any) => i.type === 'TRANSFER').length
  const hotelsCount = localDays.flatMap(d => d.items).filter((i: any) => i.type === 'HOTEL').length
  const activitiesCount = localDays.flatMap(d => d.items).filter((i: any) => i.type === 'ACTIVITY').length
  const mealsCount = localDays.flatMap(d => d.items).filter((i: any) => i.type === 'RESTAURANT').length

  return (
    <div className="space-y-6">
      {/* Top Summary Bar */}
      <div className="flex flex-wrap gap-8 border-b border-slate-200 pb-0 text-sm font-bold text-slate-500 uppercase tracking-widest bg-white pt-4 px-6 rounded-t-2xl shadow-sm">
        <div className="text-blue-600 border-b-2 border-blue-600 pb-4">{localDays.length} DAY PLAN</div>
        {transfersCount > 0 && <div className="pb-4">{transfersCount} TRANSFERS</div>}
        {hotelsCount > 0 && <div className="pb-4">{hotelsCount} HOTEL</div>}
        {activitiesCount > 0 && <div className="pb-4">{activitiesCount} ACTIVITIES</div>}
        {mealsCount > 0 && <div className="pb-4">{mealsCount} MEALS</div>}
      </div>

      {/* Sticky Horizontal Day Navigation Bar */}
      <div className="sticky top-16 z-20 bg-slate-50/95 backdrop-blur-md py-3 -mx-2 px-2 border-y border-slate-200/80 mb-6 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-xs font-black uppercase text-slate-400 tracking-wider mr-2 shrink-0">Days:</span>
          {localDays.map((day) => {
            const isActive = activeDayNumber === day.dayNumber
            return (
              <button
                key={day.id}
                onClick={() => scrollToDay(day.dayNumber)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 shrink-0 cursor-pointer ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-slate-300'}`} />
                Day {day.dayNumber}: {day.title}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex gap-8 items-start relative">
        {/* Right Content - Full Width */}
        <div className="flex-1 space-y-12 min-w-0">
          {localDays.map((day) => (
            <div id={`day-${day.dayNumber}`} data-day={day.dayNumber} key={day.id} className="day-card-container bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center gap-3">
                  <span className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm shrink-0">
                    Day {day.dayNumber}
                  </span>
                  <h3 className="font-black text-slate-900 text-xl tracking-tight">{day.title}</h3>
                </div>
                
                <div className="sm:ml-auto flex flex-wrap items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {day.items.filter((i: any) => i.type === 'HOTEL').length > 0 && <span className="flex items-center gap-1.5 text-slate-600"><span className="text-sm">🏨</span> {day.items.filter((i: any) => i.type === 'HOTEL').length} Hotel</span>}
                  {day.items.filter((i: any) => i.type === 'TRANSFER').length > 0 && <span className="flex items-center gap-1.5 text-slate-600"><span className="text-sm">🚗</span> {day.items.filter((i: any) => i.type === 'TRANSFER').length} Transfer</span>}
                  {day.items.filter((i: any) => i.type === 'ACTIVITY').length > 0 && <span className="flex items-center gap-1.5 text-slate-600"><span className="text-sm">📸</span> {day.items.filter((i: any) => i.type === 'ACTIVITY').length} Activity</span>}
                  {day.items.filter((i: any) => i.type === 'RESTAURANT').length > 0 && <span className="flex items-center gap-1.5 text-slate-600"><span className="text-sm">🍽️</span> {day.items.filter((i: any) => i.type === 'RESTAURANT').length} Meal</span>}
                </div>
              </div>

              {/* Description */}
              {day.description && (
                <div className="px-6 py-5 text-sm text-slate-500 border-b border-slate-100/60 leading-relaxed bg-white">
                  {day.description}
                </div>
              )}

              {/* Items */}
              <div className="p-6 space-y-6 bg-slate-50/30">
                {day.items.map((item: any) => (
                  <ItineraryItemCard 
                    key={item.id} 
                    item={item} 
                    selectedOptionId={selections[item.id]} 
                    onOptionChange={handleOptionChange}
                    availableDays={availableDays}
                    currentDayNumber={day.dayNumber}
                    onMoveItem={handleMoveItem}
                  />
                ))}
                {day.items.length === 0 && (
                  <div className="p-4 border-2 border-dashed border-slate-100 rounded-xl text-slate-400 text-sm text-center">
                    No items scheduled for this day.
                  </div>
                )}
              </div>

              {/* Footer */}
              {day.items.filter((i: any) => i.type === 'ACTIVITY' && selections[i.id] !== 'NONE').length < 2 && (
                <div className="p-5 bg-blue-50/50 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                      +
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Add Activities to your day</p>
                      <p className="text-xs text-slate-500">Spend the day at leisure or add an activity, transfer or meal to your day</p>
                    </div>
                  </div>
                  <div 
                    className="text-blue-600 text-sm font-black tracking-widest cursor-pointer hover:text-blue-800"
                    onClick={() => alert("Activity Catalog coming soon! Agents will be able to browse and add extra activities from the DMC's inventory here.")}
                  >
                    ADD TO DAY
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
