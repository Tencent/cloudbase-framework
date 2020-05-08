const path = require('path');
async function frameworkTest() {
  const frameworkCore = require('@cloudbase/framework-core');
  const result = await frameworkCore.run({
    projectPath: path.join(__dirname, '../'),
    cloudbaseConfig: {
      secretId: '',
      secretKey: '',
      envId: '',
    },
  });
}

frameworkTest().then(console.log);
