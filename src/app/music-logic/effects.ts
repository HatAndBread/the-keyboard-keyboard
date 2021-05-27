import * as Tone from "tone";
interface Effects {
  [key: string]: any;
}

const recordPlayer = new Tone.Player().toDestination();
let recorder: undefined | Tone.Recorder;
//@ts-ignore
if (window.MediaRecorder) {
  recorder = new Tone.Recorder();
}

const looper = new Tone.Loop((time) => {
  if (recordPlayer.loaded) {
    recordPlayer.start();
  }
}, "4n");

const effects: Effects = {
  delay: null,
  reverb: null,
  distortion: null,
};

const gain = new Tone.Gain(0.4);

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
      console.log(buff.duration, buff.length, "STUFF");
      recordPlayer.buffer = buff;
      //recordPlayer.loop = true;
      Tone.Transport.bpm.value = 60 / buff.duration;
      Tone.Transport.start();
      looper.start(0);

      //Tone.Transport.loop = true;
      // Tone.Transport.loopStart = 0;
      // Tone.Transport.loopEnd = buff.duration;
      //recordPlayer.start();
    });
    // recordPlayer.autostart = true;  // automatically start
  }
};

export const setEffects = () => {
  effects.delay = new Tone.PingPongDelay(0.05, 0.6).toDestination();
  effects.reverb = new Tone.JCReverb(0.7).connect(effects.delay);
  effects.distortion = new Tone.Distortion(0).connect(effects.reverb);
  if (recorder) {
    gain.connect(recorder);
  }
  recordPlayer.connect(gain);
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
