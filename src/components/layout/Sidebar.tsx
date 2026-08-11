'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  LogOut,
  Search,
  CheckCircle,
  FileText,
  Settings,
  CreditCard,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"
import Logo from "@/components/Logo"

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  
  if (status === "loading") {
    return (
      <div className="flex flex-col w-64 bg-[#0B1B2D] text-white min-h-screen animate-pulse border-r border-[#C5A059]/20">
        <div className="p-6">
          <div className="h-8 bg-[#162B44] rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  const role = session?.user?.role || "AGENT"

  const adminLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Pending Requests", href: "/admin/requests", icon: Clock },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Marketplace", href: "/agent/search", icon: Search },
  ]

  const dmcLinks = [
    { name: "Dashboard", href: "/dmc", icon: LayoutDashboard },
    { name: "My Packages", href: "/dmc/packages", icon: Package },
    { name: "New Package", href: "/dmc/packages/new", icon: PlusIcon },
    { name: "Bookings", href: "/dmc/bookings", icon: FileText },
  ]

  const agentLinks = [
    { name: "Dashboard", href: "/agent", icon: LayoutDashboard },
    { name: "Marketplace", href: "/agent/search", icon: Search },
    { name: "My Holds", href: "/agent/holds", icon: Clock },
    { name: "My Bookings", href: "/agent/bookings", icon: FileText },
  ]

  const links = role === "ADMIN" ? adminLinks : role === "DMC" ? dmcLinks : agentLinks

  return (
    <div className="flex flex-col w-64 bg-[#0B1B2D] text-white min-h-screen sticky top-0 border-r border-[#C5A059]/20">
      <div className="p-5">
        <Link href="/" className="block py-1">
          <Logo size="md" darkNav={true} />
        </Link>
        <div className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] mt-3 font-semibold px-2 py-0.5 rounded bg-[#C5A059]/10 inline-block border border-[#C5A059]/30">
          {role} PORTAL
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
                isActive 
                  ? "bg-[#C5A059] text-[#0B1B2D] shadow-lg shadow-[#C5A059]/20 font-bold" 
                  : "text-slate-300 hover:bg-[#162B44] hover:text-[#C5A059]"
              )}
            >
              <link.icon className={cn("w-5 h-5", isActive ? "text-[#0B1B2D]" : "text-slate-400")} />
              {link.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-3 w-full rounded-xl text-sm font-semibold text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Logout System
        </button>
      </div>
    </div>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  )
}
