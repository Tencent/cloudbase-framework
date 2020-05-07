const fs = require('fs-extra')
const path = require('path')
module.exports = class StaticBuilder {
    constructor() {
        this.targetDir = `cloudbase-static-build-${new Date().getTime()}`
        this.execDir = process.cwd()
    }
    async build(entry, options = {}) {
        await fs.copy(entry, path.resolve(this.execDir, this.targetDir))
        return {
            static: [
                {
                    src: this.targetDir,
                    cloudPath: options.path || '/'
                }
            ],
            routes: [{
                path: options.path || '/',
                targetType: 'static'
            }]
        }
    }
}