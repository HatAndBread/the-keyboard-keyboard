import Player from './Player';
import ValidKeys from '../../types/ValidKeys';

export default class Keyboard {
  name: string;
  ' ': Player;
  '1': Player;
  '2': Player;
  '3': Player;
  '4': Player;
  '5': Player;
  '6': Player;
  '7': Player;
  '8': Player;
  '9': Player;
  '0': Player;
  ',': Player;
  '.': Player;
  '?': Player;
  ';': Player;
  a: Player;
  b: Player;
  c: Player;
  d: Player;
  e: Player;
  f: Player;
  g: Player;
  h: Player;
  i: Player;
  j: Player;
  k: Player;
  l: Player;
  m: Player;
  n: Player;
  o: Player;
  p: Player;
  q: Player;
  r: Player;
  s: Player;
  t: Player;
  u: Player;
  v: Player;
  w: Player;
  x: Player;
  y: Player;
  z: Player;
  constructor(name: string, assignments: { [key: string]: Player }) {
    this.name = name;
    this[' '] = assignments[' '];
    this.a = assignments.a;
    this.b = assignments.b;
    this.c = assignments.c;
    this.d = assignments.d;
    this.e = assignments.e;
    this.f = assignments.f;
    this.g = assignments.g;
    this.h = assignments.h;
    this.i = assignments.i;
    this.j = assignments.j;
    this.k = assignments.k;
    this.l = assignments.l;
    this.m = assignments.m;
    this.n = assignments.n;
    this.o = assignments.o;
    this.p = assignments.p;
    this.q = assignments.q;
    this.r = assignments.r;
    this.s = assignments.s;
    this.t = assignments.t;
    this.u = assignments.u;
    this.v = assignments.v;
    this.w = assignments.w;
    this.x = assignments.x;
    this.y = assignments.y;
    this.z = assignments.z;
    this['0'] = assignments['0'];
    this['1'] = assignments['1'];
    this['2'] = assignments['2'];
    this['3'] = assignments['3'];
    this['4'] = assignments['4'];
    this['5'] = assignments['5'];
    this['6'] = assignments['6'];
    this['7'] = assignments['7'];
    this['8'] = assignments['8'];
    this['9'] = assignments['9'];
    this[','] = assignments[','];
    this['.'] = assignments['.'];
    this['?'] = assignments['?'];
    this[';'] = assignments[';'];
  }
  getAsArray = () => {
    return [
      this.a,
      this.b,
      this.c,
      this.d,
      this.e,
      this.f,
      this.g,
      this.h,
      this.i,
      this.j,
      this.k,
      this.l,
      this.m,
      this.n,
      this.o,
      this.p,
      this.q,
      this.r,
      this.s,
      this.t,
      this.u,
      this.v,
      this.w,
      this.x,
      this.y,
      this.z,
      this[' '],
      this['1'],
      this['2'],
      this['3'],
      this['4'],
      this['5'],
      this['6'],
      this['7'],
      this['8'],
      this['9'],
      this['0'],
      this[','],
      this['.'],
      this['?'],
      this[';'],
    ];
  };

  getKey(keyName: string | null) {
    // @ts-ignore
    if (keyName && this[keyName]) return this[keyName];
  }

  setPlayType(newPlayType: 'LOOP' | 'SINGLE' | 'RAPID', keyName: ValidKeys) {
    const newPlayer = new Player(
      this[keyName].keyAssignment,
      newPlayType,
      this[keyName].buffer,
      this[keyName].playbackRate,
      this[keyName].player.volume.value,
      this[keyName].randomize,
      this[keyName].octave,
      this[keyName].tuning,
      this[keyName].attack,
      this[keyName].release
    );
    this[keyName].destroy();
    this[keyName] = newPlayer;
  }
}
