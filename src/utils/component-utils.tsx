export const generateUniqueID = ((prepend) => {
  let count = 0;
  return () => `${prepend}${++count}`;
})();
