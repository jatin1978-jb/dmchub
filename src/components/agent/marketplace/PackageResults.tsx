'use client'

import { useState, useEffect } from "react"
import { Destination } from "@/generated/client"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import AgentPackageCard from "../AgentPackageCard"

interface PackageResultsProps {
  destinationId: string
  destination: Destination
  onBack: () => void
}

export default function PackageResults({ destinationId, destination, onBack }: PackageResultsProps) {
  const [packages, setPackages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPackages()
  }, [destinationId])

  const fetchPackages = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/packages?destinationId=${destinationId}`)
      const data = await res.json()
      setPackages(data.packages || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="hover:bg-slate-100">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{destination.name} Packages</h2>
            <p className="text-sm text-gray-500">{packages.length} available options</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : packages.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center flex flex-col items-center border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900">No Packages Found</h3>
          <p className="text-gray-500 mt-2">There are currently no active packages for this destination.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packages.map(pkg => (
            <AgentPackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      )}
    </div>
  )
}
