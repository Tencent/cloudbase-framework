const StaticBuilder = require('../')
const path = require('path')

const builder = new StaticBuilder()

async function main() {
    const result = await builder.build(path.resolve(__dirname, './static'))
    console.log(result)
}


main()