const { NextBuilder } = require('../');
const path = require('path');
async function main() {
  const builder = new NextBuilder({
    projectPath: path.resolve(__dirname, './project')
  })

  const result = await builder.build(path.resolve(__dirname, './project'), {
    path: '/next',
    name: 'next-ssr',
  })
  console.log(result)
}

main()
