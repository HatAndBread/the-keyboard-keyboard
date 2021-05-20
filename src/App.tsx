import React, { useEffect, useState } from 'react';
import './App.css';
import * as Tone from 'tone';
import handleKeyboard from './app/keyboard-handler/keyboard-handler';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { setStarted, isStarted } from './features/startedSlice';
import { current } from '@reduxjs/toolkit';

function App() {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const dispatch = useAppDispatch();
  const appIsStarted = useAppSelector(isStarted);
  useEffect(() => {
    console.log(currentPlayer)
    if (appIsStarted) {
      const handleKeyUp = (e: KeyboardEvent) => {
        handleKeyboard(e.key, `${currentPlayer}`)
        currentPlayer <= 5 ? (setCurrentPlayer(currentPlayer + 1)) : setCurrentPlayer(0)
      };
      document.addEventListener('keydown', handleKeyUp);
      return () => document.removeEventListener('keydown', handleKeyUp);
    }
  }, [appIsStarted, currentPlayer]);
  useEffect(() => {
    console.log(appIsStarted);
  }, [appIsStarted]);
  const initialStartUp = async () => {
    await Tone.start();
    dispatch(setStarted());
    // start tone js here
    console.log('Audio is ready! 👍');
  };
  return (
    <div className='App'>
      <button onClick={initialStartUp}>START</button>
    </div>
  );
}

export default App;
