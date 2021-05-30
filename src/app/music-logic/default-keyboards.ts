import mainKeyboard from './default-keyboards/main-keyboard';
import percussionKeyboard from './default-keyboards/percussion-keyboard';
import harmoniousKeyboard from './default-keyboards/harmonious-keyboard';

export type keyboard = {
  [key: string]:
    | {
        name: string;
        playType: 'SINGLE' | 'RAPID' | 'LOOP';
        playbackRate: number;
        volume: number;
        randomize: boolean;
        octave: number;
      }
    | { name: string };
};

const defaultKeyboards: any[] = [
  mainKeyboard,
  percussionKeyboard,
  harmoniousKeyboard,
];
export default defaultKeyboards;
