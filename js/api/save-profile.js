import { put, list } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const body = req.body || {};
  const email = body.email;

  const profile = {
    email,
    role: body.role,
    name: body.name,
    phone: body.phone,
    services: body.services || [],
    prices: body.prices || {},
    photoUrl: body.photoUrl || null,
    updatedAt: new Date().toISOString()
  };

  const safeId = Buffer.from(email).toString("base64url");

  await put(`profiles/${safeId}.json`, JSON.stringify(profile), {
    access: "public"
  });

  return res.status(200).json({ success: true, profile });
}
