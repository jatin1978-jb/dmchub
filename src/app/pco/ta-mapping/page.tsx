'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SaaSHeader from '@/components/SaaSHeader';
import { 
  useInventory, 
  TravelAgentProfile 
} from '@/context/InventoryContext';
import { 
  Building2, 
  Layers, 
  CheckCircle2, 
  Hotel, 
  Car, 
  Compass, 
  Plus, 
  Trash2, 
  X 
} from 'lucide-react';

export default function PcoTAMappingPage() {
  const { 
    congresses, 
    travelAgents, 
    updateTAMappings, 
    addTravelAgent 
  } = useInventory();

  const [selectedExhibitionIdForMapping, setSelectedExhibitionIdForMapping] = useState<string>('wcc-2026');
  const [mappingModalTA, setMappingModalTA] = useState<TravelAgentProfile | null>(null);
  const [selectedScopeToApply, setSelectedScopeToApply] = useState<'ACCOMMODATION' | 'TRANSFERS' | 'ACTIVITIES' | 'ALL'>('ACCOMMODATION');
  const [showAddTAModal, setShowAddTAModal] = useState(false);

  // Form States - TA
  const [newTaAgencyName, setNewTaAgencyName] = useState('');
  const [newTaIata, setNewTaIata] = useState('');
  const [newTaContact, setNewTaContact] = useState('');
  const [newTaEmail, setNewTaEmail] = useState('');

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
      scopes: ['ACCOMMODATION', 'TRANSFERS', 'ACTIVITIES']
    });
    setShowAddTAModal(false);
    setNewTaAgencyName('');
  };

  const handleConfirmTAMapping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mappingModalTA || !selectedExhibitionIdForMapping) return;

    const targetCongress = congresses.find(c => c.id === selectedExhibitionIdForMapping);
    if (!targetCongress) return;

    const existingMappings = targetCongress.taMappings || [];
    const updatedMappings = [
      ...existingMappings.filter(m => !(m.travelAgentId === mappingModalTA.id && m.scope === selectedScopeToApply)),
      { travelAgentId: mappingModalTA.id, scope: selectedScopeToApply }
    ];

    updateTAMappings(selectedExhibitionIdForMapping, updatedMappings);
    setMappingModalTA(null);
  };

  const handleRemoveMapping = (congressId: string, taId: string, scope: string) => {
    const targetCongress = congresses.find(c => c.id === congressId);
    if (!targetCongress) return;

    const updatedMappings = targetCongress.taMappings.filter(
      m => !(m.travelAgentId === taId && m.scope === scope)
    );
    updateTAMappings(congressId, updatedMappings);
  };

  const activeCongress = congresses.find(c => c.id === selectedExhibitionIdForMapping) || congresses[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1B2D] flex flex-col font-sans">
      <SaaSHeader activePersona="CONGRESS" />

      <main className="flex-1 max-w-[1650px] mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        
        {/* HEADER & ACTION */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#0B1B2D] text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5 text-[#C5A059]" /> Dedicated URL: /pco/ta-mapping
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B1B2D]">
              Appointed Travel Agent (TA) Account Creation &amp; Scope Mapping Studio
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Select exhibitions on the left, map Travel Agents on the right, assign specific product scopes (Hotels, Transfers, Sightseeing), and review real-time allocation outcomes on the same screen.
            </p>
          </div>

          <button
            onClick={() => setShowAddTAModal(true)}
            className="h-11 px-5 rounded-xl bg-[#0B1B2D] text-white font-bold text-xs hover:bg-[#162B44] transition-all flex items-center gap-2 shadow-md shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#C5A059]" /> + Register New TA Account
          </button>
        </div>

        {/* TWO-COLUMN SPLIT MAPPING WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: EXHIBITIONS / CONGRESSES (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider">Step 1</span>
                <h4 className="text-base font-bold text-[#0B1B2D]">Exhibitions &amp; Congresses</h4>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                {congresses.length} Total
              </span>
            </div>

            <p className="text-xs text-slate-500">Click an exhibition to manage its mapped Travel Agents:</p>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {congresses.map((c) => {
                const isSelected = selectedExhibitionIdForMapping === c.id;
                const mappedCount = c.taMappings?.length || 0;

                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedExhibitionIdForMapping(c.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-[#C5A059] bg-[#0B1B2D] text-white shadow-lg'
                        : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 text-[#0B1B2D]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h5 className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-[#0B1B2D]'}`}>
                          {c.title}
                        </h5>
                        <p className={`text-xs mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          📅 {c.dates}
                        </p>
                        <p className={`text-[11px] ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                          📍 {c.venue}
                        </p>
                      </div>
                      {isSelected && (
                        <span className="bg-[#C5A059] text-[#0B1B2D] p-1 rounded-full shrink-0 shadow">
                          <CheckCircle2 className="w-4 h-4" />
                        </span>
                      )}
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.isLive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-500/20 text-slate-300'
                      }`}>
                        {c.isLive ? '● LIVE' : '○ Offline'}
                      </span>

                      <span className={`font-semibold text-[11px] ${isSelected ? 'text-[#C5A059]' : 'text-slate-600'}`}>
                        {mappedCount} Mapped TA(s)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: TRAVEL AGENT NAMES & MAP ACTIONS (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider">Step 2</span>
                <h4 className="text-base font-bold text-[#0B1B2D]">
                  All Travel Agent (TA) Accounts
                </h4>
              </div>
              <button
                onClick={() => setShowAddTAModal(true)}
                className="text-xs font-bold text-[#C5A059] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> + Register TA Account
              </button>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
              <span>Mapping Target: <strong>{activeCongress?.title}</strong></span>
              <span className="font-mono text-[10px] text-amber-700 font-bold">Slug: /{activeCongress?.slug}</span>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {travelAgents.map((ta) => {
                const existingMapping = activeCongress?.taMappings?.find(m => m.travelAgentId === ta.id);

                return (
                  <div key={ta.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 hover:border-slate-300 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-sm text-[#0B1B2D]">{ta.agencyName}</h5>
                          <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-mono font-bold">
                            {ta.iataNumber}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          👤 {ta.contactPerson} • ✉️ {ta.email} • 📞 {ta.phone}
                        </p>
                      </div>

                      <div>
                        {existingMapping ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Mapped: {existingMapping.scope}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-semibold">
                            Not Mapped
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                        <span className="font-bold text-slate-400 uppercase mr-1">Capabilities:</span>
                        {ta.scopes?.map((sc, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-semibold">
                            {sc === 'ACCOMMODATION' ? '🏨 Hotel Blocks' : sc === 'TRANSFERS' ? '🚗 Transfers' : '🧭 Sightseeing'}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          setMappingModalTA(ta);
                          setSelectedScopeToApply(existingMapping?.scope || 'ACCOMMODATION');
                        }}
                        className="h-9 px-4 rounded-xl bg-[#C5A059] text-[#0B1B2D] font-bold text-xs hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-1.5 shadow cursor-pointer shrink-0"
                      >
                        <Layers className="w-3.5 h-3.5" /> Map with {activeCongress?.title.split(' ')[0]}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* OUTCOME PANEL: LIVE MAPPING MATRIX RESULTS ON THE SAME SCREEN */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
            <div>
              <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider">Step 3 • Live Mapping Outcome</span>
              <h3 className="text-xl font-bold font-serif text-[#0B1B2D]">
                Product Allocation Matrix for {activeCongress?.title}
              </h3>
              <p className="text-xs text-slate-500">
                Real-time breakdown of mapped Travel Agents and their assigned product scopes.
              </p>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Outcome Matrix
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-bold text-sm text-[#0B1B2D]">{activeCongress?.title}</h4>
                <p className="text-xs text-slate-500">📅 {activeCongress?.dates} • 📍 {activeCongress?.venue}</p>
              </div>
              <span className="text-xs font-bold text-[#C5A059] bg-[#C5A059]/10 px-3 py-1 rounded-lg border border-[#C5A059]/30 self-start sm:self-auto">
                {activeCongress?.taMappings?.length || 0} Active Product Mappings
              </span>
            </div>

            {(!activeCongress?.taMappings || activeCongress.taMappings.length === 0) ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-400 text-xs">
                No Travel Agents mapped to this exhibition yet. Select a TA from above and click &quot;Map with this Exhibition&quot;.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Exhibition</th>
                      <th className="p-3.5">Mapped Travel Agent</th>
                      <th className="p-3.5">IATA &amp; Contact</th>
                      <th className="p-3.5">Mapped Product Scope</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {activeCongress.taMappings.map((m, idx) => {
                      const ta = travelAgents.find(t => t.id === m.travelAgentId);
                      return (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-all">
                          <td className="p-3.5 font-bold text-[#0B1B2D]">
                            {activeCongress.title}
                          </td>
                          <td className="p-3.5 font-bold text-[#0B1B2D]">
                            {ta ? ta.agencyName : m.travelAgentId}
                          </td>
                          <td className="p-3.5 text-slate-600">
                            <div>{ta?.contactPerson || 'N/A'} ({ta?.email})</div>
                            <div className="text-[10px] font-mono text-slate-400">{ta?.iataNumber}</div>
                          </td>
                          <td className="p-3.5">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                              m.scope === 'ACCOMMODATION' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                              m.scope === 'TRANSFERS' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                              m.scope === 'ACTIVITIES' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                              'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            }`}>
                              {m.scope === 'ACCOMMODATION' && <Hotel className="w-3.5 h-3.5 text-amber-700" />}
                              {m.scope === 'TRANSFERS' && <Car className="w-3.5 h-3.5 text-blue-700" />}
                              {m.scope === 'ACTIVITIES' && <Compass className="w-3.5 h-3.5 text-purple-700" />}
                              {m.scope === 'ALL' && <Layers className="w-3.5 h-3.5 text-emerald-700" />}
                              {m.scope === 'ACCOMMODATION' ? 'Hotel Accommodation' : m.scope === 'TRANSFERS' ? 'Airport Transfers' : m.scope === 'ACTIVITIES' ? 'Sightseeing & Excursions' : 'All Products & Services'}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px] inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active &amp; Mapped
                            </span>
                          </td>
                          <td className="p-3.5">
                            <button
                              onClick={() => handleRemoveMapping(activeCongress.id, m.travelAgentId, m.scope)}
                              className="text-red-500 hover:text-red-700 font-bold text-xs hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Unmap
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MODAL: MAP TA TO EXHIBITION SCOPE */}
      {mappingModalTA && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider">Configure Mapping</span>
                <h3 className="font-bold text-[#0B1B2D] text-base">Map Travel Agent to Exhibition</h3>
              </div>
              <button onClick={() => setMappingModalTA(null)} className="p-1.5 rounded-xl bg-slate-100 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
              <div className="font-bold text-[#0B1B2D]">TA Agency: {mappingModalTA.agencyName} ({mappingModalTA.iataNumber})</div>
              <div className="text-slate-500">Target Exhibition: {activeCongress?.title}</div>
            </div>

            <form onSubmit={handleConfirmTAMapping} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px] block mb-2">
                  Select Product / Service Scope for this TA:
                </label>

                <div className="space-y-2">
                  {[
                    { id: 'ACCOMMODATION', label: '🏨 Accommodation (Hotels & Room Blocks)', desc: 'Contracted room inventory & voucher issuance' },
                    { id: 'TRANSFERS', label: '🚗 Transfers (Airport Shuttles & Chauffeur)', desc: 'Executive airport transfers & shuttle routes' },
                    { id: 'ACTIVITIES', label: '🧭 Sightseeing (SS Excursions & Tours)', desc: 'City tours, dinner cruises & excursions' },
                    { id: 'ALL', label: '🌐 ALL Products & Services', desc: 'Full service management across all categories' },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      onClick={() => setSelectedScopeToApply(opt.id as any)}
                      className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                        selectedScopeToApply === opt.id ? 'border-[#C5A059] bg-[#C5A059]/10 font-bold' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="scope"
                        checked={selectedScopeToApply === opt.id}
                        onChange={() => setSelectedScopeToApply(opt.id as any)}
                        className="mt-0.5 accent-[#C5A059]"
                      />
                      <div>
                        <div className="text-xs text-[#0B1B2D] font-bold">{opt.label}</div>
                        <div className="text-[10px] text-slate-500 font-normal">{opt.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMappingModalTA(null)}
                  className="h-10 px-4 rounded-xl border border-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-6 rounded-xl bg-[#0B1B2D] text-white font-bold hover:bg-[#162B44] cursor-pointer"
                >
                  Confirm &amp; Apply Mapping
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REGISTER NEW TA */}
      {showAddTAModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-[#0B1B2D] text-sm">Register New Travel Agent Profile</h3>
              <button onClick={() => setShowAddTAModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveTA} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Agency Name</label>
                <input type="text" placeholder="e.g. Royal Horizon Events & Travel" value={newTaAgencyName} onChange={(e) => setNewTaAgencyName(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">IATA License Number</label>
                <input type="text" placeholder="e.g. IATA #99102-FR" value={newTaIata} onChange={(e) => setNewTaIata(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Contact Person &amp; Email</label>
                <input type="email" placeholder="agent@horizon.fr" value={newTaEmail} onChange={(e) => setNewTaEmail(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
              </div>
              <button type="submit" className="w-full h-11 bg-[#0B1B2D] text-white font-bold rounded-xl">Save &amp; Register Travel Agent</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
