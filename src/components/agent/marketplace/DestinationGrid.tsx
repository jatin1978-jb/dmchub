import { Destination } from "@/generated/client"
import { VisaEligibilityResult } from "./MarketplaceClient"
import DestinationCard from "./DestinationCard"

interface DestinationGridProps {
  destinations: (Destination & { _count: { packages: number } })[]
  visaResults: VisaEligibilityResult[] | null
  onSelect: (id: string) => void
}

export default function DestinationGrid({ destinations, visaResults, onSelect }: DestinationGridProps) {
  // Sort destinations: Eligible first, then restricted
  const sortedDestinations = [...destinations].sort((a, b) => {
    if (!visaResults) return 0;
    
    const visaA = visaResults.find(v => v.destinationId === a.id);
    const visaB = visaResults.find(v => v.destinationId === b.id);
    
    const aEligible = visaA ? visaA.eligible : true;
    const bEligible = visaB ? visaB.eligible : true;
    
    if (aEligible === bEligible) return 0;
    return aEligible ? -1 : 1;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedDestinations.map(dest => {
        const visaResult = visaResults?.find(v => v.destinationId === dest.id)
        
        return (
          <DestinationCard 
            key={dest.id} 
            destination={dest} 
            visaResult={visaResult}
            onClick={onSelect}
          />
        )
      })}
    </div>
  )
}
