import Sidebar from "@/components/layout/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  // Optional: Check if status is PENDING and restrict access
  // if (session.user.status === "PENDING" && !pathname.includes("pending")) {
  //   redirect("/auth/pending")
  // }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1">
        <header className="h-16 border-b bg-white flex items-center justify-end px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold">{session.user.email}</p>
              <p className="text-[10px] uppercase text-gray-500 font-bold">{session.user.role}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              {session.user.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
