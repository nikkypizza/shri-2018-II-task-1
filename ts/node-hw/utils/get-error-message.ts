const getErrorMessage = (message: string, errorCode: number) => {
  return `
    <h1>${message}</h1>
    <br>
    <span>Error ${errorCode}</span>`;
};

module.exports = getErrorMessage;
