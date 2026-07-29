import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Globe, ShieldCheck, Zap, ArrowRight, CheckCircle2, Star, Users, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Globe className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">DMC HUB</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#workflow" className="hover:text-blue-600 transition-colors">Workflow</a>
            <Link href="/auth/login" className="hover:text-blue-600 transition-colors">Sign In</Link>
          </div>
            <Link 
              href="/auth/register/agent" 
              className={cn(buttonVariants({ className: "rounded-full px-8 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100" }))}
            >
              Get Started
            </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-4 text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest animate-fade-in">
            <Star className="w-4 h-4 fill-current" />
            The Future of B2B Travel
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9]">
            The Global Marketplace <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              for Travel Professionals
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-slate-500 font-medium leading-relaxed">
            Connect with premium DMCs worldwide. Find, hold, and book targeted travel packages with cultural precision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link 
              href="/auth/register/agent" 
              className={cn(buttonVariants({ size: "lg", className: "h-16 px-10 rounded-2xl text-lg bg-blue-600 hover:bg-blue-700 shadow-2xl shadow-blue-200" }))}
            >
              Join as Travel Agent
            </Link>
            <Link 
              href="/auth/register/dmc" 
              className={cn(buttonVariants({ variant: "outline", size: "lg", className: "h-16 px-10 rounded-2xl text-lg border-2 hover:bg-slate-50" }))}
            >
              List as DMC
            </Link>
          </div>

          {/* Social Proof / Stats */}
          <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-100 mt-20">
            {[
              { label: "Active DMCs", value: "500+" },
              { label: "Travel Agents", value: "2,000+" },
              { label: "Destinations", value: "120+" },
              { label: "Yearly Bookings", value: "$45M+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-black text-slate-900 mb-1">{stat.value}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Targeting Feature */}
      <section id="features" className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600 opacity-5 -z-0" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-black tracking-tight leading-tight">
                Designed for <br />
                <span className="text-blue-400">Cultural Precision</span>
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed">
                The only marketplace that understands demographic needs. Search packages based on your client's nationality, seasonality, and specific lifestyle requirements.
              </p>
              
              <ul className="space-y-4 pt-4">
                {[
                  "Nationality-based hotel curation",
                  "Proximity to mosques and religious centers",
                  "Dietary alignment (Halal, Jain, Vegan)",
                  "Proximity to specialized ethnic markets"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300 font-bold">
                    <CheckCircle2 className="text-blue-400 w-6 h-6" />
                    {item}
                  </li>
                ))}
                <Link 
                  href="/auth/register/agent" 
                  className={cn(buttonVariants({ size: "lg", className: "bg-white text-slate-900 hover:bg-blue-50" }))}
                >
                  Get Started
                </Link>
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 translate-y-8">
                <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                  <Users className="w-10 h-10 text-blue-400 mb-4" />
                  <h4 className="font-black text-xl mb-2">Indian Travelers</h4>
                  <p className="text-sm text-slate-500">Hotels near Indian stores and markets with veg options.</p>
                </div>
                <div className="bg-blue-600 p-8 rounded-3xl">
                  <MapPin className="w-10 h-10 text-white mb-4" />
                  <h4 className="font-black text-xl mb-2">Saudi Families</h4>
                  <p className="text-sm text-blue-100">Large suites near mosques with private family areas.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                  <Globe className="w-10 h-10 text-indigo-400 mb-4" />
                  <h4 className="font-black text-xl mb-2">Egyptian Clients</h4>
                  <p className="text-sm text-slate-500">Curated packages aligned with regional holidays and visa ease.</p>
                </div>
                <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                  <Zap className="w-10 h-10 text-amber-400 mb-4" />
                  <h4 className="font-black text-xl mb-2">Instant Holds</h4>
                  <p className="text-sm text-slate-500">Lock in rates for 48 hours with a single click.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Globe className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">DMC HUB</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">
            © 2026 DMC Hub Marketplace. All rights reserved. Built for Travel Professionals.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Globe className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Users className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Zap className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
