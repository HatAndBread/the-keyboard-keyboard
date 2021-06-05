import React, { useState } from 'react';
import './EffectsModal.css';
import {
  getEffects,
  setEffectWet,
  setDistortion,
  setReverb,
  setDelay,
} from '../../music-logic/effects';

const EffectsModal = () => {
  const effects = getEffects();
  const [distortionValue, setDistortionValue] = useState(
    effects.distortion?.distortion
  );
  const [distortionWet, setDistortionWet] = useState(
    effects.distortion?.wet.value
  );
  const [reverbValue, setReverbValue] = useState(
    effects.reverb?.roomSize.value
  );
  const [reverbWet, setReverbWet] = useState(effects.reverb?.wet.value);
  const [delayFeedbackValue, setDelayFeedbackValue] = useState(
    effects.delay?.feedback.value
  );
  const [delayTimeValue, setDelayTimeValue] = useState(
    effects.delay?.delayTime.value
  );
  const [delayWet, setDelayWet] = useState(effects.delay?.wet.value);

  return (
    <div className='EffectsModal'>
      <div className='distortion-settigs column'>
        <label htmlFor='distortion-range'>
          Distortion amount: {distortionValue ? distortionValue : 0}
        </label>
        <input
          type='range'
          name='distortion-range'
          id='distortion-range'
          min='0.05'
          max='5'
          step='0.02'
          defaultValue={distortionValue ? distortionValue : 0}
          onChange={(e) => {
            const num = parseFloat(e.target.value);
            setDistortion(num);
            setDistortionValue(num);
          }}
        />
        <label htmlFor='distortion-wet-range'>
          Distortion wetness:{distortionWet ? distortionWet : 0}
        </label>
        <input
          type='range'
          name='distortion-wet-range'
          id='distortion-wet-range'
          min='0'
          max='1'
          step='0.02'
          defaultValue={distortionWet ? distortionWet : 0}
          onChange={(e) => {
            const num = parseFloat(e.target.value);
            setDistortionWet(num);
            setEffectWet('distortion', num);
          }}
        />
      </div>
      <div className='reverb-settigs column'>
        <label htmlFor='reverb-room-range'>Reverb amount:</label>
        <input type='range' name='reverb-room-range' id='reverb-room-range' />
        <label htmlFor='reverb-wet-range'>Reverb wetness:</label>
        <input type='range' name='reverb-wet-range' id='reverb-wet-range' />
      </div>
      <div className='delay-settigs column'>
        <label htmlFor='delay-time-range'>Delay time: </label>
        <input type='range' name='delay-time-range' id='delay-time-range' />
        <label htmlFor='delay-feedback-range'>Delay feedback: </label>
        <input type='range' name='delay-time-range' id='delay-time-range' />
        <label htmlFor='delay-wet-range'>Delay wetness: </label>
        <input type='range' name='delay-wet-range' id='delay-wet-range' />
      </div>
    </div>
  );
};

export default EffectsModal;
