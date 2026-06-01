export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  try {
    const { trend, platform, tone } = req.body;
    
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        messages: [{ role: 'user', content: `Write a ${platform} about ${trend} in ${tone} tone. Be viral. Only output content.` }]
      })
    });
    
    const d = await r.json();
    res.status(200).json({ content: d.content?.[0]?.text || 'No content' });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
