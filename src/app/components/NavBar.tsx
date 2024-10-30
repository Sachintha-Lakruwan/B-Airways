"use client";

import React, { useEffect } from "react";
import logo from "@/public/B Airways.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  checkTokenValidity,
  logout,
  setToken,
} from "../GlobalRedux/Slices/auth/authSlice";
import { RootState } from "../GlobalRedux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const dispatch = useDispatch();
  const router = useRouter();
  // const isAuthenticated = useSelector(
  //   (state: RootState) => state.auth.isAuthenticated
  // );

  const handleClick = () => {
    dispatch(logout());
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token)); // Set token in the Redux store
      dispatch(checkTokenValidity()); // Check if the token is still valid
    }
  }, [dispatch]);

  const authState = useSelector((state: RootState) => state.auth);

  return (
    <div className=" w-full h-[10%] bg-zinc-700 absolute z-30 nav-glass px-20">
      {/* <div className=" absolute left-20 top-0 h-32 aspect-[3/4] bg-sky-600 rounded-b-md drop-shadow-xl">
        <div className=" m-2 absolute w-full aspect-square bg-slate-500 bottom-0"></div>
      </div> */}
      <div className=" w-full h-full flex flex-row justify-between items-center text-xl font-bold text-white">
        <div className=" flex flex-row gap-6">
          <div className=" h-20 aspect-square p-2 relative">
            <Link href="/">
              <Image src={logo} alt="B Airways Logo" fill sizes="100vw"></Image>
            </Link>
          </div>
          <div className=" flex items-center">
            <Link
              href="/daily"
              className=" transition-all delay-75 duration-300 ease-in-out hover:text-zinc-400 hover:drop-shadow-2xl hover:scale-105"
            >
              <p>DAILY</p>
            </Link>
          </div>
          <div className=" flex items-center">
            <Link
              href="/booking_info"
              className=" transition-all delay-75 duration-300 ease-in-out hover:text-zinc-400 hover:drop-shadow-2xl hover:scale-105"
            >
              <p>INFO</p>
            </Link>
          </div>
          <div className=" flex items-center">
            <Link
              className=" transition-all delay-75 duration-300 ease-in-out hover:text-zinc-400 hover:drop-shadow-2xl hover:scale-105"
              href="/loyalty"
            >
              <p>LOYALTY</p>
            </Link>
          </div>
        </div>
        {!authState.isAuthenticated ? (
          <Link
            className=" transition-all delay-75 duration-300 ease-in-out hover:text-zinc-400 hover:drop-shadow-2xl hover:scale-105"
            href="/login"
          >
            <div>
              <div>LOGIN</div>
            </div>
          </Link>
        ) : (
          <div className=" flex gap-6">
            <Link
              className=" transition-all delay-75 duration-300 ease-in-out hover:text-zinc-400 hover:drop-shadow-2xl hover:scale-105"
              href="/profile"
            >
              <p>PROFILE</p>
            </Link>
            <button onClick={handleClick}>
              <div className=" transition-all delay-75 duration-300 ease-in-out hover:text-zinc-400 hover:drop-shadow-2xl hover:scale-105">
                <div>LOGOUT</div>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
