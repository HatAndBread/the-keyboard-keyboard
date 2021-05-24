import { Player as TonePlayer, ToneAudioBuffer as Buff } from "tone";

export default class Player {
  player: TonePlayer;
  playing: boolean;
  playType: "LOOP" | "SINGLE" | "RAPID" | null;
  keyAssignment: string;
  buffer: Buff;
  constructor(
    keyAssignment: string,
    playType: "LOOP" | "SINGLE" | "RAPID" | null,
    buffer: Buff
  ) {
    this.player = new TonePlayer().toDestination();
    this.playing = false;
    this.playType = playType;
    this.keyAssignment = keyAssignment;
    this.buffer = buffer;
    this.player.buffer = buffer;
  }
}
