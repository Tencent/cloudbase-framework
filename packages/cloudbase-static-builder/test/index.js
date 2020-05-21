const { StaticBuilder } = require('../')
const path = require('path')

const builder = new StaticBuilder({
    projectPath: path.resolve(__dirname),
    copyRoot: path.resolve(__dirname, './static')
})

async function main() {
    const result = await builder.build(['**', '!**/node_modules/**'], {
        path: '/'
    })
    console.log(result)
}


main()