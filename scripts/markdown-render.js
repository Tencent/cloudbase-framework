const spawnPromise = require('./spawn');
const path = require('path');
const { readFileSync } = require('fs');

const config = {
  usercases: {
    async get() {
      const data = JSON.parse(
        readFileSync(path.join(__dirname, '../community/usercases/index.json'))
      );
      const renderCell = (item) => {
        return `<td align="center"><a target="_blank" href="${
          item.repo
        }"><img width="100px;" src="${
          item.logo ||
          'https://main.qcloudimg.com/raw/d56f7877c8fec451718459a3aa8bbc9a.png'
        }"><br /><sub><b>${
          item.name
        }</b></sub></a><br/><a target="_blank" href="${
          item.repo
        }">💻</a> <a target="_blank" href="${item.link}">🌐</a></td>`;
      };
      const maxWidth = 5;
      return `
${renderTable(data, renderCell, maxWidth)}

[持续征集优秀应用案例](https://github.com/TencentCloudBase/cloudbase-framework/issues/91)
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
      content += `${item ? renderCell(item) : '' || ''}`;
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

  console.log(defines);
  await spawnPromise(`npx mdmod README.md ${defines}`, {
    cwd: path.join(__dirname, '../'),
  });
  await spawnPromise(`npx mdmod packages/framework-core/README.md ${defines}`, {
    cwd: path.join(__dirname, '../'),
  });
})();
