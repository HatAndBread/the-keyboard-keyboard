import React, { useContext } from 'react';
import { Context } from '../../../App';
import ToggleSwitch from '../toggle-switch/ToggleSwitch';
import { setLoopPlayerVolume, baseLoopPlayer } from '../../music-logic/effects';
const SettingsModal = () => {
  const ctx = useContext(Context);
  return (
    <div
      className='SettingsModal'
      style={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
      <div className={'toggle-container'}>
        Visualization
        <ToggleSwitch
          id='visualization-switch'
          onFalseSet={() => {
            ctx.setShowAnim && ctx.setShowAnim(false);
          }}
          onTrueSet={() => {
            ctx.setShowAnim && ctx.setShowAnim(true);
          }}
          defaultChecked={ctx.showAnim ? ctx.showAnim : false}
        />
      </div>
      <div
        className='loop-player-volume-container'
        style={{ marginTop: '32px' }}>
        <label htmlFor='loop-player-volume'>
          Looper volume
          <input
            type='range'
            name='loop-player-volume'
            id='loop-player-volume'
            max='10'
            min='-20'
            step='0.2'
            defaultValue={baseLoopPlayer.volume.value}
            onChange={(e) => {
              setLoopPlayerVolume(parseFloat(e.target.value));
            }}
          />
        </label>
      </div>
    </div>
  );
};
export default SettingsModal;
