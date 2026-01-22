import { put } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const job = req.body;
  const id = crypto.randomUUID();

  const fullJob = {
    id,
    status: "open",
    createdAt: Date.now(),
    ...job
  };

  const blob = await put(`jobs/${id}.json`, JSON.stringify(fullJob), {
    access: "public"
  });

  return res.status(200).json({ success: true, job: fullJob, url: blob.url });
}
