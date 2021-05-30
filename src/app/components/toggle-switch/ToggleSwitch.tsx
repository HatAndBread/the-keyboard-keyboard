import React, { useState } from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({
  label,
  id,
  onFalseSet,
  onTrueSet,
}: {
  label?: string;
  id?: string;
  onFalseSet?: () => any;
  onTrueSet?: () => any;
}) => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    if (checked) {
      setChecked(false);
      if (onFalseSet) onFalseSet();
    } else {
      setChecked(true);
      if (onTrueSet) onTrueSet();
    }
  };
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={`switch-background ${checked ? 'on-switch' : ''}`}>
        <div
          className={`switch-ball ${checked ? 'on-ball' : ''}`}
          onClick={handleChange}></div>
      </div>
      <input
        type='checkbox'
        id={id}
        name={id}
        checked={checked}
        hidden
        onChange={() => handleChange}></input>
    </>
  );
};

export default ToggleSwitch;
