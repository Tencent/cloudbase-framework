const path = require('path')
const fs = require('fs-extra')
const archiver = require('archiver');
const __launcher = fs.readFileSync(path.resolve(__dirname, './__launcher.js'), 'utf-8')
const nodeFileTrace = require('@zeit/node-file-trace');
const { Builder } = require('@cloudbase/framework-core')

module.exports = class NodeBuilder extends Builder {
    constructor() {
        super('node')
        this.dependencies = {
            'express': '^4.17.1',
            'serverless-http': '^2.3.2'
        }
    }
    async build(entry, options = {}) {
        const { targetDir, execDir } = this
        const entryFile = path.resolve(__dirname, entry)
        const functionName = this.generateFunctionName(entryFile)

        const packageJsonContent = await this.generatePackageJson({
            packageName: functionName
        })

        // 入口文件的相对路径（相对于项目根路径）
        const entryRelativePath = path.relative(execDir, path.resolve(__dirname, entryFile));

        await fs.ensureDir(targetDir)
        await fs.ensureDir(targetDir + '/api')
        await fs.writeFile(path.resolve(targetDir, './index.js'), __launcher.replace('/*entryPath*/', entryRelativePath))
        await fs.writeFile(path.resolve(targetDir, './package.json'), packageJsonContent)

        const { fileList } = await nodeFileTrace([entryFile], {
            ignore: ['node_modules/**']
        });

        for (const file of fileList) {
            await fs.copy(file, path.join(targetDir, './api', file))
        }

        await this.zipDir(targetDir, `${targetDir}.zip`)

        return {
            functions: [{
                name: functionName,
                options: {},
                source: `${targetDir}.zip`,
                entry: 'index.main'
            }],
            routes: [{
                path: options.path || '/',
                targetType: 'function',
                target: functionName
            }]
        }
    }

    async zipDir(src, dest) {
        return new Promise((resolve, reject) => {
            // create a file to stream archive data to.
            var output = fs.createWriteStream(dest);
            var archive = archiver('zip', {
                zlib: { level: 9 } // Sets the compression level.
            });
            output.on('close', resolve)
            archive.on('error', reject)
            archive.directory(src, false)
            archive.pipe(output)
            archive.finalize()
        })
    }

    async generatePackageJson({ packageName }) {
        let originalPackageJsonDependencies = {}
        if (await fs.exists('package.json')) {
            originalPackageJsonDependencies = JSON.parse(await fs.readFile('package.json', 'utf-8')).dependencies || {}
        }
        const json = {
            name: packageName,
            dependencies: {
                ...this.dependencies,
                ...originalPackageJsonDependencies
            }
        }
        return JSON.stringify(json, null, 4)
    }

    generateFunctionName(entryFile) {
        const entryRelativePath = path.relative(this.execDir, path.resolve(__dirname, entryFile));
        const name = entryRelativePath.replace(/\//g, '-').split('.')[0]
        return name
    }
}