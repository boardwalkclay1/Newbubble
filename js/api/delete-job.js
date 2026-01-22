import { list, del } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { jobId } = req.body || {};
  if (!jobId) {
    return res.status(400).json({ success: false, error: "Missing jobId" });
  }

  const { blobs } = await list({ prefix: "jobs/" });
  const blob = blobs.find(b => b.pathname.endsWith(`${jobId}.json`));

  if (!blob) {
    return res.status(404).json({ success: false, error: "Job not found" });
  }

  await del(blob.pathname);

  return res.status(200).json({ success: true });
}
