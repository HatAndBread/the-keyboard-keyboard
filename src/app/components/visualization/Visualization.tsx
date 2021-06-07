import React, { useState, useEffect, useRef } from 'react';
import {
  sendSetCurrentText,
  sendSetLatestLetter,
  resetDisplayText,
  setDisplayText,
} from '../../music-logic/music-loop';
import Sketch from './Sketch';
import './Visualization.css';

let beenStarted = false;
const Visualization = ({
  showAnim,
  isBadBrowser,
}: {
  showAnim: boolean;
  isBadBrowser: boolean | undefined;
}) => {
  const [currentText, setCurrentText] = useState('');
  const [latestLetter, setLatestLetter] = useState('');
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const visRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (currentText.length) {
      beenStarted = true;
    }
    if (currentText.length > 50) {
      const newString = currentText.slice(2, currentText.length);
      setDisplayText(newString);
      setCurrentText(newString);
    }
  }, [currentText, setCurrentText]);
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
          isBadBrowser={isBadBrowser}
        />
      ) : (
        <>
          <div className='text-container'>
            {!beenStarted ? 'Press any key' : ''}
            {currentText}
          </div>
        </>
      )}
    </div>
  );
};

export default Visualization;
