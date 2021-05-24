import { createNamedExports } from "typescript";
import Keyboard from "./Keyboard";
import Player from "./Player";

let currentKeys: null | string[] = null;
let board: null | Keyboard = null;
let randomize = false;

const resetPlayersNotCurrentlyPlaying = (players: Player[]) => {
  players.forEach((player) => {
    if (!currentKeys?.includes(player.keyAssignment) && player.playing) {
      player.playing = false;
      if (player.playType === "LOOP") player.player.stop();
    }
  });
};

const getRandoNum = () => {
  const ranNum = Math.floor(Math.random() * 2);
  if (ranNum) return Math.random() * 0.8 + 0.2;
  return Math.random() * 3;
};

export const musicLoop = () => {
  if (currentKeys && board) {
    const players = board.getAsArray();
    resetPlayersNotCurrentlyPlaying(players);
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

export const setBoard = (newBoard: Keyboard) => {
  board = newBoard;
};
export const setCurrentKeys = (cK: string[]) => (currentKeys = cK);

export const randomizer = (yesOrNo: boolean) => (randomize = yesOrNo);
