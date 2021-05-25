import React from "react";
import Keyboard from "./Keyboard";
import resetPlayersNotCurrentlyPlaying from "./music-loop-helpers/reset-players-not-currently-playing";
import transformKeys from "./music-loop-helpers/transform-keys";

let currentKeys: string[] = [];
let keyboardNames: string[] = [];
let currentKeyboardName: null | string = null;
let setKeyboard:
  | React.Dispatch<React.SetStateAction<string>>
  | ((s: string) => void) = (s: string) => {
  console.log("SetKeyboard hasn't been created yet");
};
let board: null | Keyboard = null;
let randomize = false;
let octave = 1;
let detune = 0;

const detuner = () => {
  if (currentKeys.includes("arrowleft")) {
    detune -= 0.005;
  } else if (currentKeys.includes("arrowright")) {
    detune += 0.005;
  } else {
    detune = 0;
  }
};

export const musicLoop = () => {
  if (currentKeys && board) {
    detuner();
    const players = board.getAsArray();
    resetPlayersNotCurrentlyPlaying(players, currentKeys);
    randomize = currentKeys.includes("capslock");
    currentKeys.forEach((key) => {
      const currPlayer = players.find(
        (player) => player.keyAssignment === key.toLowerCase()
      );
      if (currPlayer?.playType === "RAPID") {
        currPlayer.playing = true;
        currPlayer.play(octave, randomize);
      } else if (currPlayer && !currPlayer.playing) {
        currPlayer.playing = true;
        if (currentKeys.includes("shift") && !currPlayer.droning) {
          currentKeys = currentKeys.filter((key) => key !== "shift");
          currPlayer.droning = true;
        }
        currPlayer.playing = true;
        currPlayer.play(octave, randomize);
      } else if (
        currPlayer &&
        currPlayer.droning &&
        currPlayer.playing &&
        currentKeys.includes("shift")
      ) {
        currentKeys = currentKeys.filter((key) => key !== "shift");
        currPlayer.stop();
      }
      if (detune && currPlayer) {
        let myNum = currPlayer.player.playbackRate + detune;
        if (myNum > 0.01) {
          console.log(myNum, octave);
          currPlayer.player.playbackRate = myNum;
        }
      }
    });
  }
  requestAnimationFrame(musicLoop);
};

const keyIsDuplicated = (newKey: string) => {
  if (currentKeys?.includes(newKey)) return true;
};

export const handleKeyUp = (e: KeyboardEvent) => {
  const currKey = transformKeys(e.key).toLowerCase();
  currentKeys = currentKeys.filter((key) => key !== currKey);
  if (currKey === "arrowleft" || currKey === "arrowright") {
    if (board) {
      board.getAsArray().forEach((player) => {
        if (player.playbackRate)
          player.player.playbackRate = player.playbackRate;
      });
    }
  }
  console.log(currentKeys);
};
const handleAdd = (currentBoardIndex: number) => {
  if (currentBoardIndex + 1 === keyboardNames.length) {
    setKeyboard(keyboardNames[0]);
  } else {
    setKeyboard(keyboardNames[currentBoardIndex + 1]);
  }
};

const handleSubtract = (currentBoardIndex: number) => {
  if (currentBoardIndex - 1 < 0) {
    setKeyboard(keyboardNames[keyboardNames.length - 1]);
  } else {
    setKeyboard(keyboardNames[currentBoardIndex - 1]);
  }
};
const switchToNewKeyboard = (add: boolean) => {
  if (currentKeyboardName && board) {
    const currentBoardIndex = keyboardNames.indexOf(currentKeyboardName);
    if (currentBoardIndex || currentBoardIndex === 0) {
      add ? handleAdd(currentBoardIndex) : handleSubtract(currentBoardIndex);
    }
  }
};
export const handleKeyDown = (e: KeyboardEvent) => {
  const currKey = transformKeys(e.key).toLowerCase();
  if (currKey === "arrowdown") {
    if (octave > 1) {
      octave -= 1;
    } else if (octave > 0.1) {
      octave *= 0.5;
    }
  } else if (currKey === "arrowup") {
    if (octave >= 1 && octave <= 19) {
      octave += 1;
    } else if (octave < 1) {
      octave *= 2;
    }
  } else if (currKey === "backspace") {
    octave = 1;
  } else if (currKey === "+") {
    switchToNewKeyboard(true);
  } else if (currKey === "-") {
    switchToNewKeyboard(false);
  }
  if (!keyIsDuplicated(currKey)) {
    currentKeys?.push(currKey);
  }
};

export const sendKeyboardNames = (kn: string[]) => (keyboardNames = kn);
export const sendSetKeyboard = (
  setKeyboardFun: React.Dispatch<React.SetStateAction<string>>
) => (setKeyboard = setKeyboardFun);
export const sendCurrentKeyboardName = (ckn: string) =>
  (currentKeyboardName = ckn);
export const sendBoard = (newBoard: Keyboard) => {
  board = newBoard;
};
