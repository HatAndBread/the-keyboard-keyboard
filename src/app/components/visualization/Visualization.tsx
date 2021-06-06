import React, { useContext, useState, useEffect, useRef } from 'react';
import { Context } from '../../../App';
import {
  sendSetCurrentText,
  sendSetLatestLetter,
  resetDisplayText,
} from '../../music-logic/music-loop';
import fullScreenPath from '../../../assets/images/full-screen.png';
import Sketch from './Sketch';
import Icon from '../icon/Icon';
import './Visualization.css';

const Visualization = ({ showAnim }: { showAnim: boolean }) => {
  const ctx = useContext(Context);
  const [currentText, setCurrentText] = useState('');
  const [latestLetter, setLatestLetter] = useState('');
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const visRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === `)` || e.key === `(`) {
        resetDisplayText();
        setCurrentText('');
      }
    };
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    sendSetCurrentText(setCurrentText);
    sendSetLatestLetter(setLatestLetter);
  }, [setCurrentText, setLatestLetter]);
  useEffect(() => {
    resetDisplayText();
    setCurrentText('');
  }, []);

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

  return (
    <div className='Visualization' ref={visRef}>
      {showAnim ? (
        <Sketch
          latestLetter={latestLetter}
          currentText={currentText}
          width={width}
          height={height}
          setCurrentText={setCurrentText}
        />
      ) : (
        <div className='text-container'>{currentText}</div>
      )}
    </div>
  );
};

export default Visualization;
