import Keyboard from "./Keyboard";
import Player from "./Player";
import getRandoNum from "./music-loop-helpers/getRandoNum";
import resetPlayersNotCurrentlyPlaying from "./music-loop-helpers/reset-players-not-currently-playing";

let currentKeys: string[] = [];
let board: null | Keyboard = null;
let randomize = false;

export const musicLoop = () => {
  if (currentKeys && board) {
    const players = board.getAsArray();
    resetPlayersNotCurrentlyPlaying(players, currentKeys);
    currentKeys.forEach((key) => {
      const currPlayer = players.find((player) => player.keyAssignment === key);
      if (currPlayer?.playType === "RAPID") {
        if (randomize || currPlayer.randomize) {
          currPlayer.player.playbackRate = getRandoNum();
        }
        currPlayer.player.start();
      } else if (currPlayer && !currPlayer.playing) {
        if (randomize || currPlayer.randomize) {
          currPlayer.player.playbackRate = getRandoNum();
        }
        currPlayer.playing = true;
        currPlayer.player.start();
      }
    });
  }
  requestAnimationFrame(musicLoop);
};

const keyIsDuplicated = (newKey: string) => {
  if (currentKeys?.includes(newKey)) return true;
};

const handleKeyUp = (e: KeyboardEvent) => {
  e.preventDefault();
  currentKeys = currentKeys.filter((key) => key !== e.key);
  console.log(currentKeys);
};
const handleKeyDown = (e: KeyboardEvent) => {
  e.preventDefault();
  if (!keyIsDuplicated(e.key)) {
    currentKeys?.push(e.key);
    console.log(currentKeys);
  }
};

document.addEventListener("keyup", handleKeyUp);
document.addEventListener("keydown", handleKeyDown);

export const setBoard = (newBoard: Keyboard) => {
  board = newBoard;
};

export const randomizer = (yesOrNo: boolean) => (randomize = yesOrNo);
