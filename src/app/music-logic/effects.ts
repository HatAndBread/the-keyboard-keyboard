import * as Tone from "tone";
interface Effects {
  [key: string]: any;
}

const recorder = new Tone.Recorder();

const effects: Effects = {
  delay: null,
  reverb: null,
  distortion: null,
};

const gain = new Tone.Gain(1);
const recordPlayer = new Tone.Player().toDestination();

export const record = () => {
  recorder.start();
};

export const stopRecord = async () => {
  const recording = await recorder.stop();
  const url = URL.createObjectURL(recording);
  const buff = new Tone.ToneAudioBuffer(url, () => {
    recordPlayer.buffer = buff;
    recordPlayer.loop = true;
    recordPlayer.start();
  });
  // recordPlayer.autostart = true;  // automatically start
};

export const setEffects = () => {
  effects.delay = new Tone.PingPongDelay(0.1, 0.8).toDestination();
  effects.reverb = new Tone.JCReverb(0.7).connect(effects.delay);
  effects.distortion = new Tone.Distortion(0).connect(effects.reverb);
  gain.connect(recorder);
  recordPlayer.connect(gain);
  gain.connect(effects.distortion);
  effects.delay.wet.value = 1;
  effects.distortion.wet.value = 0;
  effects.reverb.wet.value = 1;
};

export const setEffectWet = (whichEffect: string, value: number) => {
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

export default gain;
