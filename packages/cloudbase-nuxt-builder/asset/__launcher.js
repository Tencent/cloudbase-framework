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
require = require('esm')(module);
const path = require('path');
const Koa = require('koa');
const { Nuxt } = require('nuxt');
const serverless = require('serverless-http');

const app = new Koa();
let config = require('./nuxt.config.js');
if (config.default) {
  config = config.default;
}

config.dev = false;
async function main(...args) {
  const event = args[0];
  // 针对部署在子路径的情况需要手动带上路径前缀
  event.path = path.join('/*path*/', event.path);
  const nuxt = new Nuxt(config);
  await nuxt.ready();
  app.use((ctx) => {
    ctx.status = 200;
    ctx.respond = false;
    ctx.req.ctx = ctx;

    try {
      nuxt.render(ctx.req, ctx.res);
    } catch (e) {
      console.log(e);
    }
  });

  return serverless(app, {
    binary: [
      'application/javascript',
      'application/json',
      'application/octet-stream',
      'application/xml',
      'font/eot',
      'font/opentype',
      'font/otf',
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'text/comma-separated-values',
      'text/css',
      'text/javascript',
      'text/plain',
      'text/text',
      'text/xml',
    ],
  })(...args);
}

exports.main = main;
