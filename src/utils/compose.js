const cache = (f) => {
  const oneDay = 1000 * 5;
  let t = Date.now();
  let oldData = f();

  return (...args) => {
    if (t > Date.now() - oneDay) {
      return oldData;
    }

    t = Date.now();
    oldData = f.apply(this, [...args]);
    return oldData;
  }
};

export {
  cache
};
