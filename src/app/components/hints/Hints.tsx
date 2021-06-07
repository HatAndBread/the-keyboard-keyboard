import React from 'react';
import './Hints.css';
import Icon from '../icon/Icon';
import closerSrc from '../../../assets/images/cross.png';
export default function Hints({
  isBadBrowser,
  setShowHints,
}: {
  isBadBrowser: boolean | undefined;
  setShowHints: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className='Hints'>
      <div className='closer-container'>
        <Icon
          src={closerSrc}
          alt='X'
          pointer={true}
          className='hints-closer'
          onClick={() => setShowHints(false)}
        />
      </div>
      <h1>Keyboard Hints</h1>
      <div className='hint-container'>
        <div className='hint'>⬆: Go up one octave</div>
        <div className='hint'>⬇: Go down one octave</div>
        <div className='hint'>
          <strong>Backspace</strong>: Set octave to original
        </div>
        <div className='hint'>
          <strong>←</strong>: Decrease pitch and return on release
        </div>
        <div className='hint'>
          <strong>→</strong>: Increase pitch and return on release
        </div>
        <div className='hint'>
          <strong>{'<'}</strong>: Lower pitch of all keys
        </div>
        <div className='hint'>
          <strong>{'>'}</strong>: Increase pitch of all keys
        </div>
        <div className='hint'>
          <strong>Caps-lock on</strong>: Randomize all pitches
        </div>
        <div className='hint'>
          <strong>Enter</strong>: Start and stop loop{' '}
          {isBadBrowser &&
            '(Not available in your browser. Try latest version of Chrome or FireFox)'}
        </div>
        <div className='hint'>
          <strong>#</strong>: Stop loop{' '}
        </div>
        <div className='hint'>
          <strong>!</strong>: Distortion on and off
        </div>
        <div className='hint'>
          <strong>@</strong>: Reverb on and off
        </div>
        <div className='hint'>
          <strong>{'&'}</strong>: Delay on and off
        </div>
        <div className='hint'>
          <strong>+</strong>: Switch keyboards up
        </div>
        <div className='hint'>
          <strong>-</strong>: Switch keyboards down
        </div>
        <div className='hint'>
          <strong>*</strong>: Voice synthesize current text
        </div>
      </div>
    </div>
  );
}
