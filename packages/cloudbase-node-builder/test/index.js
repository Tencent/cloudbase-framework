const assert = require('assert');
const { NodeBuilder } = require('../')
const path = require('path')

const builder = new NodeBuilder({
    projectPath: path.resolve(__dirname, '../')
})

builder.build(path.resolve(__dirname, './project/entry.js')).then((result) => {
    const { source, name } = result.functions[0];
    const output = path.resolve(source, name, 'package.json');
    const input = './project/package.json';
    assert.equal(
        require(output).dependencies.axios,
        require(input).dependencies.axios,
        "继承了项目中的 axios 依赖"
    );
    console.log(result);
});
