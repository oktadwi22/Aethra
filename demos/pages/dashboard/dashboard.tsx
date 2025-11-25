'use client'
import { useHostOwner } from "@/hooks/wagmi/useOwnerHost";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useConnection } from "wagmi";


type Props = {
  params: Promise<{ addressHost: string }>
}

export default async function Dashboard() {}

    const { data: ownerHost, isLoading, isError } = useHostOwner()
    const { address } = useConnection()

    useEffect(() => {
        if (address !== ownerHost && !isLoading && !isError) {
            redirect("/login");
        }
    }, [address, isLoading, isError])


    return (
        <div>
            <h1>Dashboard Host</h1>
        </div>
    );
}