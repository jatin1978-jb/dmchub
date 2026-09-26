'use client';

import React from 'react';
import Link from 'next/link';
import SaaSHeader from '@/components/SaaSHeader';
import { useInventory } from '@/context/InventoryContext';
import { Eye } from 'lucide-react';

export default function PcoBookingsPage() {
  const { manifest } = useInventory();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1B2D] flex flex-col font-sans">
      <SaaSHeader activePersona="CONGRESS" />

      <main className="flex-1 max-w-[1650px] mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#0B1B2D] text-xs font-bold uppercase tracking-wider mb-2">
                <Eye className="w-3.5 h-3.5 text-[#C5A059]" /> Dedicated URL: /pco/bookings
              </div>
              <h3 className="text-xl font-bold font-serif text-[#0B1B2D]">View-Only Delegate Booking Queue</h3>
              <p className="text-xs text-slate-500">Real-time delegate accommodation, transfer, and excursion bookings.</p>
            </div>
            <span className="text-xs font-bold text-[#C5A059] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              View-Only Governance Mode
            </span>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Voucher Ref</th>
                <th className="p-4">Delegate Name</th>
                <th className="p-4">Hotel &amp; Room Allotment</th>
                <th className="p-4">Transfer Option</th>
                <th className="p-4">Sightseeing Add-On</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {manifest.map((m) => (
                <tr key={m.id}>
                  <td className="p-4 font-mono font-bold text-slate-400">{m.id}</td>
                  <td className="p-4 font-bold text-[#0B1B2D]">{m.paxName}</td>
                  <td className="p-4 text-slate-700">{m.hotel} - {m.room}</td>
                  <td className="p-4 text-slate-700">{m.transfer}</td>
                  <td className="p-4 text-slate-700">{m.sightseeing}</td>
                  <td className="p-4 font-extrabold text-[#0B1B2D]">{m.total}</td>
                  <td className="p-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[11px]">
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
