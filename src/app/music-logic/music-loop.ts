import React from 'react';
import Keyboard from './Keyboard';
import resetPlayersNotCurrentlyPlaying from './music-loop-helpers/reset-players-not-currently-playing';
import transformKeys from './music-loop-helpers/transform-keys';
import switchToNewKeyboard from './music-loop-helpers/switch-to-new-keyboard';
import detuner from './music-loop-helpers/detuner';
import { record, stopRecord, baseLoopPlayer, effectOnOff } from './effects';

const voiceSynth = window.speechSynthesis;
let voices = voiceSynth.getVoices();
if (voiceSynth.addEventListener) {
  voiceSynth.addEventListener('voiceschanged', () => {
    voices = voiceSynth.getVoices();
  });
}
let currentlyRecording = false;
let currentKeys: string[] = [];
let keyboardNames: string[] = [];
let currentKeyboardName: null | string = null;
let setKeyboard: React.Dispatch<React.SetStateAction<string>> | null = null;
let board: null | Keyboard = null;
let randomize = false;
let octave = 1;
let detune = 0;
let setCurrentDisplayText: React.Dispatch<
  React.SetStateAction<string>
> | null = null;
let setLatestLetter: React.Dispatch<React.SetStateAction<string>> | null = null;
let displayText = '';
const adjustAllPlayerPlaybackRates = (adjustment: number) => {
  const players = board?.getAsArray();
  players?.forEach((player) => {
    player.setPlaybackRate(player.playbackRate * adjustment);
  });
};
export const musicLoop = () => {
  if (currentKeys && board) {
    detune = detuner(currentKeys, detune);
    if (currentKeys.includes('<')) {
      adjustAllPlayerPlaybackRates(0.999);
    } else if (currentKeys.includes('>')) {
      adjustAllPlayerPlaybackRates(1.001);
    }
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
  if (e.key) {
    const keyIsValid = (key: string) => key.length < 2;
    if (keyIsValid(e.key) && setCurrentDisplayText && setLatestLetter) {
      displayText += e.key;
      setCurrentDisplayText(displayText);
      setLatestLetter(e.key);
    } else if (e.key === 'Backspace' && setCurrentDisplayText) {
      displayText = '';
      setCurrentDisplayText(displayText);
    }
    if (e.key === '<' || e.key === '>' || e.key === ',' || e.key === '.') {
      currentKeys = currentKeys.filter((key) => key !== '<' && key !== '>');
      console.log(currentKeys);
    }
    const currKey = transformKeys(e.key).toLowerCase();
    currentKeys = currentKeys.filter((key) => key !== currKey);
    if (currKey === 'arrowleft' || currKey === 'arrowright') {
      e.preventDefault();
      if (board) {
        board.getAsArray().forEach((player) => {
          if (player.playbackRate) {
            player.player.playbackRate = player.playbackRate * octave;
          }
        });
      }
    }
  }
};

export const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key) {
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
    } else if (e.key === `*`) {
      const utterance = new SpeechSynthesisUtterance(displayText);
      utterance.voice = voices[Math.floor(Math.random() * voices.length)];
      utterance.pitch = Math.random() * 2;
      utterance.rate = Math.random() * 2;
      voiceSynth.speak(utterance);
      utterance.onend = () => {
        setCurrentDisplayText && setCurrentDisplayText('');
        displayText = '';
      };
    }

    if (!keyIsDuplicated(currKey)) {
      currentKeys?.push(currKey);
    }
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

export const sendSetCurrentText = (
  setFunc: React.Dispatch<React.SetStateAction<string>>
) => {
  setCurrentDisplayText = setFunc;
};
export const sendSetLatestLetter = (
  func: React.Dispatch<React.SetStateAction<string>>
) => {
  setLatestLetter = func;
};

export const resetDisplayText = () => (displayText = '');
export const setDisplayText = (text: string) => (displayText = text);
