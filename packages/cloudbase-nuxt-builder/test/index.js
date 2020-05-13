const { NuxtBuilder } = require('../')
const path = require('path')
async function main() {
    const builder = new NuxtBuilder({
        projectPath: path.resolve(__dirname, './project')
    })

    const result = await builder.build(path.resolve(__dirname, './project'), {
        path: '/nuxt'
    })
    console.log(result)
}

main()