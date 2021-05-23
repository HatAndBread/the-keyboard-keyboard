import React, { useEffect, useState } from 'react';
import './App.css';
import * as Tone from 'tone';
import { setCurrentKeys, musicLoop, setSamples } from './app/keyboard-handler/keyboard-handler';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { setStarted, isStarted } from './features/startedSlice';


const keyIsDuplicated = (newKey: string, keysCurrentlyDown:string[]):boolean => {
  if (keysCurrentlyDown.includes(newKey)) return true
  return false
}
function App() {
  const [keysCurrentlyDown, setKeysCurrentlyDown] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const appIsStarted = useAppSelector(isStarted);
  useEffect(() => {
    setCurrentKeys(keysCurrentlyDown);
    if (appIsStarted) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!keyIsDuplicated(e.key, keysCurrentlyDown)){
          const newKeys = [...keysCurrentlyDown, e.key];
          setKeysCurrentlyDown(newKeys);
        }
      };
      const handleKeyUp = (e: KeyboardEvent) => {
        setKeysCurrentlyDown([...keysCurrentlyDown].filter((key)=> key !== e.key));
      };
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp)};
    }
  }, [appIsStarted, keysCurrentlyDown]);

  useEffect(()=>{console.log(keysCurrentlyDown, '🎻')}, [keysCurrentlyDown]);
  const initialStartUp = async () => {
    await Tone.start();
    setSamples();
    dispatch(setStarted());
  };
  useEffect(()=>{musicLoop()}, []);
  return (
    <div className='App'>
      <button onClick={initialStartUp}>START</button>
    </div>
  );
}

export default App;
