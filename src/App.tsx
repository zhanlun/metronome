import React, { useEffect, useRef, useState } from 'react'
import styles from './App.module.css'
import Metronome from './components/metronome'
import SynthModule from './services/synth'

function App() {
  const [userResponded, setUserResponded] = useState(false)
  const [bpm, setBpm] = useState('120')
  const metronomeRef = useRef<HTMLDivElement>(null)
  const bpmInputRef = useRef<HTMLInputElement>(null)
  const [metronomeKey, setMetronomeKey] = useState(0)

  const applyBPM = () => {
    const inputValue = bpmInputRef.current?.value
    if (inputValue && metronomeRef?.current) {
      setBpm(inputValue)
      SynthModule.Tone.Transport.stop()
      
      SynthModule.Tone.Transport.bpm.value = parseInt(inputValue)
      SynthModule.Tone.Transport.start("+1")
      setTimeout(() => {
        setMetronomeKey((prev) => prev + 1)
      }, 1000);
    }
  }

  const handlePlay = () => {
    SynthModule.Tone.start().then(() => {
      SynthModule.run()
      setUserResponded(true)
    })
  }

  if (!userResponded) {
    return (
      <div className={styles.container}>
        <button onClick={handlePlay}>Play</button>
      </div>
    )
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
    </div>
  )
}

export default App
