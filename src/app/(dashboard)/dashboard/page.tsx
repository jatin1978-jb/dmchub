import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardRedirect() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  if (session.user.role === "ADMIN") {
    redirect("/admin");
  } else if (session.user.role === "DMC") {
    redirect("/dmc");
  } else {
    redirect("/agent");
  }
}
