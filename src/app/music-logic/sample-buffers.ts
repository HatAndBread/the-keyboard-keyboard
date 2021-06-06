import { ToneAudioBuffer } from 'tone';
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
import sax_skronk from '../../assets/drums/saxSkronk.mp3';
import sax_skronk2 from '../../assets/drums/saxSkronk2.mp3';
import sax_skronk3 from '../../assets/drums/saxSkronk3.mp3';
import sax_skronk4 from '../../assets/drums/saxSkronk4.mp3';
import sax_skronk5 from '../../assets/drums/saxSkronk5.mp3';
import sax_skronk6 from '../../assets/drums/saxSkronk6.mp3';
import sax_squeek from '../../assets/drums/saxSqueek.mp3';
import record_player from '../../assets/drums/recordPlayerGlitch.mp3';
import radio_buzz from '../../assets/drums/radioBuzz.mp3';
import mic_feedback from '../../assets/drums/micfeedback.mp3';
import heavy_static from '../../assets/drums/heavystatic.mp3';
import guitar_noise from '../../assets/drums/guitarnoise1.mp3';
import guitar_feedback from '../../assets/drums/guitarfeedback.mp3';
import analogue_noise from '../../assets/drums/analoguewhitenoise.mp3';
import digital_noise1 from '../../assets/drums/digitalnoise1.mp3';
import digital_noise2 from '../../assets/drums/digitalnoise2.mp3';
import am_radio_noise from '../../assets/drums/amradionoise.mp3';

export const sampleUrls: { [key: string]: string } = {
  am_radio_noise,
  analogue_noise,
  kick,
  bugara1,
  bugara2,
  ceng,
  demung1,
  demung2,
  demung3,
  digital_noise1,
  digital_noise2,
  djembe1,
  djembe2,
  djembe3,
  guitar_feedback,
  guitar_noise,
  jegog,
  hat,
  heavy_static,
  kantilan,
  kalimba,
  kazoo,
  kempur,
  mic_feedback,
  piano,
  radio_buzz,
  record_player,
  sax_skronk,
  sax_skronk2,
  sax_skronk3,
  sax_skronk4,
  sax_skronk5,
  sax_skronk6,
  sax_squeek,
  singing,
  snare,
  spring,
  tambura,
  tom,
  trumpet,
  gamelan1,
  gamelan2,
  gamelan3,
  ruler,
  bowl,
  harmonium,
  oboe,
  organ,
  oud,
  rebana,
  ride,
  hiss,
  voice,
};

export const createBuffers = (
  setBuffers: React.Dispatch<React.SetStateAction<{}>>
) => {
  let sampleBuffers: { [key: string]: ToneAudioBuffer } = {};
  const sampleUrlsKeys = Object.keys(sampleUrls);
  for (let i = 0; i < sampleUrlsKeys.length; i++) {
    const sampleBuffer = new ToneAudioBuffer(
      sampleUrls[sampleUrlsKeys[i]],
      () => {
        sampleBuffers[sampleUrlsKeys[i]] = sampleBuffer;
        if (Object.keys(sampleBuffers).length === sampleUrlsKeys.length) {
          setBuffers(sampleBuffers);
        }
      }
    );
  }
};
