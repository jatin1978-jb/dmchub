import { getAgentStats } from "@/app/actions/booking";
import { Search, Bookmark, ShoppingBag, TrendingUp, ArrowRight, ShieldCheck, Building2, Calendar, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AgentDashboard() {
  const stats = await getAgentStats();

  const cards = [
    { label: "Active Allotment Holds", value: stats.holdCount, icon: Bookmark, color: "text-[#C5A059]", bg: "bg-amber-50 border border-amber-200", href: "/agent/holds" },
    { label: "Confirmed Delegate Vouchers", value: stats.bookingCount, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50 border border-blue-200", href: "/agent/bookings" },
    { label: "Active Congress Events", value: "3 Events", icon: Building2, color: "text-emerald-600", bg: "bg-emerald-50 border border-emerald-200", href: "/pco" },
    { label: "Merchant Allotment Value", value: "€148,200", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50 border border-purple-200" },
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0B1B2D] to-[#162B44] text-white p-8 rounded-2xl border border-[#C5A059]/30 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Appointed Merchant of Record
            </span>
            <span className="text-xs text-slate-300 font-mono">Apex MICE & Travel Services Ltd (IATA #98234-EU)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif">
            Travel Agent Management Hub
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Manage congress room block allotments, group delegate holds, instant PDF voucher issuance, and sub-agent net rates on the PCOXchange platform.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            href="/agent/search" 
            className="h-11 px-5 rounded-xl bg-[#C5A059] text-[#0B1B2D] font-bold text-sm hover:bg-[#D4AF37] transition-all flex items-center gap-2 shadow-lg shadow-[#C5A059]/20"
          >
            <Search className="w-4 h-4" /> Search Congress Rooms
          </Link>
        </div>
      </div>

      {/* Governance & Merchant Disclosure */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-950 text-xs">
        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-amber-900 uppercase tracking-wider">
            Merchant of Record Operating Policy
          </p>
          <p>
            As the designated Travel Partner for assigned congress events, your agency is the merchant of record responsible for delegate payment processing, invoicing, and voucher fulfillment. PCOXchange serves as your software infrastructure provider.
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className={`p-2 rounded-xl ${card.bg} w-fit`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{card.label}</p>
            <p className="text-3xl font-bold text-[#0B1B2D]">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0B1B2D] text-white rounded-3xl p-8 border border-[#C5A059]/30 relative overflow-hidden space-y-4">
            <div className="inline-block px-3 py-1 bg-[#C5A059]/20 text-[#C5A059] rounded-full text-xs font-bold uppercase tracking-wider">
              Featured Allotment Contract
            </div>
            <h2 className="text-2xl font-bold font-serif">World Cardiology Congress 2026 (WCC)</h2>
            <p className="text-slate-300 text-xs leading-relaxed max-w-lg">
              Paris Expo Porte de Versailles • 4,200 Contracted Rooms across 12 Official Hotels. Release date: Sept 15, 2026.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <Link 
                href="/agent/search" 
                className="h-10 px-5 rounded-xl bg-[#C5A059] text-[#0B1B2D] font-bold text-xs hover:bg-[#D4AF37] transition-all inline-flex items-center gap-2"
              >
                Manage Allotments <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/booking/confirmation"
                className="h-10 px-5 rounded-xl border border-slate-700 text-white font-bold text-xs hover:bg-slate-800 transition-all inline-flex items-center gap-2"
              >
                Sample Delegate Voucher
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-[#0B1B2D] text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#C5A059]" /> Quick Voucher & Manifest Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <Link 
                href="/booking/confirmation"
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#C5A059] transition-all space-y-1 block"
              >
                <div className="font-bold text-[#0B1B2D]">Generate Delegate PDF Voucher</div>
                <p className="text-slate-500">Issue instant confirmation with QR code and hotel details.</p>
              </Link>

              <Link 
                href="/agent/holds"
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#C5A059] transition-all space-y-1 block"
              >
                <div className="font-bold text-[#0B1B2D]">Manage Group Room Blocks</div>
                <p className="text-slate-500">Extend holds, assign rooming lists, and process group payments.</p>
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-[#0B1B2D] flex items-center gap-2 text-sm">
              <Bookmark className="w-4 h-4 text-[#C5A059]" />
              Group Holds Status
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between font-bold text-[#0B1B2D]">
                  <span>Novotel Paris Centre</span>
                  <span className="text-amber-600">Hold Active</span>
                </div>
                <p className="text-slate-500">14 Rooms Held for WCC Delegate Group</p>
                <p className="text-[10px] text-slate-400 font-mono">Expires in 48 hours</p>
              </div>

              <Link 
                href="/agent/holds" 
                className={cn(buttonVariants({ variant: "outline", className: "w-full text-xs font-bold" }))}
              >
                View All Holds
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
