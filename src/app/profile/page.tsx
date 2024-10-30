"use client";

import Image from "next/image";
import img from "@/public/pexels-hson-5071155.jpg";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { checkTokenValidity } from "../GlobalRedux/Slices/auth/authSlice";
import { RootState } from "../GlobalRedux/store";

export default function Profile() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );
    const router = useRouter();

    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            dispatch(checkTokenValidity());
            setCheckingAuth(false);
        };

        checkAuth();
    }, [dispatch]);

    useEffect(() => {
        if (!checkingAuth && !isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, checkingAuth, router]);

    return (
        <>
            <div className="bg-sky-400 w-full h-full absolute">
                <Image
                    src={img}
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                    priority={true}
                    alt="hero image"
                />
            </div>
            <div className="relative w-full h-screen flex justify-center items-center">
                {checkingAuth ? (
                    <div className="w-1/3 h-2/5 glass3 flex justify-center items-center rounded-md">
                        <div className="w-[100px] h-[100px] bg-none animate-spin rounded-full border-t-2 border-sky-900"></div>
                    </div>
                ) : (
                    isAuthenticated ? (
                        <div className="w-2/3 h-2/3 glass3 rounded-lg">
                            <h1>User details</h1>
                            <div className="flex w-[90%]">
                                <h1 className="text-6xl font-bold text-sky-900 p-10">himath</h1>
                                <div className="ml-auto mt-auto mb-auto w-fit h-fit bg-gradient-to-r from-yellow-200 to-yellow-300 p-1 rounded-md text-yellow-700">Gold Member</div>
                            </div>
                            <p>Member type</p>
                            <p>himath@gmail.com</p>
                            <p>last three bookings</p>
                        </div>
                    ) : (
                    <div className="w-1/3 h-2/5 glass3 flex justify-center items-center rounded-md">
                        <div className="w-[100px] h-[100px] bg-none animate-spin rounded-full border-t-2 border-sky-900"></div>
                    </div>
                    )
                )}
            </div>
        </>
    );
}
