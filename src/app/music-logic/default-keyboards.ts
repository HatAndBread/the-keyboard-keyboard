import mainKeyboard from './default-keyboards/main-keyboard';
import percussionKeyboard from './default-keyboards/percussion-keyboard';
import harmoniousKeyboard from './default-keyboards/harmonious-keyboard';
import { KeyboardTemplate } from './default-keyboards/keyboard-template';

const defaultKeyboards: KeyboardTemplate[] = [
  mainKeyboard,
  percussionKeyboard,
  harmoniousKeyboard,
];
export default defaultKeyboards;
