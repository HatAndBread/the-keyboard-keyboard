import React, { useState } from 'react';
import './Recorder.css';
import Icon from '../icon/Icon';
import recordSrc from '../../../assets/images/record.png';
import stopSrc from '../../../assets/images/stop.png';

const Recorder = () => {
  const [recording, setRecording] = useState(false);
  const record = () => {
    setRecording(true);
  };
  const stop = () => {
    setRecording(false);
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
          onClick={record}
        />
      )}
    </div>
  );
};

export default Recorder;
