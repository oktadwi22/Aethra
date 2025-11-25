"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useAppKit } from "@reown/appkit/react";
import { useConnection, } from "wagmi";
import { loginHostAction, loginUserAction } from "./action";



export default function LoginPage() {
    const [mode, setMode] = useState<"host" | "user">("host");
    const [password, setPassword] = useState("123456");
    const [userId, setUserId] = useState("95193508751348940869704438292055253560229803769166253636756993821694823615656");
    const [error, setError] = useState("");

    const router = useRouter();

   const {isConnected, address} = useConnection()
    const { open } = useAppKit();

    async function handleUserSubmit(formData: FormData) {
        const resp = await loginUserAction(formData);

        if (resp && !resp.success && resp.message) {
            setError(resp.message);
        }
    }

   async function getHost (address: `0x${string}`) {
        const resp = await loginHostAction(address)
         if (resp && !resp.success && resp.message) {
            setError(resp.message);
        }
    }

    // Handle Host Login – If wallet connected, redirect
    useEffect(() => {
        if (isConnected && mode === "host" && address) {
            getHost(address)
        }
    }, [isConnected, mode, address])


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">
            <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6 pt-1">

                {/* Logo */}
                <div className="flex flex-col items-center">
                    <Image src="/logo.png" alt="Logo" width={170} height={170} priority />
                </div>

                {/* Switch */}
                <div className="flex w-full bg-gray-200 rounded-xl mb-6 overflow-hidden">
                    <button
                        className={`flex-1 py-3 text-sm font-medium ${mode === "host"
                            ? "bg-yellow-500 text-white"
                            : "text-gray-700"
                            }`}
                        onClick={() => setMode("host")}
                    >
                        Host Login
                    </button>
                    <button
                        className={`flex-1 py-3 text-sm font-medium ${mode === "user"
                            ? "bg-yellow-500 text-white"
                            : "text-gray-700"
                            }`}
                        onClick={() => setMode("user")}
                    >
                        User Login
                    </button>
                </div>

                {/* Host Login */}
                {mode === "host" && (
                    <div className="space-y-3">

                        <button
                            onClick={() => open({ view: "Connect" })}
                            className="w-full bg-yellow-500 text-white py-3 rounded-xl"
                        >
                            Connect Wallet
                        </button>

                    </div>
                )}

                {/* User Login */}
                {mode === "user" && (
                    <form action={handleUserSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">User ID</label>
                            <input
                                value={userId}
                                type="number"
                                name="userId"
                                placeholder="Masukkan user ID"
                                className="w-full mt-1 px-4 py-3 border rounded-xl bg-gray-50"
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Password</label>


                            <input
                                value={password}
                                type="password"
                                name="password"
                                placeholder="Masukkan password"
                                className="w-full mt-1 px-4 py-3 border rounded-xl bg-gray-50"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-yellow-500 text-white py-3 rounded-xl"
                        >
                            Login User
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
