import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { checkExistingHold } from "@/app/actions/booking"

export const dynamic = 'force-dynamic';
import PackageDetailsClient from "@/components/agent/PackageDetailsClient"

export default async function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pkg = await prisma.package.findUnique({
    where: { id },
    include: { 
      images: true, 
      dmc: true,
      itineraryDays: {
        include: {
          items: {
            include: {
              options: {
                include: {
                  inventoryProduct: {
                    include: {
                      media: true
                    }
                  }
                }
              }
            }
          }
        },
        orderBy: {
          dayNumber: 'asc'
        }
      }
    }
  })

  if (!pkg) notFound()

  const existingHold = await checkExistingHold(pkg.id)

  return (
    <div className="max-w-7xl mx-auto">
      <PackageDetailsClient pkg={pkg} existingHold={existingHold} />
    </div>
  )
}
