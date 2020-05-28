export default [
  {
    name: "Vue.js",
    key: "vue",
    detect: [
      {
        path: "package.json",
        match:
          '"(dev)?(d|D)ependencies":\\s*{[^}]*"@vue\\/cli-service":\\s*".+?"[^}]*}',
      },
    ],
    plugin: "@cloudbase/framework-plugin-website",
    config: {
      buildCommand: {
        value: "npm run build",
        desc: "🔨 构建脚本",
      },
      outputPath: {
        value: "dist",
        desc: "📦 本地静态文件目录",
      },
    },
  },
  {
    name: "React.js",
    key: "react",
    detect: [
      {
        path: "package.json",
        match:
          '"(dev)?(d|D)ependencies":\\s*{[^}]*"react-scripts":\\s*".+?"[^}]*}',
      },
    ],
    plugin: "@cloudbase/framework-plugin-website",
    config: {
      buildCommand: {
        value: "npm run build",
        desc: "🔨 构建脚本",
      },
      outputPath: {
        value: "build",
        desc: "📦 本地静态文件目录",
      },
    },
  },
  {
    name: "Next.js",
    key: "nextjs",
    detect: [
      {
        path: "package.json",
        match: '"(dev)?(d|D)ependencies":\\s*{[^}]*"next":\\s*".+?"[^}]*}',
      },
    ],
    plugin: "@cloudbase/framework-plugin-website",
    config: {
      buildCommand: {
        value: "npm run build",
        desc: "🔨 构建脚本",
      },
      outputPath: {
        value: "build",
        desc: "📦 本地静态文件目录",
      },
    },
  },
  {
    name: "Nuxt.js",
    key: "nuxtjs",
    detect: [
      {
        path: "package.json",
        match: '"(dev)?(d|D)ependencies":\\s*{[^}]*"nuxt":\\s*".+?"[^}]*}',
      },
    ],
    plugin: "@cloudbase/framework-plugin-website",
    config: {
      buildCommand: {
        value: "npm run build",
        desc: "🔨 构建脚本",
      },
      outputPath: {
        value: "dist",
        desc: "📦 本地静态文件目录",
      },
    },
  },
  {
    name: "静态网站",
    key: "website",
    detect: [
      {
        path: "index.html",
        match: "html",
      },
    ],
    plugin: "@cloudbase/framework-plugin-website",
    config: {
      outputPath: {
        value: "./",
        desc: "📦 本地静态文件目录",
      },
    },
  },
  {
    name: "云函数",
    key: "function",
    detect: [
      {
        path: "functions",
        exists: true,
      },
      {
        path: "cloudfunctions",
        exists: true,
      },
      {
        path: "cloudbaserc.js",
        match: "functions",
      },
    ],
    plugin: "@cloudbase/framework-plugin-function",
    config: {
      functionRoot: {
        value: "`${data.projectConfig.functionRoot || 'functions'}`",
        desc: "📁 云函数根目录",
      },
    },
  },
];
