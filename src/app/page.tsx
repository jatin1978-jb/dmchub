'use client';

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import {
  ArrowRight,
  ChevronRight,
  User,
  Briefcase,
  Store,
  ShieldCheck,
  Brain,
  ShoppingBag,
  Mail,
  MapPin,
  Menu,
  X,
  Sparkles,
  Award,
  Globe,
  Compass,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
  Lock,
  Search,
  KeyRound,
  AlertCircle
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function LandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active Content Modal State for links
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Login Modal State
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginRole, setLoginRole] = useState<'AGENT' | 'DMC'>('AGENT');
  const [email, setEmail] = useState('agent@example.com');
  const [password, setPassword] = useState('password123');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Handle direct login for Agent or DMC
  const handleQuickLogin = async (role: 'AGENT' | 'DMC') => {
    setLoginRole(role);
    const targetEmail = role === 'AGENT' ? 'agent@example.com' : 'dmc@example.com';
    setEmail(targetEmail);
    setPassword('password123');
    setLoginLoading(true);

    try {
      const result = await signIn('credentials', {
        email: targetEmail,
        password: 'password123',
        redirect: false,
      });

      if (result?.error) {
        setLoginError('Invalid credentials');
        setLoginLoading(false);
        setLoginModalOpen(true);
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setLoginError('An unexpected error occurred');
      setLoginLoading(false);
      setLoginModalOpen(true);
    }
  };

  const handleFormLogin = async (e: React.FormEvent) => {
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
      setLoginError('An error occurred');
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#0A2240] flex flex-col font-sans selection:bg-[#C49A45]/20 selection:text-[#0A2240] overflow-x-hidden">
      
      {/* 1. TOP HEADER / NAVBAR (SLEEK BALANCED HEIGHT) */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-slate-100 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between min-h-[72px] lg:min-h-[80px] py-1.5 sm:py-2">
            
            {/* BALANCED LOGO */}
            <Link href="/" className="flex items-center shrink-0">
              <Logo size="md" />
            </Link>

            {/* Navigation Links */}
            <nav className="hidden xl:flex items-center gap-7 text-[13px] font-semibold text-[#0A2240]">
              <button onClick={() => setActiveModal("about")} className="hover:text-[#C49A45] transition-colors cursor-pointer">About Us</button>
              <button onClick={() => setActiveModal("marketplace")} className="hover:text-[#C49A45] transition-colors cursor-pointer">Marketplace</button>
              <button onClick={() => setActiveModal("how-it-works")} className="hover:text-[#C49A45] transition-colors cursor-pointer">How It Works</button>
              <button onClick={() => setActiveModal("for-dmcs")} className="hover:text-[#C49A45] transition-colors cursor-pointer">For DMCs</button>
              <button onClick={() => setActiveModal("for-agents")} className="hover:text-[#C49A45] transition-colors cursor-pointer">For Travel Agents</button>
              <button onClick={() => setActiveModal("resources")} className="hover:text-[#C49A45] transition-colors cursor-pointer">Resources</button>
              <button onClick={() => setActiveModal("contact")} className="hover:text-[#C49A45] transition-colors cursor-pointer">Contact</button>
            </nav>

            {/* Right Side: Login Pill Button */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => setLoginModalOpen(true)}
                className="h-9 px-5 border border-[#0A2240]/40 text-[#0A2240] font-bold text-xs rounded-full hover:bg-[#0A2240] hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <User className="w-3.5 h-3.5 text-[#C49A45]" /> Login
              </button>
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl border border-slate-200 text-[#0A2240] hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-xl">
            <nav className="flex flex-col gap-3 text-sm font-semibold text-[#0A2240]">
              <button onClick={() => { setActiveModal("about"); setMobileMenuOpen(false); }} className="text-left py-1 border-b border-slate-100">About Us</button>
              <button onClick={() => { setActiveModal("marketplace"); setMobileMenuOpen(false); }} className="text-left py-1 border-b border-slate-100">Marketplace</button>
              <button onClick={() => { setActiveModal("how-it-works"); setMobileMenuOpen(false); }} className="text-left py-1 border-b border-slate-100">How It Works</button>
              <button onClick={() => { setActiveModal("for-dmcs"); setMobileMenuOpen(false); }} className="text-left py-1 border-b border-slate-100">For DMCs</button>
              <button onClick={() => { setActiveModal("for-agents"); setMobileMenuOpen(false); }} className="text-left py-1 border-b border-slate-100">For Travel Agents</button>
              <button onClick={() => { setActiveModal("resources"); setMobileMenuOpen(false); }} className="text-left py-1 border-b border-slate-100">Resources</button>
              <button onClick={() => { setActiveModal("contact"); setMobileMenuOpen(false); }} className="text-left py-1 border-b border-slate-100">Contact</button>
              <button onClick={() => { setLoginModalOpen(true); setMobileMenuOpen(false); }} className="mt-2 h-10 w-full bg-[#0A2240] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2">
                <User className="w-4 h-4" /> Login to Platform
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="pt-20 lg:pt-24 pb-16 flex-1">
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
          
          {/* 2. HERO SECTION WITH EXACT MOCKUP GRAPHIC */}
          <section className="relative min-h-[480px] lg:min-h-[520px] flex items-center justify-between overflow-hidden pt-4 pb-8">
            
            {/* Left Column: Hero Text */}
            <div className="w-full lg:w-1/2 z-10 space-y-6">
              <div className="space-y-1">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-[#0A2240] leading-[1.08]">
                  One Platform.
                </h1>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-[#0A2240] leading-[1.08]">
                  Every Destination.
                </h1>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-[#C49A45] leading-[1.08]">
                  Every Option.
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-700 font-medium max-w-xl leading-relaxed">
                <strong className="text-[#0A2240] font-bold">dmcXchange</strong> is the global B2B marketplace connecting verified DMCs with professional travel businesses.
              </p>

              <div className="pt-2">
                <button 
                  onClick={() => handleQuickLogin('AGENT')}
                  className="h-12 px-7 bg-[#0A2240] hover:bg-[#071830] text-white font-bold text-sm rounded-lg shadow-md transition-all flex items-center gap-2.5 cursor-pointer group"
                >
                  Explore dmcXchange <ArrowRight className="w-4 h-4 text-[#C49A45] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Column: Standalone Exact World Map & Ascending Golden Arc Graphic */}
            <div className="hidden lg:flex w-1/2 justify-end items-center relative z-10 pl-8">
              <img 
                src="/hero-world-map.png" 
                alt="dmcXchange Global Network Map" 
                className="w-full h-auto object-contain max-h-[480px]"
              />
            </div>

          </section>

          {/* 3. DUAL PORTAL LOGIN CARD & 4-PILLAR SUB-BAR */}
          <section className="bg-slate-50/90 rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
            
            {/* Top Side-by-Side Dual Login Options */}
            <div className="p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
              
              {/* Left Column: Login as Travel Agent */}
              <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#0A2240] text-white flex items-center justify-center shadow-md">
                  <User className="w-7 h-7" />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-[#0A2240]">Login as Travel Agent</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-xs">
                    Discover destinations, compare products and create unforgettable journeys.
                  </p>
                </div>

                <button
                  onClick={() => handleQuickLogin('AGENT')}
                  disabled={loginLoading && loginRole === 'AGENT'}
                  className="h-11 px-8 bg-[#0A2240] hover:bg-[#071830] text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer w-full max-w-xs"
                >
                  <User className="w-4 h-4 text-[#C49A45]" />
                  {loginLoading && loginRole === 'AGENT' ? 'Logging in...' : 'Login as Travel Agent'}
                </button>

                <p className="text-xs text-slate-500 font-medium">
                  New here? <button onClick={() => handleQuickLogin('AGENT')} className="text-[#0A2240] font-bold hover:underline cursor-pointer">Register</button>
                </p>
              </div>

              {/* Middle "OR" Divider Pill */}
              <div className="lg:col-span-2 flex items-center justify-center relative my-2 lg:my-0">
                <div className="hidden lg:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-slate-200" />
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-400 text-xs font-bold flex items-center justify-center shadow-xs z-10">
                  or
                </div>
              </div>

              {/* Right Column: Login as DMC */}
              <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#C49A45] text-white flex items-center justify-center shadow-md">
                  <Briefcase className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#0A2240]">Login as DMC</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-xs">
                    Showcase your destination expertise and reach global buyers.
                  </p>
                </div>

                <button
                  onClick={() => handleQuickLogin('DMC')}
                  disabled={loginLoading && loginRole === 'DMC'}
                  className="h-11 px-8 bg-[#0A2240] hover:bg-[#071830] text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer w-full max-w-xs"
                >
                  <Briefcase className="w-4 h-4 text-[#C49A45]" />
                  {loginLoading && loginRole === 'DMC' ? 'Logging in...' : 'Login as DMC'}
                </button>

                <p className="text-xs text-slate-500 font-medium">
                  New here? <button onClick={() => handleQuickLogin('DMC')} className="text-[#0A2240] font-bold hover:underline cursor-pointer">Register</button>
                </p>
              </div>

            </div>

            {/* Bottom 4-Pillar Bar (MARKETPLACE | TRUST | INTELLIGENCE | COMMERCE) */}
            <div className="border-t border-slate-200/80 bg-white/70 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
              
              {/* Pillar 1: MARKETPLACE */}
              <div className="p-6 flex items-start gap-4 hover:bg-slate-50/80 transition-colors">
                <div className="p-2.5 rounded-xl bg-slate-100 text-[#0A2240] shrink-0">
                  <Store className="w-5 h-5 text-[#C49A45]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0A2240]">MARKETPLACE</h4>
                  <p className="text-xs text-slate-500 font-medium">Discover. Compare. Connect.</p>
                  <button onClick={() => setActiveModal("marketplace")} className="text-xs font-bold text-[#0A2240] hover:text-[#C49A45] flex items-center gap-1 pt-1 cursor-pointer">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Pillar 2: TRUST */}
              <div className="p-6 flex items-start gap-4 hover:bg-slate-50/80 transition-colors">
                <div className="p-2.5 rounded-xl bg-slate-100 text-[#0A2240] shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#C49A45]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0A2240]">TRUST</h4>
                  <p className="text-xs text-slate-500 font-medium">Verified. Reliable. Secure.</p>
                  <button onClick={() => setActiveModal("trust")} className="text-xs font-bold text-[#0A2240] hover:text-[#C49A45] flex items-center gap-1 pt-1 cursor-pointer">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Pillar 3: INTELLIGENCE */}
              <div className="p-6 flex items-start gap-4 hover:bg-slate-50/80 transition-colors">
                <div className="p-2.5 rounded-xl bg-slate-100 text-[#0A2240] shrink-0">
                  <Brain className="w-5 h-5 text-[#C49A45]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0A2240]">INTELLIGENCE</h4>
                  <p className="text-xs text-slate-500 font-medium">Visa-aware. Traveller-focused.</p>
                  <button onClick={() => setActiveModal("intelligence")} className="text-xs font-bold text-[#0A2240] hover:text-[#C49A45] flex items-center gap-1 pt-1 cursor-pointer">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Pillar 4: COMMERCE */}
              <div className="p-6 flex items-start gap-4 hover:bg-slate-50/80 transition-colors">
                <div className="p-2.5 rounded-xl bg-slate-100 text-[#0A2240] shrink-0">
                  <ShoppingBag className="w-5 h-5 text-[#C49A45]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0A2240]">COMMERCE</h4>
                  <p className="text-xs text-slate-500 font-medium">Quote. Book. Manage.</p>
                  <button onClick={() => setActiveModal("commerce")} className="text-xs font-bold text-[#0A2240] hover:text-[#C49A45] flex items-center gap-1 pt-1 cursor-pointer">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

          </section>

        </div>
      </main>

      {/* 4. FOOTER (DARK ROYAL NAVY #092244) */}
      <footer className="bg-[#092244] text-white pt-14 pb-10 border-t-4 border-[#C49A45]">
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            
            {/* Col 1: Logo & Socials */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white p-2 rounded-xl inline-block">
                <Logo size="md" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xs">
                Global marketplace connecting DMC's & Travel ecosystem.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C49A45] hover:text-[#092244] flex items-center justify-center text-xs transition-colors">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C49A45] hover:text-[#092244] flex items-center justify-center text-xs transition-colors">
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a href="mailto:hello@dmcxchange.com" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C49A45] hover:text-[#092244] flex items-center justify-center text-xs transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: ABOUT US */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-white">ABOUT US</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><button onClick={() => setActiveModal("about")} className="hover:text-[#C49A45] transition-colors cursor-pointer">Who We Are</button></li>
                <li><button onClick={() => setActiveModal("our-story")} className="hover:text-[#C49A45] transition-colors cursor-pointer">Our Story</button></li>
                <li><button onClick={() => setActiveModal("leadership")} className="hover:text-[#C49A45] transition-colors cursor-pointer">Leadership</button></li>
                <li><button onClick={() => setActiveModal("careers")} className="hover:text-[#C49A45] transition-colors cursor-pointer">Careers</button></li>
              </ul>
            </div>

            {/* Col 3: MARKETPLACE */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-white">MARKETPLACE</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><button onClick={() => setActiveModal("marketplace")} className="hover:text-[#C49A45] transition-colors cursor-pointer">Destination Discovery</button></li>
                <li><button onClick={() => setActiveModal("dmc-network")} className="hover:text-[#C49A45] transition-colors cursor-pointer">Our DMC Network</button></li>
                <li><button onClick={() => setActiveModal("product-categories")} className="hover:text-[#C49A45] transition-colors cursor-pointer">Product Categories</button></li>
                <li><button onClick={() => setActiveModal("partner-with-us")} className="hover:text-[#C49A45] transition-colors cursor-pointer">Partner With Us</button></li>
              </ul>
            </div>

            {/* Col 4: HOW IT WORKS */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-white">HOW IT WORKS</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><button onClick={() => setActiveModal("for-agents")} className="hover:text-[#C49A45] transition-colors cursor-pointer">For Travel Agents</button></li>
                <li><button onClick={() => setActiveModal("for-dmcs")} className="hover:text-[#C49A45] transition-colors cursor-pointer">For DMCs</button></li>
                <li><button onClick={() => setActiveModal("platform-workflow")} className="hover:text-[#C49A45] transition-colors cursor-pointer">Platform Workflow</button></li>
              </ul>
            </div>

            {/* Col 5: RESOURCES */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-white">RESOURCES</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><button onClick={() => setActiveModal("insights")} className="hover:text-[#C49A45] transition-colors cursor-pointer">Insights</button></li>
                <li><button onClick={() => setActiveModal("news")} className="hover:text-[#C49A45] transition-colors cursor-pointer">News</button></li>
                <li><button onClick={() => setActiveModal("help-center")} className="hover:text-[#C49A45] transition-colors cursor-pointer">Help Center</button></li>
                <li><button onClick={() => setActiveModal("contact")} className="hover:text-[#C49A45] transition-colors cursor-pointer">Contact Support</button></li>
              </ul>
            </div>

            {/* Col 6: CONTACT US */}
            <div className="lg:col-span-1 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-white">CONTACT US</h4>
              <div className="space-y-2 text-xs text-slate-300">
                <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#C49A45]" /> hello@dmcxchange.com</p>
                <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#C49A45]" /> Global Presence</p>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© 2025 dmcXchange. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => setActiveModal("privacy")} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
              <span>|</span>
              <button onClick={() => setActiveModal("terms")} className="hover:text-white transition-colors cursor-pointer">Terms of Use</button>
            </div>
          </div>
        </div>
      </footer>

      {/* 5. RICH CONTENT MODAL DIALOG FOR SUB-LINKS (Populated from PDF Presentation Deck) */}
      <Dialog open={!!activeModal} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="sm:max-w-4xl w-[92vw] max-h-[88vh] overflow-y-auto p-8 rounded-3xl border-none shadow-2xl bg-white text-[#0A2240]">
          <DialogHeader className="border-b border-slate-100 pb-4">
            <DialogTitle className="text-2xl font-serif font-black text-[#0A2240] flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#C49A45]" />
              {activeModal === "about" && "What We Are & Brand Vision"}
              {activeModal === "our-story" && "Our Brand Story & Founders"}
              {activeModal === "leadership" && "Leadership Team"}
              {activeModal === "marketplace" && "The Marketplace Layer"}
              {activeModal === "trust" && "The Trust & Compliance Layer"}
              {activeModal === "intelligence" && "Traveller Intelligence & Visa Pathways"}
              {activeModal === "commerce" && "The Destination Commerce Layer"}
              {activeModal === "how-it-works" && "How dmcXchange Works"}
              {activeModal === "for-dmcs" && "For DMCs — Create, Publish & Grow"}
              {activeModal === "for-agents" && "For Travel Agents — Discover, Book & Serve"}
              {activeModal === "resources" && "Resources & Platform Insights"}
              {activeModal === "contact" && "Contact dmcXchange Global Team"}
              {(!activeModal || !["about","our-story","leadership","marketplace","trust","intelligence","commerce","how-it-works","for-dmcs","for-agents","resources","contact"].includes(activeModal)) && "dmcXchange Platform Guide"}
            </DialogTitle>
          </DialogHeader>

          {/* Modal Content Sections populated from PDF Deck */}
          <div className="py-4 space-y-6 text-sm text-slate-700 leading-relaxed">
            
            {/* About Modal */}
            {activeModal === "about" && (
              <div className="space-y-4">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h3 className="text-lg font-serif font-bold text-[#0A2240] mb-2">What We Are</h3>
                  <p>dmcXchange is an intelligent global B2B Destination Marketplace connecting verified Destination Management Companies with the global travel ecosystem — making destination expertise accessible, trusted, bookable and scalable through one connected platform.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#0A2240] text-white p-5 rounded-2xl">
                    <span className="text-[10px] font-bold text-[#C49A45] uppercase">Vision</span>
                    <h4 className="font-serif font-bold text-base mt-1">Global Marketplace</h4>
                    <p className="text-xs text-slate-200 mt-2">To become the world's leading marketplace for destination expertise and destination commerce.</p>
                  </div>
                  <div className="bg-[#0A2240] text-white p-5 rounded-2xl">
                    <span className="text-[10px] font-bold text-[#C49A45] uppercase">Mission</span>
                    <h4 className="font-serif font-bold text-base mt-1">Simplified Sourcing</h4>
                    <p className="text-xs text-slate-200 mt-2">To simplify global destination sourcing by connecting travel businesses with trusted local destination experts.</p>
                  </div>
                  <div className="bg-[#C49A45] text-[#0A2240] p-5 rounded-2xl font-bold">
                    <span className="text-[10px] uppercase font-black tracking-wider">Brand Promise</span>
                    <h4 className="font-serif text-lg mt-1 font-black">One Platform. Every Destination. Every Option.</h4>
                  </div>
                </div>
              </div>
            )}

            {/* Leadership Modal */}
            {(activeModal === "leadership" || activeModal === "our-story") && (
              <div className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-[#0A2240]">Our Brand Story</h4>
                  <p className="text-xs text-slate-600 mt-1">Conceived by Amit Gupta to address a long-standing gap in the global travel industry: the absence of a trusted, technology-enabled marketplace connecting destination expertise with global travel demand. Amit brought together Jatin Bhai and M.V. Shastry as Co-Founders.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="w-14 h-14 bg-[#0A2240] text-[#C49A45] rounded-full flex items-center justify-center font-black text-xl">AG</div>
                    <h4 className="font-bold text-base text-[#0A2240]">Amit Gupta</h4>
                    <span className="text-xs font-bold text-[#C49A45] block">Co-Founder — Industry Vision & Leadership</span>
                    <p className="text-xs text-slate-600">Travel-industry leader with experience across DMC, Holidays, Corporate Travel & MICE. Leads corporate strategy and expansion.</p>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="w-14 h-14 bg-[#0A2240] text-[#C49A45] rounded-full flex items-center justify-center font-black text-xl">JB</div>
                    <h4 className="font-bold text-base text-[#0A2240]">Jatin Bhai</h4>
                    <span className="text-xs font-bold text-[#C49A45] block">Co-Founder — Travel Commerce & Product</span>
                    <p className="text-xs text-slate-600">Travel-technology leader focused on marketplace adoption, product commercialisation and strategic partnerships.</p>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="w-14 h-14 bg-[#0A2240] text-[#C49A45] rounded-full flex items-center justify-center font-black text-xl">MS</div>
                    <h4 className="font-bold text-base text-[#0A2240]">M.V. Shastry</h4>
                    <span className="text-xs font-bold text-[#C49A45] block">Co-Founder — Technology & Engineering</span>
                    <p className="text-xs text-slate-600">Technology leader responsible for platform architecture, scalable infrastructure, security and technology roadmap.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Marketplace & Platform Layers */}
            {(activeModal === "marketplace" || activeModal === "trust" || activeModal === "intelligence" || activeModal === "commerce") && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#0A2240]">The 4-Layer Platform Architecture</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-[#0A2240] flex items-center gap-2"><Store className="w-4 h-4 text-[#C49A45]" /> 1. Marketplace</h4>
                    <p className="text-xs text-slate-600 mt-1">Connects verified local destination supply with global B2B demand through discovery, structured packages, comparison and distribution.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-[#0A2240] flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#C49A45]" /> 2. Trust</h4>
                    <p className="text-xs text-slate-600 mt-1">Onboarding, due diligence, compliance, quality scoring, performance visibility, ratings and verified buyer credentials.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-[#0A2240] flex items-center gap-2"><Brain className="w-4 h-4 text-[#C49A45]" /> 3. Intelligence</h4>
                    <p className="text-xs text-slate-600 mt-1">Visa-aware discovery, passport nationality pathways (Visa Free, VoA, E-Visa) and traveller-profile intelligence.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-[#0A2240] flex items-center gap-2"><ShoppingBag className="w-4 h-4 text-[#C49A45]" /> 4. Commerce</h4>
                    <p className="text-xs text-slate-600 mt-1">Structured workflows across quotation, booking, documentation, communication, amendments and reporting.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Modal */}
            {activeModal === "contact" && (
              <div className="space-y-4">
                <div className="bg-[#0A2240] text-white p-6 rounded-2xl space-y-3">
                  <h4 className="font-bold text-lg text-[#C49A45]">Global Presence & Contact Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-bold text-slate-300 block">Email Us:</span>
                      <p>amit@dmcxchange.com</p>
                      <p>jatin@dmcxchange.com</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-300 block">Direct Offices:</span>
                      <p>UAE: +971-56 412 5850</p>
                      <p>India: +91 99 583 72226</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Default Fallback content */}
            {(!["about","our-story","leadership","marketplace","trust","intelligence","commerce","contact"].includes(activeModal || '')) && (
              <div className="space-y-3">
                <p>Welcome to <strong>dmcXchange</strong> — The right destination product to reach the right traveller, through the right travel company, at the right time.</p>
                <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600">
                  <p className="font-bold text-[#0A2240] mb-1">Key Platform Highlights:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Single-Platform Model for verified global DMC network</li>
                    <li>Visa-Aware Traveller Intelligence</li>
                    <li>Digital Flyer & Custom Quotation Generator</li>
                  </ul>
                </div>
              </div>
            )}

          </div>

          <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400">dmcXchange Platform</span>
            <button
              onClick={() => handleQuickLogin('AGENT')}
              className="h-10 px-5 bg-[#0A2240] text-white font-bold text-xs rounded-xl shadow-md"
            >
              Sign In to Platform ➔
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 6. LOGIN FORM MODAL */}
      <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
        <DialogContent className="sm:max-w-md w-[92vw] p-6 rounded-3xl border-none shadow-2xl bg-white text-[#0A2240]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-[#0A2240]">
              <Lock className="w-5 h-5 text-[#C49A45]" /> Portal Login
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleFormLogin} className="space-y-4 pt-2">
            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" /> {loginError}
              </div>
            )}

            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => { setLoginRole('AGENT'); setEmail('agent@example.com'); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${loginRole === 'AGENT' ? 'bg-[#0A2240] text-white shadow-sm' : 'text-slate-600'}`}
              >
                Travel Agent
              </button>
              <button
                type="button"
                onClick={() => { setLoginRole('DMC'); setEmail('dmc@example.com'); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${loginRole === 'DMC' ? 'bg-[#0A2240] text-white shadow-sm' : 'text-slate-600'}`}
              >
                DMC Supplier
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full h-11 bg-[#0A2240] hover:bg-[#071830] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loginLoading ? 'Signing in...' : `Sign In as ${loginRole === 'AGENT' ? 'Travel Agent' : 'DMC Supplier'}`}
              <ArrowRight className="w-4 h-4 text-[#C49A45]" />
            </button>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}

function LinkedinIcon(props: any) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function YoutubeIcon(props: any) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

