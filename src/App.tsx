import React, { useEffect, useRef, useState } from 'react'
import styles from './App.module.css'
import Button from './components/button'
import Metronome from './components/metronome'
import Slider from './components/slider'
import useDebounce from './hooks/useDebounce'
import SynthModule from './services/synth'

function App() {
  const [userResponded, setUserResponded] = useState(false)
  const [bpm, setBpm] = useState('120')
  const metronomeRef = useRef<HTMLDivElement>(null)
  const [metronomeKey, setMetronomeKey] = useState(0)

  const [metronomeDisplayBpm, setMetronomeDisplayBpm] = useState('120')
  const [isPlaying, setIsPlaying] = useState(true)

  const applyBPM = () => {
    if (!isPlaying) return

    const inputValue = bpm
    if (inputValue && metronomeRef?.current) {
      SynthModule.Tone.Transport.stop()

      SynthModule.Tone.Transport.bpm.value = parseInt(inputValue)
      SynthModule.Tone.Transport.start('+1')
      setTimeout(() => {
        setMetronomeDisplayBpm(inputValue)
        setMetronomeKey((prev) => prev + 1)
      }, 1000)
    }
  }

  const debouncedBpm = useDebounce(bpm, 500)

  useEffect(() => {
    if (debouncedBpm) {
      applyBPM()
    }
  }, [debouncedBpm])

  const handlePlay = () => {
    SynthModule.Tone.start().then(() => {
      SynthModule.run()
      setUserResponded(true)
    })
  }
  useEffect(() => {
    if (isPlaying) {
      applyBPM()
    } else {
      SynthModule.Tone.Transport.stop()
      setMetronomeDisplayBpm('0.000001')
    }
  }, [isPlaying])

  if (!userResponded) {
    return (
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <Button onClick={handlePlay}>Play</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <Slider value={bpm} onChange={(v) => setBpm(v)} />
        <Metronome
          bpm={!isPlaying ? 0.000001 : parseInt(metronomeDisplayBpm || '1')}
          ref={metronomeRef}
          key={metronomeKey}
        />
        <Button onClick={() => setIsPlaying((prev) => !prev)}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
      </div>
    </div>
  )
}

export default App
