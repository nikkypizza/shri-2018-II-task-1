const express = require(`express`);
const app = express();
const PORT = 8000;

// const process = require(`process`);
const eventsRouter = require(`./routers/events.js`);
const statusRouter = require(`./routers/status.js`);
const getErrorMessage = require(`./utils/get-error-message.js`);

const routes = {
  ROOT: `/`,
  STATUS: `/status`,
  EVENTS_DATA: `/api/events`
};

app.get(routes.ROOT, (request: any, response:any) => { // не смог определить тип
  response.send(`<h1>Express server is up and running 👌</h1>`);
});
app.get(routes.STATUS, statusRouter);
app.get(routes.EVENTS_DATA, eventsRouter);

// Отдает 404, если путь отличен от routes
app.use((request: any, response:any) => { // не смог определить тип
  response
    .type(`text/html`)
    .status(404)
    .send(getErrorMessage(`Page not found`, 404));
});

app.listen(PORT, (err: string) => {
  if (err) {
    return process.stdout.write(``, err);
  }
  return process.stdout.write(`Server is listening on port ${PORT}`);
});
