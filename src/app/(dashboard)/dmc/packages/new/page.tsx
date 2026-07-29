import PackageForm from "@/components/dmc/PackageForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewPackagePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dmc/packages" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create New Package</h1>
          <p className="text-gray-500">Add a new travel package to the marketplace inventory.</p>
        </div>
      </div>

      <PackageForm />
    </div>
  );
}
