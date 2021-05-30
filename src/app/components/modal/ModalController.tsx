import React, { useContext } from 'react';
import { Context } from '../../../App';
import Modal from './Modal';
import { useAppSelector } from '../../hooks';
import { keyBeingEdited } from '../../../features/startedSlice';
import EditKeyModal from './EditKeyModal';

const ModalController = ({ currentModal }: { currentModal: string | null }) => {
  const ctx = useContext(Context);
  const key = useAppSelector(keyBeingEdited);
  const getModalContent = () => {
    switch (currentModal) {
      case 'edit-key':
        if (ctx.currentKeyboard && key) {
          return <EditKeyModal myKey={key} keyboard={ctx.currentKeyboard} />;
        } else {
          return <></>;
        }
      default:
        return <></>;
    }
  };
  return currentModal ? <Modal content={getModalContent()} /> : <></>;
};

export default ModalController;
