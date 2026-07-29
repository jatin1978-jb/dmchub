import { getAgentHolds } from "@/app/actions/booking"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, Users, MapPin, ChevronRight } from "lucide-react"
import Link from "next/link"

export default async function AgentHoldsPage() {
  const holds = await getAgentHolds()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">My Holds Queue</h1>
        <p className="text-gray-500 font-bold">Manage your active package reservations before they expire.</p>
      </div>

      {holds.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-100 rounded-3xl p-20 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-2xl font-bold">No active holds</h3>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto">
            Find the perfect package in the marketplace and place it on hold to secure the price for 48 hours.
          </p>
          <Link href="/agent/search">
            <button className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
              Browse Marketplace
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {holds.map((hold) => {
            const daysLeft = Math.ceil((new Date(hold.holdExpires).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
            
            return (
              <div key={hold.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <Badge className={cn(
                      "border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest",
                      daysLeft <= 1 ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                    )}>
                      {daysLeft} Days Remaining
                    </Badge>
                    <p className="text-[10px] font-bold text-gray-400">REF: {hold.id.slice(-6).toUpperCase()}</p>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 line-clamp-1">{hold.package.title}</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-bold">
                      <MapPin className="w-4 h-4 text-red-500" /> {hold.package.destination}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-bold">
                      <Users className="w-4 h-4 text-blue-500" /> {hold.adults} Adults, {hold.children} Children
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Total Value</p>
                      <p className="text-xl font-black text-blue-600">${hold.totalPrice.toFixed(0)}</p>
                    </div>
                    <Link href={`/agent/search/${hold.packageId}`}>
                      <button className="p-3 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-colors group-hover:translate-x-1 transition-transform">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
