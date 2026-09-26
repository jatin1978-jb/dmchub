'use client';

import React, { useState } from 'react';
import SaaSHeader from '@/components/SaaSHeader';
import { useInventory } from '@/context/InventoryContext';
import { Compass, Plus, X } from 'lucide-react';

export default function TaSightseeingPage() {
  const { activities, addActivity } = useInventory();
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('3 Hours');
  const [desc, setDesc] = useState('Guided city tour with luxury coach.');
  const [price, setPrice] = useState(95);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addActivity({
      title,
      duration,
      desc,
      price: Number(price),
      status: 'Active',
      taOwnerId: 'ta-helios'
    });
    setShowAddModal(false);
    setTitle('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1B2D] flex flex-col font-sans">
      <SaaSHeader activePersona="TRAVEL_AGENT" />

      <main className="flex-1 max-w-[1650px] mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#0B1B2D] text-xs font-bold uppercase tracking-wider mb-2">
                <Compass className="w-3.5 h-3.5 text-[#C5A059]" /> Dedicated URL: /ta/sightseeing
              </div>
              <h3 className="text-xl font-bold font-serif text-[#0B1B2D]">Sightseeing Tours &amp; Excursion Add-Ons</h3>
              <p className="text-xs text-slate-500">Configure guided excursions and social programs for congress delegates.</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="h-10 px-4 rounded-xl bg-[#0B1B2D] text-white font-bold text-xs hover:bg-[#162B44] flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#C5A059]" /> + Add Excursion
            </button>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Excursion Title</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Description</th>
                <th className="p-4">Price (€)</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {activities.map((a) => (
                <tr key={a.id}>
                  <td className="p-4 font-bold text-[#0B1B2D]">{a.title}</td>
                  <td className="p-4 text-slate-600">{a.duration}</td>
                  <td className="p-4 text-slate-500">{a.desc}</td>
                  <td className="p-4 font-bold text-[#0B1B2D]">€{a.price}</td>
                  <td className="p-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[11px]">
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-[#0B1B2D] text-sm">Add Excursion Package</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Title</label>
                <input type="text" placeholder="e.g. Seine River Dinner Cruise" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Duration</label>
                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Price (€)</label>
                <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" />
              </div>
              <button type="submit" className="w-full h-11 bg-[#0B1B2D] text-white font-bold rounded-xl">Save Excursion</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
