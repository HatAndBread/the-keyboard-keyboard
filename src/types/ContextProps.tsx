import Tone from 'tone';
import Keyboard from '../app/music-logic/Keyboard';
import React from 'react';
import ValidKeys from './ValidKeys';

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
  currentKeyboard: Keyboard | null;
  currentKeyboardName: string;
  currentModal: string | null;
  setCurrentModal: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentKeyboardName: React.Dispatch<React.SetStateAction<string>>;
  keyBeingEdited: ValidKeys | null;
  setKeyBeingEdited: React.Dispatch<React.SetStateAction<ValidKeys | null>>;
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showAnim: boolean;
  setShowAnim: React.Dispatch<React.SetStateAction<boolean>>;
};

export default ContextProps;
