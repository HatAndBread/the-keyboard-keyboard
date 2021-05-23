import React from "react";
import Modal from "./Modal";
import { useAppSelector } from "../../hooks";
import { keyBeingEdited } from "../../../features/startedSlice";

const ModalController = ({ currentModal }: { currentModal: string | null }) => {
  const key = useAppSelector(keyBeingEdited);
  console.log(currentModal, key, "FADSFDSFF");
  const getModalContent = () => {
    switch (currentModal) {
      case "edit-key":
        return <div>WOW</div>;
      default:
        return <></>;
    }
  };
  return currentModal ? <Modal content={getModalContent()} /> : <></>;
};

export default ModalController;
