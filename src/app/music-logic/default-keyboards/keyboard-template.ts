import _ from 'lodash';

type PlayerData = {
  name: string;
  playType: 'LOOP' | 'SINGLE' | 'RAPID' | undefined;
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
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  a: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  b: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  c: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  d: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  e: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  f: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  g: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  h: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  i: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  j: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  k: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  l: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  m: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  n: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  o: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  p: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  q: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  r: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  s: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  t: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  u: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  v: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  w: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  x: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  y: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  z: {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  '0': {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  '1': {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  '2': {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  '3': {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  '4': {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  '5': {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  '6': {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  '7': {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  '8': {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  '9': {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  ',': {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  '.': {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  '?': {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0.1,
    release: 0.3,
  },
  ';': {
    name: '',
    playType: 'LOOP',
    playbackRate: 1,
    volume: 0,
    randomize: false,
    octave: 1,
    tuning: 'any',
    attack: 0,
    release: 0.3,
  },
};

const getKeyboardTemplate = () => _.cloneDeep(keyboardTemplate);

export const isValidKey = (k: string) => {
  if (
    k === 'a' ||
    k === 'b' ||
    k === 'c' ||
    k === 'd' ||
    k === 'e' ||
    k === 'f' ||
    k === 'g' ||
    k === 'h' ||
    k === 'i' ||
    k === 'j' ||
    k === 'k' ||
    k === 'l' ||
    k === 'm' ||
    k === 'n' ||
    k === 'o' ||
    k === 'p' ||
    k === 'q' ||
    k === 'r' ||
    k === 's' ||
    k === 't' ||
    k === 'u' ||
    k === 'v' ||
    k === 'w' ||
    k === 'x' ||
    k === 'y' ||
    k === 'z' ||
    k === '1' ||
    k === '2' ||
    k === '3' ||
    k === '4' ||
    k === '5' ||
    k === '6' ||
    k === '7' ||
    k === '8' ||
    k === '9' ||
    k === '0' ||
    k === ' ' ||
    k === ',' ||
    k === '.' ||
    k === '?' ||
    k === ';'
  ) {
    return true;
  }
  return false;
};
export default getKeyboardTemplate;
