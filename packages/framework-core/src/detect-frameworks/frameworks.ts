export default [
  {
    name: 'Vue.js',
    key: 'vue',
    detect: [
      {
        path: 'package.json',
        match:
          '"(dev)?(d|D)ependencies":\\s*{[^}]*"@vue\\/cli-service":\\s*".+?"[^}]*}',
      },
    ],
    plugin: '@cloudbase/framework-plugin-website',
    config: {
      buildCommand: {
        value: 'npm run build',
        desc: '🔨 构建脚本',
      },
      outputPath: {
        value: 'dist',
        desc: '📦 本地静态文件目录',
      },
    },
  },
  {
    name: 'React.js',
    key: 'react',
    detect: [
      {
        path: 'package.json',
        match:
          '"(dev)?(d|D)ependencies":\\s*{[^}]*"react-scripts":\\s*".+?"[^}]*}',
      },
    ],
    plugin: '@cloudbase/framework-plugin-website',
    config: {
      buildCommand: {
        value: 'npm run build',
        desc: '🔨 构建脚本',
      },
      outputPath: {
        value: 'build',
        desc: '📦 本地静态文件目录',
      },
    },
  },
  {
    name: 'Next.js',
    key: 'nextjs',
    detect: [
      {
        path: 'package.json',
        match: '"(dev)?(d|D)ependencies":\\s*{[^}]*"next":\\s*".+?"[^}]*}',
      },
    ],
    plugin: '@cloudbase/framework-plugin-website',
    config: {
      buildCommand: {
        value: 'npm run build',
        desc: '🔨 构建脚本',
      },
      outputPath: {
        value: 'build',
        desc: '📦 本地静态文件目录',
      },
    },
  },
  {
    name: 'VuePress',
    key: 'vuepress',
    detect: [
      {
        path: 'package.json',
        match: '"(dev)?(d|D)ependencies":\\s*{[^}]*"vuepress":\\s*".+?"[^}]*}',
      },
    ],
    plugin: '@cloudbase/framework-plugin-website',
    config: {
      buildCommand: {
        value: 'npm run build',
        desc: '🔨 构建脚本',
      },
      outputPath: {
        value: '.vuepress/dist',
        desc: '📦 本地静态文件目录',
      },
    },
  },
  {
    name: 'Pagic',
    key: 'pagic',
    detect: [
      {
        path: 'pagic.config.ts',
        exists: true,
      },
      {
        path: 'pagic.config.tsx',
        exists: true,
      },
    ],
    plugin: '@cloudbase/framework-plugin-website',
    config: {
      buildCommand: {
        value:
          'deno run --unstable --allow-read --allow-write --allow-net https://deno.land/x/pagic/mod.ts build',
        desc: '🔨 构建脚本',
      },
      outputPath: {
        value: 'dist',
        desc: '📦 本地静态文件目录',
      },
    },
  },
  {
    name: 'Nuxt.js SPA',
    key: 'nuxtjs-spa',
    detect: [
      {
        path: 'nuxt.config.js',
        match: 'spa',
      },
    ],
    plugin: '@cloudbase/framework-plugin-website',
    config: {
      buildCommand: {
        value: 'npm run build',
        desc: '🔨 构建脚本',
      },
      outputPath: {
        value: 'dist',
        desc: '📦 本地静态文件目录',
      },
    },
  },
  {
    name: 'Nuxt.js SSR',
    key: 'nuxtjs-ssr',
    detect: [
      {
        path: 'package.json',
        match: '"(dev)?(d|D)ependencies":\\s*{[^}]*"nuxt":\\s*".+?"[^}]*}',
      },
    ],
    plugin: '@cloudbase/framework-plugin-nuxt',
    config: {
      buildCommand: {
        value: 'npm run build',
        desc: '🔨 构建脚本',
      },
      path: {
        value: '/',
        desc: '🔌 云端访问路径',
      },
    },
  },
  {
    name: 'Koa',
    key: 'koa',
    detect: [
      {
        path: 'package.json',
        match: '"(dev)?(d|D)ependencies":\\s*{[^}]*"koa":\\s*".+?"[^}]*}',
      },
    ],
    plugin: '@cloudbase/framework-plugin-node',
    config: {
      name: {
        value: '`${data.baseName || \'koa-app\'}`',
        desc: '💡 服务名',
      },
      path: {
        value: '`/${data.baseName || \'koa-app\'}`',
        desc: '🔌 云端访问云接入路径',
      },
      entry: {
        value: 'app.js',
        desc: '🔌 Node 服务入口文件，需要导出 app 实例',
      },
    },
  },
  {
    name: '静态网站',
    key: 'website',
    detect: [
      {
        path: 'index.html',
        exists: true,
      },
    ],
    plugin: '@cloudbase/framework-plugin-website',
    config: {
      outputPath: {
        value: './',
        desc: '📦 本地静态文件目录',
      },
    },
  },
  {
    name: '云函数',
    key: 'function',
    detect: [
      {
        path: 'functions',
        exists: true,
      },
      {
        path: 'cloudfunctions',
        exists: true,
      },
      {
        path: 'cloudbaserc.js',
        match: 'functions',
      },
    ],
    plugin: '@cloudbase/framework-plugin-function',
    config: {
      functionRootPath: {
        value: '`${data.projectConfig.functionRoot || \'cloudfunctions\'}`',
        desc: '📁 云函数根目录',
      },
    },
  },
  {
    name: '云托管',
    key: 'container',
    detect: [
      {
        path: 'Dockerfile',
        exists: true,
      },
    ],
    plugin: '@cloudbase/framework-plugin-container',
    config: {
      serviceName: {
        value: '`${data.baseName || \'capp\'}`',
        desc: '💡 服务名',
      },
      servicePath: {
        value: '`/${data.baseName || \'capp\'}`',
        desc: '🔌 云端访问云接入路径',
      },
      containerPort: {
        value: 80,
        desc: '🔌 端口号',
      },
    },
  },
  {
    name: 'hexo',
    key: 'hexo',
    detect: [
      {
        path: 'package.json',
        match: '"(dev)?(d|D)ependencies":\\s*{[^}]*"hexo":\\s*".+?"[^}]*}',
      },
    ],
    plugin: '@cloudbase/framework-plugin-website',
    config: {
      buildCommand: {
        value: 'npx hexo generate',
        desc: '🔨 构建脚本',
      },
      outputPath: {
        value: './public',
        desc: '📦 本地静态文件目录',
      },
    },
  },
  {
    name: 'gatsby',
    key: 'gatsby',
    detect: [
      {
        path: 'package.json',
        match: '"(dev)?(d|D)ependencies":\\s*{[^}]*"gatsby":\\s*".+?"[^}]*}',
      },
    ],
    plugin: '@cloudbase/framework-plugin-website',
    config: {
      buildCommand: {
        value: 'npx gatsby build',
        desc: '🔨 构建脚本',
      },
      outputPath: {
        value: './public',
        desc: '📦 本地静态文件目录',
      },
    },
  },
  {
    name: '小程序',
    key: 'mp',
    detect: [
      {
        path: 'project.config.json',
        match: 'miniprogramRoot',
      },
      {
        path: 'project.config.json',
        match: 'appid',
      },
    ],
    plugin: '@cloudbase/framework-plugin-mp',
    config: {
      appid: {
        value: '',
        desc: '💡 小程序应用的 appid',
      },
      privateKeyPath: {
        value: './private.key',
        desc: '📦 小程序应用的部署私钥的本地路径',
      },
    },
  },
];
