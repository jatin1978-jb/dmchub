'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// --- SAAS ENTITIES & TYPINGS ---

export type SaaSUserRole = 'SUPER_ADMIN' | 'CONGRESS' | 'TRAVEL_AGENT';

export interface StaffAccount {
  id: string;
  name: string;
  email: string;
  roleTitle: string;
  parentOrgType: 'SUPER_ADMIN' | 'CONGRESS' | 'TRAVEL_AGENT';
  parentOrgId: string;
}

export interface TAMapping {
  travelAgentId: string;
  scope: 'ACCOMMODATION' | 'TRANSFERS' | 'ACTIVITIES' | 'ALL';
}

export interface CongressEvent {
  id: string;
  slug: string;
  title: string;
  dates: string;
  venue: string;
  description: string;
  logoUrl: string;
  bannerUrl: string;
  isLive: boolean; // LIVE site toggle
  taMappings: TAMapping[];
  createdById: string;
}

export interface TravelAgentProfile {
  id: string;
  agencyName: string;
  iataNumber: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  scopes: ('ACCOMMODATION' | 'TRANSFERS' | 'ACTIVITIES')[];
}

export interface RoomType {
  id: string;
  name: string;
  size: string;
  bed: string;
  mealType: string;
  inclusions: string[];
  image?: string;
  pricePerNight: number;
  totalPrice: number;
  allottedQuantity: number;
}

export interface HotelAllotment {
  id: string;
  name: string;
  stars: number;
  address: string;
  distance: string;
  image: string;
  galleryImages: string[];
  badge: string;
  shuttle: string;
  taMerchant: string;
  startPrice: number;
  availableRooms: number;
  description: string;
  rooms: RoomType[];
  taOwnerId?: string;
}

export interface TransferOption {
  id: string;
  title: string;
  vehicle: string;
  price: number;
  status: string;
  taOwnerId?: string;
}

export interface ActivityOption {
  id: string;
  title: string;
  duration: string;
  desc: string;
  price: number;
  status: string;
  taOwnerId?: string;
}

export interface ProductBreakdown {
  hotelName: string;
  roomName: string;
  roomPrice: number;
  transferTitle: string;
  transferPrice: number;
  activitiesList: string[];
  activitiesPrice: number;
}

export interface BookingManifestItem {
  id: string;
  paxTitle: string;
  paxFirstName: string;
  paxLastName: string;
  paxName: string;
  email: string;
  phone: string;
  specialRequests: string;
  hotel: string;
  room: string;
  transfer: string;
  sightseeing: string;
  total: string;
  grandTotalNumber: number;
  status: 'Confirmed' | 'Amended' | 'Cancelled';
  breakdown: ProductBreakdown;
  amendmentHistory: string[];
  congressId: string;
}

interface InventoryContextType {
  // SaaS Role & Active Persona
  activeRole: SaaSUserRole;
  setActiveRole: (role: SaaSUserRole) => void;
  activeOrgId: string;
  setActiveOrgId: (id: string) => void;

  // SaaS Data
  congresses: CongressEvent[];
  travelAgents: TravelAgentProfile[];
  staffAccounts: StaffAccount[];
  hotels: HotelAllotment[];
  transfers: TransferOption[];
  activities: ActivityOption[];
  manifest: BookingManifestItem[];

  // SaaS Actions
  addCongress: (congress: Omit<CongressEvent, 'id' | 'slug'>) => void;
  toggleCongressLive: (id: string) => void;
  updateTAMappings: (congressId: string, mappings: TAMapping[]) => void;
  addTravelAgent: (ta: Omit<TravelAgentProfile, 'id'>) => void;
  addStaffAccount: (staff: Omit<StaffAccount, 'id'>) => void;
  
  // Inventory Actions
  addHotel: (hotel: Omit<HotelAllotment, 'id'>) => void;
  updateHotel: (id: string, hotel: Partial<HotelAllotment>) => void;
  deleteHotel: (id: string) => void;
  addTransfer: (transfer: Omit<TransferOption, 'id'>) => void;
  addActivity: (activity: Omit<ActivityOption, 'id'>) => void;
  
  // Booking & Product-wise Amendment Actions
  addBookingToManifest: (booking: Omit<BookingManifestItem, 'id' | 'amendmentHistory'>) => void;
  amendBooking: (id: string, updatedBooking: Partial<BookingManifestItem>, note: string) => void;
}

// --- DEFAULT INITIAL SAAS DATA ---

