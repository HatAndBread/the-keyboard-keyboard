import _ from 'lodash';

type PlayerData = {
  name: string;
  playType: string;
  playbackRate: number;
  volume: number;
  randomize: boolean;
  octave: number;
  tuning: string;
  attack: number;
  release: number;
};
export interface KeyboardTemplate {
  name: { name: string };
  ' ': PlayerData;
  a: PlayerData;
  b: PlayerData;
  c: PlayerData;
  d: PlayerData;
  e: PlayerData;
  f: PlayerData;
  g: PlayerData;
  h: PlayerData;
  i: PlayerData;
  j: PlayerData;
  k: PlayerData;
  l: PlayerData;
  m: PlayerData;
  n: PlayerData;
  o: PlayerData;
  p: PlayerData;
  q: PlayerData;
  r: PlayerData;
  s: PlayerData;
  t: PlayerData;
  u: PlayerData;
  v: PlayerData;
  w: PlayerData;
  x: PlayerData;
  y: PlayerData;
  z: PlayerData;
  '1': PlayerData;
  '2': PlayerData;
  '3': PlayerData;
  '4': PlayerData;
  '5': PlayerData;
  '6': PlayerData;
  '7': PlayerData;
  '8': PlayerData;
  '9': PlayerData;
  '0': PlayerData;
  ',': PlayerData;
  '.': PlayerData;
  '?': PlayerData;
  ';': PlayerData;
}

const keyboardTemplate: KeyboardTemplate = {
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
