import React, { useState } from 'react';
import { ToneAudioBuffer } from 'tone';
import './Recorder.css';
import Icon from '../icon/Icon';
import recordSrc from '../../../assets/images/record.png';
import stopSrc from '../../../assets/images/stop.png';
import { record, stopRecord } from '../../music-logic/effects';
//@ts-ignore
import { saveAs } from 'file-saver';

const Recorder = () => {
  const [recording, setRecording] = useState(false);
  const startRecord = () => {
    setRecording(true);
    record();
  };
  const stop = () => {
    setRecording(false);
    stopRecord().then((obj) => {
      if (obj) {
        const url = URL.createObjectURL(obj.blob);
        window.open(url, '_blank');
      }
    });
  };
  return (
    <div className='Recorder'>
      {recording ? (
        <Icon
          src={stopSrc}
          alt='Stop recording'
          pointer={true}
          className='record-btn'
          messageBox={true}
          onClick={stop}
        />
      ) : (
        <Icon
          src={recordSrc}
          alt='Record'
          pointer={true}
          className='record-btn'
          messageBox={true}
          onClick={startRecord}
        />
      )}
      {recording && <div className='recording-text'>RECORDING</div>}
    </div>
  );
};

export default Recorder;
