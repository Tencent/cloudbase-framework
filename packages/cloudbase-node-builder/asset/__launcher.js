/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
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
  if (entry && entry.tcbGetApp && typeof entry.tcbGetApp === 'function') {
    app = await entry.tcbGetApp(event, context);
  }

  return serverless(app, {
    binary: [
      'application/javascript',
      'application/octet-stream',
      'application/xml',
      'font/eot',
      'font/opentype',
      'font/otf',
      'image/*',
      'video/*',
      'audio/*',
      'text/comma-separated-values',
      'text/css',
      'text/javascript',
      'text/plain',
      'text/text',
      'text/xml',
    ],
  })(event, context);
};
