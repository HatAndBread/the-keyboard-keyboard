import React, { useEffect, useState, createContext } from 'react';
import './App.css';
import * as Tone from 'tone';
import Keyboard from './app/music-logic/Keyboard';
import {
  musicLoop,
  sendBoard,
  sendKeyboardNames,
  sendSetKeyboard,
  sendCurrentKeyboardName,
} from './app/music-logic/music-loop';
import { createBuffers } from './app/music-logic/sample-buffers';
import { useAppDispatch } from './app/hooks';
import { setEffects } from './app/music-logic/effects';
import createDefaultKeyboards from './app/music-logic/create-default-keyboards';
import KeyboardEditor from './app/components/keyboard-editor/KeyboardEditor';
import ModalController from './app/components/modal/ModalController';
import createListeners from './app/music-logic/keyboard-listeners';
import Nav from './app/components/nav/Nav';
import ContextProps from './types/ContextProps';
import ValidKeys from './types/ValidKeys';

export const Context = createContext<Partial<ContextProps>>({});
function App() {
  const [attemptingToLoad, setAttemptingToLoad] = useState(false);
  const [appIsStarted, setAppIsStarted] = useState(false);
  const [buffers, setBuffers] = useState<{
    [key: string]: Tone.ToneAudioBuffer;
  }>({});
  const [keyboards, setKeyboards] = useState<null | {
    [key: string]: Keyboard;
  }>(null);
  const [keyboardNames, setKeyboardNames] = useState<string[]>([]);
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [keyBeingEdited, setKeyBeingEdited] = useState<ValidKeys | null>(null);
  const [editorOpen, setEditorOpen] = useState<boolean>(false);
  const [currentKeyboardName, setCurrentKeyboardName] = useState<string>(
    'harmonious'
  );
  const [currentKeyboard, setCurrentKeyboard] = useState<null | Keyboard>(null);
  const dispatch = useAppDispatch();

  const initialStartUp = async () => {
    setAttemptingToLoad(true);
    await Tone.start();
    createBuffers(setBuffers);
    setAppIsStarted(true);
    setEffects();
  };

  useEffect(() => {
    createListeners();
    musicLoop();
  }, []);
  useEffect(() => {
    if (Object.keys(buffers).length) {
      console.log(buffers, 'Here are the buffers ✨');
      createDefaultKeyboards(buffers, setKeyboards);
    }
  }, [buffers]);
  useEffect(() => {
    console.log(keyboards, 'Here are the keyboards');
    if (keyboards) {
      setKeyboardNames(Object.keys(keyboards));
      sendBoard(keyboards[currentKeyboardName]);
      setCurrentKeyboard(keyboards[currentKeyboardName]);
    }
    setAttemptingToLoad(false);
  }, [keyboards, currentKeyboardName, dispatch]);
  useEffect(() => {
    sendSetKeyboard(setCurrentKeyboardName);
  }, [setCurrentKeyboardName]);
  useEffect(() => {
    sendKeyboardNames(keyboardNames);
  }, [keyboardNames]);
  useEffect(() => {
    sendCurrentKeyboardName(currentKeyboardName);
  }, [currentKeyboardName]);

  return (
    <Context.Provider
      value={{
        appIsStarted,
        buffers,
        keyboards,
        setKeyboards,
        keyboardNames,
        setKeyboardNames,
        currentKeyboard,
        currentKeyboardName,
        setCurrentKeyboardName,
        currentModal,
        setCurrentModal,
        keyBeingEdited,
        setKeyBeingEdited,
        setEditorOpen,
      }}>
      <div className='App'>
        <Nav />
        {attemptingToLoad && <p>Loading...</p>}
        {!appIsStarted && <button onClick={initialStartUp}>START</button>}
        <p>Current Keyboard: {currentKeyboardName}</p>
        {editorOpen && <KeyboardEditor />}
        <ModalController currentModal={currentModal} />
      </div>
    </Context.Provider>
  );
}

export default App;
