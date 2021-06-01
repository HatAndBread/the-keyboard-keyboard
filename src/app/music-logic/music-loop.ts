import React from 'react';
import Keyboard from './Keyboard';
import resetPlayersNotCurrentlyPlaying from './music-loop-helpers/reset-players-not-currently-playing';
import transformKeys from './music-loop-helpers/transform-keys';
import switchToNewKeyboard from './music-loop-helpers/switch-to-new-keyboard';
import detuner from './music-loop-helpers/detuner';
import { record, stopRecord, baseLoopPlayer, effectOnOff } from './effects';

let currentlyRecording = false;
let currentKeys: string[] = [];
let keyboardNames: string[] = [];
let currentKeyboardName: null | string = null;
let setKeyboard: React.Dispatch<React.SetStateAction<string>> | null = null;
let board: null | Keyboard = null;
let randomize = false;
let octave = 1;
let detune = 0;

export const musicLoop = () => {
  if (currentKeys && board) {
    detune = detuner(currentKeys, detune);
    const players = board.getAsArray();
    resetPlayersNotCurrentlyPlaying(players, currentKeys);
    randomize = currentKeys.includes('capslock');
    currentKeys.forEach((key) => {
      const currPlayer = players.find(
        (player) => player.keyAssignment === key.toLowerCase()
      );
      if (currPlayer?.playType === 'RAPID') {
        currPlayer.play(octave, randomize);
      } else if (currPlayer && !currPlayer.playing) {
        if (currPlayer.playType === 'LOOP') {
          currPlayer.clearReleaseTimeout();
        }
        currPlayer.play(octave, randomize);
      }
      if (currPlayer && detune) {
        let myNum = currPlayer.player.playbackRate + detune;
        if (myNum > 0.1) {
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
  if (currKey === 'arrowleft' || currKey === 'arrowright') {
    if (board) {
      board.getAsArray().forEach((player) => {
        if (player.playbackRate) {
          player.player.playbackRate = player.playbackRate * octave;
        }
      });
    }
  }
};

export const handleKeyDown = (e: KeyboardEvent) => {
  const currKey = transformKeys(e.key).toLowerCase();
  if (currKey === 'arrowdown') {
    if (octave > 1) {
      octave -= 1;
    } else if (octave > 0.1) {
      octave *= 0.5;
    }
  } else if (currKey === 'arrowup') {
    if (octave >= 1 && octave <= 19) {
      octave += 1;
    } else if (octave < 1) {
      octave *= 2;
    }
  } else if (currKey === 'backspace') {
    octave = 1;
  } else if (currKey === '+') {
    if (currentKeyboardName && board && setKeyboard) {
      switchToNewKeyboard(
        true,
        currentKeyboardName,
        keyboardNames,
        setKeyboard
      );
    }
  } else if (currKey === '-') {
    if (currentKeyboardName && board && setKeyboard) {
      switchToNewKeyboard(
        false,
        currentKeyboardName,
        keyboardNames,
        setKeyboard
      );
    }
  } else if (currKey === 'enter') {
    if (currentlyRecording) {
      currentlyRecording = false;
      stopRecord();
    } else {
      currentlyRecording = true;
      record();
    }
  } else if (currKey === '#') {
    baseLoopPlayer.stop();
  } else if (currKey === '!') {
    effectOnOff('distortion');
  } else if (currKey === '&') {
    effectOnOff('delay');
  } else if (currKey === '@') {
    effectOnOff('reverb');
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
  console.log('new board received!', board);
};
