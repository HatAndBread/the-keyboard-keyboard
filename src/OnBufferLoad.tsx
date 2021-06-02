import React, { useContext, useEffect } from 'react';
import { Context } from './App';
import generateKeyboardsFromTemplates from './app/music-logic/generate-keyboards-from-templates';
import defaultTemplates from './app/music-logic/default-keyboards';
const OnBufferLoad = () => {
  const ctx = useContext(Context);
  const buffers = ctx.buffers;
  useEffect(() => {
    if (buffers && Object.keys(buffers).length) {
      console.log(buffers, 'Here are the buffers ✨');
      generateKeyboardsFromTemplates(defaultTemplates, ctx);
    }
  }, [buffers]);
  return null;
};

export default OnBufferLoad;
