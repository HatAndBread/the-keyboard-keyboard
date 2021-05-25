import Keyboard from "./Keyboard";
import Player from "./Player";
import getRandoNum from "./music-loop-helpers/getRandoNum";
import resetPlayersNotCurrentlyPlaying from "./music-loop-helpers/reset-players-not-currently-playing";
import transformKeys from "./music-loop-helpers/transform-keys";
import keyIsCapital from "./music-loop-helpers/keyIsCapital";

let currentKeys: string[] = [];
let board: null | Keyboard = null;
let randomize = false;

export const musicLoop = () => {
  if (currentKeys && board) {
    const players = board.getAsArray();
    resetPlayersNotCurrentlyPlaying(players, currentKeys);
    currentKeys.forEach((key) => {
      const currPlayer = players.find(
        (player) => player.keyAssignment === key.toLowerCase()
      );
      if (currPlayer?.playType === "RAPID") {
        if (randomize || currPlayer.randomize) {
          currPlayer.player.playbackRate = getRandoNum();
        }
        currPlayer.playing = true;
        currPlayer.player.start();
      } else if (currPlayer && !currPlayer.playing) {
        currPlayer.playing = true;
        if (randomize || currPlayer.randomize) {
          currPlayer.player.playbackRate = getRandoNum();
        }
        if (currentKeys.includes("arrowup")) {
          currPlayer.player.playbackRate *= 2;
        }
        if (currentKeys.includes("arrowdown")) {
          currPlayer.player.playbackRate /= 2;
        }
        if (currentKeys.includes("shift") && !currPlayer.droning) {
          currentKeys = currentKeys.filter((key) => key !== "shift");
          currPlayer.droning = true;
        }
        currPlayer.playing = true;
        currPlayer.player.start();
      } else if (
        currPlayer &&
        currPlayer.droning &&
        currPlayer.playing &&
        currentKeys.includes("shift")
      ) {
        currentKeys = currentKeys.filter((key) => key !== "shift");
        currPlayer.stop();
      }
    });
  }
  requestAnimationFrame(musicLoop);
};

const keyIsDuplicated = (newKey: string) => {
  if (currentKeys?.includes(newKey)) return true;
};

let arrowDownPressNum = 0;
let arrowUpPressNum = 0;
const handleKeyUp = (e: KeyboardEvent) => {
  e.preventDefault();
  const currKey = transformKeys(e.key).toLowerCase();
  if (currKey === "arrowdown" && arrowDownPressNum % 2) {
    if (currentKeys.includes("arrowup")) {
      currentKeys = currentKeys.filter(
        (key) => key !== "arrowup" && key !== "arrowdown"
      );
      arrowUpPressNum = 0;
      arrowDownPressNum = 0;
    }
  } else if (currKey === "arrowup" && arrowUpPressNum % 2) {
    if (currentKeys.includes("arrowdown")) {
      currentKeys = currentKeys.filter(
        (key) => key !== "arrowup" && key !== "arrowdown"
      );
      arrowUpPressNum = 0;
      arrowDownPressNum = 0;
    }
  } else {
    currentKeys = currentKeys.filter((key) => key !== currKey);
  }
  console.log(currentKeys);
};
const handleKeyDown = (e: KeyboardEvent) => {
  e.preventDefault();
  const currKey = transformKeys(e.key).toLowerCase();
  if (currKey === "arrowdown") arrowDownPressNum += 1;
  if (currKey === "arrowup") arrowUpPressNum += 1;
  if (!keyIsDuplicated(currKey)) {
    currentKeys?.push(currKey);
  }
};

document.addEventListener("keyup", handleKeyUp);
document.addEventListener("keydown", handleKeyDown);

export const setBoard = (newBoard: Keyboard) => {
  board = newBoard;
};

export const randomizer = (yesOrNo: boolean) => (randomize = yesOrNo);
