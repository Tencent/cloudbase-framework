import frameworksInfo from './frameworks'
import fs from 'fs'
import { resolve } from 'path'
export async function detect(projectRootPath: string) {
    for (const framework of frameworksInfo) {
        for(const { path, match } of framework.detect) {
            const content = await fs.promises.readFile(resolve(projectRootPath, path), 'utf-8')
            const result = content.match(new RegExp(match))
            if (result) {
                return framework.key
            }
        }
    }
}