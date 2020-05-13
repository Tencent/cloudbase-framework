require = require("esm")(module)
const Koa = require('koa')
const { Nuxt } = require('nuxt')
const serverless = require('serverless-http')

const app = new Koa()
let config = require('./nuxt.config.js')
if (config.default) {
  config = config.default
}

config.dev = false
async function main(...args) {
  const nuxt = new Nuxt(config)
  await nuxt.ready()
  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false
    ctx.req.ctx = ctx

    try {
      nuxt.render(ctx.req, ctx.res)
    } catch (e) {
      console.log(e)
    }
  })

  return serverless(app, {
    binary: ['application/javascript',
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
      'text/xml']
  })(...args)
}

exports.main = main
