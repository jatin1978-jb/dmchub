'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PcoRootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/pco/ta-mapping');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0B1B2D] text-white flex items-center justify-center p-4">
      <div className="text-center space-y-2">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C5A059] mx-auto" />
        <p className="text-xs text-slate-300">Redirecting to Congress TA Scope Mapping Studio (/pco/ta-mapping)...</p>
      </div>
    </div>
  );
}
