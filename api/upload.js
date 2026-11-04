export default async function handler(req, res) {
  // Hanya izinkan method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Data gambar tidak ditemukan' });
    }

    // Tembak API Imgur Server-to-Server (Bebas CORS)
    const imgurResponse = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: 'Client-ID 544726315d04170',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: image,
        type: 'base64'
      }),
    });

    const data = await imgurResponse.json();

    if (data.success && data.data && data.data.link) {
      return res.status(200).json({ url: data.data.link });
    } else {
      return res.status(500).json({ error: data.data?.error || 'Gagal upload ke Imgur' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
