import React, { useContext, useState, useRef } from 'react';
import Player from '../../music-logic/Player';
import Keyboard from '../../music-logic/Keyboard';
import { Context } from '../../../App';
import ValidKeys from '../../../types/ValidKeys';
import ToggleSwitch from '../../components/toggle-switch/ToggleSwitch';
import './EditKeyModal.css';
import getBufferName from '../../music-logic/music-loop-helpers/get-buffer-name';
import scales from '../../music-logic/tuning-systems';
import { getFraction } from '../../music-logic/tuning-systems';
import OctaveSelect from './editor-components/OctaveSelect';

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
  const [octave, setOctave] = useState(myPlayer.octave);
  const [pitchFaderValue, setPitchFaderValue] = useState(
    getNoOctavePBR(myPlayer)
  );
  const bufferSelectRef = useRef<HTMLSelectElement>(null);
  const playTypeSelectRef = useRef<HTMLSelectElement>(null);
  const scaleSelectRef = useRef<HTMLSelectElement>(null);

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
    myPlayer.tuning = e.target.value;
  };
  return (
    <>
      {myPlayer && ctx.buffers && (
        <div className='EditKeyModal'>
          {myKey}
          <label htmlFor='volume-range'>Volume</label>
          <input
            type='range'
            name='volume-range'
            id='volume-id'
            min='-20'
            max='20'
            step='1'
            defaultValue={myPlayer.volume}
            onChange={(e) => {
              myPlayer.setVolume(parseInt(e.target.value));
              console.log(myPlayer.player.volume.value);
            }}
          />
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
          {!randomize && (
            <>
              <OctaveSelect
                myPlayer={myPlayer}
                pitchFaderValue={pitchFaderValue}
                setOctave={setOctave}
                octave={octave}
              />
              <select
                onChange={handleTuningChange}
                ref={scaleSelectRef}
                defaultValue={myPlayer.tuning}>
                <option value={'any'}>Any</option>
                {Object.keys(scales).map((scale) => (
                  <option key={scale} value={scale}>
                    {scale}
                  </option>
                ))}
              </select>
              {myPlayer.tuning === 'any' ? (
                <>
                  <input
                    type='range'
                    min='1'
                    max='2'
                    step='0.001'
                    defaultValue={getNoOctavePBR(myPlayer)}
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
                    defaultValue={getNoOctavePBR(myPlayer)}
                    onChange={(e) => {
                      myPlayer.setPlaybackRate(
                        findClosestNumber(
                          scales[myPlayer.tuning],
                          parseFloat(e.target.value)
                        ) * octave
                      );
                      setPitchFaderValue(parseFloat(e.target.value));
                    }}></input>
                  {getRatioFromDecimal(
                    scales[myPlayer.tuning],
                    pitchFaderValue,
                    myPlayer.tuning
                  )}
                </>
              )}
            </>
          )}
          {myPlayType === 'LOOP' && (
            <>
              <label htmlFor='attack-range'>Attack</label>
              <input
                type='range'
                name='attack-range'
                id='attack-range'
                min='0.01'
                max='1'
                step='0.01'
                defaultValue={myPlayer.attack}
                onChange={(e) => myPlayer.setAttack(parseFloat(e.target.value))}
              />
              <label htmlFor='release-range'>Release</label>
              <input
                type='range'
                name='release-range'
                id='release-range'
                min='0.01'
                max='1'
                step='0.01'
                defaultValue={myPlayer.release}
                onChange={(e) => {
                  myPlayer.setRelease(parseFloat(e.target.value));
                }}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default EditKeyModal;

const getNoOctavePBR = (myPlayer: Player): number => {
  if (myPlayer.playbackRate) {
    if (myPlayer.octave === 1) {
      return myPlayer.playbackRate;
    } else if (myPlayer.octave > 1) {
      return myPlayer.playbackRate / myPlayer.octave;
    } else if (myPlayer.octave < 1) {
      return myPlayer.playbackRate * (1 / myPlayer.octave);
    }
  }
  return 1;
};

const findClosestNumber = (arr: number[], num: number) => {
  let closestNum: number = 2;
  if (arr) {
    arr.forEach((element) => {
      if (num - element >= 0 && num - element < closestNum) {
        closestNum = element;
      }
    });
  }
  return closestNum;
};

const getRatioFromDecimal = (arr: number[], num: number, scale: string) => {
  let closestNum: number = 2;
  let ind = 0;
  console.log(arr, num, scale);
  if (arr) {
    arr.forEach((element, index) => {
      if (num - element >= 0 && num - element < closestNum) {
        closestNum = element;
        ind = index;
      }
    });
  }
  return getFraction(scale, ind);
};
