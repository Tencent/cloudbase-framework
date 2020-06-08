const entry = require('.//*entryPath*/');
const express = require('express');
const serverless = require('serverless-http');

module.exports.main = async (event, context) => {
  return serverless(entry)(event, context);
};
