import React, { useRef } from 'react';
import Player from '../../../music-logic/Player';
const OctaveSelect = ({
  myPlayer,
  pitchFaderValue,
  octave,
  setOctave,
}: {
  myPlayer: Player;
  pitchFaderValue: number;
  octave: number;
  setOctave: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const myRef = useRef<HTMLSelectElement>(null);
  return (
    <>
      <label htmlFor='octave-select'>Octave</label>
      <select
        id='octave-select'
        name='octave-select'
        ref={myRef}
        onChange={(e) => {
          myRef.current?.blur();
          myPlayer.setPlaybackRate(
            pitchFaderValue * parseFloat(e.target.value)
          );
          myPlayer.octave = parseFloat(e.target.value);
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
    </>
  );
};

export default OctaveSelect;
