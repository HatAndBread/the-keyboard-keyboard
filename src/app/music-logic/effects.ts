import * as Tone from 'tone';

interface Effects {
  [key: string]: any;
}

export const baseLoopPlayer = new Tone.Player().toDestination();
let recorder: undefined | Tone.Recorder;

//@ts-ignore
if (window.MediaRecorder) recorder = new Tone.Recorder();

const effects: Effects = {
  delay: null,
  reverb: null,
  distortion: null,
};

const gain = new Tone.Gain(0.4);
let distortionDefaultWet = 1;
let delayDefaultWet = 1;
let reverbDefaultWet = 0.3;

export const record = () => {
  if (recorder) {
    recorder.start();
  }
};

export const stopRecord = async () => {
  if (recorder) {
    const recording = await recorder.stop();
    const url = URL.createObjectURL(recording);
    const buff = new Tone.ToneAudioBuffer(url, () => {
      baseLoopPlayer.buffer = buff;
      baseLoopPlayer.loop = true;
      baseLoopPlayer.start();
    });
  }
};

export const setEffects = () => {
  effects.delay = new Tone.PingPongDelay(0.1, 0.6).toDestination();
  effects.reverb = new Tone.JCReverb(0.7).connect(effects.delay);
  effects.distortion = new Tone.Distortion(1).connect(effects.reverb);
  if (recorder) {
    gain.connect(recorder);
  }
  baseLoopPlayer.connect(gain);
  gain.connect(effects.distortion);
  effects.delay.wet.value = 0;
  effects.distortion.wet.value = 0;
  effects.reverb.wet.value = 0;
};

export const effectOnOff = (whichEffect: 'distortion' | 'delay' | 'reverb') => {
  if (effects[whichEffect].wet.value) {
    effects[whichEffect].wet.value = 0;
  } else {
    switch (whichEffect) {
      case 'distortion':
        effects.distortion.wet.value = distortionDefaultWet;
        break;
      case 'delay':
        effects.delay.wet.value = delayDefaultWet;
        break;
      case 'reverb':
        effects.reverb.wet.value = reverbDefaultWet;
        break;
    }
  }
};

export const setEffectWet = (
  whichEffect: 'distortion' | 'delay' | 'reverb',
  value: number
) => {
  effects[whichEffect].wet.value = value;
};

export const setDistortion = (value: number) => {
  effects.distortion.distortion = value;
};

export const setReverb = (value: number) => {
  effects.reverb.roomSize = value;
};

export const setDelay = (delayTime: number, feedback: number) => {
  effects.delay.delayTime = delayTime;
  effects.delay.feedback = feedback;
};

export const setDefaultWet = (
  whichEffect: 'distortion' | 'delay' | 'reverb',
  value: number
) => {
  switch (whichEffect) {
    case 'distortion':
      distortionDefaultWet = value;
      break;
    case 'delay':
      delayDefaultWet = value;
      break;
    case 'reverb':
      reverbDefaultWet = value;
      break;
  }
};

export default gain;
