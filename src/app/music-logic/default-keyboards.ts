import mainKeyboard from "./default-keyboards/main-keyboard";
import percussionKeyboard from "./default-keyboards/percussion-keyboard";
import harmoniousKeyboard from "./default-keyboards/harmonious-keyboard";

export type keyboard = {
  [key: string]: {
    name: string;
    playType?: "SINGLE" | "RAPID" | "LOOP" | undefined;
    playbackRate?: number;
    volume?: number;
    randomize?: boolean;
  };
};

const defaultKeyboards = [mainKeyboard, percussionKeyboard, harmoniousKeyboard];
export default defaultKeyboards;
