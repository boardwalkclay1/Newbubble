import { list } from "@vercel/blob";

export default async function handler(req, res) {
  const url = new URL(req.url, "http://localhost");
  const email = url.searchParams.get("email");

  if (!email) {
    return res.status(400).json({ success: false, error: "Email required" });
  }

  const safeId = Buffer.from(email).toString("base64url");

  const { blobs } = await list({ prefix: "profiles/" });
  const blob = blobs.find(b => b.pathname.endsWith(`${safeId}.json`));

  if (!blob) {
    return res.status(200).json({ success: true, profile: null });
  }

  const profile = await fetch(blob.url).then(r => r.json());
  return res.status(200).json({ success: true, profile });
}
