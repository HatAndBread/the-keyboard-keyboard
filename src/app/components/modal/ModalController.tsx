import React from 'react';
import Modal from './Modal';
import { useAppSelector } from '../../hooks';
import { keyBeingEdited } from '../../../features/startedSlice';
import EditKeyModal from './EditKeyModal';

const ModalController = ({ currentModal }: { currentModal: string | null }) => {
  const key = useAppSelector(keyBeingEdited);
  const getModalContent = () => {
    switch (currentModal) {
      case 'edit-key':
        return <EditKeyModal myKey={key} />;
      default:
        return <></>;
    }
  };
  return currentModal ? <Modal content={getModalContent()} /> : <></>;
};

export default ModalController;
