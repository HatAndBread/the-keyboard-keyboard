import { createNamedExports } from "typescript";
import Keyboard from "./Keyboard";
import Player from "./Player";

let currentKeys: null | string[] = null;
let board: null | Keyboard = null;

const resetPlayersNotCurrentlyPlaying = (players: Player[]) => {
  players.forEach((player) => {
    if (!currentKeys?.includes(player.keyAssignment) && player.playing) {
      player.playing = false;
      if (player.playType === "LOOP") player.player.stop();
    }
  });
};
export const musicLoop = () => {
  if (currentKeys && board) {
    const players = board.getAsArray();
    resetPlayersNotCurrentlyPlaying(players);
    currentKeys.forEach((key) => {
      const currPlayer = players.find((player) => player.keyAssignment === key);
      if (currPlayer?.playType === "RAPID") {
        currPlayer.player.start();
      } else if (currPlayer && !currPlayer.playing) {
        currPlayer.playing = true;
        currPlayer.player.start();
      }
    });
  }
  requestAnimationFrame(musicLoop);
};

export const setBoard = (newBoard: Keyboard) => (board = newBoard);
export const setCurrentKeys = (cK: string[]) => (currentKeys = cK);
