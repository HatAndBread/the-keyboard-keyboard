import Keyboard from './Keyboard';
import Player from './Player';
import { ToneAudioBuffer } from 'tone';
import defaultKeyboards from './default-keyboards';
import { keyboard } from './default-keyboards';

export default function createDefaultKeyboards(
  buffers: { [key: string]: ToneAudioBuffer },
  setKeyboards: React.Dispatch<
    React.SetStateAction<{
      [key: string]: Keyboard;
    } | null>
  >
) {
  const keyboardObjects: { [key: string]: Keyboard } = {};
  for (let i = 0; i < defaultKeyboards.length; i++) {
    const players = createPlayers(defaultKeyboards[i], buffers);
    keyboardObjects[defaultKeyboards[i].name.name] = new Keyboard(
      defaultKeyboards[i].name.name,
      players
    );
  }
  setKeyboards(keyboardObjects);
}

const createPlayers = (
  keyboardLayout: {
    [key: string]: {
      name: string;
      playType?: 'SINGLE' | 'RAPID' | 'LOOP' | undefined;
      playbackRate?: number;
      volume?: number;
      randomize?: boolean;
      octave: number;
    };
  },
  buffers: { [key: string]: ToneAudioBuffer }
) => {
  const players: { [key: string]: Player } = {};
  const keys = Object.keys(keyboardLayout);
  keys.forEach((key) => {
    if (key !== 'name' && keyboardLayout[key].playType) {
      players[key] = new Player(
        key,
        keyboardLayout[key].playType,
        buffers[keyboardLayout[key].name],
        keyboardLayout[key].playbackRate,
        keyboardLayout[key].volume,
        keyboardLayout[key].randomize,
        keyboardLayout[key].octave
      );
    }
  });
  return players;
};
