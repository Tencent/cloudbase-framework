/**
 *
 * Copyright 2020 Tencent
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
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
    app = await entry.tcbGetApp();
  }

  return serverless(app)(event, context);
};
