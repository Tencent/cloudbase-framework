export class Builder {
    private targetDir: string
    private execDir: string
    constructor(type: string) {
        this.targetDir = `cloudbase-${type}-build-${new Date().getTime()}`
        this.execDir = process.cwd()
    }
}