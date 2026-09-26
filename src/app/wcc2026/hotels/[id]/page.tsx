'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { 
  Building2, 
  Calendar, 
  MapPin, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Wifi, 
  Coffee, 
  Tv, 
  Car, 
  Utensils, 
  Clock, 
  FileText,
  UserCheck
} from 'lucide-react';

import { useInventory } from '@/context/InventoryContext';

export default function WCCHotelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const hotelId = params?.id as string || 'novotel-tour-eiffel';
  const { hotels } = useInventory();

  const foundHotel = hotels.find(h => h.id === hotelId) || hotels[0];

  const hotel = {
    ...foundHotel,
    shuttleInfo: foundHotel.shuttle || 'Complimentary Congress Shuttle to Venue.',
    images: foundHotel.galleryImages?.length ? foundHotel.galleryImages : [foundHotel.image],
    rooms: foundHotel.rooms?.length ? foundHotel.rooms : [
      {
        id: 'room-std',
        name: 'Standard Executive Room',
        size: '28 m²',
        bed: '1 King Bed',
        mealType: 'Full Buffet Breakfast Included',
        inclusions: ['Complimentary Buffet Breakfast', 'High-Speed WiFi', 'City Tourism Tax Included'],
        pricePerNight: foundHotel.startPrice || 220,
        totalPrice: (foundHotel.startPrice || 220) * 4,
        allottedQuantity: 20
      }
    ]
  };

  const [selectedImage, setSelectedImage] = useState(hotel.images[0] || hotel.image);


  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1B2D] flex flex-col font-sans selection:bg-[#C5A059]/20 selection:text-[#0B1B2D]">
      
      {/* CO-BRANDED HEADER */}
      <header className="sticky top-0 z-50 bg-[#0B1B2D] text-white border-b border-[#C5A059]/30 shadow-md">
        <div className="max-w-[1650px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/wcc2026/hotels" className="text-xs text-slate-300 hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-4 h-4 text-[#C5A059]" /> Back to Hotels List
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden sm:block" />
            <div className="flex items-center gap-3">
              <Logo size="sm" darkNav={true} />
              <span className="text-[#C5A059] font-bold text-xs">×</span>
              <span className="text-xs font-bold text-white">World Cardiology Congress 2026</span>
            </div>
          </div>

          <div className="text-xs text-slate-300 hidden md:block font-medium">
            Oct 14 – Oct 18, 2026 (4 Nights)
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-[1650px] mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        
        {/* HOTEL TITLE & GALLERY */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-500 mb-1">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                ))}
                <span className="text-xs font-bold text-slate-500 ml-2">Official Congress Allotment Hotel</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#0B1B2D]">{hotel.name}</h1>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-[#C5A059]" /> {hotel.address} — <strong>{hotel.distance}</strong>
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-3 text-xs text-amber-950">
              <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold text-amber-900 block uppercase text-[10px]">Merchant of Record Notice</span>
                Fulfillment & billing handled by <strong>{hotel.taMerchant}</strong>.
              </div>
            </div>
          </div>

          {/* Photo Gallery Carousel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 h-80 sm:h-96 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
              <img src={selectedImage} alt={hotel.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {hotel.images.map((img: string, idx: number) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedImage(img)}
                  className={`h-36 sm:h-44 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === img ? 'border-[#C5A059] shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="hotel room" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SHUTTLE & AMENITIES INFO */}
        <div className="bg-gradient-to-r from-[#0B1B2D] to-[#162B44] text-white p-6 rounded-2xl border border-[#C5A059]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-[#C5A059] shrink-0" />
            <div>
              <h4 className="font-bold text-sm">Venue Transfer Guarantee</h4>
              <p className="text-xs text-slate-300">{hotel.shuttleInfo}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 shrink-0">
            <span className="flex items-center gap-1"><Wifi className="w-4 h-4 text-[#C5A059]" /> Free WiFi</span>
            <span className="flex items-center gap-1"><Coffee className="w-4 h-4 text-[#C5A059]" /> Breakfast</span>
            <span className="flex items-center gap-1"><Car className="w-4 h-4 text-[#C5A059]" /> Parking</span>
          </div>
        </div>

        {/* AVAILABLE ROOM TYPES GRID */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-[#0B1B2D] border-b border-slate-200 pb-3">
            Available Congress Room Allotments (Oct 14 – 18, 2026)
          </h2>

          <div className="space-y-4">
            {hotel.rooms.map((room: any) => (
              <div 
                key={room.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md hover:shadow-xl transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-[#0B1B2D]">{room.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                      {room.size} • {room.bed}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    {room.inclusions.map((inc: string, i: number) => (
                      <span key={i} className="flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {inc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Room Price & Selection */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0 gap-4 shrink-0">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Total for 4 Nights</span>
                    <div className="text-2xl font-extrabold text-[#0B1B2D]">
                      €{room.totalPrice} <span className="text-xs font-normal text-slate-500">(€{room.pricePerNight}/night)</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold block">Taxes & Breakfast Included</span>
                  </div>

                  <button
                    onClick={() => router.push(`/wcc2026/checkout/${hotelId}?roomId=${room.id}&roomName=${encodeURIComponent(room.name)}&total=${room.totalPrice}`)}
                    className="h-12 px-7 rounded-xl bg-[#0B1B2D] text-white font-bold text-xs hover:bg-[#162B44] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0B1B2D]/10 cursor-pointer uppercase tracking-wider"
                  >
                    <span>Select Room & Continue</span> <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
