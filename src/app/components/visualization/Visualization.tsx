import React, { useContext, useState, useEffect, useRef } from 'react';
import { Context } from '../../../App';
import {
  sendSetCurrentText,
  sendSetLatestLetter,
} from '../../music-logic/music-loop';
import Sketch from './Sketch';
import './Visualization.css';

const Visualization = () => {
  const ctx = useContext(Context);
  const [currentText, setCurrentText] = useState('');
  const [latestLetter, setLatestLetter] = useState('');
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const visRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    sendSetCurrentText(setCurrentText);
    sendSetLatestLetter(setLatestLetter);
  }, [setCurrentText, setLatestLetter]);

  useEffect(() => {
    const rect = visRef.current?.getBoundingClientRect();
    if (rect) {
      setWidth(rect.width);
      setHeight(rect.height);
    }
    const onResize = () => {
      if (visRef.current) {
        const newRect = visRef.current.getBoundingClientRect();
        setWidth(newRect.width);
        setHeight(newRect.height);
      }
    };
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    console.log(width, height);
  }, [width, height]);

  return (
    <div className='Visualization' ref={visRef}>
      <Sketch currentText={currentText} width={width} height={height} />
    </div>
  );
};

export default Visualization;
