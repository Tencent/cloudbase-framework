const _ = require('lodash')
const utils = require('./utils')
const utils2 = require('../../src/__launcher')
module.exports = function(req, res) {
    return res.send(utils.foo())
}