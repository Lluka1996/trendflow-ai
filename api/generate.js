export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { trend, platform, tone } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        messages: [{
          role: 'user',
          content: `Write a ${platform} about ${trend} in a ${tone} tone. Make it viral and engaging. Only output the content.`
        }]
      })
    });

    const data = await response.json();
    res.status(200).json({ content: data.content[0].text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate content' });
  }
}
