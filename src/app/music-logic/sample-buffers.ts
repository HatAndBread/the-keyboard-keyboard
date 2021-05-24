import { ToneAudioBuffer } from "tone";
import kick from "../../assets/drums/kick.mp3";
import bugara1 from "../../assets/drums/bugara1.mp3";
import bugara2 from "../../assets/drums/bugara2.mp3";
import ceng from "../../assets/drums/ceng.mp3";
import demung1 from "../../assets/drums/demung1.mp3";
import demung2 from "../../assets/drums/demung2.mp3";
import demung3 from "../../assets/drums/demung3.mp3";
import djembe1 from "../../assets/drums/djembe1.mp3";
import djembe2 from "../../assets/drums/djembe2.mp3";
import djembe3 from "../../assets/drums/djembe3.mp3";
import jegog from "../../assets/drums/jegog.mp3";
import hat from "../../assets/drums/hat.mp3";
import kantilan from "../../assets/drums/kantilan.mp3";
import kempur from "../../assets/drums/kempur.mp3";
import piano from "../../assets/drums/piano.mp3";
import spring from "../../assets/drums/tuned-spring.mp3";
import snare from "../../assets/drums/snare.mp3";
import tambura from "../../assets/drums/tambura.mp3";
import tom from "../../assets/drums/tom.mp3";
import trumpet from "../../assets/drums/trumpet.mp3";
import kalimba from "../../assets/drums/kalimba.mp3";
import gamelan1 from "../../assets/drums/gamelan.mp3";
import gamelan2 from "../../assets/drums/gamelan2.mp3";
import gamelan3 from "../../assets/drums/gamelan3.mp3";
import ruler from "../../assets/drums/tuned-ruler.mp3";
import bowl from "../../assets/drums/bowl.mp3";
import harmonium from "../../assets/drums/harmonium.mp3";
import kazoo from "../../assets/drums/kazoo.mp3";
import oboe from "../../assets/drums/oboe.mp3";
import organ from "../../assets/drums/organ.mp3";
import oud from "../../assets/drums/oud.mp3";
import rebana from "../../assets/drums/rebana.mp3";
import ride from "../../assets/drums/ride.mp3";
import hiss from "../../assets/drums/trumpethiss.mp3";
import voice from "../../assets/drums/voice.mp3";
import singing from "../../assets/drums/singing.mp3";

export const sampleUrls: { [key: string]: string } = {
  kick,
  bugara1,
  bugara2,
  ceng,
  demung1,
  demung2,
  demung3,
  djembe1,
  djembe2,
  djembe3,
  jegog,
  hat,
  kantilan,
  kalimba,
  kazoo,
  kempur,
  piano,
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
