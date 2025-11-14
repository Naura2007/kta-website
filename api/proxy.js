import fetch from "node-fetch";

export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).send("URL kosong");

  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", response.headers.get("content-type"));
    res.setHeader("Access-Control-Allow-Origin", "*"); // ⚡ wajib agar html2canvas bisa load
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send("Gagal fetch image");
  }
}
