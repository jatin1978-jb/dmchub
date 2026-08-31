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
  Car,
  Hotel,
  Briefcase,
  Globe,
  CheckCircle2,
  Users,
  Building2,
  Sparkles,
  Menu,
  X,
  Compass,
  Layers,
  Utensils,
  Calendar,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Award,
  FileSpreadsheet,
  Handshake,
  Search,
  Zap,
  Globe2,
  FileText
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero Login Card State (Kept as user explicitly requested!)
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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F294A] flex flex-col font-sans selection:bg-[#C49A45]/20 selection:text-[#1B4985] overflow-x-hidden">
      
      {/* Top Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[#C49A45]/20 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between min-h-[80px] py-2">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Logo size="lg" />
            </Link>

            {/* Top Navigation Bar */}
            <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-8 ml-auto">
              <a href="#what-we-are" className="text-sm font-bold text-[#1B4985] hover:text-[#C49A45] transition-colors">
                What We Are
              </a>
              <a href="#the-x-factor" className="text-sm font-bold text-[#1B4985] hover:text-[#C49A45] transition-colors">
                The "X" Factor
              </a>
              <a href="#4-layer-platform" className="text-sm font-bold text-[#1B4985] hover:text-[#C49A45] transition-colors">
                4-Layer Platform
              </a>
              <a href="#who-we-serve" className="text-sm font-bold text-[#1B4985] hover:text-[#C49A45] transition-colors">
                Who We Serve
              </a>
              <a href="#leadership" className="text-sm font-bold text-[#1B4985] hover:text-[#C49A45] transition-colors">
                Leadership
              </a>
              <a href="#contact" className="text-sm font-bold text-[#1B4985] hover:text-[#C49A45] transition-colors">
                Contact
              </a>
            </nav>

            {/* Header Direct Login Buttons */}
            <div className="hidden sm:flex items-center gap-3 ml-8">
              <button 
                onClick={() => { handleRoleSwitch('DMC'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-4 py-2 text-xs font-extrabold text-[#1B4985] border border-[#1B4985]/30 rounded-xl hover:bg-[#1B4985]/5 transition-all"
              >
                DMC Portal
              </button>
              <button 
                onClick={() => { handleRoleSwitch('AGENT'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-5 py-2 text-xs font-black text-white bg-[#1B4985] hover:bg-[#0F3260] rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                Travel Agent Portal <ChevronRight className="w-3.5 h-3.5 text-[#C49A45]" />
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl border border-slate-200 text-[#1B4985] hover:bg-slate-100 transition-colors ml-auto"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-[#C49A45]/30 px-6 py-4 space-y-3 shadow-xl">
            <nav className="flex flex-col gap-3 text-sm font-bold text-[#1B4985]">
              <a href="#what-we-are" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C49A45] py-1 border-b border-slate-100">What We Are</a>
              <a href="#the-x-factor" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C49A45] py-1 border-b border-slate-100">The "X" Factor</a>
              <a href="#4-layer-platform" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C49A45] py-1 border-b border-slate-100">4-Layer Platform</a>
              <a href="#who-we-serve" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C49A45] py-1 border-b border-slate-100">Who We Serve</a>
              <a href="#leadership" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C49A45] py-1 border-b border-slate-100">Leadership</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C49A45] py-1 border-b border-slate-100">Contact</a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="pt-20 sm:pt-24">
        
        {/* HERO SECTION (Left Brand Presentation + Right Login Card as User Requested) */}
        <section className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 lg:py-20 border-b border-[#C49A45]/20">
          <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Brand Hero Presentation */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
                
                {/* 4 Pillars Badge */}
                <div className="inline-flex items-center gap-2 bg-[#1B4985]/10 border border-[#1B4985]/20 px-4 py-2 rounded-full shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#C49A45] animate-ping" />
                  <span className="text-xs font-black uppercase tracking-widest text-[#1B4985]">
                    MARKETPLACE • TRUST • INTELLIGENCE • COMMERCE
                  </span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-[#1B4985] leading-[1.1]">
                    Powering Global DMC & Travel Commerce
                  </h1>
                  
                  <p className="text-lg sm:text-xl font-medium text-slate-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    <strong className="text-[#1B4985] font-extrabold">dmcXchange</strong> — a B2B Global Destination Marketplace connecting verified destination expertise with global travel buyers.
                  </p>
                </div>

                {/* Core Principle Callout Box */}
                <div className="bg-gradient-to-r from-[#1B4985] to-[#0F3260] text-white p-6 rounded-3xl shadow-xl border border-[#C49A45]/40 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C49A45]/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="p-3 bg-[#C49A45] text-slate-950 rounded-2xl shrink-0 font-black">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-[#C49A45] mb-1">Our Core Principle</h4>
                      <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-100">
                        "The right destination product to reach the right traveller, through the right travel company, at the right time."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Brand Features Pill list */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                  <span className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 shadow-xs flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified DMCs & Supply
                  </span>
                  <span className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 shadow-xs flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-blue-600" /> Visa-Aware Traveller Intelligence
                  </span>
                  <span className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 shadow-xs flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-amber-600" /> Instant Quote & Flyer Engine
                  </span>
                </div>
              </div>

              {/* Right Column: Hero Login Card (PRESERVED AS USER REQUESTED!) */}
              <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(27,73,133,0.15)] border-2 border-[#1B4985]/20 relative overflow-hidden">
                  
                  {/* Card Header Badge */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#C49A45] block">Instant B2B Access</span>
                      <h3 className="text-xl font-serif font-black text-[#1B4985]">Portal Sign In</h3>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-200">
                      Live Platform
                    </span>
                  </div>

                  {/* Dual Role Selector Tabs */}
                  <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl mb-6">
                    <button
                      type="button"
                      onClick={() => handleRoleSwitch('DMC')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                        loginRole === 'DMC'
                          ? 'bg-[#1B4985] text-white shadow-md'
                          : 'text-slate-600 hover:text-[#1B4985]'
                      }`}
                    >
                      <Building2 className="w-4 h-4" /> DMC Operator
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRoleSwitch('AGENT')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                        loginRole === 'AGENT'
                          ? 'bg-[#1B4985] text-white shadow-md'
                          : 'text-slate-600 hover:text-[#1B4985]'
                      }`}
                    >
                      <Briefcase className="w-4 h-4" /> Travel Agent
                    </button>
                  </div>

                  {/* Login Form */}
                  <form onSubmit={handleHeroLogin} className="space-y-4">
                    {loginError && (
                      <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2 font-semibold">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {loginError}
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Work Email Address</label>
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. name@company.com"
                          required
                          className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#1B4985] focus:ring-2 focus:ring-[#1B4985]/20"
                        />
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-700 block">Password</label>
                        <a href="#contact" className="text-[11px] font-bold text-[#C49A45] hover:underline">Forgot?</a>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full h-11 pl-10 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#1B4985] focus:ring-2 focus:ring-[#1B4985]/20"
                        />
                        <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loginLoading}
                      className="w-full h-12 bg-gradient-to-r from-[#1B4985] to-[#0F3260] hover:from-[#0F3260] hover:to-[#1B4985] text-white font-extrabold rounded-xl shadow-lg shadow-[#1B4985]/25 transition-all text-sm flex items-center justify-center gap-2 mt-2"
                    >
                      {loginLoading ? 'Signing In...' : `Sign In as ${loginRole === 'DMC' ? 'DMC Supplier' : 'Travel Agent'}`}
                      {!loginLoading && <ArrowRight className="w-4 h-4 text-[#C49A45]" />}
                    </button>
                  </form>

                  {/* Quick Demo Credentials Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                    <p className="text-[11px] text-slate-500 font-semibold mb-1">
                      Demo Account: <code className="bg-slate-100 text-[#1B4985] px-2 py-0.5 rounded font-mono font-bold">{email}</code>
                    </p>
                    <p className="text-[10px] text-slate-400">Password: <code className="font-mono font-bold">password123</code></p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: WHAT WE ARE (Page 2) */}
        <section id="what-we-are" className="py-16 sm:py-20 bg-white border-b border-slate-100">
          <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#C49A45]">Platform Definition</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1B4985] tracking-tight">What We Are</h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                <strong>dmcXchange</strong> is an intelligent global B2B Destination Marketplace connecting verified Destination Management Companies with the global travel ecosystem — making destination expertise accessible, trusted, bookable and scalable through one connected platform.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                The platform enables destination products to be discovered, customised, distributed and transacted by travel agents, tour operators, OTAs, TMCs and other professional travel buyers through a trusted, technology-enabled marketplace.
              </p>
            </div>

            {/* Purpose, Mission & Brand Promise (Page 3) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="bg-[#1B4985] text-white p-8 rounded-3xl shadow-xl space-y-3 border-2 border-[#C49A45]/30 relative overflow-hidden">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#C49A45]">Our Vision</span>
                <h3 className="text-2xl font-serif font-black">Vision</h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  To become the world's leading marketplace for destination expertise and destination commerce.
                </p>
              </div>

              <div className="bg-[#1B4985] text-white p-8 rounded-3xl shadow-xl space-y-3 border-2 border-[#C49A45]/30 relative overflow-hidden">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#C49A45]">Our Mission</span>
                <h3 className="text-2xl font-serif font-black">Mission</h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  To simplify global destination sourcing by connecting travel businesses with trusted local destination experts through one unified B2B marketplace.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#0F3260] to-[#1B4985] text-white p-8 rounded-3xl shadow-xl space-y-3 border-2 border-[#C49A45] relative overflow-hidden">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#C49A45]">Brand Promise</span>
                <h3 className="text-2xl font-serif font-black">Brand Promise</h3>
                <p className="text-base font-extrabold text-[#C49A45] leading-snug">
                  "One Platform. Every Destination. Every Option."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE "X" IN dmcXchange (Page 4 & 5) */}
        <section id="the-x-factor" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
          <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#C49A45]">The "X" Factor</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1B4985]">The "X" in dmcXchange</h2>
              <p className="text-sm sm:text-base text-slate-600">
                The name <strong>dmcXchange</strong> reflects what the platform stands for. The "X" represents five core pillars:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { title: "Exchange", desc: "Connecting travel businesses with trusted local partners through one unified marketplace.", icon: Handshake },
                { title: "Experience", desc: "Curating exceptional, memorable journeys that exceed the expectations of every traveller.", icon: Sparkles },
                { title: "Expertise", desc: "Leveraging deep local knowledge from verified destination specialists around the globe.", icon: Award },
                { title: "Exploration", desc: "Unlocking new destinations and possibilities for travel businesses and their clients.", icon: Compass },
                { title: "Expansion", desc: "Empowering partners to grow their reach and scale across the world's top destinations.", icon: TrendingUp },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all space-y-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-[#1B4985]/10 text-[#1B4985] group-hover:bg-[#1B4985] group-hover:text-white transition-all flex items-center justify-center">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-black text-[#1B4985]">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: THE 4-LAYER PLATFORM (Page 7) */}
        <section id="4-layer-platform" className="py-16 sm:py-20 bg-white border-b border-slate-100">
          <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#C49A45]">Architecture</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1B4985]">The 4-Layer Platform</h2>
              <p className="text-sm sm:text-base text-slate-600">
                dmcXchange is not another aggregator or supplier directory — it is a destination commerce platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { layer: "1. Marketplace", desc: "Connects verified local destination supply with global B2B demand through destination discovery, structured packages, comparison and distribution.", icon: ShoppingBagIcon },
                { layer: "2. Trust", desc: "Onboarding, due diligence, compliance, quality scoring, performance visibility, ratings and verified buyer credentials.", icon: ShieldCheck },
                { layer: "3. Intelligence", desc: "Visa-aware discovery, traveller-profile intelligence and personalised recommendations based on traveller nationality.", icon: CpuIcon },
                { layer: "4. Commerce", desc: "Structured workflows across quotation, booking, documentation, communication, amendments and reporting.", icon: FileSpreadsheet },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-3xl border-2 border-[#1B4985]/20 shadow-sm space-y-4 hover:border-[#1B4985] transition-all">
                  <div className="p-3 bg-[#1B4985] text-white rounded-2xl w-fit">
                    <item.icon className="w-6 h-6 text-[#C49A45]" />
                  </div>
                  <h3 className="text-xl font-serif font-black text-[#1B4985]">{item.layer}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: WHO WE SERVE & VALUE CREATION (Page 8, 15 & 16) */}
        <section id="who-we-serve" className="py-16 sm:py-20 bg-slate-900 text-white border-b border-slate-800">
          <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#C49A45]">Target Ecosystem</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">Who We Serve</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700 space-y-4">
                <div className="text-[#C49A45] font-black text-lg">1. DMCs Bring</div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Destination expertise, local knowledge, products, supplier relationships and on-ground execution.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#1B4985] to-[#0F3260] p-8 rounded-3xl border-2 border-[#C49A45] space-y-4 shadow-xl">
                <div className="text-[#C49A45] font-black text-lg">2. dmcXchange Brings</div>
                <p className="text-sm text-slate-100 leading-relaxed">
                  Technology, trust and verification, traveller intelligence, structured workflow and global distribution.
                </p>
              </div>

              <div className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700 space-y-4">
                <div className="text-[#C49A45] font-black text-lg">3. Travel Companies Bring</div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The traveller, customer relationships, requirements, source-market demand and sales capability.
                </p>
              </div>
            </div>

            <div className="bg-[#1B4985]/40 border border-[#C49A45]/40 p-6 rounded-2xl text-center max-w-3xl mx-auto">
              <p className="text-sm sm:text-base font-extrabold text-[#C49A45]">
                The Outcome: Local destination expertise becomes globally discoverable, customisable, bookable and commercially scalable.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: LEADERSHIP TEAM (Page 23) */}
        <section id="leadership" className="py-16 sm:py-20 bg-white border-b border-slate-100">
          <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#C49A45]">Founders</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1B4985]">Leadership Team</h2>
              <p className="text-sm sm:text-base text-slate-600">
                The team combines travel domain expertise, commercial growth and technology leadership.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Amit Gupta", title: "Co-Founder", role: "Industry Vision & Leadership", desc: "Travel-industry leader with experience across DMC, Holidays, Corporate Travel & MICE. Leads corporate strategy, strategic partnerships, governance and expansion." },
                { name: "Jatin Bhai", title: "Co-Founder", role: "Travel Commerce & Product", desc: "Travel-technology leader focused on marketplace adoption, product commercialisation and strategic distribution partnerships." },
                { name: "M.V. Shastry", title: "Co-Founder", role: "Technology & Platform Engineering", desc: "Technology leader responsible for platform architecture, scalable infrastructure, API framework, security, integrations and long-term technology roadmap." }
              ].map((leader, idx) => (
                <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-md space-y-4 text-center">
                  <div className="w-20 h-20 bg-[#1B4985] text-white rounded-full mx-auto flex items-center justify-center font-black text-2xl shadow-lg border-2 border-[#C49A45]">
                    {leader.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-black text-[#1B4985]">{leader.name}</h3>
                    <p className="text-xs font-extrabold text-[#C49A45] uppercase tracking-wider">{leader.title} — {leader.role}</p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{leader.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: FOOTER & CONTACT US (Page 25) */}
        <footer id="contact" className="bg-[#0B2545] text-white pt-16 pb-12 border-t-4 border-[#C49A45]">
          <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Col 1: Logo & Mission */}
              <div className="space-y-4">
                <Logo size="lg" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  Connecting verified destination expertise with global travel demand through one connected B2B platform.
                </p>
              </div>

              {/* Col 2: Direct Email Contacts */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-[#C49A45]">Email Contacts</h4>
                <div className="space-y-1 text-xs text-slate-300">
                  <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#C49A45]" /> amit@dmcxchange.com</p>
                  <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#C49A45]" /> jatin@dmcxchange.com</p>
                </div>
              </div>

              {/* Col 3: Direct Phone Numbers */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-[#C49A45]">Global Offices</h4>
                <div className="space-y-1 text-xs text-slate-300">
                  <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#C49A45]" /> UAE: +971-56 412 5850</p>
                  <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#C49A45]" /> India: +91 99 583 72226</p>
                </div>
              </div>

              {/* Col 4: Web */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-[#C49A45]">Website</h4>
                <p className="text-xs font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#C49A45]" /> www.dmcXchange.com
                </p>
              </div>

            </div>

            <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p>© {new Date().getFullYear()} dmcXchange. All rights reserved.</p>
              <p className="text-[#C49A45] font-semibold">One Platform. Every Destination. Every Option.</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

// Icon Helper Components
function ShoppingBagIcon(props: any) {
  return <Briefcase {...props} />
}
function CpuIcon(props: any) {
  return <Cpu {...props} />
}
function Cpu(props: any) {
  return <Globe {...props} />
}
