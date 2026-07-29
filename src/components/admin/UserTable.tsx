'use client'

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Eye } from "lucide-react"
import { resolveUserStatus } from "@/app/actions/admin"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface UserTableProps {
  users: any[]
  isRequestTable?: boolean
}

export default function UserTable({ users, isRequestTable = false }: UserTableProps) {
  const [loading, setLoading] = useState<string | null>(null)

  const handleResolve = async (userId: string, status: "ACTIVE" | "REJECTED") => {
    setLoading(userId)
    try {
      await resolveUserStatus(userId, status)
      toast.success(`User ${status === "ACTIVE" ? "approved" : "rejected"} successfully`)
    } catch (err) {
      toast.error("Failed to update user status")
    } finally {
      setLoading(null)
    }
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-20 bg-white border rounded-xl">
        <p className="text-gray-500">No users found.</p>
      </div>
    )
  }

  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead>Entity / Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Registered</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const profile = user.role === "DMC" ? user.dmcProfile : user.agentProfile
            const name = user.role === "DMC" ? profile?.companyName : profile?.agencyName
            
            return (
              <TableRow key={user.id} className="hover:bg-slate-50 transition-colors">
                <TableCell>
                  <div className="font-bold">{name || "N/A"}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.role === "DMC" ? "default" : "secondary"}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{profile?.country || "N/A"}</TableCell>
                <TableCell>
                  <Badge 
                    className={cn(
                      user.status === "ACTIVE" ? "bg-green-100 text-green-700" : 
                      user.status === "PENDING" ? "bg-amber-100 text-amber-700" : 
                      "bg-red-100 text-red-700"
                    )}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {user.status === "PENDING" && (
                      <>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleResolve(user.id, "ACTIVE")}
                          disabled={loading === user.id}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleResolve(user.id, "REJECTED")}
                          disabled={loading === user.id}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
