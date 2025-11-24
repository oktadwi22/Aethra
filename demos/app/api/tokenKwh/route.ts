import { generatePrettyToken } from "@/app/lib/tokenHandle";
import { NextResponse } from "next/server";

// =====================================================
// API HANDLER
// =====================================================
export async function GET() {
    const generateToken = generatePrettyToken();
    return NextResponse.json({
        token: generateToken,
    });
}
