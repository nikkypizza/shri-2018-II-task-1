const sortDataByType = (data, type) => {
  const outputData = {};
  let indexCounter = 0;

  for (let element of data) {
    if (element.type === type) {
      outputData[indexCounter] = element;
      indexCounter++;
    }
  }
  return outputData;
};

module.exports = sortDataByType;
