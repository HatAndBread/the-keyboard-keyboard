import getRandoNum from "./music-loop-helpers/getRandoNum";
import { Player as TonePlayer, ToneAudioBuffer as Buff } from "tone";

export default class Player {
  player: TonePlayer;
  playing: boolean;
  playType: "LOOP" | "SINGLE" | "RAPID" | undefined;
  keyAssignment: string;
  buffer: Buff;
  randomize: boolean;
  playbackRate: number | undefined;
  droning: boolean;
  timeout: undefined | NodeJS.Timeout;
  constructor(
    keyAssignment: string,
    playType: "LOOP" | "SINGLE" | "RAPID" | undefined,
    buffer: Buff,
    playbackRate: number | undefined,
    volume: number | undefined,
    randomize: boolean | undefined
  ) {
    this.player = new TonePlayer().toDestination();
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
    }
    this.player.onstop(this.player);
    this.timeout = undefined;
  }

  stop = () => {
    if (this.playbackRate) this.player.playbackRate = this.playbackRate;
    if (this.droning) this.droning = false;
    if (this.playing) this.playing = false;
    this.clearTimeout();
  };
  play = (pbr: number, isRandomized?: boolean) => {
    this.handlePBR(pbr, isRandomized);
    this.handleTimeout();
    this.player.start();
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
}
