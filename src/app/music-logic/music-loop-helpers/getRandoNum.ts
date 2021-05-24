const getRandoNum = () => {
  const ranNum = Math.floor(Math.random() * 2);
  if (ranNum) return Math.random() * 0.8 + 0.2;
  return Math.random() * 3;
};

export default getRandoNum;
