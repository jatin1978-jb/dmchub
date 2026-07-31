'use client'

import { useState, useEffect } from "react"
import { Destination } from "@/generated/client"
import SearchTabs from "./SearchTabs"
import DestinationGrid from "./DestinationGrid"
import PackageResults from "./PackageResults"
import VisaEligibilitySummary from "./VisaEligibilitySummary"

export interface VisaEligibilityResult {
  destinationId: string;
  destination: string;
  countryCode: string;
  visaStatus: string;
  processingDays: number;
  eligible: boolean;
  selectable: boolean;
  reason: string;
  seasonalityMessage?: string;
  seasonalityStatus?: "optimal" | "acceptable" | "poor";
}

export default function MarketplaceClient() {
  const [destinations, setDestinations] = useState<(Destination & { _count: { packages: number } })[]>([])
  const [allPackages, setAllPackages] = useState<any[]>([])
  
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  
  // Visa Results
  const [visaResults, setVisaResults] = useState<VisaEligibilityResult[] | null>(null)
  
  // Selected Destination for viewing packages
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null)
  
  useEffect(() => {
    fetchInitialData()
  }, [])

  const fetchInitialData = async () => {
    try {
      const res = await fetch('/api/agent/marketplace')
      const data = await res.json()
      setDestinations(data.destinations || [])
      setAllPackages(data.packages || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleVisaCheck = async (params: { nationality: string, passportCountry: string, travelDate: string, nights?: number, destination?: string }) => {
    setSearching(true)
    setSelectedDestinationId(null)
    try {
      const res = await fetch('/api/visa/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      })
      const data = await res.json()
      if (data.allResults) {
        let results = data.allResults;
        if (params.destination) {
          const destLower = params.destination.toLowerCase();
          results = results.filter((r: VisaEligibilityResult) => r.destination.toLowerCase().includes(destLower));
          if (results.length > 0) {
            setSelectedDestinationId(results[0].destinationId);
          }
        }
        setVisaResults(results)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSearching(false)
    }
  }

  const handleDestinationClick = (destId: string) => {
    setSelectedDestinationId(destId)
  }

  const handleBackToDestinations = () => {
    setSelectedDestinationId(null)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-40 bg-slate-100 animate-pulse rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-3xl" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
        <p className="text-gray-500 mt-2">Find the best travel packages for your clients based on visa eligibility.</p>
      </div>

      {!selectedDestinationId && (
        <SearchTabs 
          onSearch={handleVisaCheck} 
          isLoading={searching} 
        />
      )}

      {selectedDestinationId ? (
        <PackageResults 
          destinationId={selectedDestinationId} 
          destination={destinations.find(d => d.id === selectedDestinationId)!}
          onBack={handleBackToDestinations}
        />
      ) : (
        <div className="space-y-6">
          {visaResults && (
            <VisaEligibilitySummary results={visaResults} />
          )}
          
          <DestinationGrid 
            destinations={destinations}
            visaResults={visaResults}
            onSelect={handleDestinationClick}
          />
        </div>
      )}
    </div>
  )
}
