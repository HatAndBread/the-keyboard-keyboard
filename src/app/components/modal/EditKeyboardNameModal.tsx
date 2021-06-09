import React, { useContext, useState } from 'react';
import { Context } from '../../../App';
import Keyboard from '../../music-logic/Keyboard';

const EditKeyboardNameModal = () => {
  const ctx = useContext(Context);
  const [currentText, setCurrentText] = useState(
    ctx.currentKeyboardName ? ctx.currentKeyboardName : ''
  );
  const myIndex = ctx.keyboardNames?.indexOf(
    ctx.currentKeyboardName ? ctx.currentKeyboardName : ''
  );
  console.log(myIndex, '💩');
  return (
    <div
      className='EditKeyboardNameModal'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: '150px',
        padding: '16px',
      }}>
      <label htmlFor='edit-keyboard-name'>
        Keyboard Name:
        <input
          type='text'
          name='edit-keyboard-name'
          id='edit-keyboard-name'
          defaultValue={currentText}
          onChange={(e) => {
            setCurrentText(e.target.value);
          }}
        />
      </label>
      <button
        style={{ minWidth: '100px' }}
        onClick={() => {
          if (
            ctx.keyboardNames &&
            ctx.setKeyboardNames &&
            typeof myIndex === 'number'
          ) {
            if (
              ctx.keyboardNames?.includes(currentText) ||
              currentText === ''
            ) {
              alert('Please choose a valid name✨');
            } else if (ctx.setCurrentModal) {
              const newKeyboards: { [key: string]: Keyboard } = {};
              const newKeyboardNames = [...ctx.keyboardNames];
              newKeyboardNames[myIndex] = currentText;
              ctx.keyboardNames.forEach((kName) => {
                if (
                  ctx.keyboards &&
                  ctx.keyboardNames &&
                  kName === ctx.keyboardNames[myIndex]
                ) {
                  newKeyboards[currentText] = ctx.keyboards[kName];
                } else if (ctx.keyboards) {
                  newKeyboards[kName] = ctx.keyboards[kName];
                }
              });
              ctx.setKeyboards && ctx.setKeyboards(newKeyboards);
              ctx.setKeyboardNames(newKeyboardNames);
              ctx.setCurrentKeyboardName &&
                ctx.setCurrentKeyboardName(currentText);
              ctx.setCurrentModal(null);
            }
          }
        }}>
        OK
      </button>
    </div>
  );
};

export default EditKeyboardNameModal;
