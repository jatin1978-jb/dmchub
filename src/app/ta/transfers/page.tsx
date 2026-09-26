'use client';

import React, { useState } from 'react';
import SaaSHeader from '@/components/SaaSHeader';
import { useInventory } from '@/context/InventoryContext';
import { Car, Plus, X } from 'lucide-react';

export default function TaTransfersPage() {
  const { transfers, addTransfer } = useInventory();
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [vehicle, setVehicle] = useState('Mercedes E-Class Sedan');
  const [price, setPrice] = useState(120);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addTransfer({
      title,
      vehicle,
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
                <Car className="w-3.5 h-3.5 text-[#C5A059]" /> Dedicated URL: /ta/transfers
              </div>
              <h3 className="text-xl font-bold font-serif text-[#0B1B2D]">Airport Transfers &amp; Executive Transportation</h3>
              <p className="text-xs text-slate-500">Configure private airport transfers and shuttle options for delegates.</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="h-10 px-4 rounded-xl bg-[#0B1B2D] text-white font-bold text-xs hover:bg-[#162B44] flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#C5A059]" /> + Add Transfer Option
            </button>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Transfer Title</th>
                <th className="p-4">Vehicle Category</th>
                <th className="p-4">Rate (€)</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {transfers.map((t) => (
                <tr key={t.id}>
                  <td className="p-4 font-bold text-[#0B1B2D]">{t.title}</td>
                  <td className="p-4 text-slate-600">{t.vehicle}</td>
                  <td className="p-4 font-bold text-[#0B1B2D]">€{t.price}</td>
                  <td className="p-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[11px]">
                      {t.status}
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
              <h3 className="font-bold text-[#0B1B2D] text-sm">Add Transfer Package</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Package Title</label>
                <input type="text" placeholder="e.g. Private Airport Arrival Transfer" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Vehicle Category</label>
                <input type="text" value={vehicle} onChange={(e) => setVehicle(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Price (€)</label>
                <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" />
              </div>
              <button type="submit" className="w-full h-11 bg-[#0B1B2D] text-white font-bold rounded-xl">Save Transfer Package</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
