import Keyboard from "./Keyboard";
import resetPlayersNotCurrentlyPlaying from "./music-loop-helpers/reset-players-not-currently-playing";
import transformKeys from "./music-loop-helpers/transform-keys";

let currentKeys: string[] = [];
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
  }
  if (!keyIsDuplicated(currKey)) {
    currentKeys?.push(currKey);
  }
};

export const setBoard = (newBoard: Keyboard) => {
  board = newBoard;
};

export const randomizer = (yesOrNo: boolean) => (randomize = yesOrNo);
