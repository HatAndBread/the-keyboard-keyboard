import React, { useEffect, useState } from "react";
import "./App.css";
import * as Tone from "tone";
import Keyboard from "./app/music-logic/Keyboard";
import {
  setCurrentKeys,
  musicLoop,
  setBoard,
  randomizer,
} from "./app/music-logic/music-loop";
import { createBuffers } from "./app/music-logic/sample-buffers";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { setStarted, isStarted, openModal } from "./features/startedSlice";
import createDefaultKeyboards from "./app/music-logic/create-default-keyboards";
import KeyboardEditor from "./app/components/keyboard-editor/KeyboardEditor";
import ModalController from "./app/components/modal/ModalController";

function App() {
  const [keysCurrentlyDown, setKeysCurrentlyDown] = useState<string[]>([]);
  const [attemptingToLoad, setAttemptingToLoad] = useState(false);
  const [appIsStarted, setAppIsStarted] = useState(false);
  const [buffers, setBuffers] = useState<{
    [key: string]: Tone.ToneAudioBuffer;
  }>({});
  const [keyboards, setKeyboards] = useState<null | {
    [key: string]: Keyboard;
  }>(null);
  const [currentKeyboard, setCurrentKeyboard] = useState<string>("main");
  const [randomizePlaybackRate, setRandomizePlaybackRate] = useState(false);
  const dispatch = useAppDispatch();
  const currentModal = useAppSelector(openModal);
  useEffect(() => {
    setCurrentKeys(keysCurrentlyDown);
    if (appIsStarted) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!keyIsDuplicated(e.key, keysCurrentlyDown)) {
          const newKeys = [...keysCurrentlyDown, e.key];
          setKeysCurrentlyDown(newKeys);
        }
      };
      const handleKeyUp = (e: KeyboardEvent) => {
        setKeysCurrentlyDown(
          [...keysCurrentlyDown].filter((key) => key !== e.key)
        );
      };
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, [appIsStarted, keysCurrentlyDown]);

  const initialStartUp = async () => {
    setAttemptingToLoad(true);
    await Tone.start();
    createBuffers(setBuffers);
    setAppIsStarted(true);
  };

  useEffect(() => {
    musicLoop();
  }, []);
  useEffect(() => {
    if (Object.keys(buffers).length) {
      console.log(buffers, "Here are the buffers ✨");
      createDefaultKeyboards(buffers, setKeyboards);
    }
  }, [buffers]);
  useEffect(() => {
    console.log(keyboards, "Here are the keyboards");
    keyboards && setBoard(keyboards[currentKeyboard]);
    setAttemptingToLoad(false);
  }, [keyboards, currentKeyboard, dispatch]);
  useEffect(() => {
    randomizer(randomizePlaybackRate);
  }, [randomizePlaybackRate]);

  return (
    <div className="App">
      {attemptingToLoad && <p>Loading...</p>}
      {!appIsStarted && <button onClick={initialStartUp}>START</button>}
      <KeyboardEditor />
      <ModalController currentModal={currentModal} />
    </div>
  );
}

const keyIsDuplicated = (
  newKey: string,
  keysCurrentlyDown: string[]
): boolean => {
  if (keysCurrentlyDown.includes(newKey)) return true;
  return false;
};

export default App;
