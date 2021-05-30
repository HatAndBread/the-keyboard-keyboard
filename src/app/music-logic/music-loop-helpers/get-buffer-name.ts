import ContextProps from '../../../types/ContextProps';
import Player from '../Player';

const getBufferName = (
  ctx: Partial<ContextProps>,
  player: Player
): string | undefined => {
  if (ctx.buffers) {
    let myName;
    Object.keys(ctx.buffers).forEach((buffer) => {
      if (ctx.buffers && player && ctx.buffers[buffer] === player.buffer) {
        myName = buffer;
      }
    });
    if (myName) return myName;
  }
};

export default getBufferName;
