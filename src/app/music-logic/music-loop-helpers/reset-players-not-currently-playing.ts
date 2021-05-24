import Player from "../Player";

const resetPlayersNotCurrentlyPlaying = (
  players: Player[],
  currentKeys: string[] = []
) => {
  players.forEach((player) => {
    if (!currentKeys?.includes(player.keyAssignment) && player.playing) {
      player.playing = false;
      if (player.playType === "LOOP") player.player.stop();
    }
  });
};

export default resetPlayersNotCurrentlyPlaying;
