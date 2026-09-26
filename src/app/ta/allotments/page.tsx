'use client';

import React, { useState } from 'react';
import SaaSHeader from '@/components/SaaSHeader';
import AddHotelModal from '@/components/AddHotelModal';
import { useInventory } from '@/context/InventoryContext';
import { Hotel, Plus, Trash2, MapPin, ShieldCheck, Bed } from 'lucide-react';

export default function TaAllotmentsPage() {
  const { hotels, deleteHotel } = useInventory();
  const [showAddHotelModal, setShowAddHotelModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1B2D] flex flex-col font-sans">
      <SaaSHeader activePersona="TRAVEL_AGENT" />

      <main className="flex-1 max-w-[1650px] mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#0B1B2D] text-xs font-bold uppercase tracking-wider mb-2">
                <Hotel className="w-3.5 h-3.5 text-[#C5A059]" /> Dedicated URL: /ta/allotments
              </div>
              <h3 className="text-xl font-bold font-serif text-[#0B1B2D]">Contracted Room Block Allotment Inventory</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage hotel allotments, room block quantities, meal plans, proximity details, and nightly rates.
              </p>
            </div>
            <button 
              onClick={() => setShowAddHotelModal(true)}
              className="h-11 px-5 rounded-xl bg-[#0B1B2D] text-white font-bold text-xs hover:bg-[#162B44] transition-all flex items-center gap-2 cursor-pointer shadow-md shrink-0"
            >
              <Plus className="w-4 h-4 text-[#C5A059]" /> + Add Complete Hotel Allotment
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Hotel &amp; Partner Details</th>
                  <th className="p-4">Location &amp; Proximity</th>
                  <th className="p-4">Contracted Room Block Allotments</th>
                  <th className="p-4">Merchant of Record</th>
                  <th className="p-4">Starting Rate</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {hotels.map((h) => {
                  const totalAllotted = h.rooms?.reduce((sum, r) => sum + (r.allottedQuantity || 0), 0) || h.availableRooms || 30;

                  return (
                    <tr key={h.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* HOTEL NAME & IMAGE */}
                      <td className="p-4 max-w-xs">
                        <div className="flex items-start gap-3">
                          <img 
                            src={h.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80'} 
                            alt={h.name}
                            className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0 shadow-sm"
                          />
                          <div className="space-y-1">
                            <div className="font-bold text-sm text-[#0B1B2D] leading-tight">{h.name}</div>
                            <div className="flex items-center gap-1 font-bold text-amber-500 text-xs">
                              {h.stars} ★ <span className="text-slate-400 font-normal text-[10px]">({h.stars}-Star Partner)</span>
                            </div>
                            {h.badge && (
                              <span className="inline-block px-2 py-0.5 rounded bg-[#C5A059]/10 text-[#0B1B2D] font-bold text-[10px] border border-[#C5A059]/30">
                                {h.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* LOCATION & PROXIMITY */}
                      <td className="p-4 text-slate-600 max-w-xs space-y-1">
                        <div className="flex items-start gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-snug">{h.address}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 bg-slate-100 px-2 py-1 rounded inline-block font-semibold">
                          📍 {h.distance}
                        </div>
                        {h.shuttle && (
                          <div className="text-[10px] text-emerald-700 font-bold">
                            🚌 {h.shuttle}
                          </div>
                        )}
                      </td>

                      {/* ROOM TYPES & ALLOTMENT QUANTITIES */}
                      <td className="p-4 max-w-md">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-bold text-[#0B1B2D] bg-slate-100 px-2.5 py-1 rounded-lg">
                            <span>Total Block Allotment:</span>
                            <span className="text-emerald-700">{totalAllotted} Rooms Allotted</span>
                          </div>

                          <div className="space-y-1.5">
                            {h.rooms?.map((r, i) => (
                              <div key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] flex items-center justify-between">
                                <div>
                                  <div className="font-bold text-[#0B1B2D] flex items-center gap-1">
                                    <Bed className="w-3 h-3 text-[#C5A059]" /> {r.name}
                                  </div>
                                  <div className="text-[10px] text-slate-500">
                                    {r.bed} • {r.mealType}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-extrabold text-[#0B1B2D]">€{r.pricePerNight}/night</div>
                                  <div className="text-[10px] text-emerald-700 font-bold">{r.allottedQuantity || 20} Rooms</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>

                      {/* MERCHANT OF RECORD */}
                      <td className="p-4 text-slate-700">
                        <div className="flex items-start gap-1.5 max-w-xs">
                          <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                          <div className="text-[11px]">
                            <div className="font-bold text-[#0B1B2D]">{h.taMerchant}</div>
                            <div className="text-[10px] text-slate-400">Appointed Merchant of Record</div>
                          </div>
                        </div>
                      </td>

                      {/* START PRICE */}
                      <td className="p-4">
                        <div className="text-sm font-extrabold text-[#0B1B2D]">€{h.startPrice}</div>
                        <div className="text-[10px] text-slate-400 font-medium">per night</div>
                      </td>

                      {/* ACTIONS */}
                      <td className="p-4">
                        <button 
                          onClick={() => deleteHotel(h.id)} 
                          className="text-red-500 hover:text-red-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* FULL HOTEL ALLOTMENT CREATOR MODAL */}
      <AddHotelModal
        isOpen={showAddHotelModal}
        onClose={() => setShowAddHotelModal(false)}
        taOwnerId="ta-apex"
      />
    </div>
  );
}
