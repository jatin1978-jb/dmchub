'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import AddHotelModal from '@/components/AddHotelModal';
import { 
  useInventory, 
  SaaSUserRole, 
  CongressEvent, 
  TravelAgentProfile, 
  TAMapping, 
  StaffAccount, 
  RoomType, 
  BookingManifestItem 
} from '@/context/InventoryContext';
import { 
  Building2, 
  Hotel, 
  Car, 
  Compass, 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck,
  TrendingUp,
  Download,
  ExternalLink,
  ArrowLeft,
  X,
  Image as ImageIcon,
  DollarSign,
  Bed,
  Power,
  Layers,
  Briefcase,
  UserCheck,
  Calendar,
  Sparkles,
  RefreshCw,
  Eye,
  Settings,
  Lock,
  FileText
} from 'lucide-react';

export default function SaaSBackendControlPanel() {
  const { 
    activeRole,
    setActiveRole,
    activeOrgId,
    setActiveOrgId,
    congresses,
    travelAgents,
    staffAccounts,
    hotels, 
    transfers, 
    activities, 
    manifest, 
    addCongress,
    toggleCongressLive,
    updateTAMappings,
    addTravelAgent,
    addStaffAccount,
    addHotel, 
    deleteHotel, 
    addTransfer, 
    addActivity, 
    amendBooking
  } = useInventory();

  // Tab State per Role
  const [adminTab, setAdminTab] = useState<'congresses' | 'tas' | 'staff' | 'analytics'>('congresses');
  const [pcoTab, setPcoTab] = useState<'exhibition' | 'ta_mapping' | 'view_queue' | 'staff'>('exhibition');
  const [taTab, setTaTab] = useState<'allotments' | 'transfers' | 'activities' | 'amendments' | 'staff'>('allotments');

  // Mapping Studio State (Congress Layer)
  const [selectedExhibitionIdForMapping, setSelectedExhibitionIdForMapping] = useState<string>('wcc-2026');
  const [mappingModalTA, setMappingModalTA] = useState<TravelAgentProfile | null>(null);
  const [selectedScopeToApply, setSelectedScopeToApply] = useState<'ACCOMMODATION' | 'TRANSFERS' | 'ACTIVITIES' | 'ALL'>('ACCOMMODATION');

  // Modals
  const [showAddCongressModal, setShowAddCongressModal] = useState(false);
  const [showAddTAModal, setShowAddTAModal] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showAddHotelModal, setShowAddHotelModal] = useState(false);
  const [showAddTransferModal, setShowAddTransferModal] = useState(false);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);

  // Amendment Modal State
  const [selectedBookingToAmend, setSelectedBookingToAmend] = useState<BookingManifestItem | null>(null);
  const [amendPaxTitle, setAmendPaxTitle] = useState('');
  const [amendFirstName, setAmendFirstName] = useState('');
  const [amendLastName, setAmendLastName] = useState('');
  const [amendEmail, setAmendEmail] = useState('');
  const [amendRoomName, setAmendRoomName] = useState('');
  const [amendTransferTitle, setAmendTransferTitle] = useState('');
  const [amendStatus, setAmendStatus] = useState<'Confirmed' | 'Amended' | 'Cancelled'>('Amended');
  const [amendNote, setAmendNote] = useState('');

  // Form States - Congress
  const [newCongressTitle, setNewCongressTitle] = useState('');
  const [newCongressDates, setNewCongressDates] = useState('October 14 – 18, 2026');
  const [newCongressVenue, setNewCongressVenue] = useState('Paris Expo Porte de Versailles');
  const [newCongressDesc, setNewCongressDesc] = useState('');

  // Form States - TA
  const [newTaAgencyName, setNewTaAgencyName] = useState('');
  const [newTaIata, setNewTaIata] = useState('');
  const [newTaContact, setNewTaContact] = useState('');
  const [newTaEmail, setNewTaEmail] = useState('');
  const [newTaScopes, setNewTaScopes] = useState<('ACCOMMODATION' | 'TRANSFERS' | 'ACTIVITIES')[]>(['ACCOMMODATION']);

  // Form States - Staff
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffTitle, setNewStaffTitle] = useState('');

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

  // Handle Handlers
  const handleSaveCongress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCongressTitle) return;
    addCongress({
      title: newCongressTitle,
      dates: newCongressDates,
      venue: newCongressVenue,
      description: newCongressDesc || 'Official Congress Event',
      logoUrl: '/pcoxchange-logo.png',
      bannerUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      isLive: false,
      taMappings: [{ travelAgentId: 'ta-apex', scope: 'ALL' }],
      createdById: 'superadmin-1'
    });
    setShowAddCongressModal(false);
    setNewCongressTitle('');
  };

  const handleSaveTA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaAgencyName) return;
    addTravelAgent({
      agencyName: newTaAgencyName,
      iataNumber: newTaIata || 'IATA-PENDING',
      contactPerson: newTaContact,
      email: newTaEmail,
      phone: '+1 555-0199',
      country: 'Global',
      scopes: newTaScopes
    });
    setShowAddTAModal(false);
    setNewTaAgencyName('');
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName) return;
    addStaffAccount({
      name: newStaffName,
      email: newStaffEmail,
      roleTitle: newStaffTitle || 'Operations Staff',
      parentOrgType: activeRole,
      parentOrgId: activeOrgId
    });
    setShowAddStaffModal(false);
    setNewStaffName('');
  };

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
      taOwnerId: activeRole === 'TRAVEL_AGENT' ? activeOrgId : 'ta-apex',
      rooms: roomTypes.map((r, idx) => ({ ...r, id: `room-${Date.now()}-${idx}` }))
    });
    setShowAddHotelModal(false);
    setHotelName('');
  };

  // TA Mapping Handlers (Congress Layer)
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

  // Open Amendment Modal
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

  // Submit Amendment
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

  const activeCongress = congresses[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1B2D] flex flex-col font-sans selection:bg-[#C5A059]/20 selection:text-[#0B1B2D]">
      
      {/* MULTI-PERSONA ROLE SWITCHER BAR */}
      <div className="bg-[#061121] text-white px-4 sm:px-8 py-2 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span className="font-bold text-slate-300 uppercase tracking-widest text-[10px]">SaaS Multi-Persona Simulator:</span>
        </div>

        <div className="flex items-center gap-2 bg-[#162B44] p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => { setActiveRole('SUPER_ADMIN'); setActiveOrgId('superadmin-1'); }}
            className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeRole === 'SUPER_ADMIN' ? 'bg-[#C5A059] text-[#0B1B2D] shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> 1. Super Admin (PCOXchange)
          </button>

          <button
            onClick={() => { setActiveRole('CONGRESS'); setActiveOrgId('wcc-2026'); }}
            className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeRole === 'CONGRESS' ? 'bg-[#C5A059] text-[#0B1B2D] shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" /> 2. Congress / PCO Layer
          </button>

          <button
            onClick={() => { setActiveRole('TRAVEL_AGENT'); setActiveOrgId('ta-apex'); }}
            className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeRole === 'TRAVEL_AGENT' ? 'bg-[#C5A059] text-[#0B1B2D] shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" /> 3. Travel Agent (TA) Layer
          </button>
        </div>
      </div>

      {/* SAAS HEADER */}
      <header className="bg-[#0B1B2D] text-white border-b border-[#C5A059]/30 shadow-md">
        <div className="max-w-[1650px] mx-auto px-4 sm:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-slate-300 hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-4 h-4 text-[#C5A059]" /> Public Event Site
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <Logo size="sm" darkNav={true} />
                <span className="text-[10px] uppercase font-bold text-[#C5A059] bg-[#C5A059]/20 px-2.5 py-0.5 rounded border border-[#C5A059]/30">
                  {activeRole === 'SUPER_ADMIN' ? 'SUPER ADMIN PORTAL' : activeRole === 'CONGRESS' ? 'CONGRESS ORGANIZER PORTAL' : 'TRAVEL AGENT HUB'}
                </span>
              </div>
              <h1 className="text-base font-bold text-white mt-1">
                PCOXchange SaaS Platform Management Console
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link 
              href={`/event/${activeCongress.slug}`}
              className="h-9 px-4 rounded-lg bg-[#C5A059] text-[#0B1B2D] font-bold hover:bg-[#D4AF37] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Preview Live Public Site <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 max-w-[1650px] mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        
        {/* ==================================================================== */}
        {/* ROLE 1: SUPER ADMIN VIEW                                             */}
        {/* ==================================================================== */}
        {activeRole === 'SUPER_ADMIN' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-[#0B1B2D] to-[#162B44] text-white p-8 rounded-3xl border border-[#C5A059]/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" /> Super Admin Control Console
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif">PCOXchange Platform Super Admin</h2>
                <p className="text-slate-300 text-sm max-w-2xl">
                  Create Congresses, register Travel Agents directly, manage platform staff, and monitor global SaaS volume.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => setShowAddCongressModal(true)}
                  className="h-11 px-5 rounded-xl bg-[#C5A059] text-[#0B1B2D] font-bold text-xs hover:bg-[#D4AF37] transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Create Congress / Exhibition
                </button>
                <button 
                  onClick={() => setShowAddTAModal(true)}
                  className="h-11 px-5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#C5A059]" /> Create Direct TA Account
                </button>
              </div>
            </div>

            {/* SUPER ADMIN METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Congresses</span>
                <div className="text-3xl font-bold text-[#0B1B2D]">{congresses.length} Events</div>
                <p className="text-xs text-emerald-600 font-semibold">{congresses.filter(c => c.isLive).length} Currently LIVE</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registered Travel Agents</span>
                <div className="text-3xl font-bold text-[#0B1B2D]">{travelAgents.length} Agencies</div>
                <p className="text-xs text-slate-500">Accommodation &amp; Transport TAs</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Platform Volume</span>
                <div className="text-3xl font-bold text-[#0B1B2D]">€148,500</div>
                <p className="text-xs text-emerald-600 font-semibold">Processed via Appointed TAs</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Platform Staff</span>
                <div className="text-3xl font-bold text-[#0B1B2D]">{staffAccounts.length} Staff</div>
                <p className="text-xs text-slate-500">Across Super Admin, PCO &amp; TA</p>
              </div>
            </div>

            {/* SUPER ADMIN CONGRESS LIST */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0B1B2D]">All Platform Congresses &amp; Exhibitions</h3>
                  <p className="text-xs text-slate-500">Manage congresses, toggle public LIVE status, and review mapped travel agents.</p>
                </div>
              </div>

              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Congress Title &amp; Slug</th>
                    <th className="p-4">Event Dates &amp; Venue</th>
                    <th className="p-4">Public Site LIVE Status</th>
                    <th className="p-4">Mapped Travel Agents</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {congresses.map((c) => (
                    <tr key={c.id}>
                      <td className="p-4 font-bold text-[#0B1B2D]">
                        <div className="text-sm">{c.title}</div>
                        <div className="text-[10px] font-mono text-slate-400">/event/{c.slug}</div>
                      </td>
                      <td className="p-4 text-slate-600">
                        <div>{c.dates}</div>
                        <div className="text-[10px] text-slate-400">{c.venue}</div>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleCongressLive(c.id)}
                          className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            c.isLive ? 'bg-emerald-500 text-white shadow' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          <Power className="w-3.5 h-3.5" /> {c.isLive ? 'LIVE (Public)' : 'Offline (Draft)'}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1 text-[11px]">
                          {c.taMappings?.map((m, idx) => (
                            <span key={idx} className="inline-block px-2 py-0.5 rounded bg-slate-100 font-semibold mr-1">
                              {m.travelAgentId} ({m.scope})
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <Link 
                          href={`/event/${c.slug}`}
                          className="text-[#C5A059] font-bold hover:underline flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Preview Site
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* ROLE 2: CONGRESS / PCO LAYER VIEW                                    */}
        {/* ==================================================================== */}
        {activeRole === 'CONGRESS' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-[#0B1B2D] to-[#162B44] text-white p-8 rounded-3xl border border-[#C5A059]/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5" /> Congress / PCO Management Suite
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif">{activeCongress.title}</h2>
                <p className="text-slate-300 text-sm max-w-2xl">
                  Configure exhibition details, assign preferred Travel Agents for Accommodation, Transfers &amp; Sightseeing, and toggle the public site LIVE.
                </p>
              </div>

              {/* AUTOMATED PUBLIC SITE LIVE TOGGLE */}
              <div className="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-md space-y-2">
                <span className="text-[10px] font-bold uppercase text-[#C5A059] tracking-widest block">
                  Public Portal Live Switch
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleCongressLive(activeCongress.id)}
                    className={`h-11 px-5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
                      activeCongress.isLive 
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                        : 'bg-amber-500 text-slate-900 hover:bg-amber-400'
                    }`}
                  >
                    <Power className="w-4 h-4" /> {activeCongress.isLive ? 'SITE IS LIVE (Public)' : 'ACTIVATE LIVE SITE'}
                  </button>

                  <Link 
                    href={`/event/${activeCongress.slug}`}
                    className="h-11 px-4 rounded-xl border border-white/30 text-white font-bold text-xs hover:bg-white/10 flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" /> Open Public Portal
                  </Link>
                </div>
              </div>
            </div>

            {/* CONGRESS TABS */}
            <div className="flex flex-wrap items-center border-b border-slate-200 gap-4 sm:gap-8">
              <button
                onClick={() => setPcoTab('exhibition')}
                className={`pb-4 font-bold text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                  pcoTab === 'exhibition' ? 'border-[#C5A059] text-[#0B1B2D]' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <Building2 className="w-4 h-4 text-[#C5A059]" /> Exhibition &amp; Profile Setup
              </button>

              <button
                onClick={() => setPcoTab('ta_mapping')}
                className={`pb-4 font-bold text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                  pcoTab === 'ta_mapping' ? 'border-[#C5A059] text-[#0B1B2D]' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <Layers className="w-4 h-4 text-[#C5A059]" /> Travel Agent Scope Mapping Matrix
              </button>

              <button
                onClick={() => setPcoTab('view_queue')}
                className={`pb-4 font-bold text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                  pcoTab === 'view_queue' ? 'border-[#C5A059] text-[#0B1B2D]' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <Eye className="w-4 h-4 text-[#C5A059]" /> View-Only Delegate Booking Queue ({manifest.length})
              </button>

              <button
                onClick={() => setPcoTab('staff')}
                className={`pb-4 font-bold text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                  pcoTab === 'staff' ? 'border-[#C5A059] text-[#0B1B2D]' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <Users className="w-4 h-4 text-[#C5A059]" /> Congress Staff Accounts ({staffAccounts.filter(s => s.parentOrgType === 'CONGRESS').length})
              </button>
            </div>

            {/* PCO TAB 1: EXHIBITION SETUP */}
            {pcoTab === 'exhibition' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-[#0B1B2D]">Congress Profile &amp; Dates Configuration</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase text-[10px]">Congress Title</label>
                    <input type="text" value={activeCongress.title} readOnly className="w-full h-11 px-3 bg-slate-50 rounded-xl border border-slate-200 font-bold" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase text-[10px]">Congress Dates</label>
                    <input type="text" value={activeCongress.dates} readOnly className="w-full h-11 px-3 bg-slate-50 rounded-xl border border-slate-200 font-bold" />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-slate-500 uppercase text-[10px]">Venue Location</label>
                    <input type="text" value={activeCongress.venue} readOnly className="w-full h-11 px-3 bg-slate-50 rounded-xl border border-slate-200 font-bold" />
                  </div>
                </div>
              </div>
            )}

            {/* PCO TAB 2: INTERACTIVE TA ACCOUNTS & SCOPE MAPPING MATRIX */}
            {pcoTab === 'ta_mapping' && (
              <div className="space-y-8">
                {/* SECTION HEADER & TA CREATION ACTION */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#0B1B2D] text-xs font-bold uppercase tracking-wider mb-2">
                      <Layers className="w-3.5 h-3.5 text-[#C5A059]" /> Congress Layer Scope Mapping Studio
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B1B2D]">
                      Appointed Travel Agent (TA) Account Creation & Scope Mapping
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                      Register new Travel Agent accounts directly, select exhibitions on the left, map TAs on the right, and review real-time product allocation outcomes below.
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
                        <h4 className="text-base font-bold text-[#0B1B2D]">Exhibitions & Congresses</h4>
                      </div>
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        {congresses.length} Total
                      </span>
                    </div>

                    <p className="text-xs text-slate-500">Click an exhibition to manage its mapped Travel Agents:</p>

                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                      {congresses.map((c) => {
                        const isSelected = (selectedExhibitionIdForMapping || activeCongress.id) === c.id;
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

                    {(() => {
                      const currentExhibition = congresses.find(c => c.id === (selectedExhibitionIdForMapping || activeCongress.id)) || congresses[0];
                      return (
                        <>
                          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
                            <span>Mapping Target: <strong>{currentExhibition?.title}</strong></span>
                            <span className="font-mono text-[10px] text-amber-700 font-bold">Slug: /{currentExhibition?.slug}</span>
                          </div>

                          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                            {travelAgents.map((ta) => {
                              const existingMapping = currentExhibition?.taMappings?.find(m => m.travelAgentId === ta.id);

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

                                    {/* Mapped Status Badge */}
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

                                  {/* Capabilities & Map Action */}
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
                                      <Layers className="w-3.5 h-3.5" /> Map with {currentExhibition?.title.split(' ')[0]}
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* OUTCOME PANEL: LIVE MAPPING MATRIX RESULTS ON THE SAME SCREEN */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider">Step 3 • Live Mapping Outcome</span>
                      <h3 className="text-xl font-bold font-serif text-[#0B1B2D]">
                        Product Allocation Matrix for {(congresses.find(c => c.id === (selectedExhibitionIdForMapping || activeCongress.id)) || congresses[0])?.title}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Real-time breakdown of mapped Travel Agents and their assigned product scopes.
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 self-start sm:self-auto">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Outcome Matrix
                    </span>
                  </div>

                  {(() => {
                    const currentExhibition = congresses.find(c => c.id === (selectedExhibitionIdForMapping || activeCongress.id)) || congresses[0];
                    const mappings = currentExhibition?.taMappings || [];

                    return (
                      <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-sm text-[#0B1B2D]">{currentExhibition.title}</h4>
                            <p className="text-xs text-slate-500">📅 {currentExhibition.dates} • 📍 {currentExhibition.venue}</p>
                          </div>
                          <span className="text-xs font-bold text-[#C5A059] bg-[#C5A059]/10 px-3 py-1 rounded-lg border border-[#C5A059]/30 self-start sm:self-auto">
                            {mappings.length} Active Product Mappings
                          </span>
                        </div>

                        {mappings.length === 0 ? (
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
                                {mappings.map((m, idx) => {
                                  const ta = travelAgents.find(t => t.id === m.travelAgentId);
                                  return (
                                    <tr key={idx} className="hover:bg-slate-50/80 transition-all">
                                      <td className="p-3.5 font-bold text-[#0B1B2D]">
                                        {currentExhibition.title}
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
                                          onClick={() => handleRemoveMapping(currentExhibition.id, m.travelAgentId, m.scope)}
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
                    );
                  })()}
                </div>
              </div>
            )}

            {/* PCO TAB 3: VIEW-ONLY DELEGATE BOOKING QUEUE */}
            {pcoTab === 'view_queue' && (
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1B2D]">View-Only Delegate Booking Queue</h3>
                    <p className="text-xs text-slate-500">Congress organizer view of live delegate accommodation and add-on bookings.</p>
                  </div>
                  <span className="text-xs font-bold text-[#C5A059] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    View-Only Mode
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
            )}
          </div>
        )}

        {/* ==================================================================== */}
        {/* ROLE 3: TRAVEL AGENT (TA) LAYER VIEW                                 */}
        {/* ==================================================================== */}
        {activeRole === 'TRAVEL_AGENT' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-[#0B1B2D] to-[#162B44] text-white p-8 rounded-3xl border border-[#C5A059]/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] text-xs font-bold uppercase tracking-wider">
                  <Briefcase className="w-3.5 h-3.5" /> Appointed Travel Agent Hub
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif">Apex MICE &amp; Travel Services Ltd</h2>
                <p className="text-slate-300 text-sm max-w-2xl">
                  Manage assigned room block allotments, transfers, sightseeing options, and process product-wise booking amendments.
                </p>
              </div>

              <button 
                onClick={() => setShowAddHotelModal(true)}
                className="h-11 px-6 rounded-xl bg-[#C5A059] text-[#0B1B2D] font-bold text-xs hover:bg-[#D4AF37] transition-all flex items-center gap-2 shadow-md cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" /> + Add Hotel Allotment
              </button>
            </div>

            {/* TA TABS */}
            <div className="flex flex-wrap items-center border-b border-slate-200 gap-4 sm:gap-8">
              <button
                onClick={() => setTaTab('allotments')}
                className={`pb-4 font-bold text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                  taTab === 'allotments' ? 'border-[#C5A059] text-[#0B1B2D]' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <Hotel className="w-4 h-4 text-[#C5A059]" /> Room Block Allotments ({hotels.length})
              </button>

              <button
                onClick={() => setTaTab('transfers')}
                className={`pb-4 font-bold text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                  taTab === 'transfers' ? 'border-[#C5A059] text-[#0B1B2D]' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <Car className="w-4 h-4 text-[#C5A059]" /> Airport Transfers ({transfers.length})
              </button>

              <button
                onClick={() => setTaTab('activities')}
                className={`pb-4 font-bold text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                  taTab === 'activities' ? 'border-[#C5A059] text-[#0B1B2D]' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <Compass className="w-4 h-4 text-[#C5A059]" /> Sightseeing Excursions ({activities.length})
              </button>

              <button
                onClick={() => setTaTab('amendments')}
                className={`pb-4 font-bold text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                  taTab === 'amendments' ? 'border-[#C5A059] text-[#0B1B2D]' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <Edit3 className="w-4 h-4 text-[#C5A059]" /> Product-wise Amendment Center ({manifest.length})
              </button>
            </div>

            {/* TA TAB 1: ALLOTMENTS */}
            {taTab === 'allotments' && (
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#0B1B2D]">Contracted Room Block Inventory</h3>
                  <button 
                    onClick={() => setShowAddHotelModal(true)}
                    className="h-10 px-4 rounded-xl bg-[#0B1B2D] text-white font-bold text-xs hover:bg-[#162B44]"
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
                          <button onClick={() => deleteHotel(h.id)} className="text-red-500 font-bold hover:underline">
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TA TAB: PRODUCT-WISE AMENDMENT CENTER */}
            {taTab === 'amendments' && (
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1B2D]">Product-wise Booking Amendment Engine</h3>
                    <p className="text-xs text-slate-500">Inspect delegate bookings breakdown by room, transfer, and sightseeing, and process amendments.</p>
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
          </div>
        )}

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
                <button type="submit" className="h-10 px-6 rounded-xl bg-[#0B1B2D] text-white font-bold">Save Amendment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SUPER ADMIN CREATE CONGRESS */}
      {showAddCongressModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-[#0B1B2D] text-sm">Create New Congress / Exhibition</h3>
              <button onClick={() => setShowAddCongressModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveCongress} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Congress Title</label>
                <input type="text" placeholder="e.g. World Cardiology Congress 2026" value={newCongressTitle} onChange={(e) => setNewCongressTitle(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Event Dates</label>
                <input type="text" value={newCongressDates} onChange={(e) => setNewCongressDates(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Venue</label>
                <input type="text" value={newCongressVenue} onChange={(e) => setNewCongressVenue(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" />
              </div>
              <button type="submit" className="w-full h-11 bg-[#0B1B2D] text-white font-bold rounded-xl">Save &amp; Create Congress</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SUPER ADMIN CREATE DIRECT TA */}
      {showAddTAModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-[#0B1B2D] text-sm">Create Travel Agent Profile Directly</h3>
              <button onClick={() => setShowAddTAModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveTA} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Agency Name</label>
                <input type="text" placeholder="e.g. Global Travel Agency Ltd" value={newTaAgencyName} onChange={(e) => setNewTaAgencyName(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">IATA License Number</label>
                <input type="text" placeholder="e.g. IATA #98234-EU" value={newTaIata} onChange={(e) => setNewTaIata(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-500 uppercase text-[10px]">Contact Person &amp; Email</label>
                <input type="email" placeholder="agent@agency.com" value={newTaEmail} onChange={(e) => setNewTaEmail(e.target.value)} className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-300 font-bold" required />
              </div>
              <button type="submit" className="w-full h-11 bg-[#0B1B2D] text-white font-bold rounded-xl">Save &amp; Create Travel Agent</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD HOTEL ALLOTMENT */}
      <AddHotelModal isOpen={showAddHotelModal} onClose={() => setShowAddHotelModal(false)} />

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
              <div className="text-slate-500">Target Exhibition: {congresses.find(c => c.id === (selectedExhibitionIdForMapping || activeCongress.id))?.title}</div>
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

    </div>
  );
}
