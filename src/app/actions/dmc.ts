'use server'

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

async function ensureDMC() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "DMC") {
    throw new Error("Unauthorized")
  }
  
  const dmc = await prisma.dMCProfile.findUnique({
    where: { userId: session.user.id }
  })
  
  if (!dmc) throw new Error("DMC Profile not found")
  return dmc
}

export async function getDMCBookings() {
  const dmc = await ensureDMC()
  
  const [holds, bookings] = await Promise.all([
    prisma.hold.findMany({
      where: {
        package: { dmcId: dmc.id }
      },
      include: {
        package: true,
        agent: true
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.booking.findMany({
      where: {
        package: { dmcId: dmc.id }
      },
      include: {
        package: true,
        agent: true
      },
      orderBy: { createdAt: 'desc' }
    })
  ])
  
  return { holds, bookings }
}
