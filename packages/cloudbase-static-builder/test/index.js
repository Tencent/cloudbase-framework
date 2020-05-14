const { StaticBuilder } = require('../')
const path = require('path')

const builder = new StaticBuilder({
    projectPath: path.resolve(__dirname, './static')
})

async function main() {
    const result = await builder.build(path.resolve(__dirname, './static'), {
        path: '/',
        exclude: ['node_modules/**']
    })
    console.log(result)
}


main()