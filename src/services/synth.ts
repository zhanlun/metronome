import * as Tone from 'tone'
const synth = new Tone.Synth().toDestination();

const loopA = new Tone.Loop(time => {
  synth.triggerAttackRelease("C5", "32n", time);
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
