module.exports.main = async (event, context) => {
  const entry = require('.//*entryPath*/');
  const serverless = require('serverless-http');
  let app = entry;

  // support for async load app
  if (entry && entry.tcbGetApp && typeof entry.tcbGetApp === 'function') {
    app = await entry.tcbGetApp();
  }

  return serverless(app)(event, context);
};
