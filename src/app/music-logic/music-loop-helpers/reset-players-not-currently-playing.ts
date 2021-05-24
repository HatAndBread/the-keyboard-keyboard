import Player from "../Player";

const resetPlayersNotCurrentlyPlaying = (
  players: Player[],
  currentKeys: string[] = []
) => {
  players.forEach((player) => {
    const lowered = currentKeys.map((key) => key.toLowerCase());
    if (!lowered?.includes(player.keyAssignment) && player.playing) {
      player.playing = false;
      if (player.playbackRate) {
        player.player.playbackRate = player.playbackRate;
      }
      if (player.playType === "LOOP") player.player.stop();
    }
  });
};

export default resetPlayersNotCurrentlyPlaying;
