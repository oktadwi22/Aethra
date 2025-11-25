import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Smart Contract Host
const SC_HOST: `0x${string}` =
  "0x62c4F631D791653EE1676EE414E02022E529FFfe";

// Mock database user
const USERS = [
  {
    userId: "95193508751348940869704438292055253560229803769166253636756993821694823615656",
    password: "123456",
    smartcontract: SC_HOST,
  },
];

export async function POST(req: Request) {
  const { userId, password } = await req.json();

  const found = USERS.find(
    (u) => u.userId === userId && u.password === password
  );

  if (!found) {
    return NextResponse.json(
      { success: false, message: "User ID atau Password salah" },
      { status: 401 }
    );
  }

  // simpan ke cookie server-side
  (await cookies()).set({
    name: "user_auth",
    value: JSON.stringify({
      userId: found.userId,
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
    redirect: `/user/${found.userId}`,
  });
}
