import { API_TOKEN } from "@/app/apiToken";

export async function POST(req, res) {
  console.log(req.body)
  const { messages } = await req.body
  const apiKey = API_TOKEN
  const url = 'https://api.openai.com/v1/chat/completions'

  const body = JSON.stringify({
    messages,
    model: 'gpt-3.5-turbo',
    stream: false,
  })

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: body
    })
    return await response.json()
    
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}