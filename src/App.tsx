import React, { useRef, useState } from 'react'
import styles from './App.module.css'
import Metronome from './components/metronome'

let intervalId: NodeJS.Timer | null = null
let number = 0

function App() {
  const [bpm, setBpm] = useState('120')
  const [isYellow, setIsYellow] = useState(true)
  const metronomeRef = useRef<HTMLDivElement>(null)
  const bpmInputRef = useRef<HTMLInputElement>(null)
  const [metronomeKey, setMetronomeKey] = useState(0)

  const applyBPM = () => {
    const inputValue = bpmInputRef.current?.value
    if (inputValue && metronomeRef?.current) {
      setBpm(inputValue)
      if (intervalId) {
        clearInterval(intervalId)
      }
      intervalId = setInterval(
        () => setIsYellow((prev) => !prev),
        (60 / parseInt(inputValue)) * 1000
      )
      setMetronomeKey((prev) => prev + 1)
    }
  }

  return (
    <div className={styles.container}>
      <input ref={bpmInputRef} defaultValue={120} />
      <button onClick={applyBPM}>Apply</button>
      <Metronome
        bpm={parseInt(bpm || '1')}
        ref={metronomeRef}
        key={metronomeKey}
      />

      <div
        style={{
          width: 100,
          height: 100,
          backgroundColor: isYellow ? 'yellow' : 'red',
        }}
      />
    </div>
  )
}

export default App
