'use client';

import React, { useState } from 'react';
import SaaSHeader from '@/components/SaaSHeader';
import { useInventory } from '@/context/InventoryContext';
import { Users, Plus, X } from 'lucide-react';

export default function PcoStaffPage() {
  const { staffAccounts, addStaffAccount } = useInventory();
  const congressStaff = staffAccounts.filter(s => s.parentOrgType === 'CONGRESS');

  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffTitle, setNewStaffTitle] = useState('');

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName) return;
    addStaffAccount({
      name: newStaffName,
      email: newStaffEmail,
      roleTitle: newStaffTitle || 'Congress Operations Staff',
      parentOrgType: 'CONGRESS',
      parentOrgId: 'wcc-2026'
    });
    setShowAddStaffModal(false);
    setNewStaffName('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1B2D] flex flex-col font-sans">
      <SaaSHeader activePersona="CONGRESS" />

      <main className="flex-1 max-w-[1650px] mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#0B1B2D] text-xs font-bold uppercase tracking-wider mb-2">
                <Users className="w-3.5 h-3.5 text-[#C5A059]" /> Dedicated URL: /pco/staff
              </div>
              <h3 className="text-xl font-bold font-serif text-[#0B1B2D]">Congress Staff Accounts</h3>
              <p className="text-xs text-slate-500">Manage congress organizer staff logins and operational credentials.</p>
            </div>

            <button
              onClick={() => setShowAddStaffModal(true)}
              className="h-10 px-4 rounded-xl bg-[#0B1B2D] text-white font-bold text-xs hover:bg-[#162B44] flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#C5A059]" /> Create Staff Account
            </button>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Staff Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role Title</th>
                <th className="p-4">Organization Type</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {congressStaff.map((s) => (
                <tr key={s.id}>
                  <td className="p-4 font-bold text-[#0B1B2D]">{s.name}</td>
                  <td className="p-4 text-slate-600">{s.email}</td>
                  <td className="p-4 text-slate-700 font-semibold">{s.roleTitle}</td>
                  <td className="p-4 text-slate-500">{s.parentOrgType}</td>
                  <td className="p-4">
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-[#0B1B2D] text-sm">Create Congress Staff Account</h3>
              <button onClick={() => setShowAddStaffModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveStaff} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Staff Full Name</label>
                <input type="text" placeholder="e.g. Marie Laurent" value={newStaffName} onChange={(e) => setNewStaffName(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Email Address</label>
                <input type="email" placeholder="staff@congress.org" value={newStaffEmail} onChange={(e) => setNewStaffEmail(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Role Title</label>
                <input type="text" placeholder="e.g. Allotment Coordinator" value={newStaffTitle} onChange={(e) => setNewStaffTitle(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" />
              </div>
              <button type="submit" className="w-full h-11 bg-[#0B1B2D] text-white font-bold rounded-xl">Create Staff Account</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
