import React, { useContext, useState, useEffect, useRef } from 'react';
import Player from '../../music-logic/Player';
import Keyboard from '../../music-logic/Keyboard';
import { Context } from '../../../App';
import _ from 'lodash';
import ValidKeys from '../../../types/ValidKeys';
import ToggleSwitch from '../../components/toggle-switch/ToggleSwitch';
import './EditKeyModal.css';
import getBufferName from '../../music-logic/music-loop-helpers/get-buffer-name';
import scales from '../../music-logic/tuning-systems';
import { getFraction } from '../../music-logic/tuning-systems';

const EditKeyModal = ({
  myKey,
  keyboard,
}: {
  myKey: ValidKeys | null;
  keyboard: Keyboard | null | undefined;
}) => {
  const ctx = useContext(Context);
  const myPlayer: Player = keyboard?.getKey(myKey);
  const [myPlayType, setMyPlayType] = useState<
    undefined | 'LOOP' | 'SINGLE' | 'RAPID'
  >(myPlayer.playType);
  const [randomize, setRandomize] = useState<boolean>(myPlayer.randomize);
  const [bufferName, setBufferName] = useState<string | undefined>(
    getBufferName(ctx, myPlayer)
  );
  const [tuningSystem, setTuningSystem] = useState('any');
  const [octave, setOctave] = useState(myPlayer.octave);
  const [pitchFaderValue, setPitchFaderValue] = useState(
    myPlayer.playbackRate ? myPlayer.playbackRate : 1
  );
  const bufferSelectRef = useRef<HTMLSelectElement>(null);
  const playTypeSelectRef = useRef<HTMLSelectElement>(null);
  const scaleSelectRef = useRef<HTMLSelectElement>(null);
  const octaveSelectRef = useRef<HTMLSelectElement>(null);

  const handlePlayTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    playTypeSelectRef.current?.blur();
    if (
      myKey &&
      (e.target.value === 'RAPID' ||
        e.target.value === 'LOOP' ||
        e.target.value === 'SINGLE')
    ) {
      keyboard?.setPlayType(e.target.value, myKey);
      setMyPlayType(e.target.value);
    }
  };
  const handleRandomizeChange = (onOrOff: boolean) => {
    setRandomize(onOrOff);
    if (myPlayer) {
      onOrOff ? (myPlayer.randomize = true) : (myPlayer.randomize = false);
    }
  };
  const handleBufferChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (ctx.buffers && myPlayer) {
      bufferSelectRef.current?.blur();
      myPlayer.setBuffer(ctx.buffers[e.target.value]);
      setBufferName(e.target.value);
      console.log(e.target.value, ctx.buffers[e.target.value], '✨');
    }
  };
  const handleTuningChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    scaleSelectRef.current?.blur();
    setTuningSystem(e.target.value);
  };
  return (
    <>
      {myPlayer && ctx.buffers && (
        <div className='EditKeyModal'>
          {myKey}
          <select
            onChange={handleBufferChange}
            value={bufferName}
            ref={bufferSelectRef}>
            {Object.keys(ctx.buffers).map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
          <select
            onChange={handlePlayTypeChange}
            value={myPlayer.playType}
            ref={playTypeSelectRef}>
            <option value='LOOP'>Loop</option>
            <option value='SINGLE'>Single</option>
            <option value='RAPID'>Rapid</option>
          </select>
          <ToggleSwitch
            label='Randomize Pitch'
            id={'pitch-randomize'}
            defaultChecked={randomize}
            onTrueSet={() => handleRandomizeChange(true)}
            onFalseSet={() => handleRandomizeChange(false)}
          />
          {myPlayType === 'LOOP' && (
            <>
              <input type='range' />
              <input type='range' />
            </>
          )}
          {!randomize && (
            <>
              <label htmlFor='octave-select'>Octave</label>
              <select
                id='octave-select'
                name='octave-select'
                ref={octaveSelectRef}
                onChange={(e) => {
                  octaveSelectRef.current?.blur();
                  console.log(parseFloat(e.target.value));
                  if (myPlayer.playbackRate) {
                    myPlayer.setPlaybackRate(
                      pitchFaderValue * parseFloat(e.target.value)
                    );
                  }
                  setOctave(parseFloat(e.target.value));
                }}
                defaultValue={octave}>
                <option value='0.125'>-3</option>
                <option value='0.25'>-2</option>
                <option value='0.5'>-1</option>
                <option value='1'>0</option>
                <option value='2'>1</option>
                <option value='3'>2</option>
                <option value='4'>3</option>
              </select>
              <select onChange={handleTuningChange} ref={scaleSelectRef}>
                <option value={'any'}>Any</option>
                {Object.keys(scales).map((scale) => (
                  <option key={scale} value={scale}>
                    {scale}
                  </option>
                ))}
              </select>
              {tuningSystem === 'any' ? (
                <>
                  <input
                    type='range'
                    min='1'
                    max='2'
                    step='0.001'
                    defaultValue={myPlayer.playbackRate}
                    onChange={(e) => {
                      myPlayer.setPlaybackRate(
                        parseFloat(e.target.value) * octave
                      );
                      setPitchFaderValue(parseFloat(e.target.value));
                    }}></input>
                  {myPlayer.playbackRate}
                </>
              ) : (
                <>
                  <input
                    type='range'
                    min='1'
                    max='2'
                    step='0.001'
                    defaultValue={myPlayer.playbackRate}
                    onChange={(e) => {
                      myPlayer.setPlaybackRate(
                        findClosestNumber(
                          scales[tuningSystem],
                          parseFloat(e.target.value)
                        ) * octave
                      );
                      setPitchFaderValue(parseFloat(e.target.value));
                    }}></input>
                  {getRatioFromDecimal(
                    scales[tuningSystem],
                    pitchFaderValue,
                    tuningSystem
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default EditKeyModal;

const findClosestNumber = (arr: number[], num: number) => {
  let closestNum: number = 2;
  arr.forEach((element) => {
    if (num - element >= 0 && num - element < closestNum) {
      closestNum = element;
    }
  });
  return closestNum;
};

const getRatioFromDecimal = (arr: number[], num: number, scale: string) => {
  let closestNum: number = 2;
  let ind = 0;
  arr.forEach((element, index) => {
    if (num - element >= 0 && num - element < closestNum) {
      closestNum = element;
      ind = index;
    }
  });
  return getFraction(scale, ind);
};
