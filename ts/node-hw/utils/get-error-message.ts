(function () { // Обернул в IIFE ибо пока не понимаю как побороть error TS2451: Cannot redeclare block-scoped variable 'getErrorMessage'.
  const getErrorMessage = (message: string, errorCode: number) => {
    return `
    <h1>${message}</h1>
    <br>
    <span>Error ${errorCode}</span>`;
  };
  
  module.exports = getErrorMessage;
})();