export default [
    {
        "name": "Vue.js",
        "key": "vue",
        "detect": [
            {
                "path": "package.json",
                "match": "\"(dev)?(d|D)ependencies\":\\s*{[^}]*\"@vue\\/cli-service\":\\s*\".+?\"[^}]*}"
            }
        ]
    },
    {
        "name": "React.js",
        "key": "react",
        "detect": [
            {
                "path": "package.json",
                "match": "\"(dev)?(d|D)ependencies\":\\s*{[^}]*\"react-scripts\":\\s*\".+?\"[^}]*}"
            }
        ]
    },
    {
        "name": "Next.js",
        "key": "nextjs",
        "detect": [
            {
                "path": "package.json",
                "match": "\"(dev)?(d|D)ependencies\":\\s*{[^}]*\"next\":\\s*\".+?\"[^}]*}"
            }
        ]
    },
    {
        "name": "Nuxt.js",
        "key": "nuxtjs",
        "detect": [
            {
                "path": "package.json",
                "match": "\"(dev)?(d|D)ependencies\":\\s*{[^}]*\"nuxt\":\\s*\".+?\"[^}]*}"
            }
        ]
    },
]