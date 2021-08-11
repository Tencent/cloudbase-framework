/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
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
  })(...args);
}

exports.main = main;
