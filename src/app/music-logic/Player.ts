import getRandoNum from "./music-loop-helpers/getRandoNum";
import {
  Player as TonePlayer,
  ToneAudioBuffer as Buff,
  AmplitudeEnvelope as Envelope,
  now,
} from "tone";

export default class Player {
  player: TonePlayer;
  envelope: Envelope;
  playing: boolean;
  playType: "LOOP" | "SINGLE" | "RAPID" | undefined;
  keyAssignment: string;
  buffer: Buff;
  randomize: boolean;
  playbackRate: number | undefined;
  droning: boolean;
  timeout: undefined | NodeJS.Timeout;
  releaseTimeout: undefined | NodeJS.Timeout;
  constructor(
    keyAssignment: string,
    playType: "LOOP" | "SINGLE" | "RAPID" | undefined,
    buffer: Buff,
    playbackRate: number | undefined,
    volume: number | undefined,
    randomize: boolean | undefined
  ) {
    this.envelope = new Envelope({
      attack: 0.1,
      decay: 0.2,
      sustain: 1.0,
      release: 0.8,
    });
    this.player = new TonePlayer();
    this.playing = false;
    this.playType = playType;
    this.keyAssignment = keyAssignment;
    this.buffer = buffer;
    this.player.buffer = buffer;
    this.playbackRate = playbackRate;
    this.droning = false;
    if (randomize) {
      this.randomize = randomize;
    } else {
      this.randomize = false;
    }
    if (playbackRate) {
      this.player.playbackRate = playbackRate;
    }
    if (volume) {
      this.player.volume.value = volume;
    }
    if (playType === "LOOP") {
      this.player.loop = true;
      this.player.connect(this.envelope);
      this.envelope.toDestination();
    } else {
      this.player.toDestination();
    }
    this.timeout = undefined;
    this.releaseTimeout = undefined;
  }

  stopForPlayTypeLoop = () => {
    this.playing = false;
    if (this.playbackRate && this.playType === "LOOP") {
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
    if (this.playType === "LOOP") this.envelope.triggerAttack(now());
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
    if (this.playType === "SINGLE") {
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
}
