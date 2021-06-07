import React, { useContext } from 'react';
import { Context } from '../../../App';
import Keyboard from '../../music-logic/Keyboard';

const WarnDeleteModal = () => {
  const ctx = useContext(Context);
  return (
    <div>
      <p>Are you sure you would like to delete this keyboard?</p>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-evenly',
        }}>
        <button
          style={{ minWidth: '100px' }}
          onClick={() => {
            if (ctx.keyboards) {
              const newKeyboards: {
                [key: string]: Keyboard;
              } = {};
              let nextNewKeyboard = '';
              const keyboardNames = Object.keys(ctx.keyboards);
              keyboardNames.forEach((keyboard) => {
                if (ctx.currentKeyboardName !== keyboard && ctx.keyboards) {
                  newKeyboards[keyboard] = ctx.keyboards[keyboard];
                  nextNewKeyboard = keyboard;
                }
              });
              ctx.setKeyboards && ctx.setKeyboards(newKeyboards);
              ctx.setCurrentKeyboardName &&
                ctx.setCurrentKeyboardName(nextNewKeyboard);
            }
            ctx.setCurrentModal && ctx.setCurrentModal(null);
          }}>
          OK
        </button>
        <button
          style={{ minWidth: '100px' }}
          onClick={() => {
            ctx.setCurrentModal && ctx.setCurrentModal(null);
          }}>
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default WarnDeleteModal;
