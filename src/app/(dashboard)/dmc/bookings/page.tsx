import { getDMCBookings } from "@/app/actions/dmc"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, Users, CreditCard } from "lucide-react"

export default async function DMCBookingsPage() {
  const { holds, bookings } = await getDMCBookings()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Partner Activity</h1>
        <p className="text-gray-500">Monitor your active holds and confirmed bookings from travel agents.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Holds Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-xl font-bold">Active Holds ({holds.length})</h2>
          </div>

          {holds.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-slate-100 rounded-3xl p-12 text-center text-gray-400 font-bold">
              No active holds at the moment.
            </div>
          ) : (
            <div className="space-y-4">
              {holds.map((hold) => (
                <div key={hold.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-black text-lg">{hold.package.title}</h4>
                      <p className="text-sm text-gray-500 font-bold">Held by: {hold.agent.agencyName}</p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none">HOLDING</Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-50">
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Pax</p>
                      <p className="font-black text-slate-700">{hold.adults}A + {hold.children}C</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Value</p>
                      <p className="font-black text-blue-600">${hold.totalPrice.toFixed(0)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Expires</p>
                      <p className="font-black text-red-500">{new Date(hold.holdExpires).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bookings Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold">Confirmed Bookings ({bookings.length})</h2>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-slate-100 rounded-3xl p-12 text-center text-gray-400 font-bold">
              No confirmed bookings yet.
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm border-l-4 border-l-emerald-500">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-black text-lg">{booking.package.title}</h4>
                      <p className="text-sm text-gray-500 font-bold">Agent: {booking.agent.agencyName}</p>
                    </div>
                    <Badge className="bg-emerald-500 text-white border-none">CONFIRMED</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-50">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Total Pax</p>
                        <p className="font-black">{booking.paxCount} Travelers</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-emerald-500" />
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Revenue</p>
                        <p className="font-black text-emerald-600">${booking.totalPrice.toFixed(0)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
