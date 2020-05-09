import { Deployer } from '@cloudbase/framework-core'

interface StaticDeployerOptions {
    secretId: string
    secretKey: string
    envId: string
}

interface StaticDeployerDeployOptions {
    localPath: string
    cloudPath: string
    ignore: string | string[]
}

export class StaticDeployer extends Deployer {
    constructor(options: StaticDeployerOptions) {
        super(options)
    }

    async deploy(options: StaticDeployerDeployOptions) {
        const { localPath, cloudPath, ignore } = options
        this.app.hosting.uploadFiles({
            localPath,
            cloudPath,
            ignore
        })
    }
}