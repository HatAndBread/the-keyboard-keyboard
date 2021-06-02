import React, { useContext } from 'react';
import { Context } from '../../../App';
import Modal from './Modal';
import EditKeyModal from './EditKeyModal';
import NewKeyboardModal from './NewKeyboardModal';
import EditKeyboardModal from './EditKeyboardModal';
import SaveModal from './SaveModal';
import OpenFileModal from './OpenFileModal';
import EffectsModal from './EffectsModal';

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
      case 'save-keyboards': {
        return <SaveModal />;
      }
      case 'open-file': {
        return <OpenFileModal />;
      }
      case 'effects': {
        return <EffectsModal />;
      }
      default:
        return <></>;
    }
  };
  return currentModal ? <Modal content={getModalContent()} /> : <></>;
};

export default ModalController;
