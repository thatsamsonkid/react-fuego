export const generateUniqueID = ((prepend) => {
  let count = 0;
  return () => `${prepend}${++count}`;
})();

export const classnames = (classes: any, prepended = "", appended = "") => {
  // Get all truthy conditional classes
  const classNames = Object.keys(classes).filter((key) => classes[key]);
  return [prepended, ...classNames, appended].filter((val) => val).join(" ");
};
