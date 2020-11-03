const spawnPromise = require('./spawn');
const path = require('path');
const { readFileSync } = require('fs');

const markdownFiles = [
  'README.md',
  'packages/framework-core/README.md',
  'doc/plugin.md',
];
const config = {
  // 渲染用户案例
  usercases: {
    async get() {
      const data = JSON.parse(
        readFileSync(path.join(__dirname, '../community/usercases/index.json'))
      );
      const renderCell = (item) => {
        return `<td align="center"><a target="_blank" href="${
          item.repo || item.link
        }"><img width="100px;" src="${
          item.logo ||
          'https://main.qcloudimg.com/raw/d56f7877c8fec451718459a3aa8bbc9a.png'
        }"><br /><sub><b>${
          item.name
        }</b></sub></a><br/><a target="_blank" href="${item.link}">🌐</a></td>`;
      };
      const maxWidth = 5;
      return `
${renderTable(data, renderCell, maxWidth)}

[持续征集优秀应用案例](https://github.com/TencentCloudBase/cloudbase-framework/issues/91)
`;
    },
  },
  // 渲染插件
  plugins: {
    async get() {
      const data = JSON.parse(
        readFileSync(path.join(__dirname, '../community/plugins/index.json'))
      );

      return `
| 插件链接 | 插件 | 最新版本 | 插件介绍 |
| -------- | ---- | -------- | -------- |
${data
  .map((item) => {
    return `| <a href="${item.link}"><img width="200" src="${item.cover}"></a>   | [${item.npmPackageName}](${item.link})     | [![Npm version](https://img.shields.io/npm/v/${item.npmPackageName})](https://www.npmjs.com/package/${item.npmPackageName})     | ${item.description}|`;
  })
  .join('\n')}
<!-- 新增/删除/修改插件信息，请修改 community/plugins/index.json，然后执行 npm run build:markdown-->
`;
    },
  },
};

function renderTable(data, renderCell, maxWidth = 10) {
  let rowsCount = Math.ceil(data.length / maxWidth);
  let content = '';
  for (let i = 0; i < rowsCount; i++) {
    content += `
  <tr>`;
    for (let j = 0; j < maxWidth; j++) {
      const n = i * maxWidth + j;
      const item = data[n];
      console.log(item);
      content += `${item ? renderCell(item) : ''}`;
    }
    content += `
</tr>
`;
  }
  return `<table>
${content}
</table>`;
}

(async () => {
  const defines = (
    await Promise.all(
      Object.entries(config).map(async ([define, defineConfig]) => {
        return `--define.${define} '${await defineConfig.get()}'`;
      })
    )
  ).join(' ');

  await Promise.all(
    markdownFiles.map((mdFile) =>
      spawnPromise(`npx mdmod ${mdFile} ${defines}`, {
        cwd: path.join(__dirname, '../'),
      })
    )
  );
})();
