const path = require('path');

async function frameworkTest() {
  const frameworkCore = require('../../lib');
  const result = await frameworkCore.run({
    projectPath: path.join(__dirname, '../'),
    cloudbaseConfig: {
      secretId: '',
      secretKey: '',
      envId: '',
    },
    config: {
      app: 'test-app',
      plugins: {
        website: {
          use: path.join(__dirname, '../../../framework-plugin-wx-landing'),
          inputs: {
            outputPath: 'dist',
          },
        },
      },
    },
  });
}

frameworkTest()
  .then(console.log)
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
