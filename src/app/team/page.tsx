'use client';

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import {
  ArrowLeft,
  Sparkles,
  Menu,
  X,
  Mail,
  Globe,
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export default function TeamPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const teamMembers = [
    {
      name: "Jatin",
      role: "Co-Founder & CEO | Product & Strategy",
      initials: "J",
      image: "/team/jatin-raw.jpg",
      rawImage: "/team/jatin-raw.jpg",
      bio: "Co-Founder & CEO of DMCXchange, leading product vision, marketplace strategy, UX, workflows and overall business direction. With 18+ years in travel technology and B2B platforms, Jatin focuses on designing intelligent travel marketplaces that simplify DMC discovery, distribution and collaboration between global suppliers and travel buyers.",
      gradient: "from-[#0B1B2D] via-[#162B44] to-[#1E3A5F]"
    },
    {
      name: "Amit Gupta",
      role: "Co-Founder & Chief Commercial Officer",
      initials: "AG",
      image: "/team/shastry-raw.jpg",
      rawImage: "/team/shastry-raw.jpg",
      bio: "Co-Founder & CCO of DMCXchange, leading global commercial strategy, DMC acquisition, buyer acquisition, strategic partnerships and revenue growth. Amit focuses on building a strong two-sided ecosystem connecting quality DMCs with travel agencies, tour operators and other global travel buyers.",
      gradient: "from-[#0B1B2D] via-[#162B44] to-[#2A4D7A]"
    },
    {
      name: "Veerabhadra Shastry Marla",
      role: "Co-Founder & Chief Technology Officer",
      initials: "VSM",
      image: "/team/shastry-raw.jpg",
      rawImage: "/team/shastry-raw.jpg",
      bio: "Co-Founder & CTO of DMCXchange, leading technology architecture, engineering, APIs, integrations, infrastructure, security and platform scalability. Shastry focuses on building the robust technology backbone required to power a reliable, scalable and intelligent global DMC marketplace.",
      gradient: "from-[#0B1B2D] via-[#162B44] to-[#14283E]"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#C5A059]/20 selection:text-[#0B1B2D] overflow-x-hidden">
      
      {/* Top Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[#C5A059]/25 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between min-h-[75px] lg:min-h-[85px] py-1.5 sm:py-2">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center shrink-0 py-1">
              <Logo size="lg" />
            </Link>

            {/* Navigation Links */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-8 xl:gap-10 ml-auto">
              <Link href="/#about" className="text-sm font-semibold text-[#0B1B2D] hover:text-[#C5A059] transition-colors">
                What is DMCXchange
              </Link>
              <Link href="/#how-it-works" className="text-sm font-semibold text-[#0B1B2D] hover:text-[#C5A059] transition-colors">
                How it works
              </Link>
              <Link href="/team" className="text-sm font-semibold text-[#C5A059] hover:text-[#0B1B2D] transition-colors font-bold">
                Our Team
              </Link>
              <Link href="/#contact" className="text-sm font-semibold text-[#0B1B2D] hover:text-[#C5A059] transition-colors">
                Contact us
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3 ml-6">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1B2D] bg-[#C5A059]/15 border border-[#C5A059] hover:bg-[#C5A059] hover:text-[#0B1B2D] px-4 py-2 rounded-xl transition-all duration-150 shadow-sm"
              >
                <span>Sign In</span>
              </Link>
            </div>

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
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1 border-b border-slate-100">Home</Link>
              <Link href="/#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1 border-b border-slate-100">What is DMCXchange</Link>
              <Link href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1 border-b border-slate-100">How it works</Link>
              <Link href="/team" onClick={() => setMobileMenuOpen(false)} className="text-[#C5A059] py-1 border-b border-slate-100">Our Team</Link>
              <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1 border-b border-slate-100">Contact us</Link>
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className="text-[#C5A059] font-bold py-1">Sign In</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="pt-24 sm:pt-28 lg:pt-32">
        <main>
          
          {/* Header Hero Banner */}
          <section className="relative bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-white py-12 lg:py-16 border-b border-slate-200">
            <div className="relative z-10 w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12">
              
              <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#9E782F] hover:text-[#0B1B2D] mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Homepage</span>
              </Link>

              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 text-[#9E782F] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  Leadership & Vision
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.12] tracking-tight text-[#0B1B2D] mb-4 font-serif">
                  Our Founding <span className="gold-gradient-text">Leadership Team</span>
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  The visionary travel technology and commercial leaders building the world's most intelligent B2B marketplace for destination travel.
                </p>
              </div>

            </div>
          </section>

          {/* Team Members Grid */}
          <section className="py-12 sm:py-16 lg:py-20 bg-white">
            <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12">
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                {teamMembers.map((member, index) => (
                  <div 
                    key={index}
                    className="bg-[#F8FAFC] rounded-3xl border border-slate-200 luxury-card-shadow hover:border-[#C5A059] transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                  >
                    <div>
                      {/* Executive Photo Container Placeholder */}
                      <div className="relative w-full h-72 sm:h-80 bg-gradient-to-b from-[#0B1B2D] via-[#162B44] to-[#0B1B2D] flex items-center justify-center p-6 border-b border-[#C5A059]/30 overflow-hidden">
                        {/* Background Ambient Glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.15),transparent_70%)]" />
                        
                        {/* Executive Portrait Frame / Photo Container */}
                        <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full p-1.5 bg-gradient-to-tr from-[#C5A059] via-[#F9E29C] to-[#C5A059] shadow-2xl group-hover:scale-105 transition-transform duration-300">
                          <div className="w-full h-full rounded-full bg-[#0B1B2D] border-2 border-[#0B1B2D] shadow-inner overflow-hidden relative">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover object-top rounded-full"
                            />
                          </div>
                        </div>

                        {/* Executive Badge */}
                        <div className="absolute bottom-4 left-6 right-6 text-center">
                          <span className="text-[10px] font-mono font-bold text-[#C5A059] uppercase tracking-widest bg-[#0B1B2D]/90 border border-[#C5A059]/40 px-3 py-1 rounded-full shadow-md backdrop-blur-md">
                            DMCXchange Co-Founder
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-6 sm:p-8 space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold font-serif text-[#0B1B2D] mb-1.5 leading-snug">
                            {member.name}
                          </h3>
                          <div className="text-xs font-bold uppercase tracking-wider text-[#9E782F] bg-[#C5A059]/15 px-3 py-1 rounded-lg border border-[#C5A059]/30 inline-block">
                            {member.role}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-3 border-t border-slate-200">
                          {member.bio}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer Accent */}
                    <div className="px-6 sm:px-8 pb-6 pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 mt-4">
                      <span className="font-semibold text-[#0B1B2D]">DMCXchange Executive Board</span>
                      <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* Core Values / Company Purpose Banner */}
          <section className="py-12 sm:py-16 bg-[#0B1B2D] text-white border-t border-b border-[#C5A059]/20 relative overflow-hidden">
            <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-12 text-center max-w-3xl relative z-10">
              <div className="w-12 h-1 rounded bg-[#C5A059] mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mb-4">
                Engineered by Travel Industry Veterans
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
                Our founders combine decades of domain expertise in travel distribution, B2B marketplaces, cloud architecture, and global commercial growth to empower destination management companies and travel buyers worldwide.
              </p>
              <Link
                href="/auth/register/dmc"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#C5A059] text-[#0B1B2D] hover:bg-[#D4AF37] shadow-lg transition-all"
              >
                <span>Partner With DMCXchange</span>
              </Link>
            </div>
          </section>

        </main>
      </div>

      {/* Footer */}
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
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/#about" className="hover:text-white transition-colors">What is DMCXchange</Link></li>
                <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
                <li><Link href="/team" className="hover:text-white transition-colors font-bold text-[#C5A059]">Our Team</Link></li>
                <li><Link href="/#contact" className="hover:text-white transition-colors">Contact us</Link></li>
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
                <li><Link href="/#for-dmcs" className="hover:text-white transition-colors">For DMCs</Link></li>
                <li><Link href="/#how-it-works" className="hover:text-white transition-colors">For Travel Agents</Link></li>
                <li><Link href="/team" className="hover:text-white transition-colors">Leadership Team</Link></li>
                <li><Link href="/#contact" className="hover:text-white transition-colors">Support Desk</Link></li>
              </ul>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-2.5 text-[11px]">
            <p>© 2026 DMCXchange. The Global Marketplace for Destination Travel. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-[#C5A059] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#C5A059] transition-colors">Terms of Service</a>
              <Link href="/#contact" className="hover:text-[#C5A059] transition-colors">Contact Support</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
