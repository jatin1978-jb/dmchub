'use server'

import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { redirect } from "next/navigation"

export async function registerDMC(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const companyName = formData.get("companyName") as string
  const contactPerson = formData.get("contactPerson") as string
  const phone = formData.get("phone") as string
  const country = formData.get("country") as string
  const address = formData.get("address") as string

  if (!email || !password || !companyName) {
    throw new Error("Missing required fields")
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new Error("User already exists")
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: "DMC",
      status: "PENDING",
      dmcProfile: {
        create: {
          companyName,
          contactPerson,
          phone,
          country,
          address,
        }
      },
      approvalReqs: {
        create: {
          status: "PENDING"
        }
      }
    }
  })

  redirect("/auth/login?registered=true")
}

export async function registerAgent(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const agencyName = formData.get("agencyName") as string
  const contactPerson = formData.get("contactPerson") as string
  const phone = formData.get("phone") as string
  const country = formData.get("country") as string
  const address = formData.get("address") as string

  if (!email || !password || !agencyName) {
    throw new Error("Missing required fields")
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new Error("User already exists")
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: "AGENT",
      status: "PENDING",
      agentProfile: {
        create: {
          agencyName,
          contactPerson,
          phone,
          country,
          address,
        }
      },
      approvalReqs: {
        create: {
          status: "PENDING"
        }
      }
    }
  })

  redirect("/auth/login?registered=true")
}
