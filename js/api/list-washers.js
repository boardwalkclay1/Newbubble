import { list } from "@vercel/blob";

export default async function handler(req, res) {
  const { blobs } = await list({ prefix: "profiles/" });

  const washers = [];

  for (const blob of blobs) {
    const profile = await fetch(blob.url).then(r => r.json());
    if (profile.role === "washer") {
      washers.push(profile);
    }
  }

  return res.status(200).json({ success: true, washers });
}
