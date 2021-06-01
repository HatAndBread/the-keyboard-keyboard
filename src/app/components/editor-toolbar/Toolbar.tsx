import React, { useContext } from 'react';
import { Context } from '../../../App';
import Icon from '../icon/Icon';
import saveIcon from '../../../assets/images/disk.png';
import openIcon from '../../../assets/images/download.png';
import effectIcon from '../../../assets/images/mixer.png';

const Toolbar = () => {
  const ctx = useContext(Context);
  const openClick = () => {
    ctx.setCurrentModal && ctx.setCurrentModal('open-file');
  };
  const saveClick = () => {
    ctx.setCurrentModal && ctx.setCurrentModal('save-keyboards');
  };
  const effectsClick = () => {};
  return (
    <div className='Toolbar'>
      <Icon
        src={openIcon}
        alt={'Open Keyboards'}
        pointer={true}
        className='file-open-icon'
        onClick={openClick}
      />
      <Icon
        src={saveIcon}
        alt={'Save'}
        pointer={true}
        className={'save-icon'}
        onClick={saveClick}
      />
      <Icon
        src={effectIcon}
        alt={'Effects'}
        pointer={true}
        className='file-open-icon'
        onClick={effectsClick}
      />
    </div>
  );
};

export default Toolbar;
