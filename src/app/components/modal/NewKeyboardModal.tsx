import React, { useContext, useState, useEffect, useRef } from 'react';
import { Context } from '../../../App';
import './newKeyboardModal.css';
import scales from '../../music-logic/tuning-systems';
import generateKeyboardLayout from '../../music-logic/generate-keyboard-layout';
import { createPlayers } from '../../music-logic/create-players';
import Keyboard from '../../music-logic/Keyboard';
import { cloneDeep } from 'lodash';

const NewKeyboardModal = () => {
  const [baseNote, setBaseNote] = useState(440);
  const [tuning, setTuning] = useState('any');
  const [mainInstrument, setMainInstrument] = useState('random');
  const [mainPlayType, setMainPlayType] = useState('LOOP');
  const [mainOctave, setMainOctave] = useState(1);
  const [keyboardName, setKeyboardName] = useState('');
  const ctx = useContext(Context);
  const buffers = ctx.buffers;

  const removeNonDigitsFromString = (str: string) => {
    return str.replace(/[^\d.-]/g, '');
  };

  const createKeyboard = () => {
    const newLayout = generateKeyboardLayout({
      keyboardName,
      baseNote,
      tuning,
      mainInstrument,
      mainPlayType,
      mainOctave,
    });
    //@ts-ignore
    const players = createPlayers(newLayout, buffers);
    console.log(newLayout);
    const newKeyboard = new Keyboard(keyboardName, players);
    if (
      ctx.keyboards &&
      ctx.setKeyboards &&
      ctx.setKeyboardNames &&
      ctx.keyboardNames &&
      ctx.setCurrentKeyboardName &&
      ctx.setEditorOpen
    ) {
      const newKeyboards = cloneDeep(ctx.keyboards);
      newKeyboards[keyboardName] = newKeyboard;
      ctx.setKeyboardNames([...ctx.keyboardNames, keyboardName]);
      ctx.setKeyboards(newKeyboards);
      ctx.setCurrentKeyboardName(keyboardName);
      ctx.setEditorOpen(true);
    }
    ctx.setCurrentModal && ctx.setCurrentModal(null);
  };

  return (
    <div className='NewKeyboardModal'>
      <div className='name-input'>
        <label htmlFor='name-input'>Keyboard Name:</label>
        <input
          type='text'
          id='name-input'
          name='name-input'
          onChange={(e) => {
            setKeyboardName(e.target.value);
          }}
        />
      </div>
      <div className='instrument-selector'>
        <label htmlFor='instrument'>Main Instrument</label>
        <select
          id='instrument'
          name='instrument'
          defaultValue={mainInstrument}
          onChange={(e) => setMainInstrument(e.target.value)}>
          <option value='random'>random</option>
          {ctx.buffers &&
            Object.keys(ctx.buffers).map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
        </select>
      </div>
      <div className='play-type-selector'>
        <label htmlFor='play-type'>Main play type</label>
        <select
          name='play-type'
          id='play-type'
          defaultValue={mainPlayType}
          onChange={(e) => setMainPlayType(e.target.value)}>
          <option value='LOOP'>LOOP</option>
          <option value='SINGLE'>SINGLE</option>
          <option value='RAPID'>RAPID</option>
        </select>
      </div>
      <div className='tuning-selector'>
        <label htmlFor='tuning'>Main Tuning</label>
        <select
          onChange={(e) => setTuning(e.target.value)}
          id='tuning'
          name='tuning'
          defaultValue={tuning}>
          <option value='any'>Any</option>
          {Object.keys(scales).map((scale) => (
            <option value={scale} key={scale}>
              {scale}
            </option>
          ))}
        </select>
      </div>
      <div className='octave-selector'>
        <label htmlFor='main-octave'>Main Octave</label>
        <select
          onChange={(e) => setMainOctave(parseFloat(e.target.value))}
          id='main-octave'
          name='main-octave'
          defaultValue='1'>
          <option value='0.125'>-3</option>
          <option value='0.25'>-2</option>
          <option value='0.5'>-1</option>
          <option value='1'>0</option>
          <option value='2'>1</option>
          <option value='3'>2</option>
          <option value='4'>3</option>
        </select>
      </div>
      <div className='base-note-selector'>
        <label htmlFor='base-note'>Base Note</label>
        <div>
          <input
            type='text'
            id='base-note'
            placeholder='Pitch in hertz'
            defaultValue={`${baseNote}.0`}
            onChange={(e) => {
              const num = parseFloat(removeNonDigitsFromString(e.target.value));
              if (typeof num === 'number' && !isNaN(num)) {
                setBaseNote(num);
              } else if (isNaN(num)) {
                setBaseNote(440);
              }
            }}
          />
          HZ
        </div>
      </div>
      <button onClick={createKeyboard}>OK</button>
    </div>
  );
};

export default NewKeyboardModal;