const defaultCongresses: CongressEvent[] = [
  {
    id: 'wcc-2026',
    slug: 'wcc-2026',
    title: 'World Cardiology Congress 2026',
    dates: 'October 14 – 18, 2026',
    venue: 'Paris Expo Porte de Versailles, France',
    description: '42nd Annual Global Scientific Assembly on Cardiovascular Innovation.',
    logoUrl: '/pcoxchange-logo.png',
    bannerUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    isLive: true,
    createdById: 'superadmin-1',
    taMappings: [
      { travelAgentId: 'ta-apex', scope: 'ACCOMMODATION' },
      { travelAgentId: 'ta-helios', scope: 'TRANSFERS' },
      { travelAgentId: 'ta-helios', scope: 'ACTIVITIES' },
    ]
  },
  {
    id: 'renewable-2026',
    slug: 'renewable-2026',
    title: 'International Renewable Energy Summit 2026',
    dates: 'November 05 – 08, 2026',
    venue: 'Messe Frankfurt, Germany',
    description: 'Global Congress on Clean Energy & Sustainable Infrastructure.',
    logoUrl: '/pcoxchange-logo.png',
    bannerUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    isLive: false,
    createdById: 'superadmin-1',
    taMappings: [
      { travelAgentId: 'ta-helios', scope: 'ALL' }
    ]
  }
];

const defaultTravelAgents: TravelAgentProfile[] = [
  {
    id: 'ta-apex',
    agencyName: 'Apex MICE & Travel Services Ltd',
    iataNumber: '98234-EU',
    contactPerson: 'Sarah Jenkins',
    email: 'sarah@apexmice.com',
    phone: '+44 20 7946 0912',
    country: 'United Kingdom',
    scopes: ['ACCOMMODATION']
  },
  {
    id: 'ta-helios',
    agencyName: 'Helios Corporate Travel GmbH',
    iataNumber: '77102-DE',
    contactPerson: 'Klaus Weber',
    email: 'klaus@heliostravel.de',
    phone: '+49 69 9002 4410',
    country: 'Germany',
    scopes: ['TRANSFERS', 'ACTIVITIES']
  }
];

const defaultStaff: StaffAccount[] = [
  { id: 'st-1', name: 'Oliver Vance', email: 'oliver@pcoxchange.com', roleTitle: 'Platform Operations Lead', parentOrgType: 'SUPER_ADMIN', parentOrgId: 'superadmin-1' },
  { id: 'st-2', name: 'Marie Laurent', email: 'm.laurent@wcc2026.org', roleTitle: 'Congress Allotment Officer', parentOrgType: 'CONGRESS', parentOrgId: 'wcc-2026' },
  { id: 'st-3', name: 'David Smith', email: 'd.smith@apexmice.com', roleTitle: 'Voucher Specialist', parentOrgType: 'TRAVEL_AGENT', parentOrgId: 'ta-apex' }
];

