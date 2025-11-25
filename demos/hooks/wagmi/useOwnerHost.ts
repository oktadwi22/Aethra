"use client";

import { useReadContract } from "wagmi";
import {hostAbi} from "@/abi/host";
import { sepolia } from "viem/chains";


export function useHostOwner({SC_HOST}: {SC_HOST: `0x${string}`}) {
  return useReadContract({
    abi: hostAbi,
    address: SC_HOST,
    functionName: "owner" as never,
    chainId: sepolia.id
  });
}
