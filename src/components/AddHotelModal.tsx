'use client';

import React, { useState } from 'react';
import { useInventory, RoomType } from '@/context/InventoryContext';
import { X, Plus, Trash2, Bed, Sparkles } from 'lucide-react';

interface AddHotelModalProps {
  isOpen: boolean;
  onClose: () => void;
  taOwnerId?: string;
}

export default function AddHotelModal({ isOpen, onClose, taOwnerId = 'ta-apex' }: AddHotelModalProps) {
  const { addHotel } = useInventory();

  // Form Basic Info
  const [hotelName, setHotelName] = useState('');
  const [hotelStars, setHotelStars] = useState(4);
  const [hotelAddress, setHotelAddress] = useState('');
  const [hotelDistance, setHotelDistance] = useState('0.8 km from Paris Expo / Venue');
  const [hotelImage, setHotelImage] = useState('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80');
  const [hotelGallery, setHotelGallery] = useState('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80, https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80');
  const [hotelBadge, setHotelBadge] = useState('Official Congress Partner Hotel');
  const [hotelShuttle, setHotelShuttle] = useState('Free Shuttle Every 15 Mins to Venue');
  const [hotelMOR, setHotelMOR] = useState('Apex MICE & Travel Services Ltd (IATA #98234-EU)');
  const [hotelDesc, setHotelDesc] = useState('Executive luxury hotel situated near the official congress venue with premium business facilities.');

  // Room Types List
  const [rooms, setRooms] = useState<Omit<RoomType, 'id'>[]>([
    {
      name: 'Superior Executive King Room',
      size: '30 m²',
      bed: '1 King Bed',
      mealType: 'Full Buffet Breakfast Included',
      inclusions: ['Complimentary Buffet Breakfast', 'High-Speed WiFi', 'Executive Lounge Access'],
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      pricePerNight: 260,
      totalPrice: 1040,
      allottedQuantity: 30
    }
  ]);

  if (!isOpen) return null;

  const handleAddRoomType = () => {
    setRooms([
      ...rooms,
      {
        name: 'Deluxe Twin Room',
        size: '35 m²',
        bed: '2 Twin Beds',
        mealType: 'Bed & Breakfast Included',
        inclusions: ['Breakfast Included', 'WiFi'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
        pricePerNight: 280,
        totalPrice: 1120,
        allottedQuantity: 20
      }
    ]);
  };

  const handleRemoveRoomType = (index: number) => {
    if (rooms.length <= 1) {
      alert('At least one room type allotment is required.');
      return;
    }
    setRooms(rooms.filter((_, i) => i !== index));
  };

  const handleRoomChange = (index: number, field: keyof Omit<RoomType, 'id'>, value: any) => {
    const updated = [...rooms];
    updated[index] = { ...updated[index], [field]: value };
    setRooms(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hotelName || !hotelAddress) return;

    const galleryArr = hotelGallery.split(',').map(s => s.trim()).filter(Boolean);
    const startPrice = rooms.length ? Math.min(...rooms.map(r => r.pricePerNight)) : 220;
    const totalAllottedRooms = rooms.reduce((acc, r) => acc + (r.allottedQuantity || 0), 0);

    addHotel({
      name: hotelName,
      stars: Number(hotelStars),
      address: hotelAddress,
      distance: hotelDistance,
      image: hotelImage,
      galleryImages: galleryArr.length ? galleryArr : [hotelImage],
      badge: hotelBadge,
      shuttle: hotelShuttle,
      taMerchant: hotelMOR,
      startPrice: startPrice,
      availableRooms: totalAllottedRooms || 30,
      description: hotelDesc,
      taOwnerId: taOwnerId,
      rooms: rooms.map((r, idx) => ({
        ...r,
        id: `room-${Date.now()}-${idx}`,
        totalPrice: r.pricePerNight * 4
      }))
    });

    onClose();
    setHotelName('');
    setHotelAddress('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase text-[#C5A059] tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Full Hotel &amp; Room Block Allotment Creator
            </span>
            <h2 className="text-2xl font-bold font-serif text-[#0B1B2D]">Add Complete Hotel Allotment</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          
          {/* SECTION 1: HOTEL OVERVIEW & LOCATION */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-sm text-[#0B1B2D] border-b border-slate-200 pb-2">
              1. Hotel Basic Profile &amp; Location Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-slate-500 uppercase text-[10px]">Hotel Name</label>
                <input
                  type="text"
                  placeholder="e.g. Novotel Paris Centre Tour Eiffel"
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                  className="w-full h-10 px-3 bg-white rounded-xl border border-slate-300 font-bold text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-500 uppercase text-[10px]">Star Rating</label>
                <select
                  value={hotelStars}
                  onChange={(e) => setHotelStars(Number(e.target.value))}
                  className="w-full h-10 px-3 bg-white rounded-xl border border-slate-300 font-bold text-xs"
                >
                  <option value={5}>5 ★★★★★ Luxury</option>
                  <option value={4}>4 ★★★★ Premium</option>
                  <option value={3}>3 ★★★ Standard</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-500 uppercase text-[10px]">Full Address</label>
                <input
                  type="text"
                  placeholder="e.g. 61 Quai de Grenelle, 75015 Paris, France"
                  value={hotelAddress}
                  onChange={(e) => setHotelAddress(e.target.value)}
                  className="w-full h-10 px-3 bg-white rounded-xl border border-slate-300 font-bold text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-500 uppercase text-[10px]">Proximity to Congress Venue</label>
                <input
                  type="text"
                  placeholder="e.g. 0.8 km from Paris Expo Porte de Versailles"
                  value={hotelDistance}
                  onChange={(e) => setHotelDistance(e.target.value)}
                  className="w-full h-10 px-3 bg-white rounded-xl border border-slate-300 font-bold text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-500 uppercase text-[10px]">Main Photo URL</label>
                <input
                  type="text"
                  value={hotelImage}
                  onChange={(e) => setHotelImage(e.target.value)}
                  className="w-full h-10 px-3 bg-white rounded-xl border border-slate-300 font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-500 uppercase text-[10px]">Gallery Image URLs (Comma Separated)</label>
                <input
                  type="text"
                  value={hotelGallery}
                  onChange={(e) => setHotelGallery(e.target.value)}
                  className="w-full h-10 px-3 bg-white rounded-xl border border-slate-300 font-mono text-[11px]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: PARTNER BADGES & MERCHANT INFO */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-sm text-[#0B1B2D] border-b border-slate-200 pb-2">
              2. Congress Partnership &amp; Merchant Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-500 uppercase text-[10px]">Partner Badge / Highlight</label>
                <input
                  type="text"
                  value={hotelBadge}
                  onChange={(e) => setHotelBadge(e.target.value)}
                  className="w-full h-10 px-3 bg-white rounded-xl border border-slate-300 font-bold text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-500 uppercase text-[10px]">Shuttle Service Info</label>
                <input
                  type="text"
                  value={hotelShuttle}
                  onChange={(e) => setHotelShuttle(e.target.value)}
                  className="w-full h-10 px-3 bg-white rounded-xl border border-slate-300 font-bold text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-500 uppercase text-[10px]">Appointed Merchant of Record (TA Name &amp; IATA)</label>
              <input
                type="text"
                value={hotelMOR}
                onChange={(e) => setHotelMOR(e.target.value)}
                className="w-full h-10 px-3 bg-white rounded-xl border border-slate-300 font-bold text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-500 uppercase text-[10px]">Hotel Overview Description</label>
              <textarea
                value={hotelDesc}
                onChange={(e) => setHotelDesc(e.target.value)}
                className="w-full h-20 p-3 bg-white rounded-xl border border-slate-300 font-medium text-xs resize-none"
              />
            </div>
          </div>

          {/* SECTION 3: ROOM TYPES & ALLOTMENTS MANAGER */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="font-bold text-sm text-[#0B1B2D]">
                3. Contracted Room Types &amp; Allotment Quantities
              </h3>
              <button
                type="button"
                onClick={handleAddRoomType}
                className="h-8 px-3 rounded-lg bg-[#C5A059] text-[#0B1B2D] font-bold text-[11px] hover:bg-[#D4AF37] flex items-center gap-1 cursor-pointer shadow"
              >
                <Plus className="w-3.5 h-3.5" /> + Add Another Room Type
              </button>
            </div>

            <div className="space-y-4">
              {rooms.map((room, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-300 space-y-3 relative shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-[#0B1B2D] text-xs flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-[#C5A059]" /> Room Category #{idx + 1}
                    </span>
                    {rooms.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRoomType(idx)}
                        className="text-red-500 hover:text-red-700 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove Category
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="font-bold text-slate-500 uppercase text-[9px]">Room Category Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Superior Executive King Room"
                        value={room.name}
                        onChange={(e) => handleRoomChange(idx, 'name', e.target.value)}
                        className="w-full h-9 px-3 bg-slate-50 rounded-lg border border-slate-200 font-bold text-xs"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-500 uppercase text-[9px]">Price Per Night (€)</label>
                      <input
                        type="number"
                        placeholder="260"
                        value={room.pricePerNight}
                        onChange={(e) => handleRoomChange(idx, 'pricePerNight', Number(e.target.value))}
                        className="w-full h-9 px-3 bg-slate-50 rounded-lg border border-slate-200 font-bold text-xs text-[#0B1B2D]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500 uppercase text-[9px]">Allotted Room Quantity</label>
                      <input
                        type="number"
                        placeholder="30"
                        value={room.allottedQuantity}
                        onChange={(e) => handleRoomChange(idx, 'allottedQuantity', Number(e.target.value))}
                        className="w-full h-9 px-3 bg-slate-50 rounded-lg border border-slate-200 font-bold text-xs text-emerald-700"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-500 uppercase text-[9px]">Bed Type</label>
                      <input
                        type="text"
                        placeholder="e.g. 1 King Bed"
                        value={room.bed}
                        onChange={(e) => handleRoomChange(idx, 'bed', e.target.value)}
                        className="w-full h-9 px-3 bg-slate-50 rounded-lg border border-slate-200 font-semibold text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-500 uppercase text-[9px]">Meal Plan Included</label>
                      <input
                        type="text"
                        placeholder="e.g. Full Buffet Breakfast Included"
                        value={room.mealType}
                        onChange={(e) => handleRoomChange(idx, 'mealType', e.target.value)}
                        className="w-full h-9 px-3 bg-slate-50 rounded-lg border border-slate-200 font-semibold text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SUBMIT ACTIONS */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-11 px-5 rounded-xl border border-slate-300 font-bold text-xs hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-11 px-7 rounded-xl bg-[#0B1B2D] text-white font-bold text-xs hover:bg-[#162B44] shadow-lg cursor-pointer"
            >
              Save Full Hotel Allotment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
