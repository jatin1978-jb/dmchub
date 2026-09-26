'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { 
  Building2, 
  Calendar, 
  MapPin, 
  User, 
  Users, 
  Star, 
  ShieldCheck, 
  Search, 
  ChevronRight, 
  Filter, 
  CheckCircle2, 
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Info
} from 'lucide-react';

import { useInventory } from '@/context/InventoryContext';

export default function WCCHotelsDelegatePortal() {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const { hotels } = useInventory();


  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1B2D] flex flex-col font-sans selection:bg-[#C5A059]/20 selection:text-[#0B1B2D]">
      
      {/* 1. CO-BRANDED HEADER (MICEXchange + World Cardiology Congress) */}
      <header className="sticky top-0 z-50 bg-[#0B1B2D] text-white border-b border-[#C5A059]/30 shadow-md">
        <div className="max-w-[1650px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="text-xs text-slate-300 hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-4 h-4 text-[#C5A059]" /> WCC Event Site
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden sm:block" />

            {/* CO-BRANDED LOGO ENGINE */}
            <div className="flex items-center gap-3">
              <Logo size="sm" darkNav={true} />
              <span className="text-[#C5A059] font-bold text-xs">×</span>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-xl border border-white/15">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white tracking-tight">World Cardiology Congress 2026</span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Fulfilling Travel Partner: <strong>Apex MICE & Travel Services Ltd</strong></span>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1650px] mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        
        {/* PRE-FILLED CONGRESS SEARCH BOX */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#C5A059] tracking-widest">Pre-filled Congress Allotment Search</span>
              <h2 className="text-2xl font-bold font-serif text-[#0B1B2D]">Official Delegate Accommodation Allotments</h2>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <Building2 className="w-4 h-4 text-[#C5A059]" /> Contracted Venue: Paris Expo Porte de Versailles
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Pre-filled Event */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Congress Event</label>
              <div className="h-12 px-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-[#0B1B2D] flex items-center gap-2 cursor-not-allowed">
                <Building2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span className="truncate">World Cardiology Congress 2026</span>
              </div>
            </div>

            {/* Pre-filled Dates */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Congress Dates (Pre-selected)</label>
              <div className="h-12 px-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-[#0B1B2D] flex items-center gap-2 cursor-not-allowed">
                <Calendar className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Oct 14, 2026 – Oct 18, 2026 (4 Nights)</span>
              </div>
            </div>

            {/* Selectable Adults */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-500">Adult Delegates</label>
              <div className="h-12 px-3.5 bg-white rounded-xl border border-slate-300 text-xs font-bold text-[#0B1B2D] flex items-center justify-between">
                <span className="flex items-center gap-2"><User className="w-4 h-4 text-slate-400" /> {adults} Adult(s)</span>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-6 h-6 rounded bg-slate-100 font-bold hover:bg-slate-200 flex items-center justify-center text-sm"
                  >-</button>
                  <button 
                    onClick={() => setAdults(adults + 1)}
                    className="w-6 h-6 rounded bg-slate-100 font-bold hover:bg-slate-200 flex items-center justify-center text-sm"
                  >+</button>
                </div>
              </div>
            </div>

            {/* Selectable Children */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-500">Children / Accompanying</label>
              <div className="h-12 px-3.5 bg-white rounded-xl border border-slate-300 text-xs font-bold text-[#0B1B2D] flex items-center justify-between">
                <span className="flex items-center gap-2"><Users className="w-4 h-4 text-slate-400" /> {children} Child(ren)</span>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-6 h-6 rounded bg-slate-100 font-bold hover:bg-slate-200 flex items-center justify-center text-sm"
                  >-</button>
                  <button 
                    onClick={() => setChildren(children + 1)}
                    className="w-6 h-6 rounded bg-slate-100 font-bold hover:bg-slate-200 flex items-center justify-center text-sm"
                  >+</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HOTEL LISTINGS GRID WITH BIG IMAGES */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-serif text-[#0B1B2D]">
              Contracted Official Hotels ({hotels.length} Available)
            </h3>
            <span className="text-xs text-slate-500 font-medium">Showing pre-loaded congress room blocks</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {hotels.map((hotel) => (
              <div 
                key={hotel.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Big Image Container */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-4 left-4 bg-[#0B1B2D]/90 text-[#C5A059] border border-[#C5A059]/40 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-md">
                    {hotel.badge}
                  </div>

                  <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-lg backdrop-blur-md flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {hotel.shuttle}
                  </div>
                </div>

                {/* Hotel Details Content */}
                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: hotel.stars }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        {hotel.availableRooms} Rooms Remaining
                      </span>
                    </div>

                    <h4 className="text-2xl font-bold font-serif text-[#0B1B2D] leading-tight">
                      {hotel.name}
                    </h4>

                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" /> {hotel.distance}
                    </p>
                  </div>

                  {/* Merchant Badge & Pricing */}
                  <div className="border-t border-slate-100 pt-4 space-y-4">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-[11px] text-slate-600 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <span>Fulfilling Partner & MOR: <strong>{hotel.taMerchant}</strong></span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Starting From</span>
                        <div className="text-2xl font-extrabold text-[#0B1B2D]">
                          €{hotel.startPrice} <span className="text-xs font-normal text-slate-500">/ night</span>
                        </div>
                      </div>

                      <Link
                        href={`/wcc2026/hotels/${hotel.id}`}
                        className="h-12 px-6 rounded-xl bg-[#0B1B2D] text-white font-bold text-xs hover:bg-[#162B44] transition-all flex items-center gap-2 shadow-md cursor-pointer"
                      >
                        <span>View Rooms & Details</span> <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                      </Link>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
