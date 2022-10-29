export const randomizer = (arr) => {
  const randomNum = Math.floor(Math.random() * arr.length)
  return arr[randomNum];
};
