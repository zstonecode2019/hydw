module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "衡阳电网停电辅助决策系统"
                return args
            })
    },
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ]
}