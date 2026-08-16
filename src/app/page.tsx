'use client';

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import {
  ArrowRight,
  ChevronRight,
  Package,
  Camera,
  Car,
  Hotel,
  Briefcase,
  FileText,
  Globe,
  CheckCircle2,
  Users,
  MapPin,
  Zap,
  ShieldCheck,
  Building2,
  Sparkles,
  LogIn,
  Menu,
  X,
  Sliders,
  Compass,
  Layers,
  Utensils,
  Calendar,
  UserCheck,
  Target,
  Cpu,
  TrendingUp,
  Quote
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#C5A059]/20 selection:text-[#0B1B2D] overflow-x-hidden">
      
      {/* Frozen Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[#C5A059]/25 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between min-h-[90px] lg:min-h-[105px] py-2 sm:py-3">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center shrink-0 py-1">
              <Logo size="md" />
            </Link>

            {/* Frozen Desktop Navigation Links */}
            <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-7">
              <a href="#about" className="text-sm font-semibold text-slate-700 hover:text-[#C5A059] transition-colors">
                What is DMCXchange
              </a>
              <a href="#for-dmcs" className="text-sm font-semibold text-slate-700 hover:text-[#C5A059] transition-colors">
                For DMCs
              </a>
              <a href="#for-agents" className="text-sm font-semibold text-slate-700 hover:text-[#C5A059] transition-colors">
                For Travel Agents
              </a>
              <a href="#customize" className="text-sm font-semibold text-slate-700 hover:text-[#C5A059] transition-colors">
                Customize & Configure
              </a>
              <a href="#intelligent-marketplace" className="text-sm font-semibold text-slate-700 hover:text-[#C5A059] transition-colors">
                Intelligent Engine
              </a>
              <a href="#how-it-works" className="text-sm font-semibold text-slate-700 hover:text-[#C5A059] transition-colors">
                How It Works
              </a>
            </nav>

            {/* Action Buttons - SIGN IN PERMANENTLY VISIBLE */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0B1B2D] bg-[#C5A059]/15 border-2 border-[#C5A059] hover:bg-[#C5A059] hover:text-[#0B1B2D] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-150 shadow-sm"
              >
                <LogIn className="w-4 h-4 text-[#9E782F] shrink-0" />
                <span>Sign In</span>
              </Link>

              <Link
                href="/auth/register/agent"
                className="hidden md:inline-flex text-sm font-bold px-5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-[#0B1B2D] hover:bg-slate-100 transition-all duration-150"
              >
                Join as Travel Agent
              </Link>
              <Link
                href="/auth/register/dmc"
                className="hidden lg:inline-flex text-sm font-bold px-6 py-2.5 sm:py-3 rounded-xl bg-[#0B1B2D] text-white hover:bg-[#162B44] shadow-md shadow-[#0B1B2D]/20 transition-all duration-150"
              >
                Join as a DMC
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2.5 rounded-xl border border-slate-200 text-[#0B1B2D] hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-[#C5A059]/30 px-6 py-5 space-y-3 shadow-xl animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col gap-2.5 text-sm font-semibold text-slate-700">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1.5 border-b border-slate-100">What is DMCXchange</a>
              <a href="#for-dmcs" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1.5 border-b border-slate-100">For DMCs</a>
              <a href="#for-agents" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1.5 border-b border-slate-100">For Travel Agents</a>
              <a href="#customize" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1.5 border-b border-slate-100">Customize & Configure</a>
              <a href="#intelligent-marketplace" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1.5 border-b border-slate-100">Intelligent Engine</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1.5 border-b border-slate-100">How It Works</a>
            </nav>

            <div className="pt-3 flex flex-col gap-2.5">
              <Link
                href="/auth/register/agent"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-sm font-bold py-3 rounded-xl border-2 border-[#C5A059] text-[#0B1B2D]"
              >
                Join as Travel Agent
              </Link>
              <Link
                href="/auth/register/dmc"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-sm font-bold py-3 rounded-xl bg-[#0B1B2D] text-white shadow-md"
              >
                Join as a DMC Supplier
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <div className="pt-28 sm:pt-32 lg:pt-36">
        <main>
          
          {/* Hero Section */}
          <section className="relative min-h-[75vh] flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-white py-12 lg:py-16" aria-label="Hero">
            {/* Subtle Grid Pattern */}
            <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C5A059" strokeWidth="0.5" strokeOpacity="0.15" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-grid)" />
            </svg>

            {/* Radial Gold Ambient Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.12),transparent_65%)]" />
            <div className="absolute left-0 top-1/4 bottom-1/4 w-1.5 rounded-r bg-gradient-to-b from-transparent via-[#C5A059] to-transparent" />

            <div className="relative z-10 w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                
                {/* Left Column: Hero Value Proposition */}
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 text-[#9E782F] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    Intelligent Global B2B Marketplace
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-[#0B1B2D] mb-5 font-serif">
                    Connecting DMCs & Travel Agents. <br />
                    <span className="gold-gradient-text">Create. Discover. Customize. Sell.</span>
                  </h1>

                  <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mb-6 font-normal">
                    DMCXchange is an intelligent global B2B marketplace connecting Destination Management Companies (DMCs) with Travel Agents, enabling them to create, discover, customize, and sell destination experiences through one connected platform.
                  </p>

                  {/* Core Idea Banner */}
                  <div className="p-5 rounded-xl bg-[#0B1B2D] text-white border-l-4 border-[#C5A059] shadow-lg mb-8 max-w-2xl">
                    <div className="text-[11px] uppercase tracking-widest text-[#C5A059] font-bold mb-1">Our Core Idea</div>
                    <p className="text-sm sm:text-base font-serif italic text-slate-100 leading-snug">
                      "The right destination product should reach the right traveller, through the right Travel Agent, at the right time."
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 sm:gap-4 mb-8">
                    <Link
                      href="/auth/register/dmc"
                      className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-sm bg-[#0B1B2D] text-white hover:bg-[#162B44] shadow-lg shadow-[#0B1B2D]/15 transition-all duration-200"
                    >
                      <span>Join as a DMC</span>
                      <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                    </Link>
                    <Link
                      href="/auth/register/agent"
                      className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-sm border-2 border-[#C5A059] text-[#0B1B2D] hover:bg-[#C5A059]/10 transition-all duration-200"
                    >
                      <span>Join as a Travel Agent</span>
                      <ChevronRight className="w-4 h-4 text-[#C5A059]" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Intelligent Marketplace Interactive Card */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl p-6 sm:p-7 bg-[#0B1B2D] text-white border border-[#C5A059]/40 shadow-xl overflow-hidden">
                    <div className="absolute -right-16 -top-16 w-40 h-40 bg-[#C5A059]/20 rounded-full blur-3xl" />
                    
                    <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-700">
                      <div>
                        <div className="text-[11px] uppercase tracking-widest text-[#C5A059] font-bold">The Marketplace Model</div>
                        <div className="text-lg font-serif font-bold text-white mt-0.5">DMCXchange Ecosystem</div>
                      </div>
                      <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    </div>

                    <div className="space-y-3 mb-6">
                      {/* For DMCs */}
                      <div className="bg-[#162B44] p-4 rounded-xl border border-[#C5A059]/30">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Building2 className="w-4 h-4 text-[#C5A059]" />
                          <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">For DMCs</span>
                        </div>
                        <div className="text-[11px] text-slate-300 font-mono">
                          Create → Configure → Publish → Reach → Sell → Grow
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          Hotels, Room Types, Transfers, Activities, Meals & Market Options.
                        </p>
                      </div>

                      {/* For Travel Agents */}
                      <div className="bg-[#162B44] p-4 rounded-xl border border-slate-700">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Users className="w-4 h-4 text-[#C5A059]" />
                          <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">For Travel Agents</span>
                        </div>
                        <div className="text-[11px] text-slate-300 font-mono">
                          Discover → Compare → Customize → Quote → Buy → Serve
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          Nationality, Residence, Dates & Visa Feasibility Personalization.
                        </p>
                      </div>

                      {/* The Configure & Buy Feature */}
                      <div className="bg-gradient-to-r from-[#162B44] to-[#0D1F33] p-3.5 rounded-xl border border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Sliders className="w-4 h-4 text-[#C5A059]" />
                          <div>
                            <div className="text-xs font-bold text-white">Configure-and-Buy Engine</div>
                            <div className="text-[10px] text-slate-400">Flexibility to customize itineraries</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">INTELLIGENT</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-700 text-center">
                      <Link href="/auth/login" className="text-xs font-bold text-[#C5A059] hover:underline inline-flex items-center gap-1.5">
                        <span>Access Intelligent B2B Marketplace</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

              </div>

              {/* High-level Summary Metrics Bar */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 rounded-xl border border-[#C5A059]/30 bg-white/95 shadow-lg divide-x divide-slate-100">
                <div className="p-6 text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-[#0B1B2D] font-serif gold-gradient-text">DMC Supplier</div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">Create, Configure & Sell</div>
                </div>
                <div className="p-6 text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-[#0B1B2D] font-serif gold-gradient-text">Travel Agent</div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">Discover, Personalize & Buy</div>
                </div>
                <div className="p-6 text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-[#0B1B2D] font-serif gold-gradient-text">Configure & Buy</div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">Customize Your Way</div>
                </div>
                <div className="p-6 text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-[#0B1B2D] font-serif gold-gradient-text">Intelligent</div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">Visa & Market Matching</div>
                </div>
              </div>

            </div>
          </section>

          {/* Section 1: What is DMCXchange? (#about) */}
          <section id="about" className="py-16 lg:py-24 bg-white border-t border-b border-slate-200">
            <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                <div className="lg:col-span-7 space-y-5">
                  <p className="text-xs font-bold tracking-widest uppercase text-[#9E782F]">Overview</p>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1B2D] leading-snug font-serif">
                    What is DMCXchange?
                  </h2>
                  
                  <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#C5A059]/30 text-base font-semibold text-[#0B1B2D] leading-relaxed">
                    DMCXchange is an intelligent global B2B marketplace connecting Destination Management Companies (DMCs) with Travel Agents, enabling them to create, discover, customize, and sell destination experiences through one connected platform.
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    DMCXchange is built around a simple idea: <strong className="text-[#0B1B2D]">the right destination product should reach the right traveller, through the right Travel Agent, at the right time.</strong>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                      <Building2 className="w-6 h-6 text-[#9E782F] mb-2" />
                      <h4 className="font-bold text-[#0B1B2D] font-serif text-sm mb-1">DMCs Bring</h4>
                      <p className="text-[11px] text-slate-600 leading-tight">Destination expertise, products & inventory.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                      <Users className="w-6 h-6 text-[#9E782F] mb-2" />
                      <h4 className="font-bold text-[#0B1B2D] font-serif text-sm mb-1">Travel Agents Bring</h4>
                      <p className="text-[11px] text-slate-600 leading-tight">The traveller & customer requirement.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#0B1B2D] text-white border border-[#C5A059]/40">
                      <Cpu className="w-6 h-6 text-[#C5A059] mb-2" />
                      <h4 className="font-bold text-[#C5A059] font-serif text-sm mb-1">DMCXchange Brings</h4>
                      <p className="text-[11px] text-slate-300 leading-tight">The technology that connects the two.</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-5">
                  {/* Vision Card */}
                  <div className="rounded-2xl p-6 sm:p-7 border border-[#C5A059]/40 bg-[#0B1B2D] text-white shadow-xl">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-1.5 h-5 rounded-full bg-[#C5A059]" />
                      <span className="text-xs font-bold tracking-widest uppercase text-[#C5A059]">Our Vision</span>
                    </div>
                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
                      To build the world's most intelligent B2B marketplace for destination travel — making it easier for every DMC to reach global Travel Agents and for every Travel Agent to create the right travel solution for every traveller.
                    </p>
                  </div>

                  {/* One Line Quote Card */}
                  <div className="rounded-2xl p-6 sm:p-7 border border-slate-200 bg-[#F8FAFC] luxury-card-shadow relative">
                    <Quote className="w-8 h-8 text-[#C5A059]/30 absolute top-5 right-5" />
                    <span className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2 block">In One Line</span>
                    <blockquote className="text-slate-700 text-sm leading-relaxed italic font-serif">
                      "DMCXchange connects DMCs and Travel Agents through an intelligent marketplace that matches travellers with the right destinations, products and experiences — and gives Travel Agents the flexibility to make them their own."
                    </blockquote>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Section 2: For DMCs — Create, Configure & Sell (#for-dmcs) */}
          <section id="for-dmcs" className="py-16 lg:py-24 bg-[#F8FAFC]">
            <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12">
              
              <div className="mb-12 text-center max-w-3xl mx-auto">
                <span className="inline-block text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-md border border-[#C5A059]/50 text-[#9E782F] bg-[#C5A059]/10 mb-3">
                  For Destination Management Companies
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1B2D] font-serif">
                  For DMCs — <span className="gold-gradient-text">Create, Configure & Sell</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                
                {/* Left Deep Dive Text */}
                <div className="lg:col-span-6 rounded-2xl p-6 sm:p-8 border border-[#C5A059]/40 bg-[#0B1B2D] text-white flex flex-col justify-between shadow-xl">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-serif mb-4 leading-snug">
                      Transform your local destination knowledge into structured, bookable products.
                    </h3>
                    <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                      DMCs can use DMCXchange to create and publish multiple destination packages and products, combining everything a traveller may need in one place.
                    </p>

                    <div className="space-y-5">
                      <div className="flex gap-3.5">
                        <div className="w-8 h-8 rounded-lg bg-[#C5A059]/20 flex items-center justify-center shrink-0 text-[#C5A059]">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white font-serif mb-0.5">Complete Component Publishing</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Combine hotels, room types, transfers, activities, sightseeing, restaurants, meals, services, and day-wise itineraries in structured packages.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3.5">
                        <div className="w-8 h-8 rounded-lg bg-[#C5A059]/20 flex items-center justify-center shrink-0 text-[#C5A059]">
                          <Globe className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white font-serif mb-0.5">Nationality & Market-Specific Options</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Define options based on traveller nationality. A hotel, room category, or activity that works well for Indian travellers may not be the best option for Arab, UK, or European nationalities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-700">
                    <Link
                      href="/auth/register/dmc"
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#C5A059] hover:text-[#E5C158] transition-all"
                    >
                      <span>Create Your DMC Storefront</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Components Grid */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Hotel, title: "Hotels & Room Types", desc: "Define exact hotel categories, room types, and family bedding configurations." },
                    { icon: Car, title: "Transfers & Transport", desc: "Private cars, coaches, airport transfers, and intercity transit options." },
                    { icon: Camera, title: "Activities & Sightseeing", desc: "Excursions, city tours, adventure, and local cultural experiences." },
                    { icon: Utensils, title: "Restaurants & Meals", desc: "Dietary options including Halal, Pure Veg, Jain, and international menus." },
                    { icon: FileText, title: "Services & Visas", desc: "Travel documentation, visa assistance, guides, and ground support." },
                    { icon: Calendar, title: "Day-wise Itineraries", desc: "Structured day-by-day itineraries tailored for specific market segments." }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200 luxury-card-shadow flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-lg bg-[#C5A059]/15 flex items-center justify-center mb-3 text-[#9E782F]">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-bold text-[#0B1B2D] font-serif mb-1.5">{item.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </section>

          {/* Section 3: For Travel Agents — Discover, Personalize & Buy (#for-agents) */}
          <section id="for-agents" className="py-16 lg:py-24 bg-white border-t border-slate-200">
            <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12">
              
              <div className="mb-12 text-center max-w-3xl mx-auto">
                <span className="inline-block text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-md border border-slate-200 text-slate-600 bg-slate-100 mb-3">
                  For Travel Agents & Buyers
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1B2D] font-serif">
                  For Travel Agents — <span className="gold-gradient-text">Discover, Personalize & Buy</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Left Content */}
                <div className="lg:col-span-6 space-y-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B1B2D] font-serif leading-snug">
                    Starts by understanding the traveller, not just searching for a destination.
                  </h3>
                  
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    DMCXchange gives Travel Agents access to destination products and packages created by DMCs across the world. The platform starts by capturing key traveller information:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: "Nationality", desc: "Personalizes options based on traveller origin." },
                      { title: "Country of Residence", desc: "Accounts for expat and regional travel rules." },
                      { title: "Travel Dates", desc: "Real-time seasonality and inventory check." },
                      { title: "Destination Preferences", desc: "Specific interests, dining, & trip requirements." }
                    ].map((item, index) => (
                      <div key={index} className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200">
                        <div className="flex items-center gap-2 text-[#9E782F] font-bold text-xs mb-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{item.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    DMCXchange uses this information to identify <strong>suitable destinations and travel options</strong>, taking visa availability and destination eligibility into consideration, rather than presenting generic inventory to every traveller.
                  </p>

                  <div>
                    <Link
                      href="/auth/register/agent"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border-2 border-[#C5A059] text-[#0B1B2D] hover:bg-[#C5A059]/10 transition-all"
                    >
                      <span>Join as a Travel Buyer</span>
                      <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                    </Link>
                  </div>
                </div>

                {/* Right Interactive Box: Traveller Search Engine Showcase */}
                <div className="lg:col-span-6">
                  <div className="rounded-2xl p-6 sm:p-7 bg-[#0B1B2D] text-white border border-[#C5A059]/40 shadow-xl space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                      <div className="flex items-center gap-2.5">
                        <Compass className="w-5 h-5 text-[#C5A059]" />
                        <span className="font-bold font-serif text-base">Traveller-First Discovery Engine</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#C5A059] bg-[#C5A059]/10 px-2.5 py-0.5 rounded-full border border-[#C5A059]/30">LIVE MATCHING</span>
                    </div>

                    <div className="space-y-3 text-xs font-mono">
                      <div className="p-3.5 rounded-xl bg-[#162B44] border border-slate-700 space-y-1.5">
                        <div className="text-slate-400 text-[11px]">INPUT: Traveller Profile</div>
                        <div className="text-white flex flex-wrap gap-1.5 text-[11px]">
                          <span className="bg-[#0B1B2D] px-2 py-0.5 rounded text-[#C5A059]">Nationality: Indian</span>
                          <span className="bg-[#0B1B2D] px-2 py-0.5 rounded text-[#C5A059]">Residence: UAE</span>
                          <span className="bg-[#0B1B2D] px-2 py-0.5 rounded text-[#C5A059]">Visa: Eligible</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#162B44] border border-slate-700 space-y-1.5">
                        <div className="text-slate-400 text-[11px]">INTELLIGENT MATCHING</div>
                        <div className="text-emerald-400 font-bold text-[11px]">
                          ✓ Filtered: Hotels with Pure Veg Breakfast
                        </div>
                        <div className="text-emerald-400 font-bold text-[11px]">
                          ✓ Filtered: 48-Hour Instant Rate Holds
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Section 4: Customize the Package — Your Way (#customize) */}
          <section id="customize" className="py-16 lg:py-24 bg-[#F8FAFC] border-t border-b border-slate-200">
            <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12">
              
              <div className="mb-12 text-center max-w-3xl mx-auto">
                <span className="inline-block text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-md border border-[#C5A059]/40 text-[#9E782F] bg-[#C5A059]/10 mb-3">
                  Configure & Buy Model
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1B2D] font-serif">
                  Customize the Package — <span className="gold-gradient-text">Your Way</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed">
                  DMCXchange is not simply a marketplace where Travel Agents select a fixed package and buy it. DMCs create the building blocks, while Travel Agents configure based on customer requirements.
                </p>
              </div>

              {/* 8 Customization Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {[
                  { title: "Change the Hotel", desc: "Swap hotels based on client budget, location preference, or brand loyalty." },
                  { title: "Select Room Type", desc: "Choose suite, connecting rooms, executive floor, or ocean view options." },
                  { title: "Change Transfer Type", desc: "Switch between private sedan, luxury SUV, shared shuttle, or coach." },
                  { title: "Add or Remove Activities", desc: "Tailor activities to match family, adventure, relaxation, or business schedules." },
                  { title: "Modify Sightseeing", desc: "Adjust half-day vs full-day sightseeing and private guided options." },
                  { title: "Change Day-wise Itineraries", desc: "Reorder days, add free leisure days, or extend stay durations." },
                  { title: "Add Available Services", desc: "Include travel insurance, local SIMs, meal vouchers, and VIP lounge access." },
                  { title: "Build Suitable Packages", desc: "Create a fully personalized itinerary perfectly matched to the customer." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200 luxury-card-shadow flex flex-col justify-between hover:border-[#C5A059] transition-all">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-[#0B1B2D] text-[#C5A059] font-bold text-xs flex items-center justify-center mb-3 font-mono">
                        0{idx + 1}
                      </div>
                      <h4 className="text-base font-bold text-[#0B1B2D] font-serif mb-1.5">{item.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Configure-and-buy Summary Banner */}
              <div className="rounded-2xl p-6 sm:p-8 bg-[#0B1B2D] text-white border border-[#C5A059]/40 flex flex-col md:flex-row justify-between items-center gap-5 shadow-xl">
                <div>
                  <h3 className="text-xl font-bold font-serif text-white mb-1.5">Powerful Configure-and-Buy Model</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    DMC expertise and inventory are combined with the Travel Agent's understanding of customer needs to deliver the ideal travel solution.
                  </p>
                </div>
                <Link
                  href="/auth/register/agent"
                  className="shrink-0 px-6 py-3 rounded-xl text-sm font-bold bg-[#C5A059] text-[#0B1B2D] hover:bg-[#D4AF37] shadow-md transition-all"
                >
                  Start Customizing Packages
                </Link>
              </div>

            </div>
          </section>

          {/* Section 5: An Intelligent Marketplace, Not Just a Booking Platform (#intelligent-marketplace) */}
          <section id="intelligent-marketplace" className="py-16 lg:py-24 bg-white border-t border-b border-slate-200">
            <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-6 space-y-6">
                  <span className="inline-block text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-md border border-[#C5A059]/40 text-[#9E782F] bg-[#C5A059]/10">
                    Platform Intelligence
                  </span>
                  
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1B2D] font-serif leading-snug">
                    An Intelligent Marketplace, <br />
                    <span className="gold-gradient-text">Not Just a Booking Platform</span>
                  </h2>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    The real value of DMCXchange lies in the intelligence connecting the two sides of the marketplace.
                  </p>

                  <div className="p-5 rounded-xl bg-[#0B1B2D] text-white border-l-4 border-[#C5A059]">
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      "The platform is designed to consider factors such as traveller nationality, country of residence, visa feasibility, travel dates, destination suitability and nationality-specific product preferences to make the discovery and booking process more relevant."
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-[#0B1B2D] uppercase tracking-wider">
                    This means the same destination search does not necessarily need to produce the same result for every traveller.
                  </p>
                </div>

                {/* Right Intelligent Factors Matrix */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Traveller Nationality", desc: "Filters products designed specifically for your customer's passport requirements." },
                    { title: "Country of Residence", desc: "Matches regional travel guidelines and transit visa eligibility." },
                    { title: "Visa Feasibility", desc: "Verifies visa availability before recommending destinations." },
                    { title: "Travel Dates", desc: "Evaluates seasonal availability, weather suitability, and local festival schedules." },
                    { title: "Destination Suitability", desc: "Recommends locations based on family, leisure, or corporate requirements." },
                    { title: "Market Preferences", desc: "Prioritizes dietary, room, and language preferences preferred by target markets." }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-[#F8FAFC] p-5 rounded-xl border border-slate-200 luxury-card-shadow">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#C5A059] mb-2.5" />
                      <h4 className="font-bold text-[#0B1B2D] font-serif text-base mb-1.5">{item.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </section>

          {/* Section 6: One Marketplace. Two Powerful Sides. (#how-it-works) */}
          <section id="how-it-works" className="py-16 lg:py-24 bg-[#F8FAFC]">
            <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12">
              
              <div className="mb-12 text-center max-w-3xl mx-auto">
                <span className="inline-block text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-md border border-[#C5A059]/40 text-[#9E782F] bg-[#C5A059]/10 mb-3">
                  Workflow Architecture
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1B2D] font-serif">
                  One Marketplace. <span className="gold-gradient-text">Two Powerful Sides.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                
                {/* For DMCs Workflow */}
                <div className="bg-[#0B1B2D] text-white p-6 sm:p-9 rounded-2xl border border-[#C5A059]/40 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="mb-6">
                      <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded border border-[#C5A059]/50 text-[#C5A059] bg-[#C5A059]/10">
                        For DMCs
                      </span>
                    </div>

                    {/* Step Flow Banner */}
                    <div className="text-[11px] font-mono text-[#C5A059] mb-6 pb-3 border-b border-slate-700">
                      Create → Configure → Publish → Reach → Sell → Grow
                    </div>

                    <div className="space-y-5">
                      <div className="flex gap-3">
                        <span className="text-xl font-serif font-bold text-[#C5A059] w-6">1.</span>
                        <div>
                          <h4 className="font-bold text-white font-serif text-base">Create & Configure</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">Build product packages with hotels, transfers, sightseeing, and services.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-xl font-serif font-bold text-[#C5A059] w-6">2.</span>
                        <div>
                          <h4 className="font-bold text-white font-serif text-base">Publish & Reach</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">Distribute to Travel Agents globally categorized by nationality preferences.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-xl font-serif font-bold text-[#C5A059] w-6">3.</span>
                        <div>
                          <h4 className="font-bold text-white font-serif text-base">Sell & Grow</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">Receive structured enquiries, issue quotes, and expand your market reach.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-700">
                    <Link
                      href="/auth/register/dmc"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#C5A059] text-[#0B1B2D] hover:bg-[#D4AF37] transition-all"
                    >
                      <span>Join as a DMC Supplier</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* For Travel Agents Workflow */}
                <div className="bg-white p-6 sm:p-9 rounded-2xl border border-slate-200 luxury-card-shadow flex flex-col justify-between">
                  <div>
                    <div className="mb-6">
                      <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded border border-slate-200 text-slate-600 bg-slate-100">
                        For Travel Agents
                      </span>
                    </div>

                    {/* Step Flow Banner */}
                    <div className="text-[11px] font-mono text-[#0B1B2D] mb-6 pb-3 border-b border-slate-200 font-semibold">
                      Discover → Compare → Customize → Quote → Buy → Serve
                    </div>

                    <div className="space-y-5">
                      <div className="flex gap-3">
                        <span className="text-xl font-serif font-bold text-slate-400 w-6">1.</span>
                        <div>
                          <h4 className="font-bold text-[#0B1B2D] font-serif text-base">Discover & Compare</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">Search packages personalized to your customer's nationality and dates.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-xl font-serif font-bold text-slate-400 w-6">2.</span>
                        <div>
                          <h4 className="font-bold text-[#0B1B2D] font-serif text-base">Customize & Quote</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">Adjust hotels, room types, activities, and transfers to fit customer needs.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-xl font-serif font-bold text-slate-400 w-6">3.</span>
                        <div>
                          <h4 className="font-bold text-[#0B1B2D] font-serif text-base">Buy & Serve</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">Lock in 48-hour holds, confirm bookings, and deliver exceptional trips.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-200">
                    <Link
                      href="/auth/register/agent"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold border-2 border-[#C5A059] text-[#0B1B2D] hover:bg-[#C5A059]/10 transition-all"
                    >
                      <span>Join as a Travel Buyer</span>
                      <ChevronRight className="w-4 h-4 text-[#C5A059]" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Section 7: Final Banner / Vision & Summary Quote */}
          <section className="py-16 lg:py-24 bg-[#0B1B2D] text-white relative overflow-hidden">
            <div className="relative z-10 w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12 text-center max-w-3xl">
              
              <div className="w-16 h-1 rounded bg-[#C5A059] mx-auto mb-6" />
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif leading-tight mb-6">
                DMCXchange — The Global Marketplace <br />
                <span className="gold-gradient-text">for Destination Travel</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
                Together, DMCs and Travel Agents create a connected marketplace where destination suppliers and travel sellers can do business more efficiently.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/auth/register/dmc"
                  className="px-7 py-3.5 rounded-xl font-bold text-sm bg-[#C5A059] text-[#0B1B2D] hover:bg-[#D4AF37] shadow-lg transition-all"
                >
                  Join as a DMC Supplier
                </Link>
                <Link
                  href="/auth/register/agent"
                  className="px-7 py-3.5 rounded-xl font-bold text-sm border-2 border-slate-400 text-white hover:border-[#C5A059] hover:text-[#C5A059] transition-all"
                >
                  Join as a Travel Agent
                </Link>
              </div>

            </div>
          </section>

        </main>
      </div>

      {/* Frozen Footer */}
      <footer className="bg-[#061121] border-t border-[#C5A059]/20 py-16 text-slate-400 text-xs">
        <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-4">
                <Logo size="md" darkNav={true} />
              </Link>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                An intelligent global B2B marketplace connecting Destination Management Companies with Travel Agents.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-4">For DMCs</h4>
              <ul className="space-y-2.5 text-xs">
                <li><Link href="/auth/register/dmc" className="hover:text-white transition-colors">Join as DMC</Link></li>
                <li><a href="#for-dmcs" className="hover:text-white transition-colors">Create & Sell</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">DMC Workflow</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-4">For Travel Agents</h4>
              <ul className="space-y-2.5 text-xs">
                <li><Link href="/auth/register/agent" className="hover:text-white transition-colors">Join as Travel Agent</Link></li>
                <li><a href="#for-agents" className="hover:text-white transition-colors">Discover & Buy</a></li>
                <li><a href="#customize" className="hover:text-white transition-colors">Customize Packages</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-4">Platform</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#about" className="hover:text-white transition-colors">What is DMCXchange</a></li>
                <li><a href="#intelligent-marketplace" className="hover:text-white transition-colors">Intelligent Engine</a></li>
                <li><Link href="/auth/login" className="hover:text-white transition-colors">Sign In Portal</Link></li>
              </ul>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px]">
            <p>© 2026 DMCXchange. The Global Marketplace for Destination Travel. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-[#C5A059] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#C5A059] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#C5A059] transition-colors">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
