'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SaaSHeader from '@/components/SaaSHeader';
import { 
  useInventory, 
  CongressEvent, 
  TravelAgentProfile 
} from '@/context/InventoryContext';
import { 
  ShieldCheck, 
  Plus, 
  Building2, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Power, 
  Eye, 
  X 
} from 'lucide-react';

export default function SuperAdminPage() {
  const { 
    congresses, 
    travelAgents, 
    staffAccounts, 
    addCongress, 
    addTravelAgent, 
    toggleCongressLive 
  } = useInventory();

  const [showAddCongressModal, setShowAddCongressModal] = useState(false);
  const [showAddTAModal, setShowAddTAModal] = useState(false);

  // Form States
  const [newCongressTitle, setNewCongressTitle] = useState('');
  const [newCongressDates, setNewCongressDates] = useState('October 14 – 18, 2026');
  const [newCongressVenue, setNewCongressVenue] = useState('Paris Expo Porte de Versailles');
  const [newCongressDesc, setNewCongressDesc] = useState('');

  const [newTaAgencyName, setNewTaAgencyName] = useState('');
  const [newTaIata, setNewTaIata] = useState('');
  const [newTaContact, setNewTaContact] = useState('');
  const [newTaEmail, setNewTaEmail] = useState('');

  const handleSaveCongress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCongressTitle) return;
    addCongress({
      title: newCongressTitle,
      dates: newCongressDates,
      venue: newCongressVenue,
      description: newCongressDesc || 'Official Congress Event',
      logoUrl: '/pcoxchange-logo.png',
      bannerUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      isLive: false,
      taMappings: [{ travelAgentId: 'ta-apex', scope: 'ALL' }],
      createdById: 'superadmin-1'
    });
    setShowAddCongressModal(false);
    setNewCongressTitle('');
  };

  const handleSaveTA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaAgencyName) return;
    addTravelAgent({
      agencyName: newTaAgencyName,
      iataNumber: newTaIata || 'IATA-PENDING',
      contactPerson: newTaContact || 'Contact Person',
      email: newTaEmail || 'agent@agency.com',
      phone: '+1 555-0199',
      country: 'Global',
      scopes: ['ACCOMMODATION', 'TRANSFERS']
    });
    setShowAddTAModal(false);
    setNewTaAgencyName('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1B2D] flex flex-col font-sans">
      <SaaSHeader activePersona="SUPER_ADMIN" />

      <main className="flex-1 max-w-[1650px] mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        
        {/* SUPER ADMIN BANNER */}
        <div className="bg-gradient-to-r from-[#0B1B2D] to-[#162B44] text-white p-8 rounded-3xl border border-[#C5A059]/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Super Admin Control Console (/superadmin)
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">PCOXchange Platform Super Admin</h2>
            <p className="text-slate-300 text-sm max-w-2xl">
              Platform-level control console. Create Congresses, register Travel Agents directly, manage platform staff, and monitor global SaaS metrics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setShowAddCongressModal(true)}
              className="h-11 px-5 rounded-xl bg-[#C5A059] text-[#0B1B2D] font-bold text-xs hover:bg-[#D4AF37] transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Create Congress / Exhibition
            </button>
            <button 
              onClick={() => setShowAddTAModal(true)}
              className="h-11 px-5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#C5A059]" /> Create Direct TA Account
            </button>
          </div>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Congresses</span>
            <div className="text-3xl font-bold text-[#0B1B2D]">{congresses.length} Events</div>
            <p className="text-xs text-emerald-600 font-semibold">{congresses.filter(c => c.isLive).length} Currently LIVE</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registered Travel Agents</span>
            <div className="text-3xl font-bold text-[#0B1B2D]">{travelAgents.length} Agencies</div>
            <p className="text-xs text-slate-500">Hotels, Transfers &amp; Excursions</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Platform SaaS Volume</span>
            <div className="text-3xl font-bold text-[#0B1B2D]">€148,500</div>
            <p className="text-xs text-emerald-600 font-semibold">Processed via Appointed TAs</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Platform Staff</span>
            <div className="text-3xl font-bold text-[#0B1B2D]">{staffAccounts.length} Accounts</div>
            <p className="text-xs text-slate-500">Across All Platform Roles</p>
          </div>
        </div>

        {/* CONGRESS LIST TABLE */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0B1B2D]">All Platform Congresses &amp; Exhibitions</h3>
              <p className="text-xs text-slate-500">Super admin overview of all congress events and mapped travel agents.</p>
            </div>
            <Link href="/pco/ta-mapping" className="text-xs font-bold text-[#C5A059] hover:underline">
              Open Scope Mapping Studio ➔
            </Link>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Congress Title &amp; Slug</th>
                <th className="p-4">Dates &amp; Venue</th>
                <th className="p-4">Public Site LIVE Toggle</th>
                <th className="p-4">Mapped Travel Agents</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {congresses.map((c) => (
                <tr key={c.id}>
                  <td className="p-4 font-bold text-[#0B1B2D]">
                    <div className="text-sm">{c.title}</div>
                    <div className="text-[10px] font-mono text-slate-400">/event/{c.slug}</div>
                  </td>
                  <td className="p-4 text-slate-600">
                    <div>{c.dates}</div>
                    <div className="text-[10px] text-slate-400">{c.venue}</div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleCongressLive(c.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        c.isLive ? 'bg-emerald-500 text-white shadow' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      <Power className="w-3.5 h-3.5" /> {c.isLive ? 'LIVE (Public)' : 'Offline (Draft)'}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1 text-[11px]">
                      {c.taMappings?.map((m, idx) => (
                        <span key={idx} className="inline-block px-2 py-0.5 rounded bg-slate-100 font-semibold mr-1">
                          {m.travelAgentId} ({m.scope})
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <Link 
                      href={`/event/${c.slug}`}
                      className="text-[#C5A059] font-bold hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview Site
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* MODAL: SUPER ADMIN CREATE CONGRESS */}
      {showAddCongressModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-[#0B1B2D] text-sm">Create New Congress / Exhibition</h3>
              <button onClick={() => setShowAddCongressModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveCongress} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Congress Title</label>
                <input type="text" placeholder="e.g. World Cardiology Congress 2026" value={newCongressTitle} onChange={(e) => setNewCongressTitle(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Event Dates</label>
                <input type="text" value={newCongressDates} onChange={(e) => setNewCongressDates(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Venue</label>
                <input type="text" value={newCongressVenue} onChange={(e) => setNewCongressVenue(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" />
              </div>
              <button type="submit" className="w-full h-11 bg-[#0B1B2D] text-white font-bold rounded-xl">Save &amp; Create Congress</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SUPER ADMIN CREATE DIRECT TA */}
      {showAddTAModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-[#0B1B2D] text-sm">Create Travel Agent Profile Directly</h3>
              <button onClick={() => setShowAddTAModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveTA} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Agency Name</label>
                <input type="text" placeholder="e.g. Global Travel Agency Ltd" value={newTaAgencyName} onChange={(e) => setNewTaAgencyName(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">IATA License Number</label>
                <input type="text" placeholder="e.g. IATA #98234-EU" value={newTaIata} onChange={(e) => setNewTaIata(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Contact Person &amp; Email</label>
                <input type="email" placeholder="agent@agency.com" value={newTaEmail} onChange={(e) => setNewTaEmail(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
              </div>
              <button type="submit" className="w-full h-11 bg-[#0B1B2D] text-white font-bold rounded-xl">Save &amp; Create Travel Agent</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
