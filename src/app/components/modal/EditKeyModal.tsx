import React, { useContext, useState, useEffect } from 'react';
import Player from '../../music-logic/Player';
import Keyboard from '../../music-logic/Keyboard';
import { Context } from '../../../App';
import _ from 'lodash';
import ValidKeys from '../../../types/ValidKeys';

const EditKeyModal = ({ myKey }: { myKey: ValidKeys | null }) => {
  const ctx = useContext(Context);
  const [keyboard, setKeyboard] = useState<null | Keyboard>(null);
  const [myPlayer, setMyPlayer] = useState<null | Player>(null);
  const [myPlayType, setMyPlayType] = useState<
    undefined | 'LOOP' | 'SINGLE' | 'RAPID'
  >();

  useEffect(() => {
    if (ctx.keyboards && ctx.currentKeyboard) {
      setKeyboard(ctx.keyboards[ctx.currentKeyboard]);
      const player = ctx.keyboards[ctx.currentKeyboard].getKey(myKey);
      setMyPlayer(player);
      setMyPlayType(player.playType);
    }
  }, [ctx, myKey]);

  const handleLoopChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (
      myPlayer &&
      myKey &&
      (e.target.value === 'RAPID' ||
        e.target.value === 'LOOP' ||
        e.target.value === 'SINGLE')
    ) {
      keyboard?.setPlayType(e.target.value, myKey);
      setMyPlayType(e.target.value);
    }
  };
  return (
    <div>
      {myKey}
      <select
        onChange={handleLoopChange}
        value={myPlayType ? myPlayType : undefined}>
        <option value='LOOP'>Loop</option>
        <option value='SINGLE'>Single</option>
        <option value='RAPID'>Rapid</option>
      </select>
    </div>
  );
};

export default EditKeyModal;
