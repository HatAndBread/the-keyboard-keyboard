import * as Tone from 'tone';
import kick from '../../assets/drums/kick.mp3';
import bugara1 from '../../assets/drums/bugara1.mp3';


const samples = new Tone.ToneAudioBuffers({
  kick,
  bugara1
}, ()=>{
  console.log('Samples loaded!')
});
const players = [
  new Tone.Player().toDestination(),
  new Tone.Player().toDestination(),
  new Tone.Player().toDestination(),
  new Tone.Player().toDestination(),
  new Tone.Player().toDestination(),
  new Tone.Player().toDestination(),
  new Tone.Player().toDestination(),
  new Tone.Player().toDestination(),
  new Tone.Player().toDestination(),
  new Tone.Player().toDestination(),
  new Tone.Player().toDestination()
];
players.forEach( (player)=> player.loop = false)

let playerNum = 0;
const playDrum = (which: string)=> {
  players[playerNum].buffer = samples.get(which)
  players[playerNum].start();
}
const handleKeyboard = (key: string, currentPlayer: number) => {
  playerNum = currentPlayer;
  switch(key){
    case ' ': {
      playDrum('kick');
      break;
    }
    case 'a': {
      playDrum('bugara1');
      break
    }
    default: break;
  }
}

export default handleKeyboard;