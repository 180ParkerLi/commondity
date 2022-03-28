/*
 * @Author: your name
 * @Date: 2022-02-11 16:06:55
 * @LastEditTime: 2022-02-11 16:21:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \commodity\src\plugins\myPlugins.js
 */
// vue的插件一定是暴露一个对象
let myPlugins = {}

myPlugins.install = function (Vue,options) {
    // Vue.prototype.$bus:任何组件都可以使用
    // Vue.directive
    // Vue.component
    // Vue.filter......
    Vue.directive(options.name,(element,params)=>{
        // 变成大写
        element.innerHTML = params.value.toUpperCase()
    })
}

export default myPlugins