import Vue from "vue";
import Vuex from 'vuex';
// 需要使用一次
Vue.use(Vuex);
// 引入小仓库
import home from './home/index'
import search from './search/index'
import detail from './detail/index'
import shopCart from './shopCart/index'
import user from './user/index'
import trade from './trade/index'
// 对外暴露Store类的一个实例
export default new Vuex.Store({
    // 实现vuex仓库模块式开发的存贮数据
    modules: {
        home,
        search,
        detail,
        shopCart,
        user,
        trade
    }
});