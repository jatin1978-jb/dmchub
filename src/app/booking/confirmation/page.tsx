'use client';

import React from 'react';
import Link from 'next/link';
import BookingConfirmation from '@/components/booking/BookingConfirmation';
import Logo from '@/components/Logo';
import { ArrowLeft } from 'lucide-react';

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1B2D] hover:text-[#C5A059] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to PCOXchange Delegate Portal
        </Link>
        <span className="text-xs text-slate-500 font-mono">PCOXchange Voucher Engine</span>
      </div>

      <BookingConfirmation />
    </div>
  );
}
