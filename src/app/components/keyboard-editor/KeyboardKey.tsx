import React from 'react';
import './KeyboardKey.css';
import { useAppDispatch } from '../../hooks';
import {
  setOpenModal,
  setKeyBeingEdited,
} from '../../../features/startedSlice';
import ValidKeys from '../../../types/ValidKeys';

const KeyboardKey = ({
  myKey,
  extraClassName,
}: {
  myKey: ValidKeys;
  extraClassName?: string;
}) => {
  const dispatch = useAppDispatch();
  const getCorrectLabel = () => {
    switch (myKey) {
      case ' ':
        return 'space';
      default:
        return myKey.toUpperCase();
    }
  };
  const handleClick = () => {
    dispatch(setKeyBeingEdited(myKey));
    dispatch(setOpenModal('edit-key'));
  };
  return (
    <div
      onClick={handleClick}
      className={
        extraClassName ? `KeyboardKey ${extraClassName}` : 'KeyboardKey'
      }>
      {getCorrectLabel()}
    </div>
  );
};

export default KeyboardKey;
