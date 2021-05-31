import _ from 'lodash';

const keyboardTemplate = {
  name: { name: '' },
  ' ': {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  a: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  b: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  c: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  d: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  e: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  f: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  g: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  h: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  i: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  j: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  k: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  l: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  m: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  n: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  o: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  p: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  q: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  r: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  s: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  t: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  u: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  v: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  w: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  x: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  y: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  z: {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  '0': {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  '1': {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  '2': {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  '3': {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  '4': {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  '5': {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  '6': {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  '7': {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  '8': {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  '9': {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  ',': {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  '.': {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  '?': {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
  ';': {
    name: '',
    playType: '',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.3,
    release: 0.3,
  },
};

const getKeyboardTemplate = () => _.cloneDeep(keyboardTemplate);

export default getKeyboardTemplate;
