'use client';

import styles from './page.module.css'
import { useState } from 'react'
import { API_TOKEN } from './apiToken';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { codingLanguages } from './Data/codingLanguages';

export default function Home() {

  const [codingLanguage, setCodingLanguage] = useState(codingLanguages.CSharp);
  const [prompt, setPrompt] = useState("");
  const [codeOutput, setCodeOutput] = useState("Code will appear here!");

  function appendAdditionalPromptData(promptFromInput) {
    // add additional parameters to prompt like length, coding lang, etc.
    return `You are a code writer and you should only respond in the code that is asked of you.
     Do not add comments or any explanation of the code. Also do not include ''' in your response. Here is the code for you
     to write: ${promptFromInput} in ${codingLanguage}.`
  }

  async function submitCodeSnippetRequest(promptInput) {
    const fullPrompt = appendAdditionalPromptData(promptInput);
    console.log(`Prompt: ${fullPrompt}`)

    // send prompt to openAI
    const codeSnippetResponse = await generateCodeSnippet(fullPrompt);
    console.log(`Response: ${codeSnippetResponse}`)

    // show response in codeOutput
    setCodeOutput(codeSnippetResponse);
  }

  const generateCodeSnippet = async (fullPrompt) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json"
         },
        body: JSON.stringify({
          messages: [{ role: 'user', content: fullPrompt }],
          model: 'gpt-4',
          max_tokens: 100
        })
      }
      const data = await fetch('https://api.openai.com/v1/chat/completions', options)

      const response = await data.json();

      return response.choices[0].message.content;

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
              <option value={codingLanguages.CSharp}>C#</option>
              <option value={codingLanguages.JavaScript}>JavaScript</option>
              <option value={codingLanguages.Python}>Python</option>
              <option value={codingLanguages.Typescript}>TypeScript</option>
            </select>
            <button className={styles.submitButton} onClick={e => submitCodeSnippetRequest(prompt)}>Submit</button>
        </div>
        <div className={styles.io}>
          <div className={styles.output}>           
              <SyntaxHighlighter className={styles.codeResponse} language={codingLanguage} style={docco}>
                {codeOutput}
              </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </main>
  )
}
