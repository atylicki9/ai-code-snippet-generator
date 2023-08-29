import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <p>
          AI Code Snippet Generator // By Aaron Tylicki
        </p>
      </div>
      <div className={styles.center} >
        <div className={styles.io}>
            <input className={styles.prompt}/>
            <select className={styles.selectDropdown}>
              <option value="C#">C#</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="TypeScript">TypeScript</option>
            </select>
            <button className={styles.submitButton}>Submit</button>
        </div>
        <div className={styles.io}>
          <div className={styles.output}>
            <p>
              <code className={styles.code}>Enter a prompt above, youre a code snippet will appear here! </code>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
