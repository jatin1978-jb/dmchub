'use server'

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

async function getAgentProfile() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "AGENT") {
    throw new Error("Unauthorized")
  }
  
  let agent = await prisma.travelAgentProfile.findUnique({
    where: { userId: session.user.id }
  })
  
  if (!agent) {
    agent = await prisma.travelAgentProfile.create({
      data: {
        userId: session.user.id,
        agencyName: session.user.name || session.user.email?.split('@')[0] || "Global Travel Agency",
        contactPerson: session.user.name || "Agent User",
        phone: "+1 555-0199",
        country: "UAE",
        address: "Dubai, UAE"
      }
    })
  }
  return agent
}

export async function placeHold(packageId: string, adults: number, children: number, totalPrice: number, selectedOptions?: string) {
  console.log("PLACE_HOLD_REQUEST:", { packageId, adults, children, totalPrice, selectedOptions })
  try {
    const agent = await getAgentProfile()
    
    // Set expiration to 48 hours from now
    const expires = new Date()
    expires.setHours(expires.getHours() + 48)

    const hold = await prisma.hold.create({
      data: {
        agentId: agent.id,
        packageId,
        adults,
        children,
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        holdExpires: expires,
        status: "HOLD",
        selectedOptions
      }
    })

    revalidatePath("/agent/holds")
    return hold
  } catch (err: any) {
    console.error("PLACE_HOLD_ERROR:", err.message)
    throw new Error(err.message || "Failed to place hold")
  }
}

export async function checkExistingHold(packageId: string) {
  try {
    const agent = await getAgentProfile()
    const hold = await prisma.hold.findFirst({
      where: {
        agentId: agent.id,
        packageId,
        status: "HOLD",
        holdExpires: { gte: new Date() }
      }
    })
    return hold
  } catch (err) {
    return null
  }
}

export async function getAgentHolds() {
  const agent = await getAgentProfile()
  
  return prisma.hold.findMany({
    where: { agentId: agent.id },
    include: { package: true },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getAgentStats() {
  const agent = await getAgentProfile()
  
  const [holdCount, bookingCount] = await Promise.all([
    prisma.hold.count({ where: { agentId: agent.id, status: "HOLD" } }),
    prisma.booking.count({ where: { agentId: agent.id } }),
  ])

  return { holdCount, bookingCount }
}
