import { getPendingUsers } from "@/app/actions/admin";
import UserTable from "@/components/admin/UserTable";

export default async function PendingRequestsPage() {
  const users = await getPendingUsers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Registration Requests</h1>
        <p className="text-gray-500">Review and approve new DMCs and Travel Agents.</p>
      </div>
      
      <UserTable users={users} isRequestTable />
    </div>
  );
}
