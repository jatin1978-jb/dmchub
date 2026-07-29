import { Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PendingApprovalPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4 text-center">
      <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
        <Clock className="w-10 h-10 text-amber-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Pending Approval</h1>
      <p className="text-gray-500 max-w-md mb-8">
        Thank you for joining DMC Hub! Our administrators are currently reviewing your registration. 
        You will receive an email once your account has been activated.
      </p>
      <Link href="/auth/login">
        <Button variant="outline">Back to Login</Button>
      </Link>
    </div>
  );
}
