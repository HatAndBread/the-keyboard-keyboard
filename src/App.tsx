import React, { useEffect, useState } from 'react';
import './App.css';
import * as Tone from 'tone';
import handleKeyboard from './app/keyboard-handler/keyboard-handler';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { setStarted, isStarted } from './features/startedSlice';


const keyIsDuplicated = (newKey: string, keysCurrentlyDown:string[]):boolean => {
  if (keysCurrentlyDown.includes(newKey)) return true
  return false
}
function App() {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [keysCurrentlyDown, setKeysCurrentlyDown] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const appIsStarted = useAppSelector(isStarted);
  useEffect(() => {
    console.log(currentPlayer)
    if (appIsStarted) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!keyIsDuplicated(e.key, keysCurrentlyDown)){
          const newKeys = [...keysCurrentlyDown, e.key];
          setKeysCurrentlyDown(newKeys);
          handleKeyboard(e.key, currentPlayer);
          currentPlayer <= 9 ? (setCurrentPlayer(currentPlayer + 1)) : setCurrentPlayer(0);
        }
      };
      const handleKeyUp = (e: KeyboardEvent) => {
        console.log('KEY IS UP')
        setKeysCurrentlyDown([...keysCurrentlyDown].filter((key)=> key !== e.key))
      }
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp)};
    }
  }, [appIsStarted, currentPlayer, keysCurrentlyDown]);
  useEffect(()=>{console.log(keysCurrentlyDown, '🎻')}, [keysCurrentlyDown]);
  const initialStartUp = async () => {
    await Tone.start();
    dispatch(setStarted());
  };
  return (
    <div className='App'>
      <button onClick={initialStartUp}>START</button>
    </div>
  );
}

export default App;
