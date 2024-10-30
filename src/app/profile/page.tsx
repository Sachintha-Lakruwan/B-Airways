"use client";

import Image from "next/image";
import img from "@/public/pexels-hson-5071155.jpg";
import { useCallback, useEffect, useState } from "react";
import { BookingDetails } from "../api/booking/user/route";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { checkTokenValidity } from "../GlobalRedux/Slices/auth/authSlice";
import { RootState } from "../GlobalRedux/store";
import BookingDetailsCard from "./bookingDetails";
import BookingDetailsSkeletonCard from "./bookginDetailsSkeleton";

export default function Profile() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );
    const token = useSelector((state: RootState) => state.auth.token);
    const router = useRouter();
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        total_bookings: 0,
        loyalty: "",
    });

    const [bookingDetails, setBookingDetails] = useState<BookingDetails[]>([]);

    const [checkingAuth, setCheckingAuth] = useState(true);
    const [fetchingUserDetails, setFetchingUserDetails] = useState(true);

    const fetchUserDetails = useCallback(async () => {
        const res = await fetch(`/api/user/profile?token=${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const bookings = await fetch(`/api/booking/user?token=${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok && bookings.ok) {
            const bookingData = await bookings.json() as BookingDetails[];
            console.log(bookingData)
            const data = await res.json() as { username: string, email: string, total_bookings: number, loyalty: string };
            setUserDetails(data);
            setBookingDetails(bookingData);
            setFetchingUserDetails(false);
        } else {
            router.push("/");
            console.error("Could not fetch user details");
        }
    }, [router, token]);

    useEffect(() => {
        const checkAuth = async () => {
            dispatch(checkTokenValidity());
            setCheckingAuth(false);
        };

        checkAuth();
    }, [dispatch]);

    useEffect(() => {
        if (!checkingAuth) {
            if (!isAuthenticated) {
                router.push("/");
            } else {
                fetchUserDetails();
            }
        }
    }, [isAuthenticated, checkingAuth, router, fetchUserDetails]);

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
                        <div className="w-5/6 h-2/3 glass2 rounded-lg flex">
                            <div className="w-[30%] h-[95%] glass3 m-3 rounded-lg text-sky-900 p-8">
                                <h1 className="text-4xl font-bold mb-6">User Details</h1>
                                <div className="flex flex-col"> 
                                    <div className="mb-3">
                                        <p className="font-extralight">Username</p>
                                        <p className={`${fetchingUserDetails ? "italic font-extralight" :"text-2xl"}`}>{fetchingUserDetails ? "loading": userDetails.username}</p>
                                    </div>
                                    <div className="mb-3">
                                        <p className="font-extralight">Email</p>
                                        <p className={`${fetchingUserDetails ? "italic font-extralight" :"text-2xl"}`}>{fetchingUserDetails ? "loading": userDetails.email}</p>
                                    </div>
                                    <div className="mb-3">
                                        <p className="font-extralight">Total Bookings</p>
                                        <p className={`${fetchingUserDetails ? "italic font-extralight" :"text-2xl"}`}>{fetchingUserDetails ? "loading": userDetails.total_bookings}</p>
                                    </div>
                                    <div className="mb-3">
                                        <p className="font-extralight">Member Type</p>
                                        <p className={`text-2xl ${fetchingUserDetails ? "" :"hidden"}`}>loading</p>
                                        <div className={`${fetchingUserDetails ? "hidden" :""}`}>
                                            {userDetails.loyalty === "gold" ? (
                                            <div className="w-fit h-fit bg-gradient-to-r from-yellow-200 to-yellow-300 p-1 rounded-md text-yellow-700">
                                                Gold Member
                                            </div>
                                            ) : (
                                                userDetails.loyalty === "frequent" ? (
                                                <div className="w-fit h-fit bg-gradient-to-r from-gray-200 to-gray-300 p-1 rounded-md text-gray-700">
                                                    Frequent Member
                                                </div>
                                                ) : (
                                                    <div className="w-fit h-fit bg-gradient-to-r from-blue-100 to-blue-200 p-1 rounded-md text-blue-700">
                                                        Guest
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[70%] h-[95%] glass3 m-3 rounded-lg text-sky-900 p-8">
                                <h1 className="text-4xl font-bold mb-6">Last Three Bookings</h1>
                                {/* <div key={1} className="bg-white/30 p-4 rounded-lg shadow-md">
                                    <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-2xl font-semibold">paris</h2>
                                    <span className="text-sm font-medium bg-sky-100 text-sky-800 py-1 px-2 rounded-full">
                                        MDAwMy1PVVk9
                                    </span>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm">
                                    <div className="flex items-center">
                                        
                                        <span>2024-10-14</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span>8hours</span>
                                    </div>
                                    </div>
                                </div> */}
                                <div className="overflow-y-auto h-[80%] rounded-lg" > 
                                {fetchingUserDetails ? (
                                    <BookingDetailsSkeletonCard/>
                                ) : (
                                    bookingDetails.length > 0 ? (
                                        bookingDetails.map((booking) => (
                                            <BookingDetailsCard bookingDetails={booking} key={booking.schedule_id + booking.seat_number}/>
                                        ))
                                    ) : (
                                        <div>
                                            No bookings available
                                        </div>
                                    )
                                )}
                                </div>
                            </div>
                            {/* <h1>User details</h1>
                            <div className="flex w-[90%]">
                                <h1 className="text-6xl font-bold text-sky-900 p-10">himath</h1>
                                <div className="ml-auto mt-auto mb-auto w-fit h-fit bg-gradient-to-r from-yellow-200 to-yellow-300 p-1 rounded-md text-yellow-700">Gold Member</div>
                            </div>
                            <p>Member type</p>
                            <p>himath@gmail.com</p>
                            <p>last three bookings</p> */}
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
