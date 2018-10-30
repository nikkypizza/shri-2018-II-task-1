const moment = require(`moment`);
const startTime = Date.now();

const statusRouter = (request, response) => {
  const timeDiff = Date.now() - startTime;
  const serverStartTimer = {
    timeFromServerStart: moment(timeDiff).utc().format(`HH:mm:ss`),
  };
  response.send(serverStartTimer);
};

module.exports = statusRouter;
