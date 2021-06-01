import React, { useContext } from 'react';
import { Context } from '../../../App';
import Icon from '../icon/Icon';
import saveIcon from '../../../assets/images/disk.png';
import openIcon from '../../../assets/images/download.png';
import effectIcon from '../../../assets/images/mixer.png';
import getKeyboardTemplate from '../../music-logic/default-keyboards/keyboard-template';

const Toolbar = () => {
  const ctx = useContext(Context);
  const openClick = () => {};
  const saveClick = () => {
    if (ctx.keyboards) {
      const keyboardLayouts = Object.keys(ctx.keyboards).map((keyboard) => {
        if (ctx.keyboards) {
          const template = getKeyboardTemplate();
          Object.keys(ctx.keyboards[keyboard]).forEach((key) => {
            console.log(key, template);
          });
        }
      });
    }
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
