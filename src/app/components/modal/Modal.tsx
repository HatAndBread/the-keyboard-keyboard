import React from "react";
import "./Modal.css";
import Icon from "../icon/Icon";
import closer from "../../../assets/images/cross.png";
import { useAppDispatch } from "../../hooks";
import {
  setOpenModal,
  setKeyBeingEdited,
} from "../../../features/startedSlice";

const Modal = ({ content }: { content: JSX.Element }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="Modal">
      <div className="modal-box">
        <div className="closer-container">
          <Icon
            className="closer"
            src={closer}
            alt="X"
            pointer={true}
            onClick={() => {
              dispatch(setOpenModal(null));
              dispatch(setKeyBeingEdited(null));
            }}
          />
        </div>
        {content}
      </div>
    </div>
  );
};

export default Modal;
