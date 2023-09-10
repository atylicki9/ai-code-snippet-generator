'use client';

import styles from './page.module.css'
import { useState } from 'react'

export default function Home() {

  const [codingLanguage, setCodingLanguage] = useState("C#");
  const [prompt, setPrompt] = useState("");
  const [codeOutput, setCodeOutput] = useState("Code will appear here!");

  function appendAdditionalPromptData(promptFromInput) {
    // add additional parameters to prompt like length, coding lang, etc.
    return `${promptFromInput} in ${codingLanguage}. Make the response code only and have no comments.`
  }

  function submitCodeSnippetRequest(promptInput) {
    const fullPrompt = appendAdditionalPromptData(promptInput);
    console.log(`Prompt: ${fullPrompt}`)

    // send prompt to openAI
    const codeSnippetResponse = generateCodeSnippet(fullPrompt);
    console.log(`Response: ${codeSnippetResponse}`)

    // show response in codeOutput
    setCodeOutput(codeSnippetResponse);
  }

  const generateCodeSnippet = async (fullPrompt) => {
    try {
      const body = JSON.stringify({
        messages: [{ role: 'user', content: fullPrompt }],
        model: 'gpt-3.5-turbo',
        max_tokens: 10
      })

      const response = await fetch("/api/openAi", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      })

      return response;

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <p>
          AI Code Snippet Generator // By Aaron Tylicki
        </p>
      </div>
      <div className={styles.center} >
        <div className={styles.io}>
            <input 
              placeholder='Try something like "Write me a function for adding two numbers together"' 
              className={styles.prompt}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <select className={styles.selectDropdown} value={codingLanguage} onChange={(e) => setCodingLanguage(e.target.value)}>
              <option value="C#">C#</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="TypeScript">TypeScript</option>
            </select>
            <button className={styles.submitButton} onClick={e => submitCodeSnippetRequest(prompt)}>Submit</button>
        </div>
        <div className={styles.io}>
          <div className={styles.output}>
            <p>
              <code className={styles.code}>{codeOutput}</code>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
