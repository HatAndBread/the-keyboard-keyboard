import React, { useContext } from 'react';
import { Context } from '../../../App';
import Icon from '../icon/Icon';
import saveIcon from '../../../assets/images/disk.png';
import openIcon from '../../../assets/images/download.png';
import newIcon from '../../../assets/images/new.png';
import editIcon from '../../../assets/images/audio-editing.png';
import effectsIcon from '../../../assets/images/effects-pedal.png';
import './Nav.css';
const Nav = () => {
  const ctx = useContext(Context);
  const setModal = (modalName: string) => {
    if (ctx.setCurrentModal) ctx.setCurrentModal(modalName);
  };
  const openClick = () => {
    ctx.setCurrentModal && ctx.setCurrentModal('open-file');
  };
  const saveClick = () => {
    ctx.setCurrentModal && ctx.setCurrentModal('save-keyboards');
  };
  const effectsClick = () => {};
  return (
    <div className='Nav'>
      <Icon
        src={newIcon}
        alt={'Create and edit a new keyboard✨'}
        pointer={true}
        className='new-icon'
        onClick={() => setModal('new-keyboard')}
        messageBox={true}
      />
      <Icon
        src={editIcon}
        alt={'Edit keyboards✨'}
        pointer={true}
        className='edit-icon'
        onClick={() => setModal('edit-keyboard')}
        messageBox={true}
      />
      <Icon
        src={openIcon}
        alt={'Open Keyboards'}
        pointer={true}
        className='file-open-icon'
        onClick={openClick}
        messageBox={true}
      />
      <Icon
        src={saveIcon}
        alt={'Save'}
        pointer={true}
        className={'save-icon'}
        onClick={saveClick}
        messageBox={true}
      />
      <Icon
        src={effectsIcon}
        alt={'Effects'}
        pointer={true}
        className='file-open-icon'
        onClick={effectsClick}
        messageBox={true}
      />
    </div>
  );
};
export default Nav;
