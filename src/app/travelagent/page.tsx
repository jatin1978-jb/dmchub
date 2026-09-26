'use client';

import React, { useState } from 'react';
import SaaSHeader from '@/components/SaaSHeader';
import { 
  useInventory, 
  BookingManifestItem, 
  RoomType 
} from '@/context/InventoryContext';
import { 
  Briefcase, 
  Hotel, 
  Car, 
  Compass, 
  Edit3, 
  Users, 
  Plus, 
  Trash2, 
  X 
} from 'lucide-react';

export default function TravelAgentPortalPage() {
  const { 
    hotels, 
    transfers, 
    activities, 
    manifest, 
    staffAccounts, 
    addHotel, 
    deleteHotel, 
    addTransfer, 
    addActivity, 
    amendBooking, 
    addStaffAccount 
  } = useInventory();

  const [activeTab, setActiveTab] = useState<'allotments' | 'transfers' | 'activities' | 'amendments' | 'staff'>('allotments');
  const [showAddHotelModal, setShowAddHotelModal] = useState(false);
  const [showAddTransferModal, setShowAddTransferModal] = useState(false);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);

  // Form States - Hotel
  const [hotelName, setHotelName] = useState('');
  const [hotelStars, setHotelStars] = useState(4);
  const [hotelAddress, setHotelAddress] = useState('');
  const [hotelDistance, setHotelDistance] = useState('0.5 km from Paris Expo');
  const [hotelImage, setHotelImage] = useState('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80');
  const [hotelGallery, setHotelGallery] = useState('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80');
  const [hotelBadge, setHotelBadge] = useState('Official Congress Partner Hotel');
  const [hotelShuttle, setHotelShuttle] = useState('Free Shuttle Every 10 Mins');
  const [hotelMOR, setHotelMOR] = useState('Apex MICE & Travel Services Ltd (IATA #98234-EU)');
  const [hotelDesc, setHotelDesc] = useState('Luxury executive hotel situated near Congress venue.');

  const [roomTypes, setRoomTypes] = useState<Omit<RoomType, 'id'>[]>([
    {
      name: 'Superior Executive King Room',
      size: '30 m²',
      bed: '1 King Bed',
      mealType: 'Full Buffet Breakfast Included',
      inclusions: ['Complimentary Buffet Breakfast', 'High-Speed WiFi'],
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      pricePerNight: 260,
      totalPrice: 1040,
      allottedQuantity: 30
    }
  ]);

  // Form States - Transfer & Activity
  const [transferTitle, setTransferTitle] = useState('');
  const [transferVehicle, setTransferVehicle] = useState('Mercedes E-Class Sedan');
  const [transferPrice, setTransferPrice] = useState(120);

  const [activityTitle, setActivityTitle] = useState('');
  const [activityDuration, setActivityDuration] = useState('3 Hours');
  const [activityDesc, setActivityDesc] = useState('Guided city tour with luxury coach.');
  const [activityPrice, setActivityPrice] = useState(95);

  // Form States - Staff
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffTitle, setNewStaffTitle] = useState('');

  // Amendment State
  const [selectedBookingToAmend, setSelectedBookingToAmend] = useState<BookingManifestItem | null>(null);
  const [amendPaxTitle, setAmendPaxTitle] = useState('');
  const [amendFirstName, setAmendFirstName] = useState('');
  const [amendLastName, setAmendLastName] = useState('');
  const [amendEmail, setAmendEmail] = useState('');
  const [amendRoomName, setAmendRoomName] = useState('');
  const [amendTransferTitle, setAmendTransferTitle] = useState('');
  const [amendStatus, setAmendStatus] = useState<'Confirmed' | 'Amended' | 'Cancelled'>('Amended');
  const [amendNote, setAmendNote] = useState('');

  const handleSaveHotel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hotelName) return;
    const galleryArr = hotelGallery.split(',').map(s => s.trim()).filter(Boolean);
    const startPrice = roomTypes.length ? Math.min(...roomTypes.map(r => r.pricePerNight)) : 220;

    addHotel({
      name: hotelName,
      stars: hotelStars,
      address: hotelAddress,
      distance: hotelDistance,
      image: hotelImage,
      galleryImages: galleryArr,
      badge: hotelBadge,
      shuttle: hotelShuttle,
      taMerchant: hotelMOR,
      startPrice: startPrice,
      availableRooms: 30,
      description: hotelDesc,
      taOwnerId: 'ta-apex',
      rooms: roomTypes.map((r, idx) => ({ ...r, id: `room-${Date.now()}-${idx}` }))
    });
    setShowAddHotelModal(false);
    setHotelName('');
  };

  const handleSaveTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferTitle) return;
    addTransfer({
      title: transferTitle,
      vehicle: transferVehicle,
      price: Number(transferPrice),
      status: 'Active',
      taOwnerId: 'ta-helios'
    });
    setShowAddTransferModal(false);
    setTransferTitle('');
  };

  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityTitle) return;
    addActivity({
      title: activityTitle,
      duration: activityDuration,
      desc: activityDesc,
      price: Number(activityPrice),
      status: 'Active',
      taOwnerId: 'ta-helios'
    });
    setShowAddActivityModal(false);
    setActivityTitle('');
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName) return;
    addStaffAccount({
      name: newStaffName,
      email: newStaffEmail,
      roleTitle: newStaffTitle || 'Voucher Specialist',
      parentOrgType: 'TRAVEL_AGENT',
      parentOrgId: 'ta-apex'
    });
    setShowAddStaffModal(false);
    setNewStaffName('');
  };

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

  const taStaff = staffAccounts.filter(s => s.parentOrgType === 'TRAVEL_AGENT');

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1B2D] flex flex-col font-sans">
      <SaaSHeader activePersona="TRAVEL_AGENT" />

      <main className="flex-1 max-w-[1650px] mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        
        {/* TA PORTAL BANNER */}
        <div className="bg-gradient-to-r from-[#0B1B2D] to-[#162B44] text-white p-8 rounded-3xl border border-[#C5A059]/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] text-xs font-bold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" /> Dedicated Travel Agent Portal (/travelagent)
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">Apex MICE &amp; Travel Services Ltd</h2>
            <p className="text-slate-300 text-sm max-w-2xl">
              Official Travel Agent Management Hub. Manage contracted room block allotments, airport transfers, sightseeing excursions, and process product-wise delegate booking amendments.
            </p>
          </div>

          <button 
            onClick={() => setShowAddHotelModal(true)}
            className="h-11 px-6 rounded-xl bg-[#C5A059] text-[#0B1B2D] font-bold text-xs hover:bg-[#D4AF37] transition-all flex items-center gap-2 shadow-md cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" /> + Add Hotel Allotment
          </button>
        </div>

        {/* WORKFLOW TABS */}
        <div className="flex flex-wrap items-center border-b border-slate-200 gap-4 sm:gap-8 text-sm font-bold">
          <button
            onClick={() => setActiveTab('allotments')}
            className={`pb-4 border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'allotments' ? 'border-[#C5A059] text-[#0B1B2D]' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Hotel className="w-4 h-4 text-[#C5A059]" /> Room Block Allotments ({hotels.length})
          </button>

          <button
            onClick={() => setActiveTab('transfers')}
            className={`pb-4 border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'transfers' ? 'border-[#C5A059] text-[#0B1B2D]' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Car className="w-4 h-4 text-[#C5A059]" /> Airport Transfers ({transfers.length})
          </button>

          <button
            onClick={() => setActiveTab('activities')}
            className={`pb-4 border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'activities' ? 'border-[#C5A059] text-[#0B1B2D]' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Compass className="w-4 h-4 text-[#C5A059]" /> Sightseeing Excursions ({activities.length})
          </button>

          <button
            onClick={() => setActiveTab('amendments')}
            className={`pb-4 border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'amendments' ? 'border-[#C5A059] text-[#0B1B2D]' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Edit3 className="w-4 h-4 text-[#C5A059]" /> Booking Amendments ({manifest.length})
          </button>

          <button
            onClick={() => setActiveTab('staff')}
            className={`pb-4 border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'staff' ? 'border-[#C5A059] text-[#0B1B2D]' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Users className="w-4 h-4 text-[#C5A059]" /> Agency Staff ({taStaff.length})
          </button>
        </div>

        {/* TAB 1: ALLOTMENTS */}
        {activeTab === 'allotments' && (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0B1B2D]">Contracted Room Block Inventory</h3>
              <button 
                onClick={() => setShowAddHotelModal(true)}
                className="h-10 px-4 rounded-xl bg-[#0B1B2D] text-white font-bold text-xs hover:bg-[#162B44] flex items-center gap-2 cursor-pointer"
              >
                + Add New Hotel Allotment
              </button>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Hotel Name</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Room Types &amp; Meal Plans</th>
                  <th className="p-4">Price / Night</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {hotels.map((h) => (
                  <tr key={h.id}>
                    <td className="p-4 font-bold text-[#0B1B2D]">{h.name}</td>
                    <td className="p-4 font-bold text-amber-500">{h.stars} ★</td>
                    <td className="p-4">
                      {h.rooms?.map((r, i) => (
                        <div key={i} className="text-[11px] font-semibold text-slate-700">
                          • {r.name} ({r.mealType}) - €{r.pricePerNight}/night
                        </div>
                      ))}
                    </td>
                    <td className="p-4 font-bold text-[#0B1B2D]">€{h.startPrice}</td>
                    <td className="p-4">
                      <button onClick={() => deleteHotel(h.id)} className="text-red-500 font-bold hover:underline flex items-center gap-1 cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: TRANSFERS */}
        {activeTab === 'transfers' && (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0B1B2D]">Airport Transfers &amp; Shuttles</h3>
              <button 
                onClick={() => setShowAddTransferModal(true)}
                className="h-10 px-4 rounded-xl bg-[#0B1B2D] text-white font-bold text-xs hover:bg-[#162B44] flex items-center gap-2 cursor-pointer"
              >
                + Add Transfer Option
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
        )}

        {/* TAB 3: ACTIVITIES */}
        {activeTab === 'activities' && (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0B1B2D]">Sightseeing Tours &amp; Excursions</h3>
              <button 
                onClick={() => setShowAddActivityModal(true)}
                className="h-10 px-4 rounded-xl bg-[#0B1B2D] text-white font-bold text-xs hover:bg-[#162B44] flex items-center gap-2 cursor-pointer"
              >
                + Add Excursion Package
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
        )}

        {/* TAB 4: AMENDMENTS */}
        {activeTab === 'amendments' && (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#0B1B2D]">Product-wise Booking Amendment Engine</h3>
                <p className="text-xs text-slate-500">Inspect product breakdowns (Room, Transfer, Excursions) and process amendments.</p>
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
        )}

        {/* TAB 5: STAFF */}
        {activeTab === 'staff' && (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0B1B2D]">Agency Staff Accounts</h3>
              <button
                onClick={() => setShowAddStaffModal(true)}
                className="h-10 px-4 rounded-xl bg-[#0B1B2D] text-white font-bold text-xs hover:bg-[#162B44] flex items-center gap-2 cursor-pointer"
              >
                + Create Staff Account
              </button>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Staff Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role Title</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {taStaff.map((s) => (
                  <tr key={s.id}>
                    <td className="p-4 font-bold text-[#0B1B2D]">{s.name}</td>
                    <td className="p-4 text-slate-600">{s.email}</td>
                    <td className="p-4 text-slate-700 font-semibold">{s.roleTitle}</td>
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
        )}
      </main>

      {/* MODALS */}
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

      {showAddHotelModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-[#0B1B2D] text-sm">Add Hotel Allotment</h3>
              <button onClick={() => setShowAddHotelModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveHotel} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Hotel Name</label>
                <input type="text" value={hotelName} onChange={(e) => setHotelName(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Address</label>
                <input type="text" value={hotelAddress} onChange={(e) => setHotelAddress(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
              </div>
              <button type="submit" className="w-full h-11 bg-[#0B1B2D] text-white font-bold rounded-xl">Save Allotment</button>
            </form>
          </div>
        </div>
      )}

      {showAddTransferModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-[#0B1B2D] text-sm">Add Transfer Option</h3>
              <button onClick={() => setShowAddTransferModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveTransfer} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Title</label>
                <input type="text" placeholder="e.g. Private Airport Transfer" value={transferTitle} onChange={(e) => setTransferTitle(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Price (€)</label>
                <input type="number" value={transferPrice} onChange={(e) => setTransferPrice(Number(e.target.value))} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" />
              </div>
              <button type="submit" className="w-full h-11 bg-[#0B1B2D] text-white font-bold rounded-xl">Save Transfer</button>
            </form>
          </div>
        </div>
      )}

      {showAddActivityModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-[#0B1B2D] text-sm">Add Excursion Package</h3>
              <button onClick={() => setShowAddActivityModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveActivity} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Title</label>
                <input type="text" placeholder="e.g. Seine River Dinner Cruise" value={activityTitle} onChange={(e) => setActivityTitle(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Price (€)</label>
                <input type="number" value={activityPrice} onChange={(e) => setActivityPrice(Number(e.target.value))} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" />
              </div>
              <button type="submit" className="w-full h-11 bg-[#0B1B2D] text-white font-bold rounded-xl">Save Excursion</button>
            </form>
          </div>
        </div>
      )}

      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-[#0B1B2D] text-sm">Create Agency Staff Account</h3>
              <button onClick={() => setShowAddStaffModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveStaff} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Staff Full Name</label>
                <input type="text" placeholder="e.g. David Smith" value={newStaffName} onChange={(e) => setNewStaffName(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Email Address</label>
                <input type="email" placeholder="david@apexmice.com" value={newStaffEmail} onChange={(e) => setNewStaffEmail(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
              </div>
              <button type="submit" className="w-full h-11 bg-[#0B1B2D] text-white font-bold rounded-xl">Create Staff Account</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
