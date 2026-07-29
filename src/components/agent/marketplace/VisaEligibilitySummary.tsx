import { VisaEligibilityResult } from "./MarketplaceClient"

export default function VisaEligibilitySummary({ results }: { results: VisaEligibilityResult[] }) {
  const eligible = results.filter(r => r.eligible)
  const restricted = results.filter(r => !r.eligible)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
        <h3 className="font-bold text-emerald-800 flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          Eligible Destinations ({eligible.length})
        </h3>
        <p className="text-sm text-emerald-600">
          {eligible.map(e => e.destination).join(", ") || "None"}
        </p>
      </div>

      <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl">
        <h3 className="font-bold text-rose-800 flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-rose-500" />
          Restricted Destinations ({restricted.length})
        </h3>
        <p className="text-sm text-rose-600">
          {restricted.map(r => r.destination).join(", ") || "None"}
        </p>
      </div>
    </div>
  )
}
