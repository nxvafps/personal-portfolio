"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserRole } from "@prisma/client";

export function useAuth({
  required = false,
  role = null,
  redirectTo = "/login",
  redirectIfFound = false,
}: {
  required?: boolean;
  role?: UserRole | null;
  redirectTo?: string;
  redirectIfFound?: boolean;
} = {}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const userRole = session?.user?.role;

  useEffect(() => {
    if (isLoading) return;

    if (required && !isAuthenticated) {
      router.push(
        `${redirectTo}?callbackUrl=${encodeURIComponent(window.location.href)}`
      );
    }

    if (required && role !== null && isAuthenticated && userRole !== role) {
      router.push("/unauthorized");
    }

    if (redirectIfFound && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [
    isAuthenticated,
    isLoading,
    required,
    redirectIfFound,
    redirectTo,
    router,
    role,
    userRole,
  ]);

  return {
    session,
    isLoading,
    isAuthenticated,
    userRole,
  };
}
