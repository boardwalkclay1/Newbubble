import { put } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { email, lat, lng } = req.body || {};
  if (!email || lat == null || lng == null) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  const safeId = Buffer.from(email).toString("base64url");

  const location = {
    email,
    lat,
    lng,
    updatedAt: new Date().toISOString()
  };

  await put(`locations/${safeId}.json`, JSON.stringify(location), {
    access: "public"
  });

  return res.status(200).json({ success: true, location });
}
