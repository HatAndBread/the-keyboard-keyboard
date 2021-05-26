import * as Tone from "tone";
interface Effects {
  [key: string]: any;
}
const effects: Effects = {
  delay: null,
  reverb: null,
  distortion: null,
};

const gain = new Tone.Gain(1);

export const setEffects = () => {
  effects.delay = new Tone.PingPongDelay(0.1, 0.8).toDestination();
  effects.reverb = new Tone.JCReverb(0).connect(effects.delay);
  effects.distortion = new Tone.Distortion(0).connect(effects.reverb);
  gain.connect(effects.distortion);
  effects.delay.wet.value = 0;
  effects.distortion.wet.value = 0;
  effects.reverb.wet.value = 0;
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
