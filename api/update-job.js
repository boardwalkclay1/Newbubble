import { put } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { jobId, washerEmail, status } = req.body;

  const jobUrl = `${process.env.BLOB_READ_URL}/jobs/${jobId}.json`;
  const current = await fetch(jobUrl).then(r => r.json());

  const updated = {
    ...current,
    washerEmail: washerEmail || current.washerEmail,
    status,
    updatedAt: Date.now()
  };

  await put(`jobs/${jobId}.json`, JSON.stringify(updated), {
    access: "public"
  });

  return res.status(200).json({ success: true, job: updated });
}
