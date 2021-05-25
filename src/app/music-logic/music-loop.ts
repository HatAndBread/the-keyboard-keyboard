import Keyboard from "./Keyboard";
import resetPlayersNotCurrentlyPlaying from "./music-loop-helpers/reset-players-not-currently-playing";
import transformKeys from "./music-loop-helpers/transform-keys";

let currentKeys: string[] = [];
let board: null | Keyboard = null;
let randomize = false;
let octave = 1;

export const musicLoop = () => {
  if (currentKeys && board) {
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
  console.log(currentKeys);
};
export const handleKeyDown = (e: KeyboardEvent) => {
  const currKey = transformKeys(e.key).toLowerCase();
  if (currKey === "arrowdown") octave > 1 ? (octave -= 1) : (octave *= 0.5);
  if (currKey === "arrowup") octave >= 1 ? (octave += 1) : (octave *= 2);
  if (!keyIsDuplicated(currKey)) {
    currentKeys?.push(currKey);
  }
};

export const setBoard = (newBoard: Keyboard) => {
  board = newBoard;
};

export const randomizer = (yesOrNo: boolean) => (randomize = yesOrNo);
