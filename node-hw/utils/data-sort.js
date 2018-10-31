const sortDataByType = (data, type) => {
  const outputData = [];
  let indexCounter = 0;
  for (let el of data) {
    const element = el;
    if (element.type === type) {
      outputData[indexCounter] = element;
      indexCounter++;
    }
  }
  return outputData;
};
module.exports = sortDataByType;
