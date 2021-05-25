const detuner = (currentKeys: string[], detune: number) => {
  if (currentKeys.includes("arrowleft")) {
    detune -= 0.005;
  } else if (currentKeys.includes("arrowright")) {
    detune += 0.005;
  } else {
    detune = 0;
  }
};

export default detuner;
