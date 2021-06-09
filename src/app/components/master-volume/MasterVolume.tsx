import React, { useContext } from 'react';
import { Context } from '../../../App';
import { gain } from '../../music-logic/effects';

const MasterVolume = () => {
  const setCurrentModal = useContext(Context).setCurrentModal;
  return (
    <div className='MasterVolume' style={{ padding: '8px' }}>
      <label htmlFor='master-volume-range'>
        Master volume
        <input
          type='range'
          name='master-volume-range'
          id='master-volume-range'
          min='0'
          max='1'
          step='0.02'
          defaultValue={gain.gain.value}
          onChange={(e) => {
            gain.gain.value = parseFloat(e.target.value);
          }}
          onPointerUp={() => setCurrentModal && setCurrentModal(null)}
        />
      </label>
    </div>
  );
};

export default MasterVolume;
