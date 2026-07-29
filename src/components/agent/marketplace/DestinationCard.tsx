import { Destination } from "@prisma/client"
import { VisaEligibilityResult } from "./MarketplaceClient"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ShieldCheck, AlertTriangle } from "lucide-react"

interface DestinationCardProps {
  destination: Destination & { _count: { packages: number } }
  visaResult?: VisaEligibilityResult
  onClick: (id: string) => void
}

export default function DestinationCard({ destination, visaResult, onClick }: DestinationCardProps) {
  const isRestricted = visaResult && !visaResult.eligible

  return (
    <div 
      className={`group relative ${isRestricted ? "cursor-not-allowed" : "cursor-pointer"}`}
      onClick={() => {
        if (!isRestricted) {
          onClick(destination.id)
        }
      }}
    >
      <Card className={`overflow-hidden border-gray-100 transition-all duration-300 h-full flex flex-col bg-white
        ${isRestricted ? 'opacity-60 grayscale hover:opacity-70' : 'hover:shadow-xl hover:-translate-y-1 shadow-sm'}
      `}>
        {/* Tooltip Overlay for Restricted */}
        {isRestricted && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
            <div className="bg-slate-900/90 backdrop-blur-sm text-white p-4 rounded-2xl text-center shadow-2xl max-w-[80%] border border-slate-700 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100">
              <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto mb-2" />
              <p className="font-bold">Not Eligible</p>
              <p className="text-sm text-slate-300 mt-1">{visaResult.reason}</p>
            </div>
          </div>
        )}

        <div className="h-48 bg-slate-100 relative overflow-hidden">
          {destination.heroImage ? (
            <img 
              src={destination.heroImage} 
              alt={destination.name} 
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${!isRestricted && 'group-hover:scale-105'}`}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
              <MapPin className="w-8 h-8 text-slate-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
          
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-white/90 text-slate-900 hover:bg-white backdrop-blur-sm border-none shadow-sm font-semibold">
              {destination.countryCode}
            </Badge>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white z-10">
            <h3 className="text-2xl font-bold tracking-tight">{destination.name}</h3>
            <p className="text-sm text-slate-200 font-medium">{destination._count.packages} packages available</p>
          </div>
        </div>
        
        <CardContent className="p-5 flex-grow flex flex-col justify-between bg-slate-50 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isRestricted ? (
                <AlertTriangle className="w-5 h-5 text-rose-500" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              )}
              <span className={`text-sm font-bold ${isRestricted ? 'text-rose-600' : 'text-emerald-700'}`}>
                {visaResult ? visaResult.visaStatus.replace('_', ' ') : destination.visaType}
              </span>
            </div>
            {visaResult && visaResult.processingDays > 0 && (
              <Badge variant="outline" className={`border-slate-200 bg-white ${isRestricted ? 'text-rose-500' : 'text-slate-600'}`}>
                Takes {visaResult.processingDays} days
              </Badge>
            )}
            {!visaResult && destination.visaProcessingDays > 0 && (
               <Badge variant="outline" className="border-slate-200 bg-white text-slate-600">
                 ~{destination.visaProcessingDays} days
               </Badge>
            )}
          </div>
          
          {/* Seasonality Info */}
          {visaResult && visaResult.seasonalityMessage && (
            <div className={`mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs`}>
              <span className="text-gray-500 font-medium">Seasonality:</span>
              <span className={`font-semibold ${
                visaResult.seasonalityStatus === 'optimal' ? 'text-emerald-600' :
                visaResult.seasonalityStatus === 'poor' ? 'text-amber-600' :
                'text-blue-600'
              }`}>
                {visaResult.seasonalityMessage}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
