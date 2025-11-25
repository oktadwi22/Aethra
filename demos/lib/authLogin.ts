// lib/authModel.ts
// Smart Contract Host
const SC_HOST: `0x${string}` =
  "0x62c4F631D791653EE1676EE414E02022E529FFfe";

const USERS = [
  {
    userId: "95193508751348940869704438292055253560229803769166253636756993821694823615656",
    password: "123456",
    smartcontract: SC_HOST,
  },
];

export async function loginUserModel(
  userId: string,
  password: string
) {
  const found = USERS.find(
    (u) => u.userId === userId && u.password === password
  );

  if (!found) {
    return { success: false, message: "User ID atau Password salah" };
  }

  return { success: true, userId: found.userId, smartcontract: found.smartcontract };
}

