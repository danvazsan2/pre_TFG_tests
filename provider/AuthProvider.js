"use client"

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { loginWithToken } from "@/store/slices/userSlice";

const AuthProvider = ({ children }) => {

    const pathname = usePathname();
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
            return;
        }

        const token = localStorage.getItem("jwtToken");

        if (!token) {
            router.push("/signin")
        }
        else {
            dispatch(loginWithToken({ token }))
                .unwrap() // Allows us to handle the fulfilled and rejected states
                .then(() => {
                    // router.push("/signin");
                })
                .catch((error) => {
                    router.push("/signin");
                    console.error(error);
                });
        }
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default AuthProvider;