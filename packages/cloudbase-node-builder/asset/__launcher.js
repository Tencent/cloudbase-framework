const entry = require('.//*entryPath*/');
const serverless = require('serverless-http');

module.exports.main = async (event, context) => {
  let app = entry;

  // support for async load app
  if (entry && entry.tcbGetApp && typeof entry.tcbGetApp === 'function') {
    app = await entry.tcbGetApp();
  }

  return serverless(app)(event, context);
};
