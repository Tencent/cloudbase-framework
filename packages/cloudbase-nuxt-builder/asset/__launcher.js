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
