function callOnInterval<T>(
  callBack: (arg: T) => void,
  arg: T,
  interval: number
): (intervalId: NodeJS.Timeout) => void {
  const intervalId = setInterval(() => {
    callBack(arg);
  }, interval);
  return () => clearInterval(intervalId);
}

export default callOnInterval;
