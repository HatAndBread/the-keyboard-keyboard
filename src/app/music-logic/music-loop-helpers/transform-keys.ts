const transformWeirdKeys = (key: string): string => {
  switch (key) {
    case "/":
      return "?";
    case ":":
      return ";";
    case "*":
      return ";";
    case "+":
      return ";";
    case "!":
      return "1";
    default:
      return key;
  }
};

export default transformWeirdKeys;
