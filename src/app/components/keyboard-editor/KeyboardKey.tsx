import React from "react";
import "./KeyboardKey.css";
import { useAppDispatch } from "../../hooks";
import {
  setOpenModal,
  setKeyBeingEdited,
} from "../../../features/startedSlice";

const KeyboardKey = ({
  myKey,
  extraClassName,
}: {
  myKey: string;
  extraClassName?: string;
}) => {
  const dispatch = useAppDispatch();
  const getCorrectLabel = () => {
    switch (myKey) {
      case " ":
        return "space";
      default:
        return myKey.toUpperCase();
    }
  };
  const handleClick = () => {
    dispatch(setKeyBeingEdited(myKey));
    dispatch(setOpenModal("edit-key"));
  };
  return (
    <div
      onClick={handleClick}
      className={
        extraClassName ? `KeyboardKey ${extraClassName}` : "KeyboardKey"
      }>
      {getCorrectLabel()}
    </div>
  );
};

export default KeyboardKey;
