import { put } from "@vercel/blob";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);

  const id = crypto.randomUUID();
  const filename = `photos/${id}.jpg`;

  const blob = await put(filename, buffer, {
    access: "public",
    contentType: "image/jpeg"
  });

  return res.status(200).json({ success: true, url: blob.url });
}
