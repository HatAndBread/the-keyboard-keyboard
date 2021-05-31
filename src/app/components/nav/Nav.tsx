import React, { useContext } from 'react';
import { Context } from '../../../App';
const Nav = () => {
  const ctx = useContext(Context);
  const setModal = (modalName: string) => {
    if (ctx.setCurrentModal) ctx.setCurrentModal(modalName);
  };
  return (
    <div>
      <button onClick={() => setModal('new-keyboard')}>New Keybord</button>
      <button
        onClick={() => {
          setModal('edit-keyboard');
        }}>
        Edit Keyboard
      </button>
    </div>
  );
};
export default Nav;
