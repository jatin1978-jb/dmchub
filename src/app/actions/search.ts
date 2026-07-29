'use server'

import { prisma } from "@/lib/prisma"

export async function searchPackages(filters: {
  destination?: string
  nationality?: string
  passportCountry?: string
  seasonality?: string
  travelDate?: string
  nights?: number
  minPrice?: number
  maxPrice?: number
}) {
  const where: any = {
    status: "PUBLISHED"
  }

  if (filters.destination) {
    where.destination = { contains: filters.destination }
  }

  if (filters.nationality && filters.nationality !== "All") {
    where.targetNationalities = { contains: filters.nationality }
  }

  if (filters.seasonality && filters.seasonality !== "All") {
    where.seasonality = { contains: filters.seasonality }
  }

  if (filters.nights) {
    where.durationNights = filters.nights
  }

  if (filters.travelDate) {
    const date = new Date(filters.travelDate)
    const month = date.getMonth() + 1 // 1-12
    
    // Simple seasonality logic for MVP:
    // Summer: 4-7 (April to July)
    // Winter: 10-3 (Oct to March)
    // Year-round: 1-12
    
    if (month >= 4 && month <= 7) {
      where.seasonality = { in: ["Summer", "Year-round"] }
    } else if (month >= 10 || month <= 3) {
      where.seasonality = { in: ["Winter", "Year-round"] }
    } else {
      where.seasonality = "Year-round"
    }
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    where.pricePerPerson = {
      gte: filters.minPrice || 0,
      lte: filters.maxPrice || 999999
    }
  }

  const packages = await prisma.package.findMany({
    where,
    include: {
      dmc: true,
      images: true
    },
    orderBy: { createdAt: 'desc' }
  })

  // If passport country is provided, check visa feasibility
  if (filters.passportCountry && filters.passportCountry !== "All") {
    const { checkVisaFeasibility } = await import("@/lib/visa-service")
    
    // Default to 90 days in the future if no travel date is provided
    let checkDate = filters.travelDate
    if (!checkDate) {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 90)
      checkDate = futureDate.toISOString().split('T')[0]
    }

    const packagesWithVisa = await Promise.all(packages.map(async (pkg) => {
      const visaData = await checkVisaFeasibility(
        filters.passportCountry!, 
        pkg.destination, 
        checkDate!
      )
      return {
        ...pkg,
        visaFeasibility: visaData
      }
    }))
    
    return packagesWithVisa
  }

  // Default fallback if no passport provided
  return packages.map(pkg => ({
    ...pkg,
    visaFeasibility: null
  }))
}
