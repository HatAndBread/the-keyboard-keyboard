import Tone from 'tone';
import Keyboard from '../app/music-logic/Keyboard';

type ContextProps = {
  appIsStarted: boolean;
  buffers: { [key: string]: Tone.ToneAudioBuffer };
  keyboards: { [key: string]: Keyboard } | null;
  keyboardNames: string[];
  setKeyboardNames: React.Dispatch<React.SetStateAction<string[]>>;
  setKeyboards: React.Dispatch<
    React.SetStateAction<{
      [key: string]: Keyboard;
    } | null>
  >;
  currentKeyboard: string;
  setCurrentKeyboard: React.Dispatch<React.SetStateAction<string>>;
};

export default ContextProps;
