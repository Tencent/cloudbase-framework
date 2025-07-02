/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */

const spawnPromise = require('./spawn');
const path = require('path');
const { readFileSync } = require('fs');
const https = require('https');

const markdownFiles = [
  'README.md',
  'packages/framework-core/README.md',
  'doc/plugins/index.md',
  'doc/index.md',
];
const config = {
  // 渲染用户案例
  usercases: {
    async get() {
      const data = JSON.parse(
        readFileSync(path.join(__dirname, '../community/usercases/index.json'))
      );
      const renderCell = (item) =>
        `<td align="center"><a target="_blank" href="${
          item.repo || item.link
        }"><img width="100px;" src="${
          item.logo ||
          'https://main.qcloudimg.com/raw/d56f7877c8fec451718459a3aa8bbc9a.png'
        }"><br /><sub><b>${
          item.name
        }</b></sub></a><br/><a target="_blank" href="${item.link}">🌐</a></td>`;
      const maxWidth = 7;
      return `
${renderTable(data, renderCell, maxWidth)}

[持续征集优秀应用案例](https://github.com/Tencent/cloudbase-framework/issues/91)
`;
    },
  },
  apps: {
    async get() {
      const res = await fetch(
        'https://qcloud-tcb-console.service.tcloudbase.com/api/v1.0/tcb-app-template?limit=40'
      );

      const data = res.data.slice(0, 14);

      const renderCell = (item) => `<td style="vertical-align: top;">
              <a target="_blank" style="min-height:100px; display:block;" href="${`${item.link}/tree/master/${item.workdir}`}"><img width="80px;" src="${
        item.icon ||
        '//main.qcloudimg.com/raw/d56f7877c8fec451718459a3aa8bbc9a.png'
      }">
              <br />
              <b>${
                item.title
              } <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
              <p style="min-height: 60px;">${item.introduction || ''} ${
        item.resource ? `，使用${item.resource}云资源` : ''
      }</p>
              <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=${
                item.link
              }&workDir=${
        item.workdir
      }" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>
              <a target="_blank" href="${`${item.link}/tree/master/${item.workdir}`}">
              </a>
              </td>`;
      const maxWidth = 2;
      return `${renderTable(data, renderCell, maxWidth)}

点击进入[应用中心](https://cloudbase.net/marketplace.html)查看更多应用
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
  .map(
    (item) =>
      `| <a href="${item.link}"><img width="200" src="${item.cover}"></a>  ` +
      `| [${item.npmPackageName}](${item.link}) ` +
      `|[![Npm version](https://img.shields.io/npm/v/${item.npmPackageName})]` +
      `(https://www.npmjs.com/package/${item.npmPackageName})` +
      ` | ${item.description}|`
  )
  .join('\n')}
<!-- 新增/删除/修改插件信息，请修改 community/plugins/index.json，然后执行 npm run build:markdown-->
`;
    },
  },
};

function renderTable(data, renderCell, maxWidth = 10) {
  const rowsCount = Math.ceil(data.length / maxWidth);
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
      Object.entries(config).map(
        async ([define, defineConfig]) =>
          `--define.${define} '${await defineConfig.get()}'`
      )
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

async function fetch(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let body = '';

        res.on('data', (chunk) => {
          body += chunk;
        });

        res.on('end', () => {
          try {
            const json = JSON.parse(body);
            resolve(json);
          } catch (error) {
            reject(error);
          }
        });
      })
      .on('error', reject);
  });
}
