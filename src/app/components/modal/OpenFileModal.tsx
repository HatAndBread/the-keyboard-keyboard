import React, { ChangeEvent } from 'react';

const OpenFileModal = () => {
  const open = (e: ChangeEvent<HTMLInputElement>) => {
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
        onChange={open}
      />
      <div className='open-modal-buttons'>
        <button>Open</button>
        <button>Cancel</button>
      </div>
    </div>
  );
};

export default OpenFileModal;
