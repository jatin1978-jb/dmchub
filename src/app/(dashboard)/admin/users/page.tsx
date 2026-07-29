import { getAllUsers } from "@/app/actions/admin";
import UserTable from "@/components/admin/UserTable";

export default async function UserManagementPage() {
  const users = await getAllUsers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-gray-500">View and manage all registered entities in the marketplace.</p>
      </div>
      
      <UserTable users={users} />
    </div>
  );
}
