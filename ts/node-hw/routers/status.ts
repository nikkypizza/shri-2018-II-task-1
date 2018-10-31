(function () { // Обернул в IIFE ибо пока не понимаю как побороть error TS2451: Cannot redeclare block-scoped variable 'statusRouter'.
  const moment = require(`moment`);
  const startTime = Date.now();
  
  const statusRouter = (request: any, response: any) => { // не смог определить тип
    const timeDiff = Date.now() - startTime;
    const serverStartTimer = {
      timeFromServerStart: moment(timeDiff).utc().format(`HH:mm:ss`),
    };
    response.send(serverStartTimer);
  };
  
  module.exports = statusRouter;
})();