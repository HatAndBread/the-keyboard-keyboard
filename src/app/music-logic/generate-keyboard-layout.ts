import getKeyboardTemplate from './default-keyboards/keyboard-template';
import { sampleUrls } from './sample-buffers';
const generateKeyboardLayout = (params: {
  keyboardName: string;
  tuning: string;
  mainInstrument: string;
  mainPlayType: string;
  mainOctave: number;
}) => {
  const newKeyboard = getKeyboardTemplate();
  Object.keys(newKeyboard).forEach((key) => {
    if (key === 'name') {
      newKeyboard.name = { name: params.keyboardName };
    } else {
      const possiblePlayers = Object.keys(sampleUrls);
      const randomInst =
        possiblePlayers[Math.floor(Math.random() * possiblePlayers.length)];
      //@ts-ignore
      newKeyboard[key].name =
        params.mainInstrument === 'random' ? randomInst : params.mainInstrument;
      //@ts-ignore
      newKeyboard[key].playType = params.mainPlayType;
      //@ts-ignore
      newKeyboard[key].octave = params.mainOctave;
      //@ts-ignore
      newKeyboard[key].tuning = params.tuning;
    }
  });
  return newKeyboard;
};

export default generateKeyboardLayout;
