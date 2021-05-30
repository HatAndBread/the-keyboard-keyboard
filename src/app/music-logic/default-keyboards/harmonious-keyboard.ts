import { keyboard } from '../default-keyboards';
import { justIntonationRatios } from '../justi-intonation-ratios';

const harmoniousKeyboard: keyboard = {
  name: { name: 'harmonious' },
  ' ': {
    name: 'gamelan1',
    playType: 'SINGLE',
    playbackRate: 0.5,
    volume: -5,
    randomize: false,
    octave: 1,
  },
  a: {
    name: 'harmonium',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
  },
  b: {
    name: 'gamelan1',
    playType: 'SINGLE',
    playbackRate: justIntonationRatios[4],
    volume: -5,
    randomize: false,
    octave: 1,
  },
  c: {
    name: 'gamelan1',
    playType: 'SINGLE',
    playbackRate: justIntonationRatios[2],
    volume: -5,
    randomize: false,
    octave: 1,
  },
  d: {
    name: 'harmonium',
    playType: 'LOOP',
    playbackRate: justIntonationRatios[2],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  e: {
    name: 'voice',
    playType: 'LOOP',
    playbackRate: justIntonationRatios[2],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  f: {
    name: 'harmonium',
    playType: 'LOOP',
    playbackRate: justIntonationRatios[3],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  g: {
    name: 'harmonium',
    playType: 'LOOP',
    playbackRate: justIntonationRatios[4],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  h: {
    name: 'harmonium',
    playType: 'LOOP',
    playbackRate: justIntonationRatios[5],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  i: {
    name: 'voice',
    playType: 'LOOP',
    playbackRate: 2,
    volume: 0,
    randomize: false,
    octave: 1,
  },
  j: {
    name: 'harmonium',
    playType: 'LOOP',
    playbackRate: justIntonationRatios[6],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  k: {
    name: 'harmonium',
    playType: 'LOOP',
    playbackRate: 2,
    volume: 0,
    randomize: false,
    octave: 1,
  },
  l: {
    name: 'harmonium',
    playType: 'LOOP',
    playbackRate: 2 * justIntonationRatios[1],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  m: {
    name: 'gamelan1',
    playType: 'SINGLE',
    playbackRate: justIntonationRatios[6],
    volume: -5,
    randomize: false,
    octave: 1,
  },
  n: {
    name: 'gamelan1',
    playType: 'SINGLE',
    playbackRate: justIntonationRatios[5],
    volume: -5,
    randomize: false,
    octave: 1,
  },
  o: {
    name: 'voice',
    playType: 'LOOP',
    playbackRate: 2 * justIntonationRatios[1],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  p: {
    name: 'voice',
    playType: 'LOOP',
    playbackRate: 2 * justIntonationRatios[2],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  q: {
    name: 'voice',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
  },
  r: {
    name: 'voice',
    playType: 'LOOP',
    playbackRate: justIntonationRatios[3],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  s: {
    name: 'harmonium',
    playType: 'LOOP',
    playbackRate: justIntonationRatios[1],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  t: {
    name: 'voice',
    playType: 'LOOP',
    playbackRate: justIntonationRatios[4],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  u: {
    name: 'voice',
    playType: 'LOOP',
    playbackRate: justIntonationRatios[6],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  v: {
    name: 'gamelan1',
    playType: 'SINGLE',
    playbackRate: justIntonationRatios[3],
    volume: -5,
    randomize: false,
    octave: 1,
  },
  w: {
    name: 'voice',
    playType: 'LOOP',
    playbackRate: justIntonationRatios[1],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  x: {
    name: 'gamelan1',
    playType: 'SINGLE',
    playbackRate: justIntonationRatios[1],
    volume: -5,
    randomize: false,
    octave: 1,
  },
  y: {
    name: 'voice',
    playType: 'LOOP',
    playbackRate: justIntonationRatios[5],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  z: {
    name: 'gamelan1',
    playType: 'SINGLE',
    playbackRate: 1,
    volume: -5,
    randomize: false,
    octave: 1,
  },
  '0': {
    name: 'piano',
    playType: 'SINGLE',
    playbackRate: 2 * justIntonationRatios[2],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  '1': {
    name: 'piano',
    playType: 'SINGLE',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
  },
  '2': {
    name: 'piano',
    playType: 'SINGLE',
    playbackRate: justIntonationRatios[1],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  '3': {
    name: 'piano',
    playType: 'SINGLE',
    playbackRate: justIntonationRatios[2],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  '4': {
    name: 'piano',
    playType: 'SINGLE',
    playbackRate: justIntonationRatios[3],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  '5': {
    name: 'piano',
    playType: 'SINGLE',
    playbackRate: justIntonationRatios[4],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  '6': {
    name: 'piano',
    playType: 'SINGLE',
    playbackRate: justIntonationRatios[5],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  '7': {
    name: 'piano',
    playType: 'SINGLE',
    playbackRate: justIntonationRatios[6],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  '8': {
    name: 'piano',
    playType: 'SINGLE',
    playbackRate: 2,
    volume: 0,
    randomize: false,
    octave: 1,
  },
  '9': {
    name: 'piano',
    playType: 'SINGLE',
    playbackRate: 2 * justIntonationRatios[1],
    volume: 0,
    randomize: false,
    octave: 1,
  },
  ',': {
    name: 'gamelan1',
    playType: 'SINGLE',
    playbackRate: 2,
    volume: -5,
    randomize: false,
    octave: 1,
  },
  '.': {
    name: 'gamelan1',
    playType: 'RAPID',
    playbackRate: 1,
    volume: -10,
    randomize: false,
    octave: 1,
  },
  '?': {
    name: 'gamelan1',
    playType: 'RAPID',
    playbackRate: 2,
    volume: -10,
    randomize: false,
    octave: 1,
  },
  ';': {
    name: 'harmonium',
    playType: 'LOOP',
    playbackRate: 2 * justIntonationRatios[2],
    volume: 0,
    randomize: false,
    octave: 1,
  },
};

export default harmoniousKeyboard;
