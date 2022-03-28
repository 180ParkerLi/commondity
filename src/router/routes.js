// 引入路由组件
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

// 引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

/**
 * 路由懒加载
 * 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
 * 如果我们能把不同路由对应的组件分割成不同的代码块，
 * 然后当路由被访问的时候才加载对应组件，这样就会更加高效。
 */

export default [
    {
        path: '/home',
        // 路由懒加载
        component: () => import('@/pages/Home'),
        meta: { showFooter: true }
    },
    {
        path: '/search/:keyword?',
        component: () => import('@/pages/Search'),
        meta: { showFooter: true },
        name: 'search',
        // 路由组件能不能传递props数据
        // 布尔值写法:只能传递params参数
        // props: true
        // 对象写法:额外的给路由组件传递一些props
        // props: {a: 1, b: 2}
        // 函数写法(常用): 可以传递params\query参数,通多props传递给路由组件
        props: ($route) => {
            return {
                keyword: $route.params.keyword,
                // k: $route.query.k
            }
        }
    },
    {
        name: 'detail',
        path: '/detail/:skuId',
        component: Detail,
        meta: { isShow: true }
    },
    {
        name: 'trade',
        path: '/trade',
        component: Trade,
        meta: { isShow: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面：必须是从购物车去
            if (from.path === '/shopcart') {
                next()
            } else {
                // 其他的路由则是停留在当前路由组件
                next(false)
            }
        },
    },
    {
        name: 'pay',
        path: '/pay',
        component: Pay,
        meta: { isShow: true },
        beforeEnter: (to, from, next) => {
            if (from.path === '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: PaySuccess,
        meta: { isShow: true }
    },
    {
        name: 'center',
        path: '/center',
        component: Center,
        meta: { isShow: true },
        // 二级路由
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            // 重定向
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: { isShow: true }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,
        meta: { isShow: true }
    },
    {
        path: '/login',
        component: Login,
        meta: { showFooter: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { showFooter: false }
    },
    // 重定向:在项目跑起来的时候，访问/，立马让它定向到首页
    {
        path: '*',
        redirect: '/home'
    },
]