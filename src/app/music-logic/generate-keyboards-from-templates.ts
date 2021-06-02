import ContextProps from '../../types/ContextProps';
import { KeyboardTemplate } from './default-keyboards/keyboard-template';
import Keyboard from './Keyboard';
import { createPlayers } from './create-players';
const generateKeyboardsFromTemplates = (
  templates: KeyboardTemplate[],
  ctx: Partial<ContextProps>
) => {
  const newKeyboards: { [key: string]: Keyboard } = {};
  templates.forEach((keyboardLayout) => {
    if (ctx.buffers) {
      const myPlayers = createPlayers(keyboardLayout, ctx.buffers);
      newKeyboards[keyboardLayout.name.name] = new Keyboard(
        keyboardLayout.name.name,
        myPlayers
      );
    }
  });
  const newKeyboardKeys = Object.keys(newKeyboards);
  ctx.setKeyboardNames && ctx.setKeyboardNames(newKeyboardKeys);
  ctx.setKeyboards && ctx.setKeyboards(newKeyboards);
  ctx.setCurrentKeyboardName && ctx.setCurrentKeyboardName(newKeyboardKeys[0]);
};

export default generateKeyboardsFromTemplates;
