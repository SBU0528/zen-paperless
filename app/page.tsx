// app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@supabase/auth-helpers-react";

export default function Home() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [session, router]);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500 text-lg">Redirecting...</p>
    </main>
  );
}
