import React from 'react';
import KeyboardKey from './KeyboardKey';
import './KeyboardEditor.css';

const KeyboardEditor = () => {
  return (
    <div className='KeyboardEditor'>
      <div className='keyboard-row key-nums'>
        <KeyboardKey key={'1'} myKey={'1'} />
        <KeyboardKey key={'2'} myKey={'2'} />
        <KeyboardKey key={'3'} myKey={'3'} />
        <KeyboardKey key={'4'} myKey={'4'} />
        <KeyboardKey key={'5'} myKey={'5'} />
        <KeyboardKey key={'6'} myKey={'6'} />
        <KeyboardKey key={'7'} myKey={'7'} />
        <KeyboardKey key={'8'} myKey={'8'} />
        <KeyboardKey key={'9'} myKey={'9'} />
        <KeyboardKey key={'0'} myKey={'0'} />
      </div>
      <div className='keyboard-row qwer'>
        <KeyboardKey key={'Q'} myKey={'q'} />
        <KeyboardKey key={'W'} myKey={'w'} />
        <KeyboardKey key={'E'} myKey={'e'} />
        <KeyboardKey key={'R'} myKey={'r'} />
        <KeyboardKey key={'T'} myKey={'t'} />
        <KeyboardKey key={'Y'} myKey={'y'} />
        <KeyboardKey key={'U'} myKey={'u'} />
        <KeyboardKey key={'I'} myKey={'i'} />
        <KeyboardKey key={'O'} myKey={'o'} />
        <KeyboardKey key={'P'} myKey={'p'} />
      </div>
      <div className='keyboard-row asdf'>
        <KeyboardKey key={'A'} myKey={'a'} />
        <KeyboardKey key={'S'} myKey={'s'} />
        <KeyboardKey key={'D'} myKey={'d'} />
        <KeyboardKey key={'F'} myKey={'f'} />
        <KeyboardKey key={'G'} myKey={'g'} />
        <KeyboardKey key={'H'} myKey={'h'} />
        <KeyboardKey key={'J'} myKey={'j'} />
        <KeyboardKey key={'K'} myKey={'k'} />
        <KeyboardKey key={'L'} myKey={'l'} />
        <KeyboardKey key={';'} myKey={';'} />
      </div>
      <div className='keyboard-row zxcv'>
        <KeyboardKey key={'Z'} myKey={'z'} />
        <KeyboardKey key={'X'} myKey={'x'} />
        <KeyboardKey key={'C'} myKey={'c'} />
        <KeyboardKey key={'V'} myKey={'v'} />
        <KeyboardKey key={'B'} myKey={'b'} />
        <KeyboardKey key={'N'} myKey={'n'} />
        <KeyboardKey key={'M'} myKey={'m'} />
        <KeyboardKey key={','} myKey={','} />
        <KeyboardKey key={'.'} myKey={'.'} />
        <KeyboardKey key={'?'} myKey={'?'} />
      </div>
      <div className='keyboard-row space-row'>
        <KeyboardKey key={' '} myKey={' '} extraClassName={'space-button'} />
      </div>
    </div>
  );
};

export default KeyboardEditor;
