/*
 * @Author: your name
 * @Date: 2022-01-02 15:37:42
 * @LastEditTime: 2022-02-11 16:34:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \commodity\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import { Button, MessageBox } from 'element-ui';
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 注册全局组件
// 第一个参数：组件的名字
// 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
// ElementUI注册组件的时候，改由一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from '@/router';
// 引入仓库
import store from '@/store';
// 引入mockServe.js --- mock数据
import '@/mock/mockServe';
// 引入swiper样式
import 'swiper/css/swiper.css'

// 统一接受api文件夹里面的全部的请求函数
// 统一引入
import * as API from '@/api/index'


Vue.config.productionTip = false

// 引入懒加载默认图片
import Loading from '@/assets/1.gif'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: Loading
})


// 引入自定义插件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins, {
  name: 'upper'
})

// 引入表单校验插件
import '@/plugins/validate'

new Vue({
  render: h => h(App),
  // 配置全局事件总线$bus
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由: 地下的写法是kv一致省略v【router小写的】
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库:组件实例的身上会多了一个属性 $store属性
  store
}).$mount('#app')
