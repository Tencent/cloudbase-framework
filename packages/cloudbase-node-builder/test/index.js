const { NodeBuilder } = require('../')
const path = require('path')

const builder = new NodeBuilder({
    projectPath: path.resolve(__dirname, '../')
})

builder.build(path.resolve(__dirname, './project/entry.js')).then((result) => console.log('result:', result))
