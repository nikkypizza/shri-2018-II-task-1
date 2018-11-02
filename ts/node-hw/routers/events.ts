(function () { 
const sortDataByType = require(`../utils/data-sort.js`);
const getErrorMessage = require(`../utils/get-error-message.js`);
const fs = require(`fs`);

const filterTypes = [`info`, `critical`];

const eventsRouter = (request: any, response:any) => { // не смог определить тип
  const eventsJSONfile = JSON.parse(fs.readFileSync(`../js/data/events.json`, `utf8`)).events;
  let output = null;

  if (filterTypes.includes(request.query.type)) {
    output = sortDataByType(eventsJSONfile, request.query.type);
  } else if (request.query.type === undefined) {
    output = eventsJSONfile;
  } else {
    return response
      .type(`text/html`)
      .status(400)
      .send(getErrorMessage(`Incorrect type`, 400));
  }
  return response.send(output);
};

module.exports = eventsRouter;
})();