'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import { 
  ShieldCheck, 
  Building2, 
  Layers, 
  Eye, 
  Briefcase, 
  Hotel, 
  Car, 
  Compass, 
  Edit3, 
  Users, 
  ExternalLink,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export default function SaaSHeader({ activePersona }: { activePersona?: 'SUPER_ADMIN' | 'CONGRESS' | 'TRAVEL_AGENT' }) {
  const pathname = usePathname();

  return (
    <header className="bg-[#0B1B2D] text-white border-b border-[#C5A059]/30 shadow-md sticky top-0 z-40">
      {/* DIRECT WORKFLOW URL SWITCHER BAR */}
      <div className="bg-[#061121] text-white px-4 sm:px-8 py-2 border-b border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span className="font-bold text-slate-300 uppercase tracking-widest text-[10px]">
            Workflow URLs &amp; Persona Navigator:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-[#162B44] p-1 rounded-xl border border-slate-700">
          <Link
            href="/superadmin"
            className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 text-[11px] ${
              pathname === '/superadmin' ? 'bg-[#C5A059] text-[#0B1B2D] shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> 1. Super Admin (/superadmin)
          </Link>

          <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

          <Link
            href="/pco/ta-mapping"
            className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 text-[11px] ${
              pathname.startsWith('/pco') ? 'bg-[#C5A059] text-[#0B1B2D] shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" /> 2. Congress Layer (/pco/ta-mapping)
          </Link>

          <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

          <Link
            href="/ta/allotments"
            className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 text-[11px] ${
              pathname.startsWith('/ta') ? 'bg-[#C5A059] text-[#0B1B2D] shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" /> 3. Travel Agent Layer (/ta/allotments)
          </Link>

          <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

          <Link
            href="/backend"
            className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 text-[11px] ${
              pathname === '/backend' ? 'bg-[#C5A059] text-[#0B1B2D] shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Unified Simulator (/backend)
          </Link>
        </div>
      </div>

      {/* HEADER TITLE & SUB-WORKFLOW LINKS */}
      <div className="max-w-[1650px] mx-auto px-4 sm:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs text-slate-300 hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-4 h-4 text-[#C5A059]" /> Public Site
          </Link>
          <div className="h-6 w-px bg-slate-700 hidden sm:block" />
          <div>
            <div className="flex items-center gap-2">
              <Logo size="sm" darkNav={true} />
              <span className="text-[10px] uppercase font-bold text-[#C5A059] bg-[#C5A059]/20 px-2.5 py-0.5 rounded border border-[#C5A059]/30">
                {activePersona === 'SUPER_ADMIN' || pathname === '/superadmin' ? 'SUPER ADMIN WORKFLOW' :
                 pathname.startsWith('/pco') ? 'CONGRESS ORGANIZER WORKFLOW' :
                 pathname.startsWith('/ta') ? 'TRAVEL AGENT WORKFLOW' : 'SAAS CONSOLE'}
              </span>
            </div>
          </div>
        </div>

        {/* SUB-WORKFLOW NAVIGATION PILLS */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {pathname.startsWith('/pco') && (
            <>
              <Link
                href="/pco/exhibitions"
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  pathname === '/pco/exhibitions' || pathname === '/pco' ? 'bg-white/20 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-[#C5A059]" /> Exhibitions (/pco/exhibitions)
              </Link>
              <Link
                href="/pco/ta-mapping"
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  pathname === '/pco/ta-mapping' ? 'bg-[#C5A059] text-[#0B1B2D]' : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> TA Scope Mapping (/pco/ta-mapping)
              </Link>
              <Link
                href="/pco/bookings"
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  pathname === '/pco/bookings' ? 'bg-white/20 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-[#C5A059]" /> Booking Queue (/pco/bookings)
              </Link>
              <Link
                href="/pco/staff"
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  pathname === '/pco/staff' ? 'bg-white/20 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-[#C5A059]" /> Staff (/pco/staff)
              </Link>
            </>
          )}

          {pathname.startsWith('/ta') && (
            <>
              <Link
                href="/ta/allotments"
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  pathname === '/ta/allotments' || pathname === '/ta' ? 'bg-[#C5A059] text-[#0B1B2D]' : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Hotel className="w-3.5 h-3.5" /> Room Allotments (/ta/allotments)
              </Link>
              <Link
                href="/ta/transfers"
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  pathname === '/ta/transfers' ? 'bg-white/20 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Car className="w-3.5 h-3.5 text-[#C5A059]" /> Transfers (/ta/transfers)
              </Link>
              <Link
                href="/ta/sightseeing"
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  pathname === '/ta/sightseeing' ? 'bg-white/20 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-[#C5A059]" /> Sightseeing (/ta/sightseeing)
              </Link>
              <Link
                href="/ta/amendments"
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  pathname === '/ta/amendments' ? 'bg-white/20 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 text-[#C5A059]" /> Amendments (/ta/amendments)
              </Link>
              <Link
                href="/ta/staff"
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  pathname === '/ta/staff' ? 'bg-white/20 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-[#C5A059]" /> Staff (/ta/staff)
              </Link>
            </>
          )}

          <Link 
            href="/event/wcc-2026"
            className="h-9 px-3 rounded-lg bg-[#C5A059] text-[#0B1B2D] font-bold hover:bg-[#D4AF37] transition-all flex items-center gap-1.5 cursor-pointer ml-2"
          >
            Public Site <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
