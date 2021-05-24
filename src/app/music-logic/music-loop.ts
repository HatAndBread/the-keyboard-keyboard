import Keyboard from "./Keyboard";
import Player from "./Player";
import getRandoNum from "./music-loop-helpers/getRandoNum";
import resetPlayersNotCurrentlyPlaying from "./music-loop-helpers/reset-players-not-currently-playing";
import transformKeys from "./music-loop-helpers/transform-keys";
import keyIsCapital from "./music-loop-helpers/keyIsCapital";

let currentKeys: string[] = [];
let board: null | Keyboard = null;
let randomize = false;

// const getPlayer = (players: Player[], key: string, isCap: boolean) => {
//   if (isCap){
//     return players.find((player) => player.keyAssignment === key.toLowerCase());
//   }
//   return players.find((player) => player.keyAssignment === key);
// }

export const musicLoop = () => {
  if (currentKeys && board) {
    const players = board.getAsArray();
    resetPlayersNotCurrentlyPlaying(players, currentKeys);
    currentKeys.forEach((key) => {
      const isCap = keyIsCapital(key);
      const currPlayer = players.find(
        (player) => player.keyAssignment === key.toLowerCase()
      );
      if (currPlayer?.playType === "RAPID") {
        if (randomize || currPlayer.randomize) {
          currPlayer.player.playbackRate = getRandoNum();
        }
        currPlayer.player.start();
      } else if (currPlayer && !currPlayer.playing) {
        if (randomize || currPlayer.randomize) {
          currPlayer.player.playbackRate = getRandoNum();
        }
        console.log(currPlayer);
        currPlayer.playing = true;
        if (isCap) currPlayer.player.playbackRate += 1;
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
  const currKey = transformKeys(e.key);
  currentKeys = currentKeys.filter((key) => key !== currKey);
  console.log(currentKeys);
};
const handleKeyDown = (e: KeyboardEvent) => {
  e.preventDefault();
  const currKey = transformKeys(e.key);
  if (!keyIsDuplicated(currKey)) {
    currentKeys?.push(currKey);
    console.log(currentKeys);
  }
};

document.addEventListener("keyup", handleKeyUp);
document.addEventListener("keydown", handleKeyDown);

export const setBoard = (newBoard: Keyboard) => {
  board = newBoard;
};

export const randomizer = (yesOrNo: boolean) => (randomize = yesOrNo);
