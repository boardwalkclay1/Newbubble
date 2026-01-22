import { list } from "@vercel/blob";

export default async function handler(req, res) {
  const { client, washer } = req.query;

  const { blobs } = await list({ prefix: "jobs/" });

  const jobs = [];
  for (const blob of blobs) {
    const data = await fetch(blob.url).then(r => r.json());
    jobs.push(data);
  }

  if (client) {
    const mine = jobs.filter(j => j.clientEmail === client);
    return res.status(200).json({ jobs: mine });
  }

  if (washer) {
    const open = jobs.filter(j => j.status === "open");
    const mine = jobs.filter(j => j.washerEmail === washer);
    return res.status(200).json({ open, mine });
  }

  return res.status(200).json({ jobs });
}
