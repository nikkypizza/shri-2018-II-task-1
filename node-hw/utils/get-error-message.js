const getErrorMessage = (message, errorCode) => {
  return `
    <h1>${message}</h1>
    <br>
    <span>Error ${errorCode}</span>`;
};

module.exports = getErrorMessage;
