import { getDMCPackages } from "@/app/actions/packages";
import PackageCard from "@/components/dmc/PackageCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, PackageSearch } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function DMCPackagesPage() {
  const packages = await getDMCPackages();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Your Packages</h1>
          <p className="text-gray-500">Manage your travel inventory and cultural targeting.</p>
        </div>
        <Link 
          href="/dmc/packages/new" 
          className={cn(buttonVariants({ className: "bg-blue-600 hover:bg-blue-700" }))}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Package
        </Link>
      </div>

      {packages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed rounded-3xl text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <PackageSearch className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold">No packages found</h3>
          <p className="text-gray-500 max-w-sm mt-2 mb-6">
            You haven't uploaded any travel packages yet. Start by creating your first one.
          </p>
          <Link 
            href="/dmc/packages/new" 
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Create Package
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      )}
    </div>
  );
}
