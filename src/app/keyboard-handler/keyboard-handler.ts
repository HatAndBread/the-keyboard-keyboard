import * as Tone from 'tone';
import kick from '../../assets/drums/kick.mp3';
import bugara1 from '../../assets/drums/bugara1.mp3';


const samples = new Tone.ToneAudioBuffers({
  kick,
  bugara1
}, ()=>{
  console.log('Samples loaded!')
});
const player = new Tone.Player().toDestination();
player.loop = false;

const playDrum = (which: string)=> {
  player.buffer = samples.get(which);
  player.start()
}
const handleKeyboard = (key: string, currentPlayer: string) => {
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