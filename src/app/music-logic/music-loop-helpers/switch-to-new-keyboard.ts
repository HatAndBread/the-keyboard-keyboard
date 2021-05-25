const handleAdd = (
  currentBoardIndex: number,
  keyboardNames: string[],
  setKeyboard: React.Dispatch<React.SetStateAction<string>>
) => {
  if (currentBoardIndex + 1 === keyboardNames.length) {
    setKeyboard(keyboardNames[0]);
  } else {
    setKeyboard(keyboardNames[currentBoardIndex + 1]);
  }
};

const handleSubtract = (
  currentBoardIndex: number,
  keyboardNames: string[],
  setKeyboard: React.Dispatch<React.SetStateAction<string>>
) => {
  if (currentBoardIndex - 1 < 0) {
    setKeyboard(keyboardNames[keyboardNames.length - 1]);
  } else {
    setKeyboard(keyboardNames[currentBoardIndex - 1]);
  }
};
const switchToNewKeyboard = (
  add: boolean,
  currentKeyboardName: string,
  keyboardNames: string[],
  setKeyboard: React.Dispatch<React.SetStateAction<string>>
) => {
  const currentBoardIndex = keyboardNames.indexOf(currentKeyboardName);
  if (currentBoardIndex || currentBoardIndex === 0) {
    add
      ? handleAdd(currentBoardIndex, keyboardNames, setKeyboard)
      : handleSubtract(currentBoardIndex, keyboardNames, setKeyboard);
  }
};

export default switchToNewKeyboard;
