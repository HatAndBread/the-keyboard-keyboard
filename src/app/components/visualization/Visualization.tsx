import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../../App';
import { sendSetCurrentText } from '../../music-logic/music-loop';
import './Visualization.css';

const Visualization = () => {
  const ctx = useContext(Context);
  const [currentText, setCurrentText] = useState('');
  useEffect(() => {
    sendSetCurrentText(setCurrentText);
  }, [setCurrentText]);
  return <div className='Visualization'>{currentText}</div>;
};

export default Visualization;
