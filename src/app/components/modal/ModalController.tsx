import React, { useContext } from 'react';
import { Context } from '../../../App';
import Modal from './Modal';
import EditKeyModal from './EditKeyModal';
import NewKeyboardModal from './NewKeyboardModal';
import EditKeyboardModal from './EditKeyboardModal';

const ModalController = ({ currentModal }: { currentModal: string | null }) => {
  const ctx = useContext(Context);
  const key = ctx.keyBeingEdited;
  const getModalContent = () => {
    switch (currentModal) {
      case 'edit-key':
        if (ctx.currentKeyboard && key) {
          return <EditKeyModal myKey={key} keyboard={ctx.currentKeyboard} />;
        } else {
          return <></>;
        }
      case 'edit-keyboard': {
        return <EditKeyboardModal />;
      }
      case 'new-keyboard': {
        return <NewKeyboardModal />;
      }
      default:
        return <></>;
    }
  };
  return currentModal ? <Modal content={getModalContent()} /> : <></>;
};

export default ModalController;
