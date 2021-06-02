import React, { useContext, useEffect } from 'react';
import { Context } from './App';
import generateKeyboardsFromTemplates from './app/music-logic/generate-keyboards-from-templates';
import defaultTemplates from './app/music-logic/default-keyboards';
const OnBufferLoad = () => {
  const ctx = useContext(Context);
  useEffect(() => {
    if (ctx.buffers && Object.keys(ctx.buffers).length) {
      console.log(ctx.buffers, 'Here are the buffers ✨');
      generateKeyboardsFromTemplates(defaultTemplates, ctx);
    }
  }, [ctx.buffers]);
  return null;
};

export default OnBufferLoad;
