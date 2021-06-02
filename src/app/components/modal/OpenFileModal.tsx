import React, { ChangeEvent, useContext, useState } from 'react';
import { Context } from '../../../App';
import { KeyboardTemplate } from '../../music-logic/default-keyboards/keyboard-template';
import Keyboard from '../../music-logic/Keyboard';
import Player from '../../music-logic/Player';
import ContextProps from '../../../types/ContextProps';

const generateKeyboardsFromTemplates = (
  templates: KeyboardTemplate[],
  ctx: Partial<ContextProps>
) => {
  // eventually use this function to generate keyboards when app loaded
  // and when file is opened.
  const newKeyboards: { [key: string]: Keyboard } = {};
  templates.forEach((keyboardLayout) => {
    const assignments: { [key: string]: Player } = {};
    Object.keys(keyboardLayout).forEach((k) => {
      if (
        k === 'a' ||
        k === 'b' ||
        k === 'c' ||
        k === 'd' ||
        k === 'e' ||
        k === 'f' ||
        k === 'g' ||
        k === 'h' ||
        k === 'i' ||
        k === 'j' ||
        k === 'k' ||
        k === 'l' ||
        k === 'm' ||
        k === 'n' ||
        k === 'o' ||
        k === 'p' ||
        k === 'q' ||
        k === 'r' ||
        k === 's' ||
        k === 't' ||
        k === 'u' ||
        k === 'v' ||
        k === 'w' ||
        k === 'x' ||
        k === 'y' ||
        k === 'z' ||
        k === '1' ||
        k === '2' ||
        k === '3' ||
        k === '4' ||
        k === '5' ||
        k === '6' ||
        k === '7' ||
        k === '8' ||
        k === '9' ||
        k === '0' ||
        k === ' ' ||
        k === ',' ||
        k === '.' ||
        k === '?' ||
        k === ';'
      ) {
        if (ctx.buffers) {
          const player = new Player(
            k,
            keyboardLayout[k].playType,
            ctx.buffers[keyboardLayout[k].name],
            keyboardLayout[k].playbackRate * keyboardLayout[k].octave,
            keyboardLayout[k].volume,
            keyboardLayout[k].randomize,
            keyboardLayout[k].octave,
            keyboardLayout[k].tuning,
            keyboardLayout[k].attack,
            keyboardLayout[k].release,
            keyboardLayout[k].name
          );
          assignments[k] = player;
        }
      }
    });
    newKeyboards[keyboardLayout.name.name] = new Keyboard(
      keyboardLayout.name.name,
      assignments
    );
  });
  const newKeyboardKeys = Object.keys(newKeyboards);
  ctx.setKeyboardNames && ctx.setKeyboardNames(newKeyboardKeys);
  ctx.setKeyboards && ctx.setKeyboards(newKeyboards);
  ctx.setCurrentKeyboardName && ctx.setCurrentKeyboardName(newKeyboardKeys[0]);
};

const OpenFileModal = () => {
  const [data, setData] = useState<null | KeyboardTemplate[]>(null);
  const ctx = useContext(Context);
  const getFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileToLoad = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = function (
        fileLoadedEvent: ProgressEvent<FileReader>
      ) {
        if (fileLoadedEvent.target?.result) {
          const textFromFileLoaded = fileLoadedEvent.target.result;
          if (typeof textFromFileLoaded === 'string') {
            const result = JSON.parse(textFromFileLoaded);
            if (!result) {
              alert('Not a valid file. Please try again. ✨');
            } else {
              console.log(result);
              setData(result);
            }
          }
        }
      };

      fileReader.readAsText(fileToLoad, 'UTF-8');
    }
  };
  return (
    <div className='OpenFileModal'>
      <input
        type='file'
        name='file-open'
        id='file-open'
        accept='.s2pd'
        onChange={getFile}
      />
      <div className='open-modal-buttons'>
        <button
          onClick={() => {
            if (!data || !data[0] || !data[0].name || !data[0][' ']) {
              alert('Not a valid file. Please try again✨');
            } else {
              ctx.buffers && generateKeyboardsFromTemplates(data, ctx);
              ctx.setCurrentModal && ctx.setCurrentModal(null);
            }
          }}>
          Open
        </button>
        <button
          onClick={() => ctx.setCurrentModal && ctx.setCurrentModal(null)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OpenFileModal;
