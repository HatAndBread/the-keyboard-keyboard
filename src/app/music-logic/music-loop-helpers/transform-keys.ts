const transformWeirdKeys = (key: string): string => {
  switch (key) {
    case '/':
      return '?';
    case ':':
      return ';';
    default:
      return key;
  }
};

export default transformWeirdKeys;
