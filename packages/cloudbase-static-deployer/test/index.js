const { StaticDeployer } = require('../')
const path = require('path')

const options = require('./my-options')

async function main() {
    const deployer = new StaticDeployer({
        secretId: options.secretId,
        secretKey: options.secretKey,
        envId: options.envId
    })

    const result = await deployer.deploy({
        localPath: path.resolve(__dirname, './static'),
        cloudPath: '/static'
    })

    console.log(result)
}

main()