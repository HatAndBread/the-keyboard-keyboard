import React, { useState } from 'react';
import './EffectsModal.css';
import {
  getEffects,
  setEffectWet,
  setDefaultWet,
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
      <div className='distortion-settings column'>
        <label htmlFor='distortion-range'>
          Distortion amount: {distortionValue ? distortionValue : 0}
        </label>
        <input
          type='range'
          name='distortion-range'
          id='distortion-range'
          min='0.02'
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
            setDefaultWet('distortion', num);
          }}
        />
      </div>
      <div className='reverb-settings column'>
        <label htmlFor='reverb-room-range'>
          Reverb amount: {reverbValue ? reverbValue : 0}
        </label>
        <input
          type='range'
          name='reverb-room-range'
          id='reverb-room-range'
          min='0'
          max='1'
          step='0.02'
          defaultValue={reverbValue ? reverbValue : 0}
          onChange={(e) => {
            const num = parseFloat(e.target.value);
            setReverb(num);
            setReverbValue(num);
          }}
        />
        <label htmlFor='reverb-wet-range'>
          Reverb wetness: {reverbWet ? reverbWet : 0}
        </label>
        <input
          type='range'
          name='reverb-wet-range'
          id='reverb-wet-range'
          min='0'
          max='1'
          step='0.02'
          defaultValue={reverbWet ? reverbWet : 0}
          onChange={(e) => {
            const num = parseFloat(e.target.value);
            setReverbWet(num);
            setEffectWet('reverb', num);
            setDefaultWet('reverb', num);
          }}
        />
      </div>
      <div className='delay-settings column'>
        <label htmlFor='delay-time-range'>
          Delay time: {delayTimeValue ? delayTimeValue : 0.2}
        </label>
        <input
          type='range'
          name='delay-time-range'
          id='delay-time-range'
          min='0.02'
          max='2'
          step='0.02'
          defaultValue={
            typeof delayTimeValue === 'number' ? delayTimeValue : 0.2
          }
          onChange={(e) => {
            const num = parseFloat(e.target.value);
            setDelayTimeValue(num);
            typeof delayFeedbackValue === 'number' &&
              setDelay(num, delayFeedbackValue);
          }}
        />
        <label htmlFor='delay-feedback-range'>
          Delay feedback: {delayFeedbackValue ? delayFeedbackValue : 0}
        </label>
        <input
          type='range'
          name='delay-time-range'
          id='delay-time-range'
          min='0'
          max='1'
          step='0.02'
          defaultValue={delayFeedbackValue ? delayFeedbackValue : 0}
          onChange={(e) => {
            const num = parseFloat(e.target.value);
            setDelayFeedbackValue(num);
            if (typeof delayTimeValue === 'number') {
              setDelay(delayTimeValue, num);
            }
          }}
        />
        <label htmlFor='delay-wet-range'>
          Delay wetness: {delayWet ? delayWet : 0}
        </label>
        <input
          type='range'
          name='delay-wet-range'
          id='delay-wet-range'
          min='0'
          max='1'
          step='0.02'
          defaultValue={delayWet ? delayWet : 0}
          onChange={(e) => {
            const num = parseFloat(e.target.value);
            setDelayWet(num);
            setEffectWet('delay', num);
            setDefaultWet('delay', num);
          }}
        />
      </div>
    </div>
  );
};

export default EffectsModal;
