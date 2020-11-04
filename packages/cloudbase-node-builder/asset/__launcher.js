module.exports.main = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const entry = (() => {
    const result = require('.//*entryPath*/');
    // #wrapExpress const app = require('express')();
    // #wrapExpress result = app.use(result);
    return result;
  })();
  const serverless = require('serverless-http');
  let app = entry;

  // support for async load app
  if (entry?.tcbGetApp && typeof entry.tcbGetApp === 'function') {
    app = await entry.tcbGetApp();
  }

  return serverless(app)(event, context);
};
