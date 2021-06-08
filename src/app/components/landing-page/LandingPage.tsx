import React, { useEffect, useRef, useState } from 'react';
import './LandingPage.css';
import { start, ToneAudioBuffer } from 'tone';
import { createBuffers } from '../../music-logic/sample-buffers';
import { setEffects } from '../../music-logic/effects';
import Icon from '../icon/Icon';
import warningSrc from '../../../assets/images/warning.png';
import heroSrc from '../../../assets/images/hero.png';
import dogSrc from '../../../assets/images/dog.png';

const LandingPage = ({
  isBadBrowser,
  setAttemptingToLoad,
  setBuffers,
  setAppIsStarted,
}: {
  isBadBrowser: boolean | undefined;
  setAttemptingToLoad: React.Dispatch<React.SetStateAction<boolean>>;
  setBuffers: React.Dispatch<
    React.SetStateAction<{
      [key: string]: ToneAudioBuffer;
    }>
  >;
  setAppIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [backgroundPosition, setBackgroundPosition] = useState('center');
  const heroRef = useRef<HTMLDivElement | null>(null);
  const initialStartUp = async () => {
    setAttemptingToLoad(true);
    await start();
    createBuffers(setBuffers);
    setAppIsStarted(true);
    setEffects();
  };
  useEffect(() => {
    const isSmallScreen =
      heroRef.current && heroRef.current.getBoundingClientRect().width < 700;

    if (isSmallScreen) {
      setBackgroundPosition('left');
    }
    const onResize = () => {
      if (isSmallScreen) {
        setBackgroundPosition('left');
      } else if (heroRef.current) {
        setBackgroundPosition('center');
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [setBackgroundPosition]);

  return (
    <div className='LandingPage'>
      <div
        ref={heroRef}
        className='hero'
        style={{
          background: `linear-gradient(rgba(50,50,50,.5), rgba(60,60,60,.5)), url(${heroSrc})`,
          backgroundPosition,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <h1>The Keyboard Keyboard</h1>
        <button className='start-button' onClick={initialStartUp}>
          START
        </button>
        <div className='app-explanation'>
          <h2>How it works</h2>
          <div className='app-explanation-content'>
            <p>
              <img src={dogSrc} alt='a dog' />
              The Keyboard Keyboard turns your computer keyboard into a musical
              instrument. Assign audio samples to any key! Adjust pitch,
              envelope, and effects! Export recordings as mp3s! Save your
              keyboard settings to your computer! Experiment with different
              tuning systems!
            </p>
          </div>
        </div>
        {isBadBrowser && (
          <div className='bad-browser-warning'>
            <Icon src={warningSrc} alt='WARNING!' />
            <p>
              You seem to be using an outdated browser (or Safari). For the best
              experience and full features please use the most recent version of
              Chrome or FireFox.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default LandingPage;
