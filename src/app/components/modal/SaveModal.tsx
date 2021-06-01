import React, { useContext, useState, useRef, useEffect } from 'react';
import { Context } from '../../../App';
import getKeyboardTemplate from '../../music-logic/default-keyboards/keyboard-template';
//@ts-ignore
import { saveAs } from 'file-saver';

const SaveModal = () => {
  const myRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const ctx = useContext(Context);
  useEffect(() => {
    myRef.current?.focus();
  }, []);
  const save = () => {
    if (ctx.keyboards) {
      const keyboardLayouts = Object.keys(ctx.keyboards).map((keyboard) => {
        const template = getKeyboardTemplate();
        if (ctx.keyboards) {
          template.name.name = ctx.keyboards[keyboard].name;
          Object.keys(ctx.keyboards[keyboard]).forEach((key) => {
            if (ctx.keyboards && key !== 'name' && key !== 'getAsArray') {
              //@ts-ignore
              template[key].name = ctx.keyboards[keyboard][key].bufferName;
              //@ts-ignore
              template[key].playType = ctx.keyboards[keyboard][key].playType;
              //@ts-ignore
              template[key].playbackRate =
                //@ts-ignore
                ctx.keyboards[keyboard][key].playbackRate;
              //@ts-ignore
              template[key].volume = ctx.keyboards[keyboard][key].volume;
              //@ts-ignore
              template[key].randomize = ctx.keyboards[keyboard][key].randomize;
              //@ts-ignore
              template[key].octave = ctx.keyboards[keyboard][key].octave;
              //@ts-ignore
              template[key].tuning = ctx.keyboards[keyboard][key].tuning;
              //@ts-ignore
              template[key].attack = ctx.keyboards[keyboard][key].attack;
              //@ts-ignore
              template[key].release = ctx.keyboards[keyboard][key].release;
            }
          });
        }
        return template;
      });
      const file = new Blob([JSON.stringify(keyboardLayouts)], {
        type: 'text/plain',
      });
      saveAs(file, `${fileName}.s2pd`);
    }
  };
  return (
    <div
      className='save-modal'
      style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor='file-name'>
        File Name:
        <input
          type='text'
          name='file-name'
          id='file-name'
          ref={myRef}
          onChange={(e) => setFileName(e.target.value)}
        />
        .s2pd
      </label>
      <button onClick={save}>Save</button>
    </div>
  );
};
export default SaveModal;
