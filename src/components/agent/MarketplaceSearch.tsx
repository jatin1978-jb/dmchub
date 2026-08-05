'use client'

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal, X, MapPin, ArrowLeft, ShieldCheck, AlertTriangle } from "lucide-react"
import { searchPackages } from "@/app/actions/search"
import AgentPackageCard from "./AgentPackageCard"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MarketplaceSearch() {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    destination: "",
    nationality: "All",
    passportCountry: "All",
    seasonality: "All",
    travelDate: "",
    nights: undefined as number | undefined
  })

  const fetchResults = async () => {
    setLoading(true)
    setSelectedDestination(null)
    try {
      const data = await searchPackages(filters)
      setResults(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(null as any)
    }
  }

  useEffect(() => {
    fetchResults()
  }, [])

  const groupedDestinations = results.reduce((acc: any, pkg: any) => {
    if (!acc[pkg.destination]) {
      acc[pkg.destination] = {
        name: pkg.destination,
        count: 0,
        visaFeasibility: pkg.visaFeasibility,
        image: pkg.images?.[0]?.url
      }
    }
    acc[pkg.destination].count += 1
    return acc
  }, {})

  return (
    <div className="space-y-8">
      {/* Search Header & Primary Filters */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="Search by destination (e.g. Dubai, Bali)..." 
              className="pl-10 h-12 rounded-xl border-gray-200" 
              value={filters.destination}
              onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={filters.nationality} onValueChange={(val) => setFilters({ ...filters, nationality: val || "All" })}>
              <SelectTrigger className="w-[150px] h-12 rounded-xl border-gray-200">
                <SelectValue placeholder="Nationality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Nationalities</SelectItem>
                <SelectItem value="Indian">Indian</SelectItem>
                <SelectItem value="Saudi">Saudi</SelectItem>
                <SelectItem value="Egyptian">Egyptian</SelectItem>
                <SelectItem value="American">American</SelectItem>
                <SelectItem value="British">British</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.passportCountry} onValueChange={(val) => setFilters({ ...filters, passportCountry: val || "All" })}>
              <SelectTrigger className="w-[160px] h-12 rounded-xl border-gray-200">
                <SelectValue placeholder="Passport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Any Passport</SelectItem>
                <SelectItem value="Indian">India</SelectItem>
                <SelectItem value="Saudi">Saudi Arabia</SelectItem>
                <SelectItem value="Egyptian">Egypt</SelectItem>
                <SelectItem value="American">USA</SelectItem>
                <SelectItem value="British">UK</SelectItem>
                <SelectItem value="European">EU / Schengen</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.seasonality} onValueChange={(val) => setFilters({ ...filters, seasonality: val || "All" })}>
              <SelectTrigger className="w-[140px] h-12 rounded-xl border-gray-200">
                <SelectValue placeholder="Seasonality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Seasons</SelectItem>
                <SelectItem value="Winter">Winter</SelectItem>
                <SelectItem value="Summer">Summer</SelectItem>
                <SelectItem value="Year-round">Year-round</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2 items-center bg-slate-50 p-1 rounded-xl border border-gray-100">
              <Input 
                type="date" 
                className="w-[140px] h-10 border-none bg-transparent text-sm"
                value={filters.travelDate}
                onChange={(e) => setFilters({ ...filters, travelDate: e.target.value })}
              />
              <div className="w-px h-6 bg-gray-200" />
              <Input 
                type="number" 
                placeholder="Nights" 
                className="w-[80px] h-10 border-none bg-transparent"
                value={filters.nights || ""}
                onChange={(e) => setFilters({ ...filters, nights: e.target.value ? parseInt(e.target.value) : undefined })}
              />
            </div>

            <Button onClick={fetchResults} className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700">
              Find Packages
            </Button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          {selectedDestination ? (
            <Button 
              variant="ghost" 
              onClick={() => setSelectedDestination(null)}
              className="hover:bg-slate-100 -ml-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Destinations
            </Button>
          ) : (
            <h2 className="text-xl font-bold">
              {Object.keys(groupedDestinations).length} Destinations Available
              {filters.nationality !== "All" && <span className="text-blue-600 ml-2 font-normal">for {filters.nationality} travelers</span>}
            </h2>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-slate-100 rounded-3xl" />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-100 rounded-3xl p-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
               <X className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold">No matches found</h3>
            <p className="text-gray-500 mt-2 max-w-sm">
              Try adjusting your filters or search terms. Try searching for "Indian" nationality if you've uploaded test packages.
            </p>
          </div>
        ) : !selectedDestination ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(groupedDestinations).map((dest: any) => {
              const visaData = dest.visaFeasibility;
              const isVisaUnfeasible = visaData && !visaData.feasible;

              return (
                <Card 
                  key={dest.name} 
                  className={`overflow-hidden border-gray-100 shadow-sm transition-all duration-300 cursor-pointer ${isVisaUnfeasible ? 'opacity-70 grayscale-[30%] cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-1'}`}
                  onClick={() => {
                    if (!isVisaUnfeasible) {
                      setSelectedDestination(dest.name)
                    }
                  }}
                >
                  <div className="h-40 bg-slate-100 relative overflow-hidden">
                    {dest.image ? (
                      <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
                        <MapPin className="w-8 h-8 text-slate-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-bold">{dest.name}</h3>
                      <p className="text-sm text-slate-200">{dest.count} packages available</p>
                    </div>
                  </div>
                  <CardContent className="p-4 bg-slate-50 border-t border-gray-100">
                    {visaData ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {isVisaUnfeasible ? (
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                          ) : (
                            <ShieldCheck className="w-5 h-5 text-emerald-500" />
                          )}
                          <span className={`text-sm font-bold ${isVisaUnfeasible ? 'text-red-600' : 'text-emerald-700'}`}>
                            {visaData.requirement.type}
                          </span>
                        </div>
                        {isVisaUnfeasible && (
                          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                            Takes {visaData.requirement.processingDays} days
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        Visa requirements not checked
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.filter(pkg => pkg.destination === selectedDestination).map((pkg) => (
              <AgentPackageCard key={pkg.id} pkg={pkg} nationality={filters.nationality} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
