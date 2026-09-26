'use client';

import React, { useState } from 'react';
import SaaSHeader from '@/components/SaaSHeader';
import { useInventory, BookingManifestItem } from '@/context/InventoryContext';
import { Edit3, X } from 'lucide-react';

export default function TaAmendmentsPage() {
  const { manifest, amendBooking } = useInventory();

  const [selectedBookingToAmend, setSelectedBookingToAmend] = useState<BookingManifestItem | null>(null);
  const [amendPaxTitle, setAmendPaxTitle] = useState('');
  const [amendFirstName, setAmendFirstName] = useState('');
  const [amendLastName, setAmendLastName] = useState('');
  const [amendEmail, setAmendEmail] = useState('');
  const [amendRoomName, setAmendRoomName] = useState('');
  const [amendTransferTitle, setAmendTransferTitle] = useState('');
  const [amendStatus, setAmendStatus] = useState<'Confirmed' | 'Amended' | 'Cancelled'>('Amended');
  const [amendNote, setAmendNote] = useState('');

  const openAmendmentModal = (booking: BookingManifestItem) => {
    setSelectedBookingToAmend(booking);
    setAmendPaxTitle(booking.paxTitle || 'Dr.');
    setAmendFirstName(booking.paxFirstName || booking.paxName.split(' ')[1] || 'Julian');
    setAmendLastName(booking.paxLastName || booking.paxName.split(' ')[2] || 'Thorne');
    setAmendEmail(booking.email);
    setAmendRoomName(booking.room);
    setAmendTransferTitle(booking.transfer);
    setAmendStatus(booking.status);
    setAmendNote('Updated room category and guest details.');
  };

  const handleSaveAmendment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingToAmend) return;

    const fullPaxName = `${amendPaxTitle} ${amendFirstName} ${amendLastName}`;
    amendBooking(
      selectedBookingToAmend.id,
      {
        paxTitle: amendPaxTitle,
        paxFirstName: amendFirstName,
        paxLastName: amendLastName,
        paxName: fullPaxName,
        email: amendEmail,
        room: amendRoomName,
        transfer: amendTransferTitle,
        status: amendStatus
      },
      amendNote
    );

    setSelectedBookingToAmend(null);
    alert(`Booking ${selectedBookingToAmend.id} amended successfully!`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1B2D] flex flex-col font-sans">
      <SaaSHeader activePersona="TRAVEL_AGENT" />

      <main className="flex-1 max-w-[1650px] mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#0B1B2D] text-xs font-bold uppercase tracking-wider mb-2">
                <Edit3 className="w-3.5 h-3.5 text-[#C5A059]" /> Dedicated URL: /ta/amendments
              </div>
              <h3 className="text-xl font-bold font-serif text-[#0B1B2D]">Product-wise Booking Amendment Engine</h3>
              <p className="text-xs text-slate-500">Inspect product breakdowns (Room, Transfer, Excursions) and process guest amendments with audit logs.</p>
            </div>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Voucher Ref</th>
                <th className="p-4">Delegate Details</th>
                <th className="p-4">Product Breakdown</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {manifest.map((m) => (
                <tr key={m.id}>
                  <td className="p-4 font-mono font-bold text-slate-400">{m.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-[#0B1B2D]">{m.paxName}</div>
                    <div className="text-[10px] text-slate-500">{m.email}</div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1 text-[11px]">
                      <div>🏨 <strong>Room:</strong> {m.room}</div>
                      <div>🚗 <strong>Transfer:</strong> {m.transfer}</div>
                      <div>🎡 <strong>Excursion:</strong> {m.sightseeing}</div>
                    </div>
                  </td>
                  <td className="p-4 font-extrabold text-[#0B1B2D]">{m.total}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                      m.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      m.status === 'Amended' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                      'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => openAmendmentModal(m)}
                      className="h-9 px-3 rounded-lg bg-[#0B1B2D] text-white font-bold text-xs hover:bg-[#162B44] flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#C5A059]" /> Amend Booking
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* MODAL: PRODUCT-WISE BOOKING AMENDMENT */}
      {selectedBookingToAmend && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#C5A059]">Product-wise Booking Amendment Engine</span>
                <h3 className="text-xl font-bold font-serif text-[#0B1B2D]">Amend Booking {selectedBookingToAmend.id}</h3>
              </div>
              <button onClick={() => setSelectedBookingToAmend(null)} className="p-2 rounded-xl bg-slate-100 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAmendment} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-500 uppercase text-[10px]">Title</label>
                  <input type="text" value={amendPaxTitle} onChange={(e) => setAmendPaxTitle(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-500 uppercase text-[10px]">First Name</label>
                  <input type="text" value={amendFirstName} onChange={(e) => setAmendFirstName(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-500 uppercase text-[10px]">Last Name</label>
                  <input type="text" value={amendLastName} onChange={(e) => setAmendLastName(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Amend Room Category</label>
                <input type="text" value={amendRoomName} onChange={(e) => setAmendRoomName(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" />
              </div>

              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Amend Airport Transfer</label>
                <input type="text" value={amendTransferTitle} onChange={(e) => setAmendTransferTitle(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-500 uppercase text-[10px]">Booking Status</label>
                  <select value={amendStatus} onChange={(e) => setAmendStatus(e.target.value as any)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold">
                    <option value="Confirmed">Confirmed</option>
                    <option value="Amended">Amended</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-500 uppercase text-[10px]">Amendment Note / Audit Reason</label>
                  <input type="text" value={amendNote} onChange={(e) => setAmendNote(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setSelectedBookingToAmend(null)} className="h-10 px-4 rounded-xl border border-slate-300 font-bold">Cancel</button>
                <button type="submit" className="h-10 px-6 rounded-xl bg-[#0B1B2D] text-white font-bold cursor-pointer">Save Amendment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
