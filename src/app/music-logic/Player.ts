import getRandoNum from './music-loop-helpers/getRandoNum';
import gain from './effects';
import {
  Player as TonePlayer,
  ToneAudioBuffer as Buff,
  AmplitudeEnvelope as Envelope,
  now,
} from 'tone';

export default class Player {
  player: TonePlayer;
  envelope: Envelope;
  playing: boolean;
  playType: 'LOOP' | 'SINGLE' | 'RAPID' | undefined;
  keyAssignment: string;
  buffer: Buff;
  randomize: boolean;
  playbackRate: number;
  timeout: undefined | NodeJS.Timeout;
  releaseTimeout: undefined | NodeJS.Timeout;
  octave: number;
  tuning: string;
  volume: number;
  attack: number;
  release: number;
  bufferName: string;
  constructor(
    keyAssignment: string,
    playType: 'LOOP' | 'SINGLE' | 'RAPID' | undefined,
    buffer: Buff,
    playbackRate: number,
    volume: number | undefined,
    randomize: boolean | undefined,
    octave: number,
    tuning: string,
    attack: number,
    release: number,
    bufferName: string
  ) {
    this.envelope = new Envelope({
      attack: attack,
      decay: 0.2,
      sustain: 1.0,
      release: release,
    });
    this.player = new TonePlayer();
    this.playing = false;
    this.keyAssignment = keyAssignment;
    this.buffer = buffer;
    this.bufferName = bufferName;
    this.player.buffer = buffer;
    this.playbackRate = playbackRate;
    this.randomize = randomize ? true : false;
    this.octave = octave;
    this.tuning = tuning;
    this.attack = attack;
    this.release = release;
    if (playbackRate) {
      this.player.playbackRate = playbackRate;
    }
    if (volume) {
      this.player.volume.value = volume;
    }
    this.volume = volume ? volume : 0;
    this._setPlayType(playType);
    this.timeout = undefined;
    this.releaseTimeout = undefined;
  }

  stopForPlayTypeLoop = () => {
    this.playing = false;
    if (this.playbackRate && this.playType === 'LOOP') {
      this.releaseTimeout = setTimeout(() => {
        if (this.playbackRate) this.player.playbackRate = this.playbackRate;
        //@ts-ignore
      }, this.envelope.release * 1000);
      this.envelope.triggerRelease();
    }
  };
  play = (pbr: number, isRandomized?: boolean) => {
    this.handlePBR(pbr, isRandomized);
    this.handleTimeout();
    this.player.start();
    if (this.playType === 'LOOP') this.envelope.triggerAttack(now());
    this.playing = true;
  };
  handlePBR = (pbr: number, isRandomized?: boolean): void => {
    if (isRandomized || this.randomize) {
      this.player.playbackRate = getRandoNum();
    } else if (this.playbackRate) {
      this.player.playbackRate = this.playbackRate * pbr;
    }
  };
  handleTimeout = () => {
    if (this.playType === 'SINGLE') {
      this.clearTimeout();
      this.timeout = setTimeout(() => {
        this.clearTimeout();
        if (this.playbackRate) {
          this.playing = false;
          this.player.playbackRate = this.playbackRate;
        }
      }, (this.buffer.duration * 1000) / this.player.playbackRate);
    }
  };
  clearTimeout = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  };
  clearReleaseTimeout = () => {
    if (this.releaseTimeout) {
      clearTimeout(this.releaseTimeout);
      this.releaseTimeout = undefined;
    }
  };
  destroy() {
    this.envelope.dispose();
    this.player.dispose();
  }
  setBuffer(buffer: Buff, bufferName: string) {
    this.bufferName = bufferName;
    this.buffer = buffer;
    this.player.buffer = buffer;
  }
  setPlaybackRate(newPBR: number) {
    this.playbackRate = newPBR;
    this.player.playbackRate = newPBR;
  }
  setVolume(newVolume: number) {
    this.volume = newVolume;
    this.player.volume.value = newVolume;
  }
  setAttack(newAttack: number) {
    this.attack = newAttack;
    this.envelope.attack = newAttack;
  }
  setRelease(newRelease: number) {
    this.release = newRelease;
    this.envelope.release = newRelease;
  }
  _setPlayType(newPlayType: 'LOOP' | 'SINGLE' | 'RAPID' | undefined) {
    this.playType = newPlayType;
    if (newPlayType === 'LOOP') {
      this.player.loop = true;
      this.player.connect(this.envelope);
      this.envelope.connect(gain);
    } else {
      this.player.loop = false;
      this.player.connect(gain);
    }
  }
}
