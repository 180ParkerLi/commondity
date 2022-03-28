/*
 * @Author: your name
 * @Date: 2022-01-04 16:22:10
 * @LastEditTime: 2022-02-11 14:59:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \commodity\src\router\index.js
 */
// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@/router/routes'
import store from '@/store'
// 使用插件
Vue.use(VueRouter);


// 先把VueRouter原型对象的push先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push | replace
// 第一个参数：原来的push方法，往哪里跳转(传递那些参数)
// 第二个参数：成功回调
// 第三个参数；失败回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call || apply区别：
        // 相同点：都可以篡改函数的上下文一次  
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
// 配置路由
let router = new VueRouter({
    // 配置路由
    // k v 一致省略v
    routes,
    // 滚动行为
    scrollBehavior(to, from, savePosition) {
        return { y: 0 } //代表滚动条在最上方
    }
})
// 全局守卫：前置守卫（在路由跳转至前进行判断）
router.beforeEach(async (to, from, next) => {
    // to；可以获取你要跳转到那个路由信息（去哪里）
    // from: 可以获取到你从哪个路由来的信息（从哪里来）
    // next：放行函数  next() --- 直接放行  | next('/login') --- 放行到指定的路由位置  | next(false)

    // 只有用户登录了才会了token
    let token = store.state.user.token
    // 用户信息
    let name = store.state.user.userInfo.name

    if (token) {
        // 登录了，还想去login
        if (to.path === '/login') {
            next({ path: '/home' })

        } else {
            // 有用户信息
            if (name) {
                next()
                // 没有用户信息，派发action 让仓库存储用户信息在跳转
            } else {
                //    获取用户信息成功
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token 失效 1. 清除token  2.重新登录
                    await store.dispatch('getLogOut')
                    next({ path: '/login' })
                }
            }
        }
        // 用户未登录
    } else {
        let toPath = to.path
        if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1) {
            // 把未登录时候想去的地方 保存到地址栏中 登录后再去
            next('/login?redirect=' + toPath)
        }
        next()
    }
})
export default router