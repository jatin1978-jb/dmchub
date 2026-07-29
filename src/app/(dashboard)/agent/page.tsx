import { getAgentStats } from "@/app/actions/booking";
import { Search, Bookmark, ShoppingBag, TrendingUp, ArrowRight, Zap, Globe } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AgentDashboard() {
  const stats = await getAgentStats();

  const cards = [
    { label: "Active Holds", value: stats.holdCount, icon: Bookmark, color: "text-amber-600", bg: "bg-amber-100", href: "/agent/holds" },
    { label: "Confirmed Bookings", value: stats.bookingCount, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-100", href: "/agent/bookings" },
    { label: "Search Queries", value: 0, icon: Search, color: "text-indigo-600", bg: "bg-indigo-100" },
    { label: "Market Growth", value: "+12%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-100" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Hub</h1>
          <p className="text-gray-500">Find, hold, and book premium DMC packages with cultural precision.</p>
        </div>
        <Link 
          href="/agent/search" 
          className={cn(buttonVariants({ className: "bg-blue-600 hover:bg-blue-700 shadow-md" }))}
        >
          <Search className="w-4 h-4 mr-2" />
          Find Packages
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className={`p-2 rounded-lg ${card.bg} w-fit mb-4`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <p className="text-sm text-gray-500 font-medium">{card.label}</p>
            <p className="text-3xl font-bold mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10 max-w-md">
              <h2 className="text-3xl font-bold mb-4">Discover Culturally Targeted Packages</h2>
              <p className="text-slate-400 mb-6">
                Our marketplace helps you find hotels near Indian stores for your Indian clients, or suites near mosques for your Saudi clients.
              </p>
              <Link 
                href="/agent/search" 
                className={cn(buttonVariants({ size: "lg", className: "bg-white text-slate-900 hover:bg-blue-50" }))}
              >
                Start Searching
              </Link>
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <Zap className="w-64 h-64" />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Featured Nationalities</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Indian', 'Saudi', 'Egyptian', 'European'].map((nat) => (
              <Link 
                key={nat} 
                href={`/agent/search?nationality=${nat}`}
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all text-center group"
              >
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-50 transition-colors">
                  <Globe className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <span className="text-sm font-bold">{nat}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-500" />
              Recent Holds
            </h3>
            <div className="space-y-4">
              {stats.holdCount === 0 ? (
                <p className="text-sm text-gray-400 italic">No packages on hold.</p>
              ) : (
                <p className="text-sm text-gray-600">You have {stats.holdCount} active holds. Check them before they expire!</p>
              )}
              <Link 
                href="/agent/holds" 
                className={cn(buttonVariants({ variant: "outline", className: "w-full text-xs font-bold" }))}
              >
                View My Holds
              </Link>
            </div>
          </div>

          <div className="bg-indigo-600 rounded-2xl p-6 text-white">
            <h4 className="font-bold mb-2">Market Insights</h4>
            <p className="text-xs text-indigo-100 mb-4">
              Packages for "Indian" nationality are trending this month in Dubai.
            </p>
            <div className="h-2 bg-indigo-500 rounded-full overflow-hidden">
              <div className="bg-white h-full w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
