const getPBR = (currentKeys: string[]): number => {
  if (currentKeys.includes("arrowdown")) {
    return 0.5;
  } else if (currentKeys.includes("arrowup")) {
    return 2;
  }
  return 1;
};

export default getPBR;
