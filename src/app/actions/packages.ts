'use server'

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function getDMCProfile() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "DMC") {
    throw new Error("Unauthorized")
  }
  
  let dmc = await prisma.dMCProfile.findUnique({
    where: { userId: session.user.id }
  })
  
  if (!dmc) {
    dmc = await prisma.dMCProfile.create({
      data: {
        userId: session.user.id,
        companyName: session.user.name || session.user.email?.split('@')[0] || "Global DMC Partner",
        contactPerson: session.user.name || "DMC Manager",
        phone: "+1 555-0100",
        country: "UAE",
        address: "Dubai, UAE"
      }
    })
  }
  return dmc
}

export async function createPackage(formData: FormData) {
  const dmc = await getDMCProfile()
  
  const title = formData.get("title") as string
  const destination = formData.get("destination") as string
  const durationDays = parseInt(formData.get("durationDays") as string)
  const durationNights = parseInt(formData.get("durationNights") as string)
  const description = formData.get("description") as string
  const inclusions = formData.get("inclusions") as string
  const exclusions = formData.get("exclusions") as string
  const pricePerPerson = parseFloat(formData.get("pricePerPerson") as string)
  const currency = formData.get("currency") as string
  
  // Cultural Targeting
  const targetNationalities = formData.get("targetNationalities") as string
  const seasonality = formData.get("seasonality") as string
  const visaRequired = formData.get("visaRequired") === "on"
  const paymentTerms = formData.get("paymentTerms") as string
  const cancellationPolicy = formData.get("cancellationPolicy") as string
  const termsConditions = formData.get("termsConditions") as string
  const culturalNotes = formData.get("culturalNotes") as string
  
  const isMultiDestination = formData.get("isMultiDestination") === "on" || formData.get("isMultiDestination") === "true"
  const destinationsList = formData.get("destinationsList") as string

  const newPackage = await prisma.package.create({
    data: {
      dmcId: dmc.id,
      title,
      destination,
      durationDays,
      durationNights,
      description,
      inclusions,
      exclusions,
      pricePerPerson,
      currency,
      targetNationalities,
      seasonality,
      visaRequired,
      culturalNotes,
      paymentTerms,
      cancellationPolicy,
      termsConditions,
      isMultiDestination,
      destinationsList,
      status: "PUBLISHED", // Auto-publish for MVP
    }
  })

  await savePackageRelations(newPackage.id, formData)

  revalidatePath("/dmc/packages")
  redirect("/dmc/packages")
}

export async function updatePackage(packageId: string, formData: FormData) {
  const dmc = await getDMCProfile()
  
  const existingPkg = await prisma.package.findUnique({
    where: { id: packageId }
  })
  if (!existingPkg || existingPkg.dmcId !== dmc.id) {
    throw new Error("Package not found or unauthorized")
  }
  
  const title = formData.get("title") as string
  const destination = formData.get("destination") as string
  const durationDays = parseInt(formData.get("durationDays") as string)
  const durationNights = parseInt(formData.get("durationNights") as string)
  const description = formData.get("description") as string
  const inclusions = formData.get("inclusions") as string
  const exclusions = formData.get("exclusions") as string
  const pricePerPerson = parseFloat(formData.get("pricePerPerson") as string)
  const currency = formData.get("currency") as string
  
  const targetNationalities = formData.get("targetNationalities") as string
  const seasonality = formData.get("seasonality") as string
  const visaRequired = formData.get("visaRequired") === "on"
  const paymentTerms = formData.get("paymentTerms") as string
  const cancellationPolicy = formData.get("cancellationPolicy") as string
  const termsConditions = formData.get("termsConditions") as string
  const culturalNotes = formData.get("culturalNotes") as string

  const isMultiDestination = formData.get("isMultiDestination") === "on" || formData.get("isMultiDestination") === "true"
  const destinationsList = formData.get("destinationsList") as string

  // Delete nested relations to recreate them cleanly
  await prisma.packageImage.deleteMany({ where: { packageId } })
  await prisma.packageInventoryProduct.deleteMany({ where: { packageId } })
  await prisma.itineraryDay.deleteMany({ where: { packageId } })

  await prisma.package.update({
    where: { id: packageId },
    data: {
      title, destination, durationDays, durationNights, description,
      inclusions, exclusions, pricePerPerson, currency,
      targetNationalities, seasonality, visaRequired, culturalNotes,
      paymentTerms, cancellationPolicy, termsConditions,
      isMultiDestination, destinationsList
    }
  })

  await savePackageRelations(packageId, formData)

  revalidatePath("/dmc/packages")
  redirect("/dmc/packages")
}

async function savePackageRelations(packageId: string, formData: FormData) {
  // 1. Save Package Images
  const pkgImages = JSON.parse((formData.get("packageImages") as string) || "[]")
  if (pkgImages.length > 0) {
    await prisma.packageImage.createMany({
      data: pkgImages.map((img: any) => ({
        packageId,
        url: img.url,
        isPrimary: img.isPrimary
      }))
    })
  }

  // 2. Save Inventory Products and Map Temp IDs to Real IDs
  const invProducts = JSON.parse((formData.get("inventoryProducts") as string) || "[]")
  const tempToRealIdMap: Record<string, string> = {}
  
  for (const prod of invProducts) {
    const newProd = await prisma.packageInventoryProduct.create({
      data: {
        packageId,
        type: prod.type,
        name: prod.name,
        description: prod.description,
        roomType: prod.roomType,
        starRating: prod.starRating || null,
        targetNationalities: prod.targetNationalities || "All",
        transferType: prod.transferType || null,
        media: {
          create: prod.media?.map((m: any) => ({
            url: m.url,
            type: m.type
          })) || []
        }
      }
    })
    tempToRealIdMap[prod.id] = newProd.id
  }

  // 3. Save Itinerary Days and Items
  const itiDays = JSON.parse((formData.get("itineraryDays") as string) || "[]")
  for (const day of itiDays) {
    await prisma.itineraryDay.create({
      data: {
        packageId,
        dayNumber: day.dayNumber,
        title: day.title,
        description: day.description,
        destinationName: day.destinationName || null,
        items: {
          create: day.items?.map((item: any) => ({
            type: item.type,
            title: item.title,
            time: item.time,
            optOutDiscount: Number(item.optOutDiscount) || 0,
            options: {
              create: item.options?.map((opt: any) => {
                const realId = tempToRealIdMap[opt.inventoryProductId] || opt.inventoryProductId;
                return {
                  inventoryProductId: realId,
                  priceAddOn: opt.priceAddOn,
                  isDefault: opt.isDefault
                }
              }) || []
            }
          })) || []
        }
      }
    })
  }
}

export async function getDMCPackages() {
  const dmc = await getDMCProfile()
  
  return prisma.package.findMany({
    where: { dmcId: dmc.id },
    include: { images: true },
    orderBy: { createdAt: 'desc' }
  })
}

export async function deletePackage(packageId: string) {
  const dmc = await getDMCProfile()
  
  await prisma.package.delete({
    where: { 
      id: packageId,
      dmcId: dmc.id
    }
  })

  revalidatePath("/dmc/packages")
}

export async function getPackageById(packageId: string) {
  const dmc = await getDMCProfile()
  
  return prisma.package.findUnique({
    where: { 
      id: packageId,
      dmcId: dmc.id
    },
    include: {
      images: true,
      inventoryProducts: {
        include: {
          media: true
        }
      },
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
}
