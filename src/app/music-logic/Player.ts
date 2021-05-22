import { Player as TonePlayer } from 'tone';

export default class Player {
  player: TonePlayer;
  playing: boolean;
  playType: 'LOOP' | 'SINGLE' | 'RAPID';
  keyAssignment: string;
  url: string;
  constructor(keyAssignment: string, playType: 'LOOP' | 'SINGLE' | 'RAPID', url: string) {
    this.player = new TonePlayer().toDestination();
    this.playing = false;
    this.playType = playType;
    this.keyAssignment = keyAssignment;
    this.url = url;
  }
}
