import * as Tone from 'tone';

interface Effects {
  delay: Tone.PingPongDelay | null;
  reverb: Tone.JCReverb | null;
  distortion: Tone.Distortion | null;
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

export const getEffects = () => effects;

const gain = new Tone.Gain(0.4);
let distortionDefaultWet = 1;
let delayDefaultWet = 1;
let reverbDefaultWet = 0.1;

export const getDefaultWet = () => {
  return {
    distortion: distortionDefaultWet,
    delay: delayDefaultWet,
    reverb: reverbDefaultWet,
  };
};

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
  effects.reverb = new Tone.JCReverb(0.5).connect(effects.delay);
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
  if (
    (whichEffect === 'distortion' && effects.distortion?.wet.value) ||
    (whichEffect === 'delay' && effects.delay?.wet.value) ||
    (whichEffect === 'reverb' && effects.reverb?.wet.value)
  ) {
    setEffectWet(whichEffect, 0);
  } else {
    switch (whichEffect) {
      case 'distortion':
        if (effects.distortion) {
          effects.distortion.wet.value = distortionDefaultWet;
        }
        break;
      case 'delay':
        if (effects.delay) effects.delay.wet.value = delayDefaultWet;
        break;
      case 'reverb':
        if (effects.reverb) {
          effects.reverb.wet.value = reverbDefaultWet;
        }
        break;
    }
  }
};

export const setEffectWet = (
  whichEffect: 'distortion' | 'delay' | 'reverb',
  value: number
) => {
  switch (whichEffect) {
    case 'distortion': {
      if (effects.distortion) {
        effects.distortion.wet.value = value;
      }
      break;
    }
    case 'delay': {
      if (effects.delay) {
        effects.delay.wet.value = value;
      }
      break;
    }
    case 'reverb': {
      if (effects.reverb) {
        effects.reverb.wet.value = value;
      }
      break;
    }
    default:
      break;
  }
};

export const setDistortion = (value: number) => {
  if (effects.distortion) {
    effects.distortion.distortion = value;
  }
};

export const setReverb = (value: number) => {
  if (effects.reverb) {
    effects.reverb.roomSize.value = value;
  }
};

export const setDelay = (delayTime: number, feedback: number) => {
  if (effects.delay) {
    effects.delay.delayTime.value = delayTime;
    effects.delay.feedback.value = feedback;
  }
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
