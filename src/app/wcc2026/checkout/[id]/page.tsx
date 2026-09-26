'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { 
  Building2, 
  Calendar, 
  MapPin, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  CreditCard, 
  Car, 
  Compass, 
  Lock, 
  Sparkles,
  Plus,
  Check,
  Loader2
} from 'lucide-react';

import { useInventory } from '@/context/InventoryContext';

export default function WCCCheckoutPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { activities, addBookingToManifest } = useInventory();

  const roomName = searchParams.get('roomName') || 'Superior Executive King Room';
  const basePrice = parseFloat(searchParams.get('total') || '960');

  // Passenger / Delegate Details State
  const [paxTitle, setPaxTitle] = useState('Dr.');
  const [firstName, setFirstName] = useState('Julian');
  const [lastName, setLastName] = useState('Thorne');
  const [email, setEmail] = useState('julian.thorne@cardio-institute.org');
  const [phone, setPhone] = useState('+44 7700 900077');
  const [specialRequests, setSpecialRequests] = useState('High floor preferred, quiet room for conference presentation preparation.');

  // Add-Ons Selection State
  const [selectedTransfer, setSelectedTransfer] = useState<'none' | 'private' | 'shuttle'>('private');
  const [selectedSightseeing, setSelectedSightseeing] = useState<string[]>(['seine-cruise']);

  // Payment State
  const [cardName, setCardName] = useState('Dr. Julian Thorne');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8829');
  const [expiry, setExpiry] = useState('08/29');
  const [cvc, setCvc] = useState('382');
  const [isProcessing, setIsProcessing] = useState(false);

  // Pricing calculations
  const transferCosts = {
    none: 0,
    private: 85,
    shuttle: 35,
  };

  const sightseeingOptions = activities.length ? activities : [
    { id: 'seine-cruise', title: 'Eiffel Tower Priority & Seine Dinner Cruise', price: 65, desc: '3-course gourmet dinner cruise along the Seine with priority Eiffel tower access.' },
    { id: 'medical-tour', title: 'Paris Medical Heritage & Louvre Guided Tour', price: 55, desc: 'Private guided tour of historical medical academies & Louvre masterpieces.' },
    { id: 'versailles-tour', title: 'Versailles Palace & Gardens VIP Day Tour', price: 110, desc: 'Luxury transport, skip-the-line entrance & private guide.' }
  ];

  const transferPrice = transferCosts[selectedTransfer];
  const sightseeingPrice = selectedSightseeing.reduce((sum, id) => {
    const opt = sightseeingOptions.find(o => o.id === id);
    return sum + (opt ? opt.price : 0);
  }, 0);

  const grandTotal = basePrice + transferPrice + sightseeingPrice;

  const toggleSightseeing = (id: string) => {
    if (selectedSightseeing.includes(id)) {
      setSelectedSightseeing(selectedSightseeing.filter(item => item !== id));
    } else {
      setSelectedSightseeing([...selectedSightseeing, id]);
    }
  };

  const handleTestCardFill = () => {
    setCardName('Dr. Julian Thorne');
    setCardNumber('4242 4242 4242 4242');
    setExpiry('12/28');
    setCvc('123');
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    addBookingToManifest({
      paxTitle: paxTitle,
      paxFirstName: firstName,
      paxLastName: lastName,
      paxName: `${paxTitle} ${firstName} ${lastName}`,
      email: email,
      phone: phone || '+1 555-0199',
      specialRequests: specialRequests || 'None',
      hotel: 'Novotel Paris Centre Tour Eiffel',
      room: roomName,
      transfer: selectedTransfer === 'none' ? 'None (€0)' : `${selectedTransfer} (€${transferPrice})`,
      sightseeing: selectedSightseeing.length ? `${selectedSightseeing.length} Excursion(s) (€${sightseeingPrice})` : 'None',
      total: `€${grandTotal}`,
      grandTotalNumber: grandTotal,
      status: 'Confirmed',
      breakdown: {
        hotelName: 'Novotel Paris Centre Tour Eiffel',
        roomName: roomName,
        roomPrice: Math.max(0, grandTotal - transferPrice - sightseeingPrice),
        transferTitle: selectedTransfer,
        transferPrice: transferPrice,
        activitiesList: selectedSightseeing,
        activitiesPrice: sightseeingPrice
      },
      congressId: 'wcc-2026'
    });

    setTimeout(() => {
      router.push('/booking/confirmation');
    }, 1500);
  };


  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1B2D] flex flex-col font-sans selection:bg-[#C5A059]/20 selection:text-[#0B1B2D]">
      
      {/* CO-BRANDED HEADER */}
      <header className="sticky top-0 z-50 bg-[#0B1B2D] text-white border-b border-[#C5A059]/30 shadow-md">
        <div className="max-w-[1650px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/wcc2026/hotels" className="text-xs text-slate-300 hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-4 h-4 text-[#C5A059]" /> Back to Selection
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden sm:block" />
            <div className="flex items-center gap-3">
              <Logo size="sm" darkNav={true} />
              <span className="text-[#C5A059] font-bold text-xs">×</span>
              <span className="text-xs font-bold text-white">World Cardiology Congress 2026</span>
            </div>
          </div>

          <div className="text-xs text-slate-300 font-mono hidden md:block">
            Step 3 of 3: Delegate Checkout &amp; Add-Ons
          </div>
        </div>
      </header>

      {/* Main Form Area */}
      <main className="flex-1 max-w-[1500px] mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form Steps */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* STEP 1: PASSENGER / DELEGATE DETAILS */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-9 h-9 rounded-xl bg-[#0B1B2D] text-[#C5A059] font-bold flex items-center justify-center text-sm">
                  1
                </div>
                <div>
                  <h2 className="text-xl font-bold font-serif text-[#0B1B2D]">Primary Delegate Information</h2>
                  <p className="text-xs text-slate-500">Provide delegate credentials for hotel check-in and congress badge synchronization.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 sm:col-span-1">
                  <label className="text-[10px] font-bold uppercase text-slate-500">Title</label>
                  <select 
                    value={paxTitle}
                    onChange={(e) => setPaxTitle(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 rounded-xl border border-slate-300 text-xs font-bold text-[#0B1B2D] focus:outline-none focus:border-[#C5A059]"
                  >
                    <option>Dr.</option>
                    <option>Prof.</option>
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-1">
                  <label className="text-[10px] font-bold uppercase text-slate-500">First Name</label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 rounded-xl border border-slate-300 text-xs font-bold text-[#0B1B2D] focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>

                <div className="space-y-1 sm:col-span-1">
                  <label className="text-[10px] font-bold uppercase text-slate-500">Last Name</label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 rounded-xl border border-slate-300 text-xs font-bold text-[#0B1B2D] focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>

                <div className="space-y-1 sm:col-span-1.5">
                  <label className="text-[10px] font-bold uppercase text-slate-500">Delegate Corporate Email</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 rounded-xl border border-slate-300 text-xs font-bold text-[#0B1B2D] focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>

                <div className="space-y-1 sm:col-span-1.5">
                  <label className="text-[10px] font-bold uppercase text-slate-500">Contact Mobile Number</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 rounded-xl border border-slate-300 text-xs font-bold text-[#0B1B2D] focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>

                <div className="space-y-1 sm:col-span-3">
                  <label className="text-[10px] font-bold uppercase text-slate-500">Special Requests / Dietary Requirements</label>
                  <textarea 
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-300 text-xs text-[#0B1B2D] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>
            </div>

            {/* STEP 2: POST PAX ADD-ONS (TRANSFERS & SIGHTSEEING) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-9 h-9 rounded-xl bg-[#0B1B2D] text-[#C5A059] font-bold flex items-center justify-center text-sm">
                  2
                </div>
                <div>
                  <h2 className="text-xl font-bold font-serif text-[#0B1B2D]">Delegate Add-Ons: Transfers &amp; Sightseeing</h2>
                  <p className="text-xs text-slate-500">Enhance your congress stay with guaranteed transfers and Paris cultural tours.</p>
                </div>
              </div>

              {/* A. Airport Transfers Selection */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase text-[#0B1B2D] flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#C5A059]" /> Select Airport Transfer Option (CDG / Orly Airport)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedTransfer('private')}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedTransfer === 'private'
                        ? 'border-[#C5A059] bg-amber-50/50 shadow-md'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold text-xs text-[#0B1B2D]">
                      <span>Private Executive Transfer</span>
                      <span className="text-[#C5A059]">+€85</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Mercedes E-Class chauffeured transfer directly to hotel lobby.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTransfer('shuttle')}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedTransfer === 'shuttle'
                        ? 'border-[#C5A059] bg-amber-50/50 shadow-md'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold text-xs text-[#0B1B2D]">
                      <span>Shared Express Shuttle</span>
                      <span className="text-[#C5A059]">+€35</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Dedicated congress coach running every 30 minutes from airports.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTransfer('none')}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedTransfer === 'none'
                        ? 'border-slate-700 bg-slate-100 font-bold'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold text-xs text-[#0B1B2D]">
                      <span>No Airport Transfer</span>
                      <span>€0</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Arrange own transport to hotel.</p>
                  </button>
                </div>
              </div>

              {/* B. Sightseeing & Excursions (SS) Selection */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase text-[#0B1B2D] flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#C5A059]" /> Select Paris Sightseeing &amp; Excursions (SS)
                </h4>

                <div className="space-y-3">
                  {sightseeingOptions.map((opt) => {
                    const isSelected = selectedSightseeing.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleSightseeing(opt.id)}
                        className={`p-4 rounded-2xl border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#C5A059] bg-amber-50/50 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center text-white ${
                              isSelected ? 'bg-[#C5A059] border-[#C5A059]' : 'border-slate-300'
                            }`}>
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                            <span className="text-xs font-bold text-[#0B1B2D]">{opt.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 pl-6">{opt.desc}</p>
                        </div>

                        <span className="text-xs font-bold text-[#C5A059] shrink-0">+€{opt.price} / pax</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* STEP 3: DUMMY PAYMENT GATEWAY */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0B1B2D] text-[#C5A059] font-bold flex items-center justify-center text-sm">
                    3
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-serif text-[#0B1B2D]">Payment Gateway Checkout</h2>
                    <p className="text-xs text-slate-500">Secure SSL 256-bit encrypted simulated credit card checkout.</p>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={handleTestCardFill}
                  className="text-xs text-[#C5A059] font-bold hover:underline bg-amber-50 px-3 py-1 rounded-lg border border-amber-200 cursor-pointer shrink-0"
                >
                  Autofill Test Card Data
                </button>
              </div>

              <form onSubmit={handleSubmitPayment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-bold uppercase text-slate-500">Cardholder Full Name</label>
                    <input 
                      type="text" 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full h-11 px-3 bg-slate-50 rounded-xl border border-slate-300 text-xs font-bold text-[#0B1B2D] focus:outline-none focus:border-[#C5A059]"
                      required
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-bold uppercase text-slate-500">Credit / Debit Card Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full h-11 px-3 pr-10 bg-slate-50 rounded-xl border border-slate-300 text-xs font-bold font-mono text-[#0B1B2D] focus:outline-none focus:border-[#C5A059]"
                        required
                      />
                      <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-500">Expiration (MM/YY)</label>
                    <input 
                      type="text" 
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full h-11 px-3 bg-slate-50 rounded-xl border border-slate-300 text-xs font-bold font-mono text-[#0B1B2D] focus:outline-none focus:border-[#C5A059]"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-500">Security CVC Code</label>
                    <input 
                      type="password" 
                      maxLength={4}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="w-full h-11 px-3 bg-slate-50 rounded-xl border border-slate-300 text-xs font-bold font-mono text-[#0B1B2D] focus:outline-none focus:border-[#C5A059]"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full h-14 rounded-2xl bg-[#0B1B2D] text-white font-bold text-sm hover:bg-[#162B44] transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer uppercase tracking-wider"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-[#C5A059]" />
                        <span>Processing Payment &amp; Voucher...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-[#C5A059]" />
                        <span>Pay €{grandTotal} &amp; Complete Booking</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

          </div>

          {/* Right Column: Itemized Order Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-6 sticky top-24">
              
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] uppercase font-bold text-[#C5A059] tracking-widest">ORDER SUMMARY</span>
                <h3 className="text-lg font-bold font-serif text-[#0B1B2D]">World Cardiology Congress 2026</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">Dates: Oct 14 – 18, 2026 (4 Nights)</p>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Room ({roomName}):</span>
                  <span className="font-bold text-[#0B1B2D]">€{basePrice}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Airport Transfer ({selectedTransfer}):</span>
                  <span className="font-bold text-[#0B1B2D]">€{transferPrice}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Sightseeing &amp; Excursions ({selectedSightseeing.length}):</span>
                  <span className="font-bold text-[#0B1B2D]">€{sightseeingPrice}</span>
                </div>

                <div className="flex justify-between text-slate-600 border-t border-slate-100 pt-2">
                  <span>Local City Tourism Tax:</span>
                  <span className="font-bold text-emerald-600">Included</span>
                </div>

                <div className="flex justify-between text-sm font-extrabold text-[#0B1B2D] border-t border-slate-200 pt-3">
                  <span>Total Amount Payable:</span>
                  <span className="text-xl text-[#0B1B2D]">€{grandTotal}</span>
                </div>
              </div>

              {/* Merchant Badge */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-1 text-xs text-amber-950">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 uppercase text-[10px]">
                  <ShieldCheck className="w-4 h-4 text-amber-600" /> Merchant of Record Notice
                </div>
                <p className="text-[11px] leading-relaxed">
                  Fulfillment, invoicing, and voucher guarantee handled by <strong>Apex MICE &amp; Travel Services Ltd</strong> (IATA #98234-EU).
                </p>
              </div>

            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
