'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Globe, MapPin, Trash2, Edit, Clock } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { deletePackage } from "@/app/actions/packages"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface PackageCardProps {
  pkg: any
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this package?")) {
      try {
        await deletePackage(pkg.id)
        toast.success("Package deleted")
      } catch (err) {
        toast.error("Failed to delete package")
      }
    }
  }

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow border-gray-100 shadow-sm flex flex-col">
      <div className="h-48 bg-slate-200 relative overflow-hidden">
        {pkg.images && pkg.images.length > 0 ? (
          <img 
            src={pkg.images[0].url} 
            alt={pkg.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
            No Image Provided
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-white/90 text-slate-900 hover:bg-white">{pkg.destination}</Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant={pkg.status === "PUBLISHED" ? "default" : "secondary"}>
            {pkg.status}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-xl line-clamp-1">{pkg.title}</CardTitle>
          <div className="text-right">
            <span className="text-lg font-bold text-blue-600">{pkg.currency} {pkg.pricePerPerson}</span>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Per Person</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 flex-grow space-y-4">
        <div className="flex items-center gap-4 text-sm text-gray-600 border-b border-gray-50 pb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {pkg.durationDays}D / {pkg.durationNights}N
          </div>
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4" />
            {pkg.targetNationalities}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Cultural Notes</div>
          <p className="text-xs text-gray-600 line-clamp-3 bg-slate-50 p-2 rounded italic">
            "{pkg.culturalNotes || "No specific cultural notes provided."}"
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 bg-slate-50 border-t border-gray-100 flex justify-between gap-2">
        <Link href={`/dmc/packages/${pkg.id}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex-1 bg-white")}>
          <Edit className="w-3.5 h-3.5 mr-1" /> Edit
        </Link>
        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-white" onClick={handleDelete}>
          <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
