'use server'

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

async function ensureAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }
}

export async function getAdminStats() {
  await ensureAdmin()
  
  const [userCount, pendingCount, packageCount, bookingCount] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { status: "PENDING" } }),
    prisma.package.count(),
    prisma.booking.count(),
  ])

  return {
    userCount,
    pendingCount,
    packageCount,
    bookingCount
  }
}

export async function getPendingUsers() {
  await ensureAdmin()
  
  return prisma.user.findMany({
    where: { status: "PENDING" },
    include: {
      dmcProfile: true,
      agentProfile: true
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getAllUsers() {
  await ensureAdmin()
  
  return prisma.user.findMany({
    include: {
      dmcProfile: true,
      agentProfile: true
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function resolveUserStatus(userId: string, status: "ACTIVE" | "REJECTED", notes?: string) {
  await ensureAdmin()
  
  await prisma.user.update({
    where: { id: userId },
    data: { 
      status,
      approvalReqs: {
        updateMany: {
          where: { status: "PENDING" },
          data: { 
            status,
            resolvedAt: new Date(),
            notes
          }
        }
      }
    }
  })

  // Log the action
  await prisma.auditLog.create({
    data: {
      action: `RESOLVE_USER_${status}`,
      entityType: "USER",
      entityId: userId,
      details: notes
    }
  })

  revalidatePath("/admin/requests")
  revalidatePath("/admin/users")
}
