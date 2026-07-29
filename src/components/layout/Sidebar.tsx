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

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  
  if (status === "loading") {
    return (
      <div className="flex flex-col w-64 bg-slate-900 text-white min-h-screen animate-pulse">
        <div className="p-6">
          <div className="h-8 bg-slate-800 rounded w-3/4"></div>
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
    <div className="flex flex-col w-64 bg-slate-900 text-white min-h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent tracking-tighter">DMC HUB</h1>
        <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1 font-black">{role} PORTAL</div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all duration-200",
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50 scale-[1.02]" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <link.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-500")} />
              {link.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-800/50">
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-3 w-full rounded-xl text-sm font-bold text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all group"
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

