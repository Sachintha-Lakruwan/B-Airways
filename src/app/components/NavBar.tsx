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
  console.log(authState);

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
            <Link href="/">
              <p>BOOK</p>
            </Link>
          </div>
          <div className=" flex items-center">
            <Link href="/">
              <p>LOYALTY</p>
            </Link>
          </div>
          <div className=" flex items-center">
            <Link href="/">
              <p>HELP</p>
            </Link>
          </div>
        </div>
        {!authState.isAuthenticated ? (
          <Link href="/login">
            <div>
              <div>LOGIN</div>
            </div>
          </Link>
        ) : (
          <button onClick={handleClick}>
            <div>
              <div>LOGOUT</div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
