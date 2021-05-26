const detuner = (currentKeys: string[], detune: number) => {
  if (currentKeys.includes("arrowleft")) {
    return detune - 0.005;
  } else if (currentKeys.includes("arrowright")) {
    return detune + 0.005;
  }
  return 0;
};

export default detuner;
