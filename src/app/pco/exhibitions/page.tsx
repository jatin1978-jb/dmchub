'use client';

import React from 'react';
import Link from 'next/link';
import SaaSHeader from '@/components/SaaSHeader';
import { useInventory } from '@/context/InventoryContext';
import { Building2, Power, ExternalLink, Plus } from 'lucide-react';

export default function PcoExhibitionsPage() {
  const { congresses, toggleCongressLive } = useInventory();
  const activeCongress = congresses[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1B2D] flex flex-col font-sans">
      <SaaSHeader activePersona="CONGRESS" />

      <main className="flex-1 max-w-[1650px] mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        {/* BANNER */}
        <div className="bg-gradient-to-r from-[#0B1B2D] to-[#162B44] text-white p-8 rounded-3xl border border-[#C5A059]/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" /> Dedicated URL: /pco/exhibitions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">{activeCongress?.title}</h2>
            <p className="text-slate-300 text-sm max-w-2xl">
              Configure exhibition details, venue locations, start/end dates, and manage public site LIVE toggles.
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-md space-y-2">
            <span className="text-[10px] font-bold uppercase text-[#C5A059] tracking-widest block">
              Public Portal Live Switch
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleCongressLive(activeCongress.id)}
                className={`h-10 px-4 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                  activeCongress.isLive ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-slate-900'
                }`}
              >
                <Power className="w-4 h-4" /> {activeCongress.isLive ? 'SITE IS LIVE (Public)' : 'ACTIVATE LIVE SITE'}
              </button>

              <Link 
                href={`/event/${activeCongress.slug}`}
                className="h-10 px-4 rounded-xl border border-white/30 text-white font-bold text-xs hover:bg-white/10 flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" /> Open Public Portal
              </Link>
            </div>
          </div>
        </div>

        {/* EXHIBITION PROFILE SETUP FORM */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-[#0B1B2D]">Congress Profile &amp; Dates Setup</h3>
              <p className="text-xs text-slate-500">Manage congress parameters displayed on the co-branded booking portal.</p>
            </div>
            <Link href="/pco/ta-mapping" className="h-9 px-4 rounded-xl bg-[#C5A059] text-[#0B1B2D] font-bold text-xs flex items-center gap-1.5">
              Go to TA Scope Mapping ➔
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-500 uppercase text-[10px]">Congress Title</label>
              <input type="text" value={activeCongress.title} readOnly className="w-full h-11 px-3 bg-slate-50 rounded-xl border border-slate-200 font-bold" />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-500 uppercase text-[10px]">Congress Dates</label>
              <input type="text" value={activeCongress.dates} readOnly className="w-full h-11 px-3 bg-slate-50 rounded-xl border border-slate-200 font-bold" />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-slate-500 uppercase text-[10px]">Venue Location</label>
              <input type="text" value={activeCongress.venue} readOnly className="w-full h-11 px-3 bg-slate-50 rounded-xl border border-slate-200 font-bold" />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-slate-500 uppercase text-[10px]">Congress Description</label>
              <textarea value={activeCongress.description} readOnly className="w-full h-20 p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold resize-none" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
