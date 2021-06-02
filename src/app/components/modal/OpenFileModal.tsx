import React, { ChangeEvent, useContext, useState } from 'react';
import { Context } from '../../../App';
import { KeyboardTemplate } from '../../music-logic/default-keyboards/keyboard-template';
import generateKeyboardsFromTemplates from '../../music-logic/generate-keyboards-from-templates';
import './OpenFileModal.css';

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
