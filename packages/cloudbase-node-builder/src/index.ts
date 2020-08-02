import path from "path";
import fse from "fs-extra";
import archiver from "archiver";
import { Builder } from "@cloudbase/framework-core";

const __launcher = fse.readFileSync(
  path.resolve(__dirname, "../asset/__launcher.js"),
  "utf-8"
);

interface NodeBuilderBuildOptions {
  /**
   * 云接入路径
   */
  path: string;
  name: string;
  wrapExpress?: boolean;
}

interface NodeBuilderOptions {
  /**
   * 项目根目录的绝对路径
   */
  projectPath: string;
}

export class NodeBuilder extends Builder {
  private dependencies: Object;
  constructor(options: NodeBuilderOptions) {
    super({
      type: "node",
      ...options,
    });
    this.dependencies = {
      express: "^4.17.1",
      "serverless-http": "^2.3.2",
    };
  }
  async build(entry: string, options?: NodeBuilderBuildOptions) {
    const { distDir, projectDir, distDirName } = this;
    const entryFile = path.resolve(projectDir, entry);
    // const functionName = options?.name || "nodeapp";
    const {
      name: functionName = 'nodeapp',
      wrapExpress = false,
    } = options || {};
    const appDir = path.join(distDir, functionName);

    const packageJson = await this.generatePackageJson(functionName, entryFile);

    // 入口文件的相对路径（相对于项目根路径）
    const entryRelativePath = path.relative(
      projectDir,
      path.resolve(projectDir, entryFile)
    );

    fse.ensureDirSync(appDir);

    await fse.writeFile(
      path.resolve(appDir, "./tcbindex.js"),
      __launcher.replace("/*entryPath*/", entryRelativePath)
        .replace(/\/\/#wrapExpress\s/g, wrapExpress ? '' : '// ')
    );

    await fse.copy(path.resolve(projectDir), path.join(appDir));
    await fse.writeJSON(path.resolve(appDir, "./package.json"), packageJson);

    return {
      functions: [
        {
          name: functionName,
          options: {},
          source: distDir,
          entry: "tcbindex.main",
        },
      ],
      routes: [
        {
          path: options ? options.path || "/" : "/",
          targetType: "function",
          target: functionName,
        },
      ],
    };
  }

  async zipDir(src: string, dest: string) {
    return new Promise((resolve, reject) => {
      // create a file to stream archive data to.
      var output = fse.createWriteStream(dest);
      var archive = archiver("zip", {
        zlib: { level: 9 }, // Sets the compression level.
      });
      output.on("close", resolve);
      archive.on("error", reject);
      archive.directory(src, false);
      archive.pipe(output);
      archive.finalize();
    });
  }

  async generatePackageJson(packageName: string, entryFile: string) {
    const { projectDir } = this;
    let originalPackageJsonDependencies = {};

    // 拿到入口的目录路径
    let targetRoot = await fse
      .stat(entryFile)
      .then((state) =>
        state.isDirectory() ? path.resolve(entryFile) : path.dirname(entryFile)
      );

    // 最顶层的目录，查到这里就不要再找了
    let topDir =
      targetRoot.slice(0, projectDir.length) === projectDir ? projectDir : "/";

    while (targetRoot) {
      const targetPkgJsonPath = path.resolve(targetRoot, "package.json");
      if (await fse.pathExists(targetPkgJsonPath)) {
        // 找到目标 package.json，读取，结束循环
        originalPackageJsonDependencies = (
          await fse.readJSON(targetPkgJsonPath)
        ).dependencies;
        break;
      }
      if (targetRoot === topDir) {
        // 已经到最顶层
        if ("/" === topDir) {
          // 但是没有经过 projectDir
          // 再经历下 projectDir 目录
          targetRoot = topDir = projectDir;
          continue;
        }
        // 这里连 projectDir 都跑过了，跳出
        break;
      }
      // 向上走
      targetRoot = path.dirname(targetRoot);
    }

    return {
      name: packageName,
      dependencies: {
        ...this.dependencies,
        ...originalPackageJsonDependencies,
      },
    };
  }
}
