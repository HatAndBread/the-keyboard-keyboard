import React, { useContext } from 'react';
import { Context } from '../../../App';
import ToggleSwitch from '../toggle-switch/ToggleSwitch';
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
    </div>
  );
};
export default SettingsModal;
