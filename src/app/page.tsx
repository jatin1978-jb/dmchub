'use client';

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  Building2,
  Sparkles,
  Menu,
  X,
  Sliders,
  Compass,
  Layers,
  Utensils,
  Calendar,
  Cpu,
  Quote,
  User,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero Login Card State
  const [loginRole, setLoginRole] = useState<'DMC' | 'AGENT'>('DMC');
  const [email, setEmail] = useState('dmc@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Handle Role Tab Switch
  const handleRoleSwitch = (role: 'DMC' | 'AGENT') => {
    setLoginRole(role);
    setLoginError('');
    if (role === 'DMC') {
      setEmail('dmc@example.com');
      setPassword('password123');
    } else {
      setEmail('agent@example.com');
      setPassword('password123');
    }
  };

  // Handle Direct Login Submission
  const handleHeroLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setLoginError('Invalid email or password');
        setLoginLoading(false);
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setLoginError('An unexpected error occurred');
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#C5A059]/20 selection:text-[#0B1B2D] overflow-x-hidden">
      
      {/* Top Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[#C5A059]/25 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between min-h-[75px] lg:min-h-[85px] py-1.5 sm:py-2">
            
            {/* Perfectly Proportioned Logo */}
            <Link href="/" className="flex items-center shrink-0 py-1">
              <Logo size="lg" />
            </Link>

            {/* Top Right Navigation - ONLY 4 CLEAN LINKS */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-8 xl:gap-10 ml-auto">
              <a href="#about" className="text-sm font-semibold text-[#0B1B2D] hover:text-[#C5A059] transition-colors">
                What is DMCXchange
              </a>
              <a href="#how-it-works" className="text-sm font-semibold text-[#0B1B2D] hover:text-[#C5A059] transition-colors">
                How it works
              </a>
              <a href="#about" className="text-sm font-semibold text-[#0B1B2D] hover:text-[#C5A059] transition-colors">
                About us
              </a>
              <a href="#contact" className="text-sm font-semibold text-[#0B1B2D] hover:text-[#C5A059] transition-colors">
                Contact us
              </a>
            </nav>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-[#0B1B2D] hover:bg-slate-100 transition-colors ml-auto"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#C5A059]/30 px-6 py-4 space-y-2.5 shadow-xl animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col gap-2.5 text-sm font-semibold text-[#0B1B2D]">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1 border-b border-slate-100">What is DMCXchange</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1 border-b border-slate-100">How it works</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1 border-b border-slate-100">About us</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1 border-b border-slate-100">Contact us</a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <div className="pt-20 sm:pt-22 lg:pt-24">
        <main>
          
          {/* Hero Section */}
          <section className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-white py-8 sm:py-10 lg:py-12" aria-label="Hero">
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
            <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.12),transparent_65%)]" />
            <div className="absolute left-0 top-1/4 bottom-1/4 w-1.5 rounded-r bg-gradient-to-b from-transparent via-[#C5A059] to-transparent" />

            <div className="relative z-10 w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                {/* Left Column: Hero Value Proposition */}
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 text-[#9E782F] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    Intelligent Global B2B Marketplace
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.12] tracking-tight text-[#0B1B2D] mb-4 font-serif">
                    Connecting DMCs & Travel Agents. <br />
                    <span className="gold-gradient-text">Create. Discover. Customize. Sell.</span>
                  </h1>

                  <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed mb-5 font-normal">
                    DMCXchange is an intelligent global B2B marketplace connecting Destination Management Companies (DMCs) with Travel Agents, enabling them to create, discover, customize, and sell destination experiences through one connected platform.
                  </p>

                  {/* Core Idea Banner */}
                  <div className="p-4 sm:p-4.5 rounded-xl bg-[#0B1B2D] text-white border-l-4 border-[#C5A059] shadow-md mb-6 max-w-2xl">
                    <div className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold mb-0.5">Our Core Idea</div>
                    <p className="text-xs sm:text-sm font-serif italic text-slate-100 leading-snug">
                      "The right destination product should reach the right traveller, through the right Travel Agent, at the right time."
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-2">
                    <Link
                      href="/auth/register/dmc"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#0B1B2D] text-white hover:bg-[#162B44] shadow-md shadow-[#0B1B2D]/15 transition-all duration-200"
                    >
                      <span>Register as a DMC</span>
                      <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                    </Link>
                    <Link
                      href="/auth/register/agent"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm border-2 border-[#C5A059] text-[#0B1B2D] hover:bg-[#C5A059]/10 transition-all duration-200"
                    >
                      <span>Register as a Travel Agent</span>
                      <ChevronRight className="w-4 h-4 text-[#C5A059]" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: LIVE LOGIN CARD */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl p-5 sm:p-6 bg-[#0B1B2D] text-white border-2 border-[#C5A059]/50 shadow-xl overflow-hidden">
                    <div className="absolute -right-16 -top-16 w-36 h-36 bg-[#C5A059]/20 rounded-full blur-3xl" />
                    
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold font-serif text-white mb-0.5">Login to your account</h3>
                      <p className="text-[11px] text-slate-300">Select your account type and enter credentials</p>
                    </div>

                    {/* Role Selector Tabs */}
                    <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#162B44] rounded-lg border border-slate-700 mb-4">
                      <button
                        type="button"
                        onClick={() => handleRoleSwitch('DMC')}
                        className={`flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-bold transition-all ${
                          loginRole === 'DMC'
                            ? 'bg-[#C5A059] text-[#0B1B2D] shadow-sm'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>DMC Supplier</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRoleSwitch('AGENT')}
                        className={`flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-bold transition-all ${
                          loginRole === 'AGENT'
                            ? 'bg-[#C5A059] text-[#0B1B2D] shadow-sm'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Travel Agent</span>
                      </button>
                    </div>

                    {/* Error Alert */}
                    {loginError && (
                      <div className="mb-3 p-2.5 bg-red-950/80 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-300 text-xs animate-in fade-in">
                        <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span>{loginError}</span>
                      </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleHeroLogin} className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-200 block">Email / Username</label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            placeholder="Email / Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-[#162B44] border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#C5A059] transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-semibold text-slate-200 block">Password</label>
                          <a href="#" className="text-[11px] text-[#C5A059] hover:underline font-medium">Forgot Password?</a>
                        </div>
                        <div className="relative">
                          <KeyRound className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-[#162B44] border border-slate-700 rounded-lg pl-9 pr-9 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#C5A059] transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                          >
                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loginLoading}
                        className="w-full bg-[#C5A059] text-[#0B1B2D] font-bold text-xs hover:bg-[#D4AF37] shadow-md py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 mt-1"
                      >
                        {loginLoading ? 'Logging in...' : 'Login →'}
                      </button>
                    </form>

                    {/* Footer Registration Link */}
                    <div className="mt-4 pt-3.5 border-t border-slate-800 text-center text-[11px] text-slate-300">
                      <span>Don't have an account? </span>
                      <Link href={loginRole === 'DMC' ? '/auth/register/dmc' : '/auth/register/agent'} className="text-[#C5A059] font-bold hover:underline">
                        Register with us
                      </Link>
                    </div>

                  </div>
                </div>

              </div>

              {/* High-level Summary Metrics Bar */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 rounded-xl border border-[#C5A059]/30 bg-white/95 shadow-md divide-x divide-slate-100">
                <div className="p-4 text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-[#0B1B2D] font-serif gold-gradient-text">DMC Supplier</div>
                  <div className="text-[11px] font-semibold text-slate-500 mt-0.5">Create, Configure & Sell</div>
                </div>
                <div className="p-4 text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-[#0B1B2D] font-serif gold-gradient-text">Travel Agent</div>
                  <div className="text-[11px] font-semibold text-slate-500 mt-0.5">Discover, Personalize & Buy</div>
                </div>
                <div className="p-4 text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-[#0B1B2D] font-serif gold-gradient-text">Configure & Buy</div>
                  <div className="text-[11px] font-semibold text-slate-500 mt-0.5">Customize Your Way</div>
                </div>
                <div className="p-4 text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-[#0B1B2D] font-serif gold-gradient-text">Intelligent</div>
                  <div className="text-[11px] font-semibold text-slate-500 mt-0.5">Visa & Market Matching</div>
                </div>
              </div>

            </div>
          </section>

          {/* Section 1: What is DMCXchange? (#about) - Clean Redesigned Layout */}
          <section id="about" className="py-10 sm:py-12 lg:py-16 bg-white border-t border-b border-slate-200">
            <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                
                {/* Left Column: Clean Editorial Copy & 3 Pillars (No Boxes) */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="text-[11px] font-bold tracking-widest uppercase text-[#9E782F] block mb-1.5">Overview</span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1B2D] leading-tight font-serif">
                      What is DMCXchange?
                    </h2>
                  </div>

                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                    DMCXchange is an intelligent global B2B marketplace connecting Destination Management Companies (DMCs) with Travel Agents, enabling them to create, discover, customize, and sell destination experiences through one connected platform.
                  </p>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    DMCXchange is built around a simple idea: <strong className="text-[#0B1B2D]">the right destination product should reach the right traveller, through the right Travel Agent, at the right time.</strong>
                  </p>

                  {/* 3-Pillar Clean Flow (Line Divided - Zero Cards) */}
                  <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="border-l-2 border-[#C5A059] pl-3.5 space-y-1">
                      <div className="text-xs font-bold text-[#0B1B2D] uppercase tracking-wider flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#9E782F]" />
                        <span>DMCs Bring</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">Destination expertise, products & inventory.</p>
                    </div>

                    <div className="border-l-2 border-slate-400 pl-3.5 space-y-1">
                      <div className="text-xs font-bold text-[#0B1B2D] uppercase tracking-wider flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#9E782F]" />
                        <span>Agents Bring</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">The traveller & customer requirement.</p>
                    </div>

                    <div className="border-l-2 border-[#C5A059] pl-3.5 space-y-1">
                      <div className="text-xs font-bold text-[#0B1B2D] uppercase tracking-wider flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-[#9E782F]" />
                        <span>Platform Brings</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">Technology connecting demand & supply.</p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Single Unified Executive Card */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl p-7 sm:p-8 bg-[#0B1B2D] text-white border-2 border-[#C5A059]/40 shadow-xl space-y-6 relative overflow-hidden">
                    <div className="absolute -right-16 -bottom-16 w-40 h-40 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />

                    {/* Our Vision */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-4 rounded-full bg-[#C5A059]" />
                        <span className="text-[11px] font-bold tracking-widest uppercase text-[#C5A059]">Our Vision</span>
                      </div>
                      <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                        To build the world's most intelligent B2B marketplace for destination travel — making it easier for every DMC to reach global Travel Agents and for every Travel Agent to create the right travel solution for every traveller.
                      </p>
                    </div>

                    <div className="w-full h-px bg-slate-800" />

                    {/* Summary Quote */}
                    <div className="relative">
                      <Quote className="w-7 h-7 text-[#C5A059]/25 absolute -top-1 right-0" />
                      <span className="text-[11px] font-bold tracking-widest uppercase text-[#C5A059] mb-1.5 block">DMCXchange In Summary</span>
                      <blockquote className="text-slate-300 text-xs sm:text-sm leading-relaxed italic font-serif">
                        "DMCXchange connects DMCs and Travel Agents through an intelligent marketplace that matches travellers with the right destinations, products and experiences — and gives Travel Agents the flexibility to make them their own."
                      </blockquote>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Section 2: For DMCs — Create, Configure & Sell (#for-dmcs) */}
          <section id="for-dmcs" className="py-8 sm:py-10 lg:py-12 bg-[#F8FAFC]">
            <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12">
              
              <div className="mb-6 text-center max-w-3xl mx-auto">
                <span className="inline-block text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-md border border-[#C5A059]/50 text-[#9E782F] bg-[#C5A059]/10 mb-2">
                  For Destination Management Companies
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0B1B2D] font-serif">
                  For DMCs — <span className="gold-gradient-text">Create, Configure & Sell</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Left Deep Dive Text */}
                <div className="lg:col-span-6 rounded-xl p-5 sm:p-7 border border-[#C5A059]/40 bg-[#0B1B2D] text-white flex flex-col justify-between shadow-lg">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-serif mb-3 leading-snug">
                      Transform your local destination knowledge into structured, bookable products.
                    </h3>
                    <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                      DMCs can use DMCXchange to create and publish multiple destination packages and products, combining everything a traveller may need in one place.
                    </p>

                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-7 h-7 rounded-lg bg-[#C5A059]/20 flex items-center justify-center shrink-0 text-[#C5A059]">
                          <Layers className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-white font-serif mb-0.5">Complete Component Publishing</h4>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            Combine hotels, room types, transfers, activities, sightseeing, restaurants, meals, services, and day-wise itineraries in structured packages.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-7 h-7 rounded-lg bg-[#C5A059]/20 flex items-center justify-center shrink-0 text-[#C5A059]">
                          <Globe className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-white font-serif mb-0.5">Nationality & Market-Specific Options</h4>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            Define options based on traveller nationality. A hotel, room category, or activity that works well for Indian travellers may not be the best option for Arab, UK, or European nationalities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-700">
                    <Link
                      href="/auth/register/dmc"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C5A059] hover:text-[#E5C158] transition-all"
                    >
                      <span>Create Your DMC Storefront</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Components Grid */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    { icon: Hotel, title: "Hotels & Room Types", desc: "Define exact hotel categories, room types, and family bedding configurations." },
                    { icon: Car, title: "Transfers & Transport", desc: "Private cars, coaches, airport transfers, and intercity transit options." },
                    { icon: Camera, title: "Activities & Sightseeing", desc: "Excursions, city tours, adventure, and local cultural experiences." },
                    { icon: Utensils, title: "Restaurants & Meals", desc: "Dietary options including Halal, Pure Veg, Jain, and international menus." },
                    { icon: FileText, title: "Services & Visas", desc: "Travel documentation, visa assistance, guides, and ground support." },
                    { icon: Calendar, title: "Day-wise Itineraries", desc: "Structured day-by-day itineraries tailored for specific market segments." }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-4 border border-slate-200 luxury-card-shadow flex flex-col justify-between">
                      <div>
                        <div className="w-8 h-8 rounded-lg bg-[#C5A059]/15 flex items-center justify-center mb-2.5 text-[#9E782F]">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-bold text-[#0B1B2D] font-serif mb-1">{item.title}</h4>
                        <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </section>

          {/* Section 6: One Marketplace. Two Powerful Sides. (#how-it-works) */}
          <section id="how-it-works" className="py-8 sm:py-10 lg:py-12 bg-white border-t border-slate-200">
            <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12">
              
              <div className="mb-6 text-center max-w-3xl mx-auto">
                <span className="inline-block text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-md border border-[#C5A059]/40 text-[#9E782F] bg-[#C5A059]/10 mb-2">
                  Workflow Architecture
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0B1B2D] font-serif">
                  One Marketplace. <span className="gold-gradient-text">Two Powerful Sides.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* For DMCs Workflow */}
                <div className="bg-[#0B1B2D] text-white p-5 sm:p-7 rounded-xl border border-[#C5A059]/40 shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="mb-4">
                      <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded border border-[#C5A059]/50 text-[#C5A059] bg-[#C5A059]/10">
                        For DMCs
                      </span>
                    </div>

                    {/* Step Flow Banner */}
                    <div className="text-[10px] font-mono text-[#C5A059] mb-4 pb-2.5 border-b border-slate-700">
                      Create → Configure → Publish → Reach → Sell → Grow
                    </div>

                    <div className="space-y-3.5">
                      <div className="flex gap-2.5">
                        <span className="text-lg font-serif font-bold text-[#C5A059] w-5">1.</span>
                        <div>
                          <h4 className="font-bold text-white font-serif text-xs">Create & Configure</h4>
                          <p className="text-[11px] text-slate-300 leading-relaxed">Build product packages with hotels, transfers, sightseeing, and services.</p>
                        </div>
                      </div>
                      <div className="flex gap-2.5">
                        <span className="text-lg font-serif font-bold text-[#C5A059] w-5">2.</span>
                        <div>
                          <h4 className="font-bold text-white font-serif text-xs">Publish & Reach</h4>
                          <p className="text-[11px] text-slate-300 leading-relaxed">Distribute to Travel Agents globally categorized by nationality preferences.</p>
                        </div>
                      </div>
                      <div className="flex gap-2.5">
                        <span className="text-lg font-serif font-bold text-[#C5A059] w-5">3.</span>
                        <div>
                          <h4 className="font-bold text-white font-serif text-xs">Sell & Grow</h4>
                          <p className="text-[11px] text-slate-300 leading-relaxed">Receive structured enquiries, issue quotes, and expand your market reach.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-700">
                    <Link
                      href="/auth/register/dmc"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold bg-[#C5A059] text-[#0B1B2D] hover:bg-[#D4AF37] transition-all"
                    >
                      <span>Join as a DMC Supplier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* For Travel Agents Workflow */}
                <div className="bg-[#F8FAFC] p-5 sm:p-7 rounded-xl border border-slate-200 luxury-card-shadow flex flex-col justify-between">
                  <div>
                    <div className="mb-4">
                      <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded border border-slate-200 text-slate-600 bg-slate-200">
                        For Travel Agents
                      </span>
                    </div>

                    {/* Step Flow Banner */}
                    <div className="text-[10px] font-mono text-[#0B1B2D] mb-4 pb-2.5 border-b border-slate-200 font-semibold">
                      Discover → Compare → Customize → Quote → Buy → Serve
                    </div>

                    <div className="space-y-3.5">
                      <div className="flex gap-2.5">
                        <span className="text-lg font-serif font-bold text-slate-400 w-5">1.</span>
                        <div>
                          <h4 className="font-bold text-[#0B1B2D] font-serif text-xs">Discover & Compare</h4>
                          <p className="text-[11px] text-slate-600 leading-relaxed">Search packages personalized to your customer's nationality and dates.</p>
                        </div>
                      </div>
                      <div className="flex gap-2.5">
                        <span className="text-lg font-serif font-bold text-slate-400 w-5">2.</span>
                        <div>
                          <h4 className="font-bold text-[#0B1B2D] font-serif text-xs">Customize & Quote</h4>
                          <p className="text-[11px] text-slate-600 leading-relaxed">Adjust hotels, room types, activities, and transfers to fit customer needs.</p>
                        </div>
                      </div>
                      <div className="flex gap-2.5">
                        <span className="text-lg font-serif font-bold text-slate-400 w-5">3.</span>
                        <div>
                          <h4 className="font-bold text-[#0B1B2D] font-serif text-xs">Buy & Serve</h4>
                          <p className="text-[11px] text-slate-600 leading-relaxed">Lock in 48-hour holds, confirm bookings, and deliver exceptional trips.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-200">
                    <Link
                      href="/auth/register/agent"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold border-2 border-[#C5A059] text-[#0B1B2D] hover:bg-[#C5A059]/10 transition-all"
                    >
                      <span>Join as a Travel Buyer</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Our Leadership Team Section (#team) */}
          <section id="team" className="py-8 sm:py-10 lg:py-12 bg-white border-t border-b border-slate-200">
            <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12">
              <div className="mb-8 text-center max-w-2xl mx-auto">
                <span className="inline-block text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-md border border-[#C5A059]/40 text-[#9E782F] bg-[#C5A059]/10 mb-2">
                  Leadership & Vision
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0B1B2D] font-serif">
                  Meet Our <span className="gold-gradient-text">Founding Leadership</span>
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  The visionary co-founders building the world's most intelligent B2B marketplace for destination travel.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* Jatin Bhai */}
                <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200 luxury-card-shadow hover:border-[#C5A059] transition-all text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0B1B2D] to-[#162B44] border-2 border-[#C5A059] flex items-center justify-center text-white font-serif font-bold text-xl mb-4 shadow-md">
                    JB
                  </div>
                  <h3 className="text-lg font-bold font-serif text-[#0B1B2D] mb-1">Jatin Bhai</h3>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#9E782F] bg-[#C5A059]/15 px-3 py-1 rounded-full border border-[#C5A059]/30 mb-3 inline-block">
                    Co-Founder & CEO
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Driving corporate vision, strategic growth, and global partnerships across the DMC and travel agent ecosystem.
                  </p>
                </div>

                {/* Amit Gupta */}
                <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200 luxury-card-shadow hover:border-[#C5A059] transition-all text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0B1B2D] to-[#162B44] border-2 border-[#C5A059] flex items-center justify-center text-white font-serif font-bold text-xl mb-4 shadow-md">
                    AG
                  </div>
                  <h3 className="text-lg font-bold font-serif text-[#0B1B2D] mb-1">Amit Gupta</h3>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#9E782F] bg-[#C5A059]/15 px-3 py-1 rounded-full border border-[#C5A059]/30 mb-3 inline-block">
                    Co-Founder & CGO
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Leading commercial expansion, supplier onboarding, and global travel buyer network acquisition.
                  </p>
                </div>

                {/* M S Shastry */}
                <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200 luxury-card-shadow hover:border-[#C5A059] transition-all text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0B1B2D] to-[#162B44] border-2 border-[#C5A059] flex items-center justify-center text-white font-serif font-bold text-xl mb-4 shadow-md">
                    MS
                  </div>
                  <h3 className="text-lg font-bold font-serif text-[#0B1B2D] mb-1">M S Shastry</h3>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#9E782F] bg-[#C5A059]/15 px-3 py-1 rounded-full border border-[#C5A059]/30 mb-3 inline-block">
                    Co-Founder & CTO
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Architecting the intelligent marketplace engine, algorithmic matching, and enterprise platform technology.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Us Section (#contact) */}
          <section id="contact" className="py-8 sm:py-10 lg:py-12 bg-[#F8FAFC] border-t border-b border-slate-200">
            <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12">
              <div className="mb-6 text-center max-w-2xl mx-auto">
                <span className="inline-block text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-md border border-[#C5A059]/40 text-[#9E782F] bg-[#C5A059]/10 mb-2">
                  Get In Touch
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0B1B2D] font-serif">
                  Contact <span className="gold-gradient-text">DMCXchange Team</span>
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Have questions about listing as a DMC or joining as a Travel Agent? Reach out to our global team.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <div className="bg-white p-4.5 rounded-xl border border-slate-200 luxury-card-shadow flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0B1B2D] text-[#C5A059] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B1B2D] font-serif mb-0.5">Email Support</h4>
                    <p className="text-[11px] text-slate-600">support@dmcxchange.com</p>
                    <p className="text-[11px] text-slate-600">partnerships@dmcxchange.com</p>
                  </div>
                </div>

                <div className="bg-white p-4.5 rounded-xl border border-slate-200 luxury-card-shadow flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0B1B2D] text-[#C5A059] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B1B2D] font-serif mb-0.5">Global Desk</h4>
                    <p className="text-[11px] text-slate-600">+1 (800) 555-DMCX</p>
                    <p className="text-[11px] text-slate-600">24/7 B2B Marketplace Support</p>
                  </div>
                </div>

                <div className="bg-white p-4.5 rounded-xl border border-slate-200 luxury-card-shadow flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0B1B2D] text-[#C5A059] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B1B2D] font-serif mb-0.5">Headquarters</h4>
                    <p className="text-[11px] text-slate-600">DMCXchange Global Network</p>
                    <p className="text-[11px] text-slate-600">Global Travel Marketplace Hub</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Final Banner */}
          <section className="py-8 sm:py-10 lg:py-12 bg-[#0B1B2D] text-white relative overflow-hidden">
            <div className="relative z-10 w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12 text-center max-w-2xl">
              <div className="w-12 h-1 rounded bg-[#C5A059] mx-auto mb-4" />
              
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-serif leading-tight mb-4">
                DMCXchange — The Global Marketplace <br />
                <span className="gold-gradient-text">for Destination Travel</span>
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-xl mx-auto">
                Together, DMCs and Travel Agents create a connected marketplace where destination suppliers and travel sellers can do business more efficiently.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/auth/register/dmc"
                  className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#C5A059] text-[#0B1B2D] hover:bg-[#D4AF37] shadow-md transition-all"
                >
                  Join as a DMC Supplier
                </Link>
                <Link
                  href="/auth/register/agent"
                  className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm border-2 border-slate-400 text-white hover:border-[#C5A059] hover:text-[#C5A059] transition-all"
                >
                  Join as a Travel Agent
                </Link>
              </div>
            </div>
          </section>

        </main>
      </div>

      {/* Frozen Footer */}
      <footer className="bg-[#061121] border-t border-[#C5A059]/20 py-10 text-slate-400 text-xs">
        <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-3">
                <Logo size="md" darkNav={true} />
              </Link>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                An intelligent global B2B marketplace connecting Destination Management Companies with Travel Agents.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-3">Navigation</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#about" className="hover:text-white transition-colors">What is DMCXchange</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it works</a></li>
                <li><a href="#team" className="hover:text-white transition-colors">Our Team</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About us</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-3">Portals & Accounts</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/auth/register/dmc" className="hover:text-white transition-colors">Register as DMC</Link></li>
                <li><Link href="/auth/register/agent" className="hover:text-white transition-colors">Register as Travel Agent</Link></li>
                <li><Link href="/auth/login" className="hover:text-white transition-colors">Portal Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-3">Platform</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#for-dmcs" className="hover:text-white transition-colors">For DMCs</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">For Travel Agents</a></li>
                <li><a href="#team" className="hover:text-white transition-colors">Leadership Team</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Support Desk</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-2.5 text-[11px]">
            <p>© 2026 DMCXchange. The Global Marketplace for Destination Travel. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-[#C5A059] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#C5A059] transition-colors">Terms of Service</a>
              <a href="#contact" className="hover:text-[#C5A059] transition-colors">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
