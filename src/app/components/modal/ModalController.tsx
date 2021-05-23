import React from "react";
import Modal from "./Modal";

const ModalController = ({ currentModal }: { currentModal: string | null }) => {
  const getModalContent = () => {
    switch (currentModal) {
      case "edit-key":
        return <div></div>;
      default:
        return <></>;
    }
  };
  return currentModal ? <Modal content={getModalContent()} /> : <></>;
};

export default ModalController;
