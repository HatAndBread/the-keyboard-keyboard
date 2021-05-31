import React, { useContext } from 'react';
import { Context } from '../../../App';
import './KeyboardKey.css';
import ValidKeys from '../../../types/ValidKeys';

const KeyboardKey = ({
  myKey,
  extraClassName,
}: {
  myKey: ValidKeys;
  extraClassName?: string;
}) => {
  const ctx = useContext(Context);
  const getCorrectLabel = () => {
    switch (myKey) {
      case ' ':
        return 'space';
      default:
        return myKey.toUpperCase();
    }
  };
  const handleClick = () => {
    ctx.setKeyBeingEdited && ctx.setKeyBeingEdited(myKey);
    ctx.setCurrentModal && ctx.setCurrentModal('edit-key');
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
