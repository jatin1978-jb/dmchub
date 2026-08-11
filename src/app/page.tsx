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
  Network,
  Rss,
  Plug,
  CheckCircle2,
  Users,
  MapPin,
  Zap,
  ShieldCheck,
  Building2,
  Sparkles,
  LogIn,
  Menu,
  X
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#C5A059]/20 selection:text-[#0B1B2D] overflow-x-hidden">
      {/* Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[#C5A059]/25 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-20 sm:h-24 lg:h-28">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 py-2">
              <Logo size="lg" darkNav={false} />
            </Link>

            {/* Desktop Navigation Links */}
            <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-9">
              <a href="#about" className="text-base font-semibold text-slate-700 hover:text-[#C5A059] transition-colors">
                About
              </a>
              <a href="#for-dmcs" className="text-base font-semibold text-slate-700 hover:text-[#C5A059] transition-colors">
                For DMCs
              </a>
              <a href="#for-buyers" className="text-base font-semibold text-slate-700 hover:text-[#C5A059] transition-colors">
                For Travel Agents
              </a>
              <a href="#products" className="text-base font-semibold text-slate-700 hover:text-[#C5A059] transition-colors">
                Products
              </a>
              <a href="#how-it-works" className="text-base font-semibold text-slate-700 hover:text-[#C5A059] transition-colors">
                How It Works
              </a>
              <a href="#cultural-precision" className="text-base font-semibold text-slate-700 hover:text-[#C5A059] transition-colors">
                Cultural Targeting
              </a>
            </nav>

            {/* Action Buttons - SIGN IN ALWAYS VISIBLE ON ALL SCREENS */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Prominent Sign In Button - ALWAYS VISIBLE */}
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#0B1B2D] bg-[#C5A059]/15 border-2 border-[#C5A059] hover:bg-[#C5A059] hover:text-[#0B1B2D] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-150 shadow-sm"
              >
                <LogIn className="w-4 h-4 sm:w-5 sm:h-5 text-[#9E782F] shrink-0" />
                <span>Sign In</span>
              </Link>

              {/* Registration Buttons - Visible on MD and up */}
              <Link
                href="/auth/register/agent"
                className="hidden md:inline-flex text-sm sm:text-base font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-[#0B1B2D] hover:bg-slate-100 transition-all duration-150"
              >
                Join as Travel Agent
              </Link>
              <Link
                href="/auth/register/dmc"
                className="hidden lg:inline-flex text-sm sm:text-base font-bold px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-[#0B1B2D] text-white hover:bg-[#162B44] shadow-md shadow-[#0B1B2D]/20 transition-all duration-150"
              >
                Join as a DMC
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2.5 rounded-xl border border-slate-200 text-[#0B1B2D] hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-[#C5A059]/30 px-6 py-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col gap-3 text-base font-semibold text-slate-700">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1.5 border-b border-slate-100">About</a>
              <a href="#for-dmcs" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1.5 border-b border-slate-100">For DMCs</a>
              <a href="#for-buyers" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1.5 border-b border-slate-100">For Travel Agents</a>
              <a href="#products" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1.5 border-b border-slate-100">Products</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1.5 border-b border-slate-100">How It Works</a>
              <a href="#cultural-precision" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A059] py-1.5 border-b border-slate-100">Cultural Targeting</a>
            </nav>

            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/auth/register/agent"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-base font-bold py-3 rounded-xl border-2 border-[#C5A059] text-[#0B1B2D]"
              >
                Join as Travel Agent
              </Link>
              <Link
                href="/auth/register/dmc"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-base font-bold py-3 rounded-xl bg-[#0B1B2D] text-white shadow-md"
              >
                Join as a DMC Supplier
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="pt-24 lg:pt-28">
        <main>
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-white py-16 lg:py-24" aria-label="Hero">
            {/* Subtle Grid overlay */}
            <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C5A059" strokeWidth="0.5" strokeOpacity="0.15" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-grid)" />
            </svg>

            {/* Ambient Gold Radial Glow */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.15),transparent_65%)]" />
            <div className="absolute left-0 top-1/4 bottom-1/4 w-2 rounded-r bg-gradient-to-b from-transparent via-[#C5A059] to-transparent" />

            <div className="relative z-10 w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Left Hero Column */}
                <div className="lg:col-span-7">
                  {/* Gold Pill Badge */}
                  <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 text-[#9E782F] text-xs sm:text-sm font-bold uppercase tracking-widest">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    Global B2B Travel Marketplace
                  </div>

                  <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight text-[#0B1B2D] mb-6 font-serif">
                    Where DMCs Sell. <br />
                    <span className="gold-gradient-text">Where Travel Agents Buy.</span>
                  </h1>

                  <p className="text-lg lg:text-2xl text-slate-600 max-w-3xl leading-relaxed mb-10 font-medium">
                    DMCXchange is the open marketplace where Destination Management Companies list their products and Travel Agents discover, compare, and purchase destination services — all on one platform.
                  </p>

                  <div className="flex flex-wrap gap-5 mb-16">
                    <Link
                      href="/auth/register/dmc"
                      className="inline-flex items-center gap-3 px-9 py-4.5 rounded-xl font-bold text-base bg-[#0B1B2D] text-white hover:bg-[#162B44] shadow-xl shadow-[#0B1B2D]/20 transition-all duration-200"
                    >
                      <span>List Your Products</span>
                      <ArrowRight className="w-5 h-5 text-[#C5A059]" />
                    </Link>
                    <Link
                      href="/auth/register/agent"
                      className="inline-flex items-center gap-3 px-9 py-4.5 rounded-xl font-bold text-base border-2 border-[#C5A059] text-[#0B1B2D] hover:bg-[#C5A059]/10 transition-all duration-200"
                    >
                      <span>Join as a Travel Agent</span>
                      <ChevronRight className="w-5 h-5 text-[#C5A059]" />
                    </Link>
                  </div>
                </div>

                {/* Right Hero Graphic / Dashboard Showcase Card */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-3xl p-8 bg-[#0B1B2D] text-white border-2 border-[#C5A059]/40 shadow-2xl shadow-[#0B1B2D]/30 overflow-hidden">
                    <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#C5A059]/20 rounded-full blur-3xl" />
                    
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-700">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">Live Marketplace Overview</div>
                        <div className="text-xl font-serif font-bold text-white mt-1">DMCXchange Network</div>
                      </div>
                      <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="bg-[#162B44] p-4 rounded-xl border border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059]">
                            <Globe className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold">Verified DMC Partners</div>
                            <div className="text-xs text-slate-400">90+ Countries Connected</div>
                          </div>
                        </div>
                        <span className="text-base font-bold text-[#C5A059] font-serif">500+</span>
                      </div>

                      <div className="bg-[#162B44] p-4 rounded-xl border border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059]">
                            <Package className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold">Destination Packages</div>
                            <div className="text-xs text-slate-400">Tours, MICE, Transfers, Visas</div>
                          </div>
                        </div>
                        <span className="text-base font-bold text-[#C5A059] font-serif">10,000+</span>
                      </div>

                      <div className="bg-[#162B44] p-4 rounded-xl border border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059]">
                            <Zap className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold">Instant 48-Hour Holds</div>
                            <div className="text-xs text-slate-400">Direct Agent Booking Engine</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-400 px-2.5 py-1 bg-emerald-950/60 rounded border border-emerald-500/40">ACTIVE</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-700 text-center">
                      <Link href="/auth/login" className="text-sm font-bold text-[#C5A059] hover:underline inline-flex items-center gap-2">
                        <span>Access Live Marketplace Inventory</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>

              </div>

              {/* Stats Bar Full Width */}
              <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 rounded-2xl border border-[#C5A059]/30 bg-white/90 shadow-xl shadow-[#0B1B2D]/05 backdrop-blur-sm divide-x divide-slate-100">
                <div className="p-8 text-center sm:text-left">
                  <div className="text-4xl font-bold text-[#0B1B2D] font-serif gold-gradient-text">500+</div>
                  <div className="text-sm font-semibold text-slate-500 mt-1">DMCs Listed</div>
                </div>
                <div className="p-8 text-center sm:text-left">
                  <div className="text-4xl font-bold text-[#0B1B2D] font-serif gold-gradient-text">90+</div>
                  <div className="text-sm font-semibold text-slate-500 mt-1">Countries</div>
                </div>
                <div className="p-8 text-center sm:text-left">
                  <div className="text-4xl font-bold text-[#0B1B2D] font-serif gold-gradient-text">10,000+</div>
                  <div className="text-sm font-semibold text-slate-500 mt-1">Products Available</div>
                </div>
                <div className="p-8 text-center sm:text-left">
                  <div className="text-4xl font-bold text-[#0B1B2D] font-serif gold-gradient-text">1</div>
                  <div className="text-sm font-semibold text-slate-500 mt-1">Global Platform</div>
                </div>
              </div>

            </div>
          </section>

          {/* What is DMCXchange / DMC Hub */}
          <section id="about" className="py-24 lg:py-32 bg-white relative border-t border-b border-slate-200">
            <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                <div className="lg:col-span-7">
                  <p className="text-xs font-bold tracking-widest uppercase text-[#9E782F] mb-3">What is DMCXchange?</p>
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#0B1B2D] leading-tight mb-8 font-serif">
                    One marketplace. <br />
                    <span className="text-slate-600">Thousands of destination products.</span>
                  </h2>
                  <div className="flex flex-col gap-6 text-slate-600 text-lg leading-relaxed font-normal">
                    <p>
                      DMCXchange is a global B2B marketplace where Destination Management Companies connect with Travel Agents to buy and sell destination products and services.
                    </p>
                    <p>
                      DMCs create digital storefronts and list their full inventory — tour packages, sightseeing, transfers, hotels, MICE services, transportation, visas, and more. Travel Agents search, compare, request quotations, negotiate terms, and purchase with confidence.
                    </p>
                    <p>
                      Unlike traditional platforms limited to a single supplier, DMCXchange is an open marketplace — multiple DMCs, thousands of products, one place to buy and sell.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-6">
                  {/* Vision Card */}
                  <div className="rounded-2xl p-8 sm:p-10 border border-[#C5A059]/40 bg-[#0B1B2D] text-white shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1.5 h-6 rounded-full bg-[#C5A059]" />
                      <span className="text-xs font-bold tracking-widest uppercase text-[#C5A059]">Our Vision</span>
                    </div>
                    <p className="text-slate-200 text-base leading-relaxed font-medium">
                      To become the world's leading B2B marketplace for destination management — empowering every DMC to reach global travel buyers while giving every Travel Agent instant access to trusted destination expertise.
                    </p>
                  </div>

                  {/* Mission Card */}
                  <div className="rounded-2xl p-8 sm:p-10 border border-slate-200 bg-[#F8FAFC] luxury-card-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1.5 h-6 rounded-full bg-slate-400" />
                      <span className="text-xs font-bold tracking-widest uppercase text-slate-500">Our Mission</span>
                    </div>
                    <p className="text-slate-600 text-base leading-relaxed">
                      To simplify the buying and selling of destination products through a transparent, technology-driven marketplace where DMCs and Travel Agents connect, collaborate, and grow together.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Built for both sides */}
          <section id="for-dmcs" className="py-24 lg:py-32 bg-[#F8FAFC]">
            <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-16">
              <div className="mb-16 text-center max-w-4xl mx-auto">
                <p className="text-xs font-bold tracking-widest uppercase text-[#9E782F] mb-3">Built for both sides</p>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#0B1B2D] font-serif">
                  Designed for DMCs. <span className="gold-gradient-text">Built for Travel Agents.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* For DMCs Card */}
                <div id="for-dmcs-card" className="rounded-3xl p-8 sm:p-12 border border-[#C5A059]/40 bg-[#0B1B2D] text-white flex flex-col justify-between shadow-2xl">
                  <div>
                    <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-md border border-[#C5A059]/50 text-[#C5A059] bg-[#C5A059]/10 mb-8">
                      For DMCs
                    </span>
                    <h3 className="text-3xl lg:text-4xl font-bold text-white font-serif mb-4">
                      Your global digital storefront.
                    </h3>
                    <p className="text-base text-slate-300 mb-10 leading-relaxed">
                      List your products. Reach travel agents worldwide. Grow beyond traditional markets.
                    </p>

                    <div className="flex flex-col gap-8">
                      <div className="flex gap-5">
                        <div className="w-1.5 shrink-0 rounded-full bg-[#C5A059]" />
                        <div>
                          <h4 className="text-lg font-semibold text-white font-serif mb-1">Create your digital storefront</h4>
                          <p className="text-base text-slate-300 leading-relaxed">Upload tour packages, sightseeing experiences, transfers, hotels, MICE services, transportation, visas, and any destination product you offer.</p>
                        </div>
                      </div>
                      <div className="flex gap-5">
                        <div className="w-1.5 shrink-0 rounded-full bg-[#C5A059]" />
                        <div>
                          <h4 className="text-lg font-semibold text-white font-serif mb-1">Gain global visibility</h4>
                          <p className="text-base text-slate-300 leading-relaxed">Your products are discoverable by thousands of travel agents searching for destination services across your markets.</p>
                        </div>
                      </div>
                      <div className="flex gap-5">
                        <div className="w-1.5 shrink-0 rounded-full bg-[#C5A059]" />
                        <div>
                          <h4 className="text-lg font-semibold text-white font-serif mb-1">Manage enquiries and quotations</h4>
                          <p className="text-base text-slate-300 leading-relaxed">Receive structured enquiries, respond with quotations, negotiate commercial terms, and close deals — all within the platform.</p>
                        </div>
                      </div>
                      <div className="flex gap-5">
                        <div className="w-1.5 shrink-0 rounded-full bg-[#C5A059]" />
                        <div>
                          <h4 className="text-lg font-semibold text-white font-serif mb-1">Expand beyond traditional markets</h4>
                          <p className="text-base text-slate-300 leading-relaxed">Reach new travel buyers in markets you've never accessed before, without the cost of international trade shows or sales teams.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-slate-700">
                    <Link
                      href="/auth/register/dmc"
                      className="inline-flex items-center gap-3 text-base font-bold text-[#C5A059] hover:text-[#E5C158] transition-all"
                    >
                      <span>Join as a DMC Supplier</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                {/* For Travel Agents Card */}
                <div id="for-buyers" className="rounded-3xl p-8 sm:p-12 border border-[#C5A059]/30 bg-white text-[#0F172A] flex flex-col justify-between luxury-card-shadow">
                  <div>
                    <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-md border border-slate-200 text-slate-600 bg-slate-100 mb-8">
                      For Travel Agents
                    </span>
                    <h3 className="text-3xl lg:text-4xl font-bold text-[#0B1B2D] font-serif mb-4">
                      Join the marketplace. Find destination products.
                    </h3>
                    <p className="text-base text-slate-600 mb-10 leading-relaxed">
                      Register as a Travel Agent, search thousands of products from verified DMCs, and build your global supplier network.
                    </p>

                    <div className="flex flex-col gap-8">
                      <div className="flex gap-5">
                        <div className="w-1.5 shrink-0 rounded-full bg-[#0B1B2D]" />
                        <div>
                          <h4 className="text-lg font-semibold text-[#0B1B2D] font-serif mb-1">Search thousands of destination products</h4>
                          <p className="text-base text-slate-600 leading-relaxed">Browse tour packages, transfers, sightseeing, hotels, MICE, and more from verified DMCs across multiple countries.</p>
                        </div>
                      </div>
                      <div className="flex gap-5">
                        <div className="w-1.5 shrink-0 rounded-full bg-[#0B1B2D]" />
                        <div>
                          <h4 className="text-lg font-semibold text-[#0B1B2D] font-serif mb-1">Compare DMCs and offerings</h4>
                          <p className="text-base text-slate-600 leading-relaxed">View detailed profiles, product specifications, and pricing from multiple DMCs side by side to find the best fit for your clients.</p>
                        </div>
                      </div>
                      <div className="flex gap-5">
                        <div className="w-1.5 shrink-0 rounded-full bg-[#0B1B2D]" />
                        <div>
                          <h4 className="text-lg font-semibold text-[#0B1B2D] font-serif mb-1">Communicate and negotiate directly</h4>
                          <p className="text-base text-slate-600 leading-relaxed">Message DMCs directly, request quotations, and negotiate commercial terms without intermediaries.</p>
                        </div>
                      </div>
                      <div className="flex gap-5">
                        <div className="w-1.5 shrink-0 rounded-full bg-[#0B1B2D]" />
                        <div>
                          <h4 className="text-lg font-semibold text-[#0B1B2D] font-serif mb-1">Purchase with confidence</h4>
                          <p className="text-base text-slate-600 leading-relaxed">All DMCs on the platform are verified. Buy destination products knowing you're working with trusted, credentialed local experts.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-slate-200">
                    <Link
                      href="/auth/register/agent"
                      className="inline-flex items-center gap-3 text-base font-bold text-[#0B1B2D] hover:text-[#C5A059] transition-all"
                    >
                      <span>Join as a Travel Buyer</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Destination Products Grid - 6 Columns Wide */}
          <section id="products" className="py-24 lg:py-32 bg-white border-t border-slate-200">
            <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-16">
              <div className="mb-16 text-center lg:text-left">
                <p className="text-xs font-bold tracking-widest uppercase text-[#9E782F] mb-3">What you can buy and sell</p>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#0B1B2D] font-serif max-w-2xl">
                  Every destination product. <br />
                  <span className="gold-gradient-text">One marketplace.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {[
                  {
                    icon: Package,
                    title: "Tour Packages",
                    desc: "Multi-day itineraries, group tours, FIT packages, and custom destination programmes."
                  },
                  {
                    icon: Camera,
                    title: "Sightseeing & Experiences",
                    desc: "City tours, cultural experiences, adventure activities, and local excursions."
                  },
                  {
                    icon: Car,
                    title: "Transfers & Transport",
                    desc: "Airport transfers, private vehicles, coach hire, and ground transportation."
                  },
                  {
                    icon: Hotel,
                    title: "Hotels & Stays",
                    desc: "Hotel contracting, accommodation packages, and resort programmes."
                  },
                  {
                    icon: Briefcase,
                    title: "MICE Services",
                    desc: "Meetings, incentives, conferences, and events — fully managed by local experts."
                  },
                  {
                    icon: FileText,
                    title: "Visas & Docs",
                    desc: "Visa assistance, travel documentation, and entry requirement support."
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F8FAFC] rounded-2xl p-7 border border-[#C5A059]/20 hover:border-[#C5A059] luxury-card-shadow transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-[#C5A059]/15 flex items-center justify-center mb-6 group-hover:bg-[#0B1B2D] transition-colors duration-300">
                        <item.icon className="w-7 h-7 text-[#9E782F] group-hover:text-[#C5A059] transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold text-[#0B1B2D] font-serif mb-3">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="py-24 lg:py-32 bg-[#F8FAFC]">
            <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-16">
              <div className="mb-16 text-center max-w-4xl mx-auto">
                <p className="text-xs font-bold tracking-widest uppercase text-[#9E782F] mb-3">How it works</p>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#0B1B2D] font-serif">
                  From listing to purchase — <span className="gold-gradient-text">on one platform.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* DMC Steps */}
                <div className="bg-[#0B1B2D] text-white p-8 sm:p-12 rounded-3xl border border-[#C5A059]/40 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="mb-10">
                      <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-2 rounded border border-[#C5A059]/50 text-[#C5A059] bg-[#C5A059]/10">
                        For DMCs
                      </span>
                    </div>
                    <div className="flex flex-col gap-10">
                      <div className="flex gap-6">
                        <div className="text-5xl font-bold font-serif text-[#C5A059] shrink-0 w-14">01</div>
                        <div>
                          <h3 className="text-xl font-bold text-white font-serif mb-2">Create your storefront</h3>
                          <p className="text-base text-slate-300 leading-relaxed">Register as a DMC, build your profile, and upload your destination products with full descriptions, pricing, and availability.</p>
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div className="text-5xl font-bold font-serif text-[#C5A059] shrink-0 w-14">02</div>
                        <div>
                          <h3 className="text-xl font-bold text-white font-serif mb-2">Receive enquiries</h3>
                          <p className="text-base text-slate-300 leading-relaxed">Travel agents discover your products, send enquiries, and request quotations directly through the platform.</p>
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div className="text-5xl font-bold font-serif text-[#C5A059] shrink-0 w-14">03</div>
                        <div>
                          <h3 className="text-xl font-bold text-white font-serif mb-2">Close deals and grow</h3>
                          <p className="text-base text-slate-300 leading-relaxed">Respond to enquiries, negotiate terms, confirm bookings, and build lasting commercial relationships with global buyers.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12">
                    <Link
                      href="/auth/register/dmc"
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base bg-[#C5A059] text-[#0B1B2D] hover:bg-[#D4AF37] shadow-lg transition-all"
                    >
                      <span>Join as a DMC</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                {/* Travel Agent Steps */}
                <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 luxury-card-shadow flex flex-col justify-between">
                  <div>
                    <div className="mb-10">
                      <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-2 rounded border border-slate-200 text-slate-600 bg-slate-100">
                        For Travel Agents
                      </span>
                    </div>
                    <div className="flex flex-col gap-10">
                      <div className="flex gap-6">
                        <div className="text-5xl font-bold font-serif text-slate-400 shrink-0 w-14">01</div>
                        <div>
                          <h3 className="text-xl font-bold text-[#0B1B2D] font-serif mb-2">Register as a Travel Agent</h3>
                          <p className="text-base text-slate-600 leading-relaxed">Create your free account as a Travel Agent or travel buyer. Verification is quick — you're in the marketplace within minutes.</p>
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div className="text-5xl font-bold font-serif text-slate-400 shrink-0 w-14">02</div>
                        <div>
                          <h3 className="text-xl font-bold text-[#0B1B2D] font-serif mb-2">Search and compare DMC products</h3>
                          <p className="text-base text-slate-600 leading-relaxed">Browse thousands of destination products from verified DMCs. Filter by country, product type, or service category and compare offerings side by side.</p>
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div className="text-5xl font-bold font-serif text-slate-400 shrink-0 w-14">03</div>
                        <div>
                          <h3 className="text-xl font-bold text-[#0B1B2D] font-serif mb-2">Enquire, negotiate, and purchase</h3>
                          <p className="text-base text-slate-600 leading-relaxed">Send enquiries directly to DMCs, request quotations, negotiate commercial terms, and build a reliable global supplier network.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12">
                    <Link
                      href="/auth/register/agent"
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base border-2 border-[#C5A059] text-[#0B1B2D] hover:bg-[#C5A059]/10 transition-all"
                    >
                      <span>Join as a Travel Agent</span>
                      <ChevronRight className="w-5 h-5 text-[#C5A059]" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cultural Targeting Section (DMChub Signature Feature) */}
          <section id="cultural-precision" className="py-24 lg:py-32 bg-white border-t border-b border-slate-200 relative overflow-hidden">
            <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-7 space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[#C5A059]/40 bg-[#C5A059]/10 text-[#9E782F] text-xs font-bold uppercase tracking-widest">
                    Signature Technology
                  </div>
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#0B1B2D] font-serif leading-tight">
                    Engineered for <br />
                    <span className="gold-gradient-text">Cultural Precision</span>
                  </h2>
                  <p className="text-xl text-slate-600 leading-relaxed font-normal max-w-3xl">
                    The only B2B marketplace that accounts for demographic and dietary nuances. Filter & match packages based on client nationality, prayer proximity, dietary certifications, and specific lifestyle requirements.
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {[
                      "Nationality-tailored hotel & menu curation",
                      "Proximity to mosques and places of worship",
                      "Dietary alignment (Halal, Pure Jain, Vegan)",
                      "Proximity to specialized ethnic markets"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-slate-700 font-semibold text-base">
                        <CheckCircle2 className="text-[#C5A059] w-6 h-6 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6">
                    <Link
                      href="/auth/register/agent"
                      className="inline-flex items-center gap-3 px-9 py-4 rounded-xl font-bold text-base bg-[#0B1B2D] text-white shadow-xl hover:bg-[#162B44] transition-all"
                    >
                      <span>Explore Cultural Search</span>
                      <ArrowRight className="w-5 h-5 text-[#C5A059]" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-200 luxury-card-shadow">
                    <Users className="w-10 h-10 text-[#9E782F] mb-4" />
                    <h4 className="font-bold text-[#0B1B2D] font-serif text-xl mb-2">Indian Travelers</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">Hotels near Indian stores and verified pure vegetarian dining options.</p>
                  </div>
                  <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-200 luxury-card-shadow">
                    <MapPin className="w-10 h-10 text-[#9E782F] mb-4" />
                    <h4 className="font-bold text-[#0B1B2D] font-serif text-xl mb-2">GCC & Middle East</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">Private luxury suites near mosques with dedicated family spaces.</p>
                  </div>
                  <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-200 luxury-card-shadow">
                    <Globe className="w-10 h-10 text-[#9E782F] mb-4" />
                    <h4 className="font-bold text-[#0B1B2D] font-serif text-xl mb-2">European Groups</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">Curated itineraries aligned with seasonal regional holidays and language support.</p>
                  </div>
                  <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-200 luxury-card-shadow">
                    <Zap className="w-10 h-10 text-[#9E782F] mb-4" />
                    <h4 className="font-bold text-[#0B1B2D] font-serif text-xl mb-2">48-Hour Holds</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">Lock in inventory and custom package rates with 1-click holds.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Connected Ecosystem */}
          <section className="py-24 lg:py-32 bg-[#F8FAFC]">
            <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-6">
                  <p className="text-xs font-bold tracking-widest uppercase text-[#9E782F] mb-3">Beyond buying and selling</p>
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#0B1B2D] font-serif leading-tight mb-6">
                    A connected ecosystem for the <span className="gold-gradient-text">global travel industry.</span>
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    DMCXchange is building more than a marketplace. The platform supports supplier discovery, business networking, content distribution, technology integrations, API connectivity, and future collaboration tools that simplify how destination businesses operate and grow together.
                  </p>
                </div>

                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 luxury-card-shadow">
                    <div className="w-12 h-12 rounded-xl bg-[#C5A059]/15 flex items-center justify-center mb-4">
                      <Globe className="w-6 h-6 text-[#9E782F]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1B2D] font-serif mb-2">Supplier Discovery</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">Find and vet DMC partners through structured profiles and verified credentials.</p>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-slate-200 luxury-card-shadow">
                    <div className="w-12 h-12 rounded-xl bg-[#C5A059]/15 flex items-center justify-center mb-4">
                      <Network className="w-6 h-6 text-[#9E782F]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1B2D] font-serif mb-2">Business Networking</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">Build lasting commercial relationships beyond one-off transactions.</p>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-slate-200 luxury-card-shadow">
                    <div className="w-12 h-12 rounded-xl bg-[#C5A059]/15 flex items-center justify-center mb-4">
                      <Rss className="w-6 h-6 text-[#9E782F]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1B2D] font-serif mb-2">Content Distribution</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">Distribute destination content and product information across connected channels.</p>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-slate-200 luxury-card-shadow">
                    <div className="w-12 h-12 rounded-xl bg-[#C5A059]/15 flex items-center justify-center mb-4">
                      <Plug className="w-6 h-6 text-[#9E782F]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1B2D] font-serif mb-2">API Connectivity</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">Connect DMCXchange to your TMS, CRM, or booking engine via REST API.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to action section */}
          <section className="py-24 lg:py-32 bg-[#0B1B2D] text-white relative overflow-hidden">
            <div className="relative z-10 w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-6">
                  <div className="w-16 h-1.5 rounded bg-[#C5A059] mb-8" />
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white font-serif leading-tight mb-6">
                    One Marketplace. <br />
                    <span className="gold-gradient-text">Two Ways to Join.</span>
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
                    Whether you're a DMC ready to reach global buyers or a Travel Agent searching for trusted local experts — DMCXchange is your platform.
                  </p>
                </div>

                <div className="lg:col-span-6 flex flex-col gap-6">
                  {/* Join as DMC Card */}
                  <Link
                    href="/auth/register/dmc"
                    className="group p-8 rounded-3xl bg-[#162B44] border border-[#C5A059]/30 hover:border-[#C5A059] transition-all flex items-start gap-6 shadow-xl"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#C5A059] text-[#0B1B2D] font-bold text-xl flex items-center justify-center shrink-0">
                      D
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-bold text-white font-serif text-xl">Join as a DMC</span>
                        <ArrowRight className="w-6 h-6 text-[#C5A059] group-hover:translate-x-1.5 transition-transform" />
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Create your digital storefront, list your destination products, and connect with travel agents worldwide.
                      </p>
                    </div>
                  </Link>

                  {/* Join as Travel Agent Card */}
                  <Link
                    href="/auth/register/agent"
                    className="group p-8 rounded-3xl bg-[#061121] border border-slate-700 hover:border-[#C5A059] transition-all flex items-start gap-6"
                  >
                    <div className="w-14 h-14 rounded-2xl border border-slate-500 text-slate-200 font-bold text-xl flex items-center justify-center shrink-0">
                      T
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-bold text-white font-serif text-xl">Join as a Travel Agent</span>
                        <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-[#C5A059] group-hover:translate-x-1.5 transition-all" />
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Register free, search thousands of destination products from verified DMCs across 90+ countries, and build your global supplier network.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#061121] border-t border-[#C5A059]/20 py-20 text-slate-400 text-sm">
        <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <Logo size="lg" darkNav={true} />
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                The global B2B marketplace connecting Destination Management Companies with the world's leading travel buyers.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-5">For DMCs</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/auth/register/dmc" className="hover:text-white transition-colors">Join Marketplace</Link></li>
                <li><a href="#for-dmcs" className="hover:text-white transition-colors">Platform Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-5">For Buyers</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/auth/register/agent" className="hover:text-white transition-colors">Find DMCs</Link></li>
                <li><a href="#for-buyers" className="hover:text-white transition-colors">Sourcing Workflow</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Destination Inventory</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-5">Platform</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#cultural-precision" className="hover:text-white transition-colors">Cultural Targeting</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><Link href="/auth/login" className="hover:text-white transition-colors">Sign In</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>© 2026 DMCXchange / DMC Hub Marketplace. All rights reserved.</p>
            <div className="flex items-center gap-8">
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
