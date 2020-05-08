const fs = require('fs-extra')
const path = require('path')
const { Builder } = require('@cloudbase/framework-core')
module.exports = class StaticBuilder extends Builder {
    constructor() {
        super('static')
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