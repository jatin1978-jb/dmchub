import { getAdminStats } from "@/app/actions/admin";
import { Users, Package, FileText, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const stats = await getAdminStats();

  const cards = [
    { label: "Total Users", value: stats.userCount, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Pending Requests", value: stats.pendingCount, icon: Clock, color: "text-amber-600", bg: "bg-amber-100", href: "/admin/requests" },
    { label: "Active Packages", value: stats.packageCount, icon: Package, color: "text-indigo-600", bg: "bg-indigo-100" },
    { label: "Total Bookings", value: stats.bookingCount, icon: FileText, color: "text-emerald-600", bg: "bg-emerald-100" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening in the marketplace.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              {card.href && (
                <Link href={card.href} className="text-xs text-blue-600 font-bold flex items-center hover:underline">
                  View All <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              )}
            </div>
            <p className="text-sm text-gray-500 font-medium">{card.label}</p>
            <p className="text-3xl font-bold mt-1">{card.value}</p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center py-20">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Registration Management</h3>
          <p className="text-gray-500 max-w-xs mb-6">You have {stats.pendingCount} pending registration requests waiting for your review.</p>
          <Link href="/admin/requests" className="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-600 hover:bg-blue-700 focus:shadow-outline focus:outline-none">
            Go to Requests
          </Link>
        </div>
        
        <div className="bg-slate-900 p-8 rounded-2xl text-white flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-slate-400 text-sm">Database</span>
                <span className="text-green-400 text-xs font-bold flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  CONNECTED
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-slate-400 text-sm">NextAuth Session</span>
                <span className="text-green-400 text-xs font-bold flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  ACTIVE
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Prisma Engine</span>
                <span className="text-green-400 text-xs font-bold flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  LIBRARY
                </span>
              </div>
            </div>
          </div>
          <div className="mt-8 text-[10px] text-slate-500 font-mono">
            BUILD VERSION: 1.0.0-MVP
          </div>
        </div>
      </div>
    </div>
  );
}
