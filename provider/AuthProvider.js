"use client"

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const AuthProvider = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) return; // Wait for auth to load

        // Allow access to signin and signup pages
        if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
            return;
        }

        // Redirect to signin if user is not authenticated
        if (!user) {
            router.push("/signin");
        }
    }, [user, loading, pathname, router]);

    return (
        <>
            {children}
        </>
    )
}

export default AuthProvider;