const sortDataByType = (data: Array<object>, type: string) => {
  const outputData: Array<object> = [];
  let indexCounter: number = 0;

  interface arrElement {
    type: string
  }

  for (let el of data) {
    const element = <arrElement>el;
    if (element.type === type) {
      outputData[indexCounter] = element;
      indexCounter++;
    }
  }
  return outputData;
};

module.exports = sortDataByType;
