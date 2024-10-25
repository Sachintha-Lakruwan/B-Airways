"use client";

// Just used for testing api

import { useState } from "react";
import Link from "next/link";
import { login, setToken } from "../GlobalRedux/Slices/auth/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../GlobalRedux/store";

export default function LoginForm() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const resultAction = await dispatch(login({ username, password }));
        if (login.fulfilled.match(resultAction)) {
            console.log("login success");
            dispatch(setToken(resultAction.payload as string));
            router.push("/");
        } else if (login.rejected.match(resultAction)) {
            setError(resultAction.payload as string);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-400 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmit}
                    method="POST"
                >
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </button>
                    </div>
                    <div className="text-sm text-center mt-4">
                        <Link
                            href="/signup"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            {"Don't have an account? Sign up"}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
