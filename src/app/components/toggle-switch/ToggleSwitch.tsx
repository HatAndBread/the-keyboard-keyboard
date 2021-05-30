import React, { useState, useEffect } from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({
  label,
  id,
  onFalseSet,
  onTrueSet,
  defaultChecked,
}: {
  label?: string;
  id?: string;
  onFalseSet?: () => any;
  onTrueSet?: () => any;
  defaultChecked?: boolean;
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);
  const handleChange = () => {
    if (checked) {
      setChecked(false);
      if (onFalseSet) onFalseSet();
    } else {
      setChecked(true);
      if (onTrueSet) onTrueSet();
    }
  };
  console.log(defaultChecked, checked);
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
        defaultChecked={defaultChecked}
        hidden></input>
    </>
  );
};

export default ToggleSwitch;
