import React, { useContext } from 'react';
import { Context } from '../../../App';
import './Modal.css';
import Icon from '../icon/Icon';
import closer from '../../../assets/images/cross.png';

const Modal = ({ content }: { content: JSX.Element }) => {
  const ctx = useContext(Context);
  return (
    <div className='Modal'>
      <div className='modal-box'>
        <div className='closer-container'>
          <Icon
            className='closer'
            src={closer}
            alt='X'
            pointer={true}
            onClick={() => {
              ctx.setCurrentModal && ctx.setCurrentModal(null);
              ctx.setKeyBeingEdited && ctx.setKeyBeingEdited(null);
            }}
          />
        </div>
        {content}
      </div>
    </div>
  );
};

export default Modal;