const defaultHotels: HotelAllotment[] = [
  {
    id: 'novotel-tour-eiffel',
    name: 'Novotel Paris Centre Tour Eiffel',
    stars: 4,
    address: '61 Quai de Grenelle, 75015 Paris, France',
    distance: '0.8 km from Paris Expo Porte de Versailles',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'Official Congress Partner Hotel',
    shuttle: 'Free Shuttle Every 15 Mins to Venue',
    taMerchant: 'Apex MICE & Travel Services Ltd (IATA #98234-EU)',
    startPrice: 240,
    availableRooms: 18,
    description: 'Overlooking the Seine River with views of the Eiffel Tower, Novotel Paris Centre provides modern executive rooms, an indoor heated pool, 24-hour fitness center, and Benkay Japanese restaurant.',
    taOwnerId: 'ta-apex',
    rooms: [
      {
        id: 'room-sup-king',
        name: 'Superior Executive King Room',
        size: '28 m²',
        bed: '1 King Bed',
        mealType: 'Full Buffet Breakfast Included',
        inclusions: ['Complimentary Buffet Breakfast', 'High-Speed WiFi', 'City Tourism Tax Included'],
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
        pricePerNight: 240,
        totalPrice: 960,
        allottedQuantity: 30,
      },
      {
        id: 'room-deluxe-twin',
        name: 'Deluxe Twin Block Room',
        size: '32 m²',
        bed: '2 Twin Beds',
        mealType: 'Full Buffet Breakfast Included',
        inclusions: ['Complimentary Buffet Breakfast', 'High-Speed WiFi', 'Nespresso Coffee Machine'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
        pricePerNight: 270,
        totalPrice: 1080,
        allottedQuantity: 20,
      }
    ]
  },
  {
    id: 'pullman-paris-tour-eiffel',
    name: 'Pullman Paris Tour Eiffel',
    stars: 5,
    address: '18 Avenue de Suffren, 75015 Paris, France',
    distance: '1.2 km from Paris Expo Porte de Versailles',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'VIP Speaker Headquarters',
    shuttle: 'VIP Mercedes Transfers Provided',
    taMerchant: 'Apex MICE & Travel Services Ltd (IATA #98234-EU)',
    startPrice: 380,
    availableRooms: 12,
    description: 'Set at the foot of the Eiffel Tower, Pullman Paris offers 5-star luxury accommodation tailored for international medical speakers.',
    taOwnerId: 'ta-apex',
    rooms: [
      {
        id: 'pullman-exec-king',
        name: 'Deluxe Executive King Room',
        size: '30 m²',
        bed: '1 King Bed',
        mealType: 'Full Buffet Breakfast Included',
        inclusions: ['Buffet Breakfast Included', 'Complimentary WiFi', 'Eiffel View Balcony'],
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
        pricePerNight: 380,
        totalPrice: 1520,
        allottedQuantity: 15,
      }
    ]
  }
];

const defaultTransfers: TransferOption[] = [
  { id: '1', title: 'Private Executive Mercedes E-Class', vehicle: 'Executive Sedan', price: 85, status: 'Available', taOwnerId: 'ta-helios' },
  { id: '2', title: 'Shared Delegate Express Coach Shuttle', vehicle: '50-Seater Coach', price: 35, status: 'Available', taOwnerId: 'ta-helios' },
];

const defaultActivities: ActivityOption[] = [
  { id: 'seine-cruise', title: 'Eiffel Tower Priority & Seine Dinner Cruise', duration: '3 Hours', desc: '3-course gourmet dinner cruise along the Seine with priority Eiffel tower access.', price: 65, status: 'Active', taOwnerId: 'ta-helios' },
  { id: 'medical-tour', title: 'Paris Medical Heritage & Louvre Guided Tour', duration: '4 Hours', desc: 'Private guided tour of historical medical academies & Louvre masterpieces.', price: 55, status: 'Active', taOwnerId: 'ta-helios' },
];

const defaultManifest: BookingManifestItem[] = [
  {
    id: 'PX-2026-98104',
    paxTitle: 'Dr.',
    paxFirstName: 'Julian',
    paxLastName: 'Thorne',
    paxName: 'Dr. Julian Thorne',
    email: 'julian.thorne@cardio-institute.org',
    phone: '+44 7700 900077',
    specialRequests: 'High floor preferred.',
    hotel: 'Novotel Paris Centre Tour Eiffel',
    room: 'Superior Executive King Room',
    transfer: 'Private Executive Mercedes (€85)',
    sightseeing: 'Eiffel Cruise (€65)',
    total: '€1,110',
    grandTotalNumber: 1110,
    status: 'Confirmed',
    congressId: 'wcc-2026',
    breakdown: {
      hotelName: 'Novotel Paris Centre Tour Eiffel',
      roomName: 'Superior Executive King Room',
      roomPrice: 960,
      transferTitle: 'Private Executive Mercedes E-Class',
      transferPrice: 85,
      activitiesList: ['Eiffel Tower Priority & Seine Dinner Cruise'],
      activitiesPrice: 65
    },
    amendmentHistory: ['[2026-09-20] Initial booking created and confirmed.']
  }
];

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRole] = useState<SaaSUserRole>('SUPER_ADMIN');
  const [activeOrgId, setActiveOrgId] = useState<string>('superadmin-1');

  const [congresses, setCongresses] = useState<CongressEvent[]>(defaultCongresses);
  const [travelAgents, setTravelAgents] = useState<TravelAgentProfile[]>(defaultTravelAgents);
  const [staffAccounts, setStaffAccounts] = useState<StaffAccount[]>(defaultStaff);

  const [hotels, setHotels] = useState<HotelAllotment[]>(defaultHotels);
  const [transfers, setTransfers] = useState<TransferOption[]>(defaultTransfers);
  const [activities, setActivities] = useState<ActivityOption[]>(defaultActivities);
  const [manifest, setManifest] = useState<BookingManifestItem[]>(defaultManifest);

  // Sync with localStorage
  useEffect(() => {
    try {
      const storedCongresses = localStorage.getItem('pcox_congresses');
      if (storedCongresses) setCongresses(JSON.parse(storedCongresses));

      const storedTAs = localStorage.getItem('pcox_tas');
      if (storedTAs) setTravelAgents(JSON.parse(storedTAs));

      const storedStaff = localStorage.getItem('pcox_staff');
      if (storedStaff) setStaffAccounts(JSON.parse(storedStaff));

      const storedHotels = localStorage.getItem('pcox_hotels');
      if (storedHotels) setHotels(JSON.parse(storedHotels));

      const storedTransfers = localStorage.getItem('pcox_transfers');
      if (storedTransfers) setTransfers(JSON.parse(storedTransfers));

      const storedActivities = localStorage.getItem('pcox_activities');
      if (storedActivities) setActivities(JSON.parse(storedActivities));

      const storedManifest = localStorage.getItem('pcox_manifest');
      if (storedManifest) setManifest(JSON.parse(storedManifest));
    } catch (e) {
      console.error('LocalStorage restoration error:', e);
    }
  }, []);

  const saveToStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }
  };

  // SaaS Actions
  const addCongress = (congressData: Omit<CongressEvent, 'id' | 'slug'>) => {
    const slug = congressData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCongress: CongressEvent = { ...congressData, id: slug, slug };
    const updated = [newCongress, ...congresses];
    setCongresses(updated);
    saveToStorage('pcox_congresses', updated);
  };

  const toggleCongressLive = (id: string) => {
    const updated = congresses.map(c => c.id === id ? { ...c, isLive: !c.isLive } : c);
    setCongresses(updated);
    saveToStorage('pcox_congresses', updated);
  };

  const updateTAMappings = (congressId: string, mappings: TAMapping[]) => {
    const updated = congresses.map(c => c.id === congressId ? { ...c, taMappings: mappings } : c);
    setCongresses(updated);
    saveToStorage('pcox_congresses', updated);
  };

  const addTravelAgent = (taData: Omit<TravelAgentProfile, 'id'>) => {
    const id = `ta-${Date.now()}`;
    const newTA: TravelAgentProfile = { ...taData, id };
    const updated = [...travelAgents, newTA];
    setTravelAgents(updated);
    saveToStorage('pcox_tas', updated);
  };

  const addStaffAccount = (staffData: Omit<StaffAccount, 'id'>) => {
    const id = `staff-${Date.now()}`;
    const newStaff: StaffAccount = { ...staffData, id };
    const updated = [...staffAccounts, newStaff];
    setStaffAccounts(updated);
    saveToStorage('pcox_staff', updated);
  };

  // Inventory Actions
  const addHotel = (hotelData: Omit<HotelAllotment, 'id'>) => {
    const id = hotelData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newHotel: HotelAllotment = { ...hotelData, id };
    const updated = [newHotel, ...hotels];
    setHotels(updated);
    saveToStorage('pcox_hotels', updated);
  };

  const updateHotel = (id: string, updatedFields: Partial<HotelAllotment>) => {
    const updated = hotels.map(h => h.id === id ? { ...h, ...updatedFields } : h);
    setHotels(updated);
    saveToStorage('pcox_hotels', updated);
  };

  const deleteHotel = (id: string) => {
    const updated = hotels.filter(h => h.id !== id);
    setHotels(updated);
    saveToStorage('pcox_hotels', updated);
  };

  const addTransfer = (transferData: Omit<TransferOption, 'id'>) => {
    const newTransfer: TransferOption = { ...transferData, id: String(Date.now()) };
    const updated = [...transfers, newTransfer];
    setTransfers(updated);
    saveToStorage('pcox_transfers', updated);
  };

  const addActivity = (activityData: Omit<ActivityOption, 'id'>) => {
    const newActivity: ActivityOption = { ...activityData, id: String(Date.now()) };
    const updated = [...activities, newActivity];
    setActivities(updated);
    saveToStorage('pcox_activities', updated);
  };

  // Booking & Product-wise Amendment Actions
  const addBookingToManifest = (bookingData: Omit<BookingManifestItem, 'id' | 'amendmentHistory'>) => {
    const newBooking: BookingManifestItem = {
      ...bookingData,
      id: `PX-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      amendmentHistory: [`[${new Date().toISOString().split('T')[0]}] Booking confirmed.`]
    };
    const updated = [newBooking, ...manifest];
    setManifest(updated);
    saveToStorage('pcox_manifest', updated);
  };

  const amendBooking = (id: string, updatedFields: Partial<BookingManifestItem>, note: string) => {
    const updated = manifest.map(b => {
      if (b.id === id) {
        const history = b.amendmentHistory || [];
        const newHistoryEntry = `[${new Date().toISOString().split('T')[0]}] Amendment: ${note}`;
        return {
          ...b,
          ...updatedFields,
          status: (updatedFields.status || 'Amended') as any,
          amendmentHistory: [newHistoryEntry, ...history]
        };
      }
      return b;
    });
    setManifest(updated);
    saveToStorage('pcox_manifest', updated);
  };

  return (
    <InventoryContext.Provider 
      value={{ 
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
        updateHotel, 
        deleteHotel, 
        addTransfer, 
        addActivity, 
        addBookingToManifest,
        amendBooking
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}
