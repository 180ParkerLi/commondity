/*
 * @Author: your name
 * @Date: 2022-01-02 16:11:15
 * @LastEditTime: 2022-02-11 19:30:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7
 * @FilePath: \commodity\vue.config.js
 */
module.exports = {
    // 打包时不生成map文件
    productionSourceMap: false,
    // 关闭eslint校验工具
    lintOnSave: false,
    // 代理跨域
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.98.123.211',
                // 重写路径
                // pathRewrite: { '^/api': '' },
            },
        },
    },
}