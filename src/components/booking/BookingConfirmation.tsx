'use client';

import React from 'react';
import Logo from '@/components/Logo';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  User, 
  Building2, 
  Printer, 
  Download, 
  Info,
  CreditCard,
  QrCode
} from 'lucide-react';

interface BookingConfirmationProps {
  bookingId?: string;
  eventName?: string;
  travelAgentName?: string;
  travelAgentLicense?: string;
  guestName?: string;
  hotelName?: string;
  roomType?: string;
  checkIn?: string;
  checkOut?: string;
  totalNights?: number;
  totalAmount?: string;
}

export default function BookingConfirmation({
  bookingId = 'PX-2026-98104',
  eventName = 'World Cardiology Congress 2026 (WCC)',
  travelAgentName = 'Apex MICE & Travel Services Ltd',
  travelAgentLicense = 'IATA #98234-EU',
  guestName = 'Dr. Julian Thorne',
  hotelName = 'Novotel Paris Centre Tour Eiffel',
  roomType = 'Superior Executive Room (Includes Breakfast & City Tax)',
  checkIn = 'Oct 14, 2026',
  checkOut = 'Oct 18, 2026',
  totalNights = 4,
  totalAmount = '€1,280.00',
}: BookingConfirmationProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden my-8">
      {/* Platform Header */}
      <div className="bg-[#0B1B2D] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C5A059]/30">
        <div className="space-y-1">
          <Logo size="md" darkNav={true} />
          <p className="text-xs text-slate-400 font-mono tracking-wider pt-2">
            OFFICIAL CONGRESS DELEGATE ACCOMMODATION VOUCHER
          </p>
        </div>
        <div className="text-left sm:text-right">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" /> CONFIRMED & GUARANTEED
          </div>
          <p className="text-xs font-mono text-slate-300 mt-1">Ref: {bookingId}</p>
        </div>
      </div>

      {/* Mandatory Merchant of Record Notice */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 p-5 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950 space-y-1">
          <p className="font-bold text-amber-900 uppercase tracking-wider">
            Booking & Merchant of Record Disclosure
          </p>
          <p>
            Payment processing, invoicing, and booking fulfillment are strictly executed by <strong className="text-amber-950">{travelAgentName}</strong> ({travelAgentLicense}), the officially appointed Travel Partner for <strong>{eventName}</strong>. <span className="text-amber-800">PCOXchange is the software platform provider and is not the merchant of record.</span>
          </p>
        </div>
      </div>

      {/* Voucher Body */}
      <div className="p-6 sm:p-10 space-y-8">
        {/* Event & Guest Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Congress Event Identity</span>
            <h3 className="text-base font-bold text-[#0B1B2D] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#C5A059]" /> {eventName}
            </h3>
            <p className="text-xs text-slate-500">Official Delegate Allotment Code: WCC-2026-BLK</p>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Primary Guest Delegate</span>
            <h3 className="text-base font-bold text-[#0B1B2D] flex items-center gap-2">
              <User className="w-4 h-4 text-[#C5A059]" /> {guestName}
            </h3>
            <p className="text-xs text-slate-500">Delegate Category: Speaker / Presenter</p>
          </div>
        </div>

        {/* Accommodation Details */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-[#0B1B2D] uppercase tracking-wider border-b border-slate-200 pb-2">
            Hotel Accommodation Details
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-2">
              <div className="text-lg font-bold text-[#0B1B2D]">{hotelName}</div>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" /> 61 Quai de Grenelle, 75015 Paris, France (0.8 km from Congress Center)
              </p>
              <div className="inline-block px-3 py-1 bg-[#0B1B2D]/5 rounded-lg text-xs font-semibold text-[#0B1B2D]">
                {roomType}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Check-in:</span>
                <span className="font-bold text-[#0B1B2D]">{checkIn}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Check-out:</span>
                <span className="font-bold text-[#0B1B2D]">{checkOut}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500 border-t border-slate-200 pt-2">
                <span>Duration:</span>
                <span className="font-bold text-[#0B1B2D]">{totalNights} Nights</span>
              </div>
            </div>
          </div>
        </div>

        {/* Billing & Payment Verification */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200">
          <div className="md:col-span-2 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Payment & Merchant Summary</span>
            <div className="text-xs text-slate-600 space-y-1">
              <p>• Total Amount Charged: <strong className="text-[#0B1B2D]">{totalAmount}</strong> (Paid in Full via Credit Card)</p>
              <p>• Billing Merchant: <strong>{travelAgentName}</strong></p>
              <p>• Tax Receipt & Invoice Issued by Travel Partner</p>
            </div>
          </div>

          <div className="flex items-center justify-center bg-slate-50 p-4 rounded-xl border border-slate-200 text-center flex-col gap-2">
            <QrCode className="w-16 h-16 text-[#0B1B2D]" />
            <span className="text-[10px] font-mono text-slate-400">Scan for Hotel Verification</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Platform Security: Verified by PCOXchange Identity Engine
          </p>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.print()} 
              className="h-10 px-4 rounded-xl border border-slate-300 text-[#0B1B2D] text-xs font-bold hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print Voucher
            </button>
            <button className="h-10 px-4 rounded-xl bg-[#0B1B2D] text-white text-xs font-bold hover:bg-[#162B44] flex items-center gap-2 cursor-pointer shadow-md">
              <Download className="w-4 h-4 text-[#C5A059]" /> Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
