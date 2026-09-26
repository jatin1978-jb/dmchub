'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SaaSHeader from '@/components/SaaSHeader';
import { useInventory, RoomType } from '@/context/InventoryContext';
import { Hotel, Plus, Trash2, X } from 'lucide-react';

export default function TaAllotmentsPage() {
  const { hotels, addHotel, deleteHotel } = useInventory();
  const [showAddHotelModal, setShowAddHotelModal] = useState(false);

  // Form States - Hotel
  const [hotelName, setHotelName] = useState('');
  const [hotelStars, setHotelStars] = useState(4);
  const [hotelAddress, setHotelAddress] = useState('');
  const [hotelDistance, setHotelDistance] = useState('0.5 km from Paris Expo');
  const [hotelImage, setHotelImage] = useState('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80');
  const [hotelGallery, setHotelGallery] = useState('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80');
  const [hotelBadge, setHotelBadge] = useState('Official Congress Partner Hotel');
  const [hotelShuttle, setHotelShuttle] = useState('Free Shuttle Every 10 Mins');
  const [hotelMOR, setHotelMOR] = useState('Apex MICE & Travel Services Ltd (IATA #98234-EU)');
  const [hotelDesc, setHotelDesc] = useState('Luxury executive hotel situated near Congress venue.');

  const [roomTypes, setRoomTypes] = useState<Omit<RoomType, 'id'>[]>([
    {
      name: 'Superior Executive King Room',
      size: '30 m²',
      bed: '1 King Bed',
      mealType: 'Full Buffet Breakfast Included',
      inclusions: ['Complimentary Buffet Breakfast', 'High-Speed WiFi'],
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      pricePerNight: 260,
      totalPrice: 1040,
      allottedQuantity: 30
    }
  ]);

  const handleSaveHotel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hotelName) return;
    const galleryArr = hotelGallery.split(',').map(s => s.trim()).filter(Boolean);
    const startPrice = roomTypes.length ? Math.min(...roomTypes.map(r => r.pricePerNight)) : 220;

    addHotel({
      name: hotelName,
      stars: hotelStars,
      address: hotelAddress,
      distance: hotelDistance,
      image: hotelImage,
      galleryImages: galleryArr,
      badge: hotelBadge,
      shuttle: hotelShuttle,
      taMerchant: hotelMOR,
      startPrice: startPrice,
      availableRooms: 30,
      description: hotelDesc,
      taOwnerId: 'ta-apex',
      rooms: roomTypes.map((r, idx) => ({ ...r, id: `room-${Date.now()}-${idx}` }))
    });
    setShowAddHotelModal(false);
    setHotelName('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1B2D] flex flex-col font-sans">
      <SaaSHeader activePersona="TRAVEL_AGENT" />

      <main className="flex-1 max-w-[1650px] mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#0B1B2D] text-xs font-bold uppercase tracking-wider mb-2">
                <Hotel className="w-3.5 h-3.5 text-[#C5A059]" /> Dedicated URL: /ta/allotments
              </div>
              <h3 className="text-xl font-bold font-serif text-[#0B1B2D]">Contracted Room Block Inventory</h3>
              <p className="text-xs text-slate-500">Travel Agent management of hotel allotments, room types, and meal plans.</p>
            </div>
            <button 
              onClick={() => setShowAddHotelModal(true)}
              className="h-10 px-4 rounded-xl bg-[#0B1B2D] text-white font-bold text-xs hover:bg-[#162B44] flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#C5A059]" /> + Add Hotel Allotment
            </button>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Hotel Name</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Room Types &amp; Meal Plans</th>
                <th className="p-4">Price / Night</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {hotels.map((h) => (
                <tr key={h.id}>
                  <td className="p-4 font-bold text-[#0B1B2D]">{h.name}</td>
                  <td className="p-4 font-bold text-amber-500">{h.stars} ★</td>
                  <td className="p-4">
                    {h.rooms?.map((r, i) => (
                      <div key={i} className="text-[11px] font-semibold text-slate-700">
                        • {r.name} ({r.mealType}) - €{r.pricePerNight}/night
                      </div>
                    ))}
                  </td>
                  <td className="p-4 font-bold text-[#0B1B2D]">€{h.startPrice}</td>
                  <td className="p-4">
                    <button onClick={() => deleteHotel(h.id)} className="text-red-500 font-bold hover:underline flex items-center gap-1 cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* MODAL: ADD HOTEL ALLOTMENT */}
      {showAddHotelModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold font-serif text-[#0B1B2D]">Add Complete Hotel Allotment</h2>
              <button onClick={() => setShowAddHotelModal(false)} className="p-2 rounded-xl bg-slate-100 text-slate-500"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveHotel} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-500 uppercase text-[10px]">Hotel Name</label>
                  <input type="text" value={hotelName} onChange={(e) => setHotelName(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
                </div>
                <div>
                  <label className="font-bold text-slate-500 uppercase text-[10px]">Address</label>
                  <input type="text" value={hotelAddress} onChange={(e) => setHotelAddress(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
                </div>
              </div>
              <div className="flex justify-end gap-3 border-t pt-3">
                <button type="button" onClick={() => setShowAddHotelModal(false)} className="h-10 px-4 rounded-xl border border-slate-300 font-bold">Cancel</button>
                <button type="submit" className="h-10 px-6 rounded-xl bg-[#0B1B2D] text-white font-bold">Save Allotment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
