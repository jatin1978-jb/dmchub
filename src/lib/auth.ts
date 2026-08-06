import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.trim().toLowerCase();
        let user = await prisma.user.findUnique({
          where: { email }
        });

        // Dynamic auto-creation fallback for seed users if DB was reset on production host
        if (!user) {
          if (email === "agent@example.com" && credentials.password === "password123") {
            const hash = await bcrypt.hash("password123", 10);
            user = await prisma.user.create({
              data: {
                email: "agent@example.com",
                passwordHash: hash,
                role: "AGENT",
                status: "ACTIVE",
                agentProfile: {
                  create: {
                    agencyName: "Global Travel Agency",
                    contactPerson: "Agent User",
                    phone: "+1 555-0199",
                    country: "UAE",
                    address: "Dubai, UAE"
                  }
                }
              }
            });
          } else if (email === "admin@dmchub.com" && credentials.password === "admin123") {
            const hash = await bcrypt.hash("admin123", 10);
            user = await prisma.user.create({
              data: {
                email: "admin@dmchub.com",
                passwordHash: hash,
                role: "ADMIN",
                status: "ACTIVE"
              }
            });
          } else if (email === "dmc@example.com" && credentials.password === "password123") {
            const hash = await bcrypt.hash("password123", 10);
            user = await prisma.user.create({
              data: {
                email: "dmc@example.com",
                passwordHash: hash,
                role: "DMC",
                status: "ACTIVE",
                dmcProfile: {
                  create: {
                    companyName: "Global DMC Hub",
                    contactPerson: "DMC Manager",
                    phone: "+123456789",
                    country: "Global",
                    address: "100 World Trade Tower"
                  }
                }
              }
            });
          }
        }

        if (!user || !user.passwordHash) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          status: user.status
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.status = (user as any).status;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.status = token.status as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "dmchub-secret-key-12345",
};
