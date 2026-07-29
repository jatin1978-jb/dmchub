import { getDMCPackages } from "@/app/actions/packages";
import { Package, Calendar, DollarSign, Users, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function DMCDashboard() {
  const packages = await getDMCPackages();

  const stats = [
    { label: "Active Packages", value: packages.length, icon: Package, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "New Bookings", value: 0, icon: Calendar, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Total Revenue", value: "$0", icon: DollarSign, color: "text-indigo-600", bg: "bg-indigo-100" },
    { label: "Total Pax", value: 0, icon: Users, color: "text-amber-600", bg: "bg-amber-100" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">DMC Hub</h1>
          <p className="text-gray-500">Welcome to your partner portal. Manage your inventory and track performance.</p>
        </div>
        <Link 
          href="/dmc/packages/new" 
          className={cn(buttonVariants({ className: "bg-blue-600 hover:bg-blue-700 shadow-md" }))}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Package
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className={`p-2 rounded-lg ${stat.bg} w-fit mb-4`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Recent Packages</h2>
            <Link href="/dmc/packages" className="text-sm text-blue-600 font-bold flex items-center hover:underline">
              Manage All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {packages.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-slate-100 rounded-2xl p-12 text-center">
              <p className="text-gray-400">No packages uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packages.slice(0, 2).map((pkg) => (
                <div key={pkg.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-lg flex-shrink-0" />
                  <div>
                    <h4 className="font-bold line-clamp-1">{pkg.title}</h4>
                    <p className="text-xs text-gray-500">{pkg.destination} • {pkg.durationDays} Days</p>
                    <p className="text-sm font-bold text-blue-600 mt-1">{pkg.currency} {pkg.pricePerPerson}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-blue-600 rounded-3xl p-8 text-white flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
            <p className="text-blue-100 text-sm mb-6">
              Check out our guide on how to optimize your packages for specific nationalities to increase your booking rate.
            </p>
            <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50 border-none font-bold">
              View Guide
            </Button>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-500">
            <p className="text-[10px] text-blue-300 font-mono">DMC ID: PARTNER-{packages.length > 0 ? packages[0].dmcId.slice(-4) : "NEW"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
