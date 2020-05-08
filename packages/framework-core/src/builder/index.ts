import { resolve } from 'path'
import fs from 'fs-extra'
interface BuilderOptions {
    type: 'node' | 'static'
    projectPath: string
}
export class Builder {
    protected distDir: string
    protected projectDir: string
    protected distDirName: string
    constructor(options: BuilderOptions) {
        const { type, projectPath } = options
        this.distDirName = `cloudbase-${type}-build-${new Date().getTime()}`
        this.projectDir = projectPath
        this.distDir = resolve(projectPath, this.distDirName)
    }

    async clean() {
        return fs.remove(this.distDir)
    }
}