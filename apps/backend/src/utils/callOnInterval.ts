function callOnInterval<T>(
  // eslint-disable-next-line no-unused-vars
  callBack: (arg: T) => void,
  arg: T,
  interval: number
): () => void {
  const intervalId = setInterval(() => {
    callBack(arg);
  }, interval);
  return () => clearInterval(intervalId);
}

export default callOnInterval;
