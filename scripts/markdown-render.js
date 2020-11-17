/**
 *
 * Copyright 2020 Tencent
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const spawnPromise = require('./spawn');
const path = require('path');
const { readFileSync } = require('fs');

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
      const maxWidth = 5;
      return `
${renderTable(data, renderCell, maxWidth)}

[持续征集优秀应用案例](https://github.com/TencentCloudBase/cloudbase-framework/issues/91)
`;
    },
  },
  apps: {
    async get() {
      const data = JSON.parse(
        readFileSync(path.join(__dirname, '../community/apps/index.json'))
      )
        .filter((item) => {
          return item.tags.includes('8e5be7055f97c12402609c0f7cd02362');
        })
        .slice(0, 14);

      const renderCell = (item) =>
        `<td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="${
          item.link + '/tree/master/' + item.workdir
        }"><img width="80px;" src="${
          getBucketUrl(item.icon) ||
          'https://main.qcloudimg.com/raw/d56f7877c8fec451718459a3aa8bbc9a.png'
        }">
        <br />
        <b>${item.title}</b></a><br/>
        <p style="min-height: 60px;">${item.introduction || ''} ${
          item.resource ? '使用' + item.resource + '云资源' : ''
        }</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=${
          item.link
        }&workDir=${
          item.workdir
        }" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="${
          item.link + '/tree/master/' + item.workdir
        }">
        <img src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg">
        </a>
        </td>`;
      const maxWidth = 2;
      return `
${renderTable(data, renderCell, maxWidth)}

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

function getBucketUrl(url) {
  if (!url.startsWith('cloud://')) {
    return url;
  }

  const re = /cloud:\/\/.*?\.(.*?)\/(.*)/;
  const result = re.exec(url);
  return `https://${result[1]}.tcb.qcloud.la/${result[2]}`;
}
