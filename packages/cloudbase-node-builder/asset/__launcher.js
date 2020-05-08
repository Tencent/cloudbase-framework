const entry = require('./api//*entryPath*/')
const express = require('express')
const serverless = require('serverless-http')

if (typeof entry === 'function') {
    const app = express()
    app.get('/', entry)
    module.exports.main = serverless(app)
} else {
    module.exports.main = serverless(entry)
}