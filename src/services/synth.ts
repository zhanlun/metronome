import * as Tone from 'tone'
const synth = new Tone.Sampler({
  urls: {
    'C4': 'metronome-click.mp3',
  },
  baseUrl: '/',
}).toDestination();

const loopA = new Tone.Loop(time => {
  synth.triggerAttackRelease("C4", 0.5);
}, "4n").start(0);

async function run() {
  Tone.Transport.bpm.value = 120
  Tone.Transport.start()
}

export default {
  // synth,
  Tone,
  run,
}
