import mainKeyboard from "./default-keyboards/main-keyboard";
import percussionKeyboard from "./default-keyboards/percussion-keyboard";

export type keyboard = {
  [key: string]: {
    name: string;
    playType?: "SINGLE" | "RAPID" | "LOOP" | undefined;
    playbackRate?: number;
    volume?: number;
    randomize?: boolean;
  };
};

export default [mainKeyboard, percussionKeyboard];
