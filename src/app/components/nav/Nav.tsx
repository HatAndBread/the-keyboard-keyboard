import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../../App';
import Icon from '../icon/Icon';
import saveIcon from '../../../assets/images/disk.png';
import openIcon from '../../../assets/images/download.png';
import newIcon from '../../../assets/images/new.png';
import editIcon from '../../../assets/images/audio-editing.png';
import effectsIcon from '../../../assets/images/effects-pedal.png';
import volumeIcon from '../../../assets/images/sound.png';
import settingIcon from '../../../assets/images/setting.png';
import mouseIcon from '../../../assets/images/mouse.png';
import Recorder from '../recorder/Recorder';
import { sendMouseOn } from '../../music-logic/music-loop';

import './Nav.css';
const Nav = ({ isBadBrowser }: { isBadBrowser: boolean }) => {
  const [mouseOn, setMouseOn] = useState(false);
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
  useEffect(() => {
    sendMouseOn(mouseOn);
  }, [mouseOn]);
  return (
    <div className='Nav'>
      <Icon
        src={openIcon}
        alt={'Open keyboards from your computer'}
        pointer={true}
        className='nav-icon'
        onClick={openClick}
        messageBox={true}
      />
      <Icon
        src={saveIcon}
        alt={'Save keyboards to your computer'}
        pointer={true}
        className={'nav-icon'}
        onClick={saveClick}
        messageBox={true}
      />
      <Icon
        src={newIcon}
        alt={'Create and edit a new keyboard✨'}
        pointer={true}
        className='nav-icon'
        onClick={() => setModal('new-keyboard')}
        messageBox={true}
      />
      <Icon
        src={editIcon}
        alt={'Edit keyboards✨'}
        pointer={true}
        className='nav-icon'
        onClick={() => ctx.setEditorOpen && ctx.setEditorOpen(true)}
        messageBox={true}
      />
      <Icon
        src={effectsIcon}
        alt={'Effects'}
        pointer={true}
        className='nav-icon'
        onClick={() => setModal('effects')}
        messageBox={true}
      />
      <Icon
        src={volumeIcon}
        alt='Volume'
        pointer={true}
        className='nav-icon'
        onClick={() => {
          setModal('volume');
        }}
        messageBox={true}
      />
      <Icon
        src={mouseIcon}
        alt='Mouse pitch control'
        pointer={true}
        className={`nav-icon ${mouseOn ? 'highlight' : ''}`}
        onClick={() => {
          mouseOn ? setMouseOn(false) : setMouseOn(true);
        }}
        messageBox={true}
      />
      <Icon
        src={settingIcon}
        alt='Settings'
        pointer={true}
        className='nav-icon'
        onClick={() => {
          setModal('settings');
        }}
        messageBox={true}
      />
      {!isBadBrowser && <Recorder />}
    </div>
  );
};
export default Nav;
