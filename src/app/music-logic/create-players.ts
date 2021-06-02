import Player from './Player';
import { ToneAudioBuffer } from 'tone';
import { KeyboardTemplate } from './default-keyboards/keyboard-template';

export const createPlayers = (
  keyboardLayout: KeyboardTemplate,
  buffers: { [key: string]: ToneAudioBuffer }
) => {
  const players: { [key: string]: Player } = {};
  const keys = Object.keys(keyboardLayout);
  keys.forEach((k) => {
    if (
      k !== 'name' &&
      (k === 'a' ||
        k === 'b' ||
        k === 'c' ||
        k === 'd' ||
        k === 'e' ||
        k === 'f' ||
        k === 'g' ||
        k === 'h' ||
        k === 'i' ||
        k === 'j' ||
        k === 'k' ||
        k === 'l' ||
        k === 'm' ||
        k === 'n' ||
        k === 'o' ||
        k === 'p' ||
        k === 'q' ||
        k === 'r' ||
        k === 's' ||
        k === 't' ||
        k === 'u' ||
        k === 'v' ||
        k === 'w' ||
        k === 'x' ||
        k === 'y' ||
        k === 'z' ||
        k === '1' ||
        k === '2' ||
        k === '3' ||
        k === '4' ||
        k === '5' ||
        k === '6' ||
        k === '7' ||
        k === '8' ||
        k === '9' ||
        k === '0' ||
        k === ' ' ||
        k === ',' ||
        k === '.' ||
        k === '?' ||
        k === ';') &&
      keyboardLayout[k].playType
    ) {
      players[k] = new Player(
        k,
        keyboardLayout[k].playType,
        buffers[keyboardLayout[k].name],
        keyboardLayout[k].playbackRate * keyboardLayout[k].octave,
        keyboardLayout[k].volume,
        keyboardLayout[k].randomize,
        keyboardLayout[k].octave,
        keyboardLayout[k].tuning,
        keyboardLayout[k].attack,
        keyboardLayout[k].release,
        keyboardLayout[k].name
      );
    }
  });
  return players;
};
