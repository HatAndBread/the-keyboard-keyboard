import React, { useContext } from 'react';
import { Context } from '../../../App';
import './EditKeyboardModal.css';

const EditKeyboardModal = () => {
  const ctx = useContext(Context);
  const handleClick = (keyboard: string) => {
    ctx.setEditorOpen && ctx.setEditorOpen(true);
    ctx.setCurrentKeyboardName && ctx.setCurrentKeyboardName(keyboard);
    ctx.setCurrentModal && ctx.setCurrentModal(null);
  };
  return (
    <div className='EditKeyboardModal'>
      {console.log(ctx.keyboards)}
      {ctx.keyboards &&
        Object.keys(ctx.keyboards).map((keyboard, index) => {
          return (
            <p
              key={index}
              className='keyboard-edit-selector'
              onClick={() => handleClick(keyboard)}>
              {keyboard}
            </p>
          );
        })}
    </div>
  );
};

export default EditKeyboardModal;
