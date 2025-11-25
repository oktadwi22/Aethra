import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SC_HOST: `0x${string}` =
  "0x62c4F631D791653EE1676EE414E02022E529FFfe";

const mockHost = [
  {
    addressHost: `0x${"0xdf0f7cd19c2779ce0b72b768b445ac97979a3fd9"}`,
    smartcontract: SC_HOST,
  },
];

export async function POST(req: Request) {
  const { address } = await req.json();

  const found = mockHost.find(
    (h) => h.addressHost.toLowerCase() === address.toLowerCase()
  );

  if (!found) {
    return NextResponse.json(
      { success: false, message: "Wallet ini tidak terdaftar sebagai Host" },
      { status: 401 }
    );
  }

  // simpan ke cookie
  (await cookies()).set({
    name: "host_auth",
    value: JSON.stringify({
      addressHost: found.addressHost,
      smartcontract: found.smartcontract,
      loginTime: Date.now(),
    }),
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return NextResponse.json({
    success: true,
    redirect:`/dashboard/${found.addressHost}`,
  });
}
