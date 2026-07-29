'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Globe, ShieldCheck, BookmarkPlus, Zap, AlertTriangle } from "lucide-react"
import { placeHold } from "@/app/actions/booking"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface AgentPackageCardProps {
  pkg: any
}

export default function AgentPackageCard({ pkg }: AgentPackageCardProps) {
  const router = useRouter()
  const visaData = pkg.visaFeasibility;
  const isVisaUnfeasible = visaData && !visaData.feasible;

  const handleHold = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isVisaUnfeasible) {
      toast.error("Cannot hold this package due to visa processing times.");
      return;
    }
    try {
      // Default to 1 adult, 0 children for quick hold from card
      await placeHold(pkg.id, 1, 0, pkg.pricePerPerson)
      toast.success("Package placed on 48h hold!")
    } catch (err) {
      toast.error("Failed to place hold. Please try again.")
    }
  }

  const handleBook = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isVisaUnfeasible) {
      toast.error("Cannot book this package due to visa processing times.");
      return;
    }
    router.push(`/agent/search/${pkg.id}`);
  }

  return (
    <Card className={cn(
      "overflow-hidden border-gray-100 shadow-sm transition-all duration-300 flex flex-col h-full bg-white relative group",
      isVisaUnfeasible ? "opacity-80 grayscale-[40%] hover:shadow-sm" : "hover:shadow-xl"
    )}>
        {isVisaUnfeasible && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[90%] pointer-events-none">
            <div className="bg-red-600/95 backdrop-blur-sm text-white p-3 rounded-xl shadow-xl flex flex-col items-center justify-center gap-1 text-center border border-red-500">
              <div className="flex items-center gap-2 font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>Visa Processing Too Long</span>
              </div>
              <span className="text-xs font-medium text-red-100">
                Needs {visaData.requirement.processingDays} days (You have {visaData.daysUntilTravel})
              </span>
            </div>
          </div>
        )}
        <Link href={`/agent/search/${pkg.id}`} className="block relative">
          <div className="h-48 bg-slate-100 relative overflow-hidden">
            {pkg.images && pkg.images.length > 0 ? (
              <img 
                src={pkg.images[0].url} 
                alt={pkg.title}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-transform duration-700",
                  !isVisaUnfeasible && "group-hover:scale-110"
                )}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                No Image
              </div>
            )}
            {isVisaUnfeasible && <div className="absolute inset-0 bg-slate-900/10 z-10" />}
            <div className="absolute top-3 left-3 flex gap-2 z-10">
              <Badge className="bg-white/90 text-slate-900 hover:bg-white backdrop-blur-sm border-none shadow-sm">{pkg.destination}</Badge>
            </div>
            <div className="absolute bottom-3 left-3 z-10">
               <Badge className="bg-blue-600 text-white border-none shadow-sm">
                {pkg.targetNationalities} Fit
               </Badge>
            </div>
          </div>
        </Link>
        
        <CardHeader className="p-5 pb-2">
          <div className="flex justify-between items-start gap-2">
            <Link href={`/agent/search/${pkg.id}`} className="block">
              <CardTitle className="text-xl group-hover:text-blue-600 transition-colors line-clamp-2">{pkg.title}</CardTitle>
            </Link>
          </div>
        </CardHeader>
        
        <CardContent className="p-5 pt-0 flex-grow space-y-4">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-500" />
              {pkg.durationDays}D / {pkg.durationNights}N
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              {pkg.visaRequired ? "Visa Required" : "No Visa Req."}
            </div>
          </div>

          <div className="bg-blue-50/50 p-3 rounded-xl space-y-1">
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Cultural Highlight</p>
            <p className="text-xs text-blue-800 italic line-clamp-2">
              "{pkg.culturalNotes || "Culturally optimized for " + pkg.targetNationalities + " travelers."}"
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="p-5 pt-0 border-t border-gray-50 flex justify-between items-center bg-white relative z-10">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900">{pkg.currency} {pkg.pricePerPerson}</span>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Net Rate</p>
          </div>
          <div className="flex gap-2">
            <Button 
              size="icon" 
              variant="outline" 
              className={cn("rounded-full border-gray-200", !isVisaUnfeasible && "hover:bg-blue-50 hover:text-blue-600")} 
              onClick={handleHold}
              disabled={isVisaUnfeasible}
            >
              <BookmarkPlus className="w-5 h-5" />
            </Button>
            <Button 
              className={cn("rounded-full transition-colors px-6", isVisaUnfeasible ? "bg-slate-300 text-slate-500" : "bg-slate-900 hover:bg-blue-600 text-white")}
              onClick={handleBook}
              disabled={isVisaUnfeasible}
            >
              <Zap className={cn("w-4 h-4 mr-2", isVisaUnfeasible ? "fill-slate-400" : "fill-current")} />
              Book
            </Button>
          </div>
        </CardFooter>
      </Card>
  )
}
