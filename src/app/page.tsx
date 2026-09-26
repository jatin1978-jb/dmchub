'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  Building2, 
  Award, 
  Globe, 
  ArrowRight, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  Hotel, 
  FileText,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import Logo from '@/components/Logo';

export default function WCCEventHomePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0B1B2D] flex flex-col font-sans selection:bg-[#C5A059]/20 selection:text-[#0B1B2D] overflow-x-hidden">
      
      {/* 1. CONGRESS OFFICIAL HEADER / NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1B2D] text-white border-b border-[#C5A059]/30 shadow-md">
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between min-h-[76px] py-2">
            
            {/* WCC 2026 Congress Brand */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 border-r border-slate-700 pr-4">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059] flex items-center justify-center font-bold text-[#0B1B2D] text-lg font-serif shadow-md">
                  WCC
                </div>
                <div>
                  <h1 className="text-sm font-bold tracking-tight text-white leading-tight">
                    World Cardiology Congress 2026
                  </h1>
                  <p className="text-[10px] text-[#C5A059] uppercase font-bold tracking-widest">
                    Paris • Oct 14 - 18, 2026
                  </p>
                </div>
              </div>

              {/* Powered by MICEXchange identity badge */}
              <div className="hidden md:flex items-center gap-2 text-xs text-slate-300">
                <span className="text-[10px] uppercase text-slate-400 font-semibold">Official Booking Tech:</span>
                <Logo size="sm" darkNav={true} />
              </div>
            </div>

            {/* Navigation & Action Links */}
            <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-200">
              <a href="#about" className="hover:text-[#C5A059] transition-colors">About Congress</a>
              <a href="#program" className="hover:text-[#C5A059] transition-colors">Scientific Program</a>
              <a href="#speakers" className="hover:text-[#C5A059] transition-colors">Keynote Speakers</a>
              <a href="#venue" className="hover:text-[#C5A059] transition-colors">Venue & Location</a>
              <Link href="/backend" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                Organizer Backend <ExternalLink className="w-3 h-3 text-[#C5A059]" />
              </Link>
            </nav>

            {/* Primary Action Button */}
            <div className="flex items-center gap-3">
              <Link
                href="/wcc2026/hotels"
                className="h-11 px-6 bg-[#C5A059] text-[#0B1B2D] font-bold text-xs rounded-full hover:bg-[#D4AF37] transition-all flex items-center gap-2 shadow-lg shadow-[#C5A059]/20 uppercase tracking-wider cursor-pointer"
              >
                <Hotel className="w-4 h-4" /> Book Accommodation
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pt-24 lg:pt-28 pb-16 space-y-16">
        
        {/* HERO SECTION */}
        <section className="relative px-4 sm:px-8 lg:px-12 max-w-[1650px] mx-auto">
          <div className="bg-gradient-to-r from-[#0B1B2D] via-[#162B44] to-[#0B1B2D] text-white rounded-3xl p-8 sm:p-14 border border-[#C5A059]/30 shadow-2xl relative overflow-hidden space-y-8">
            
            {/* Decorative background accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] text-xs font-bold uppercase tracking-widest">
                <Globe className="w-3.5 h-3.5" /> 42nd Annual Global Scientific Assembly
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif leading-tight text-white">
                World Cardiology <span className="gold-gradient-text">Congress 2026</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-lg leading-relaxed font-normal">
                Join over 8,500 global cardiovascular specialists, researchers, and healthcare professionals in Paris for groundbreaking clinical presentations, innovation workshops, and international networking.
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold text-slate-200 border-t border-slate-700/80 pt-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C5A059]" />
                  <span>October 14 – 18, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C5A059]" />
                  <span>Paris Expo Porte de Versailles, France</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#C5A059]" />
                  <span>8,500+ Delegates Expected</span>
                </div>
              </div>

              {/* Direct Booking Call Out Card */}
              <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-md space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase font-bold text-[#C5A059] tracking-wider">
                      Official Congress Hotel Allotments
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      Guaranteed Delegate Rates & Priority Room Blocks
                    </h3>
                    <p className="text-xs text-slate-300">
                      Contracted rates at 24 official hotels with direct venue transfers and instant voucher issuance.
                    </p>
                  </div>
                  <Link
                    href="/wcc2026/hotels"
                    className="h-12 px-7 bg-[#C5A059] text-[#0B1B2D] font-bold text-xs rounded-xl hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2 shadow-xl shrink-0 uppercase tracking-wider cursor-pointer"
                  >
                    <span>Book Accommodation</span> <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CONGRESS HIGHLIGHTS & VENUE */}
        <section id="about" className="px-4 sm:px-8 lg:px-12 max-w-[1650px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0B1B2D]/5 flex items-center justify-center text-[#0B1B2D]">
              <Award className="w-6 h-6 text-[#C5A059]" />
            </div>
            <h3 className="text-xl font-bold text-[#0B1B2D]">Scientific Tracks</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore 120+ clinical sessions on Interventional Cardiology, Heart Failure, Electrophysiology, and AI in Cardiovascular Medicine.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0B1B2D]/5 flex items-center justify-center text-[#0B1B2D]">
              <MapPin className="w-6 h-6 text-[#C5A059]" />
            </div>
            <h3 className="text-xl font-bold text-[#0B1B2D]">Paris Expo Venue</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Located at Paris Expo Porte de Versailles, one of Europe's premier congress centers with seamless metro & shuttle connections.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0B1B2D]/5 flex items-center justify-center text-[#0B1B2D]">
              <ShieldCheck className="w-6 h-6 text-[#C5A059]" />
            </div>
            <h3 className="text-xl font-bold text-[#0B1B2D]">Official Travel Partner</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fulfillment and billing managed by <strong>Apex MICE & Travel Services Ltd</strong> (IATA #98234-EU) powered by PCOXchange.
            </p>
          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#0B1B2D] text-white border-t border-[#C5A059]/30 py-10 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1650px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-xs text-slate-400">
              © 2026 World Cardiology Congress (WCC). All Rights Reserved.
            </p>
            <p className="text-[11px] text-slate-500">
              Accommodation technology provided by PCOXchange. Merchant of Record: Apex MICE & Travel Services Ltd.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-300 font-semibold">
            <Link href="/wcc2026/hotels" className="text-[#C5A059] hover:underline">Delegate Hotel Search</Link>
            <span>•</span>
            <Link href="/backend" className="hover:underline">Organizer Backend Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
