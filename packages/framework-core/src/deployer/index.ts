import CloudBase from '@cloudbase/manager-node'

interface DeployerOptions {
    secretId: string
    secretKey: string
    envId: string
}

export class Deployer {
    protected app: CloudBase
    constructor(options: DeployerOptions) {
        this.app = CloudBase.init(options)
    }
}