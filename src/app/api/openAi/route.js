import { API_TOKEN } from "@/app/apiToken";

export async function POST(req) {
    const { prompt } = req.body;
  
    const payload = {
      model: "gpt-4",
      prompt,
      max_tokens: 100
    };
    
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN ?? ""}`,
        },
        method: "POST",
        body: JSON.stringify(payload),
      });
    
      return await response.json();
      res.status(200).json(json);
    }

    catch {
      console.error();
    }
  }