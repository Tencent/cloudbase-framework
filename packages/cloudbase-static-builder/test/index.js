const { StaticBuilder } = require('../')
const path = require('path')

const builder = new StaticBuilder({
    projectPath: path.resolve(__dirname, '../')
})

async function main() {
    const result = await builder.build(path.resolve(__dirname, './static'))
    console.log(result)
}


main()