import { handleKeyDown, handleKeyUp } from "./music-loop";

const createKeyboardListeners = () => {
  document.addEventListener("keyup", handleKeyUp);
  document.addEventListener("keydown", handleKeyDown);
};

export default createKeyboardListeners;
