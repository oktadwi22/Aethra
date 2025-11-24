import crypto from "crypto";

// ==============================
// GET SALT FROM ENV
// ==============================
const SALT = process.env.TOKEN_SALT || "DEFAULT_SALT";

// ==============================
// RANDOM NUMBERS
// ==============================
function randomNumeric(length: number) {
  const buf = crypto.randomBytes(length);
  let out = "";

  for (let i = 0; i < buf.length && out.length < length; i++) {
    out += (buf[i] % 10).toString();
  }

  return out.slice(0, length);
}

// ==============================
// BATCH = ddMM  (24 November → 2411)
// selalu 4 digit
// ==============================
function getBatchId() {
  const now = new Date();
  const d = now.getDate().toString().padStart(2, "0");
  const m = (now.getMonth() + 1).toString().padStart(2, "0");
  return d + m; // "2411"
}

// ==============================
// HMAC (DIGIT ONLY)
// ==============================
function hmacNumeric(input: string, length: number) {
  const hmac = crypto
    .createHmac("sha256", SALT)
    .update(input)
    .digest("hex");

  // Convert hex → digits only
  const digits = hmac
    .split("")
    .map((ch) => parseInt(ch, 16) % 10)
    .join("");

  return digits.slice(0, length);
}

// ==============================
// CHECKSUM (MOD 97)
// ==============================
function checksum97(base: string) {
  return (parseInt(base, 10) % 97).toString().padStart(2, "0");
}

// ==============================
// MAIN TOKEN GENERATOR
// Format 20 digit:
// [BATCH 4][RANDOM+HMAC 14][CHECKSUM 2]
// ==============================
export function generatePaymentToken() {
  const batch = getBatchId(); // 4 digit

  const rand = randomNumeric(6);   // 6 digit random
  const hmacPart = hmacNumeric(batch + rand, 14 - 6);

  const body = batch + rand + hmacPart; // total 18 digit

  const check = checksum97(body); // 2 digit

  return body + check; // 20 digit
}

// ==============================
// PRETTY FORMAT (PLN STYLE)
// ==============================
export function generatePrettyToken() {
  return generatePaymentToken().replace(/(.{4})/g, "$1 ").trim();
}
