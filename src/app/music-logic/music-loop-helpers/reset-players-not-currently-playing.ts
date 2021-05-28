import Player from '../Player';

const resetPlayersNotCurrentlyPlaying = (
  players: Player[],
  currentKeys: string[] = []
) => {
  players.forEach((player) => {
    const lowered = currentKeys.map((key) => key.toLowerCase());
    if (!lowered?.includes(player.keyAssignment) && player.playing) {
      player.stopForPlayTypeLoop();
    }
  });
};

export default resetPlayersNotCurrentlyPlaying;
