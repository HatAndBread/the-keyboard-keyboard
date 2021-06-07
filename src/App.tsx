import React, { useEffect, useState, createContext } from 'react';
import './App.css';
import * as Tone from 'tone';
import Keyboard from './app/music-logic/Keyboard';
import {
  musicLoop,
  sendBoard,
  sendKeyboardNames,
  sendSetKeyboard,
  sendCurrentKeyboardName,
} from './app/music-logic/music-loop';
import { useAppDispatch } from './app/hooks';
import KeyboardEditor from './app/components/keyboard-editor/KeyboardEditor';
import ModalController from './app/components/modal/ModalController';
import createListeners from './app/music-logic/keyboard-listeners';
import Nav from './app/components/nav/Nav';
import OnBufferLoad from './OnBufferLoad';
import ContextProps from './types/ContextProps';
import ValidKeys from './types/ValidKeys';
import KeyboardTabs from './app/components/keyboard-tabs/KeyboardTabs';
import Visualization from './app/components/visualization/Visualization';
import ToggleSwitch from './app/components/toggle-switch/ToggleSwitch';
import LandingPage from './app/components/landing-page/LandingPage';
import Loader from './app/components/Loader/Loader';
import Hints from './app/components/hints/Hints';
import Icon from './app/components/icon/Icon';
import gitHub from './assets/images/github.png';
import linkedIn from './assets/images/linkedin.png';

//@ts-ignore
let isBadBrowser = window.MediaRecorder ? false : true;

export const Context = createContext<Partial<ContextProps>>({});
function App() {
  const [attemptingToLoad, setAttemptingToLoad] = useState(false);
  const [appIsStarted, setAppIsStarted] = useState(false);
  const [buffers, setBuffers] = useState<{
    [key: string]: Tone.ToneAudioBuffer;
  }>({});
  const [keyboards, setKeyboards] = useState<null | {
    [key: string]: Keyboard;
  }>(null);
  const [keyboardNames, setKeyboardNames] = useState<string[]>([]);
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [keyBeingEdited, setKeyBeingEdited] = useState<ValidKeys | null>(null);
  const [editorOpen, setEditorOpen] = useState<boolean>(false);
  const [currentKeyboardName, setCurrentKeyboardName] = useState<string>(
    'harmonious'
  );
  const [currentKeyboard, setCurrentKeyboard] = useState<null | Keyboard>(null);
  const dispatch = useAppDispatch();
  const [showAnim, setShowAnim] = useState(isBadBrowser ? false : true);
  const [showHints, setShowHints] = useState(true);

  useEffect(() => {
    console.log(keyboards);
  }, [keyboards]);

  useEffect(() => {
    createListeners();
    musicLoop();
  }, []);
  useEffect(() => {
    console.log(keyboards, 'Here are the keyboards');
    if (keyboards) {
      setKeyboardNames(Object.keys(keyboards));
      sendBoard(keyboards[currentKeyboardName]);
      setCurrentKeyboard(keyboards[currentKeyboardName]);
    }
    setAttemptingToLoad(false);
  }, [keyboards, currentKeyboardName, dispatch]);
  useEffect(() => {
    sendSetKeyboard(setCurrentKeyboardName);
  }, [setCurrentKeyboardName]);
  useEffect(() => {
    sendKeyboardNames(keyboardNames);
  }, [keyboardNames]);
  useEffect(() => {
    sendCurrentKeyboardName(currentKeyboardName);
  }, [currentKeyboardName]);

  return (
    <Context.Provider
      value={{
        appIsStarted,
        buffers,
        keyboards,
        setKeyboards,
        keyboardNames,
        setKeyboardNames,
        currentKeyboard,
        currentKeyboardName,
        setCurrentKeyboardName,
        currentModal,
        setCurrentModal,
        keyBeingEdited,
        setKeyBeingEdited,
        setEditorOpen,
      }}>
      <div className='App'>
        <OnBufferLoad />
        {attemptingToLoad ? (
          <Loader />
        ) : (
          <>
            {!appIsStarted ? (
              <div>
                <LandingPage
                  isBadBrowser={isBadBrowser}
                  setAttemptingToLoad={setAttemptingToLoad}
                  setAppIsStarted={setAppIsStarted}
                  setBuffers={setBuffers}
                />
              </div>
            ) : (
              <>
                <Nav />
                <div className='body-content'>
                  {!editorOpen && (
                    <div
                      style={{
                        display: 'flex',
                        marginBottom: '16px',
                        fontSize: '16px',
                        width: '160px',
                        justifyContent: 'space-between',
                      }}>
                      <div className={'toggle-container'}>
                        Visualization
                        <ToggleSwitch
                          id='visualization-switch'
                          onFalseSet={() => setShowAnim(false)}
                          onTrueSet={() => setShowAnim(true)}
                          defaultChecked={showAnim}
                        />
                      </div>
                    </div>
                  )}
                  <KeyboardTabs />
                  {editorOpen ? (
                    <KeyboardEditor />
                  ) : (
                    <>
                      <Visualization
                        showAnim={showAnim}
                        isBadBrowser={isBadBrowser}
                      />
                      {showHints && (
                        <Hints
                          isBadBrowser={isBadBrowser}
                          setShowHints={setShowHints}
                        />
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </>
        )}
        <ModalController currentModal={currentModal} />
        <footer>
          <p>Made with ♥️ by Joshua Hume</p>
          <div
            style={{
              display: 'flex',
              width: '100px',
              justifyContent: 'space-between',
            }}>
            <Icon
              className='footer-icon'
              src={gitHub}
              alt='GitHub'
              pointer={true}
              onClick={() =>
                window.open('https://github.com/HatAndBread', '_blank')
              }
            />
            <Icon
              className='footer-icon'
              src={linkedIn}
              alt='LinkedIn'
              pointer={true}
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/in/joshua-hume-0259691ab/',
                  '_blank'
                )
              }
            />
          </div>
          <div>
            Enjoy The Keyboard Keyboard?{' '}
            <a
              href='https://www.paypal.com/paypalme/hatandbread'
              target='_blank'>
              Buy me a beer 🍺
            </a>
          </div>

          <div>
            Icons made by{' '}
            <a href='from www.flaticon.com' target='_blank'>
              Freepik
            </a>{' '}
            from{' '}
            <a href='from www.flaticon.com' target='_blank'>
              www.flaticon.com
            </a>
          </div>
        </footer>
      </div>
    </Context.Provider>
  );
}

export default App;
