import { API_TOKEN } from "@/app/apiToken";

export async function POST(req, res) {
  const { messages } = await req.json()
  console.log(stringify(messages))
  const apiKey = API_TOKEN
  const url = 'https://api.openai.com/v1/chat/completions'

  const body = JSON.stringify({
    messages: messages,
    model: 'gpt-3.5-turbo',
  })

  console.log("Body:" + body)
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body
    })
    const data = await response.json()
    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}