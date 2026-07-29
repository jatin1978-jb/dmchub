import { getPackageById } from "@/app/actions/packages";
import PackageForm from "@/components/dmc/PackageForm";
import { notFound } from "next/navigation";

export default async function EditPackagePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const pkg = await getPackageById(params.id);
  
  if (!pkg) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Package</h1>
        <p className="text-gray-500">Update your package details, itinerary, and options.</p>
      </div>

      <PackageForm initialData={pkg} />
    </div>
  );
}
