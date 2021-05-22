import * as Tone from 'tone';
import kick from '../../assets/drums/kick.mp3';
import bugara1 from '../../assets/drums/bugara1.mp3';
import bugara2 from '../../assets/drums/bugara2.mp3';
import ceng from '../../assets/drums/ceng.mp3';
import demung1 from '../../assets/drums/demung1.mp3';
import demung2 from '../../assets/drums/demung2.mp3';
import demung3 from '../../assets/drums/demung3.mp3';
import djembe1 from '../../assets/drums/djembe1.mp3';
import djembe2 from '../../assets/drums/djembe2.mp3';
import djembe3 from '../../assets/drums/djembe3.mp3';
import jegog from '../../assets/drums/jegog.mp3';
import hat from '../../assets/drums/hat.mp3';
import kantilan from '../../assets/drums/kantilan.mp3';
import kempur from '../../assets/drums/kempur.mp3';
import piano from '../../assets/drums/piano.mp3';
import spring from '../../assets/drums/tuned-spring.mp3';
import snare from '../../assets/drums/snare.mp3';
import tambura from '../../assets/drums/tambura.mp3';
import tom from '../../assets/drums/tom.mp3';
import trumpet from '../../assets/drums/trumpet.mp3';
import kalimba from '../../assets/drums/kalimba.mp3';
import gamelan1 from '../../assets/drums/gamelan.mp3';
import gamelan2 from '../../assets/drums/gamelan2.mp3';
import gamelan3 from '../../assets/drums/gamelan3.mp3';
import ruler from '../../assets/drums/tuned-ruler.mp3';
import bowl from '../../assets/drums/bowl.mp3';
import harmonium from '../../assets/drums/harmonium.mp3';
import kazoo from '../../assets/drums/kazoo.mp3';
import oboe from '../../assets/drums/oboe.mp3';
import organ from '../../assets/drums/organ.mp3';
import oud from '../../assets/drums/oud.mp3';
import rebana from '../../assets/drums/rebana.mp3';
import ride from '../../assets/drums/ride.mp3';
import hiss from '../../assets/drums/trumpethiss.mp3';
import voice from '../../assets/drums/voice.mp3';
import singing from '../../assets/drums/singing.mp3';
import keys from './keys';
import Player from '../music-logic/Player';

interface SampleUrls {
  [key: string]: string;
}
const sampleUrls: SampleUrls = {
  ' ': kick,
  a: kick,
  b: bugara1,
  c: bugara2,
  d: ceng,
  e: demung1,
  f: demung2,
  g: demung3,
  h: djembe1,
  i: djembe2,
  j: djembe3,
  k: jegog,
  l: hat,
  m: kantilan,
  n: kalimba,
  o: kazoo,
  p: kempur,
  q: piano,
  r: singing,
  s: snare,
  t: spring,
  u: tambura,
  v: tom,
  w: trumpet,
  x: gamelan1,
  y: gamelan2,
  z: gamelan3,
  '0': ruler,
  '1': bowl,
  '2': harmonium,
  '3': oboe,
  '4': organ,
  '5': oud,
  '6': rebana,
  '7': ride,
  '8': hiss,
  '9': voice,
};
const samples = new Tone.ToneAudioBuffers(sampleUrls, () => {
  console.log('Samples loaded!');
});
const players: Player[] = [];
const sampleUrlsKeys = Object.keys(sampleUrls);
for (let i = 0; i < sampleUrlsKeys.length; i++) {
  players.push(new Player(sampleUrlsKeys[i], 'SINGLE', sampleUrls[sampleUrlsKeys[i]]));
}
players.forEach(player => {
  player.player.buffer = samples.get(player.keyAssignment);
  player.player.loop = false;
  //player.playType === 'LOOP' ? (player.player.loop = true) : (player.player.loop = false);
});

let currentKeys: null | string[] = null;

// interface KeySoundAssignments {
//   [key: string]: string | null;
// }
// const keySoundAssignments: KeySoundAssignments = {};
// keys.forEach(key => {
//   keySoundAssignments[key] = null;
// });
export const musicLoop = () => {
  if (currentKeys) {
    currentKeys.forEach(key => {
      const currPlayer = players.find((player) => player.keyAssignment === key);
      currPlayer && currPlayer.player.start();
    });
  }
  requestAnimationFrame(musicLoop);
};

export const setCurrentKeys = (cK: string[]) => (currentKeys = cK);
// const playDrum = (which: string) => {
//   players[playerNum].player.buffer = samples.get(which);
//   players[playerNum].player.start();
// };
// const handleKeyboard = (key: string, currentPlayer: number) => {
//   playerNum = currentPlayer;
//   switch (key) {
//     case ' ': {
//       playDrum('kick');
//       console.log(players);
//       break;
//     }
//     case 'a': {
//       playDrum('bugara1');
//       break;
//     }
//     default:
//       break;
//   }
// };

//export default handleKeyboard;
