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
];
