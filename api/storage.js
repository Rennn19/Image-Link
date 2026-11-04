import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // GET: Ambil data folder & gambar dari Vercel Cloud DB
  if (req.method === 'GET') {
    try {
      const folders = await kv.get('wikistatic_folders');
      const assets = await kv.get('wikistatic_assets');
      return res.status(200).json({ folders, assets });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // POST: Simpan data folder & gambar ke Vercel Cloud DB
  if (req.method === 'POST') {
    try {
      const { folders, assets } = req.body;
      if (folders) await kv.set('wikistatic_folders', folders);
      if (assets) await kv.set('wikistatic_assets', assets);
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
