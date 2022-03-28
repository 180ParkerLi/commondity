import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api';
// Home模块的小仓库
const state = {
    // state中的数据默认的初始值别瞎写 【初始值根据服务器的返回值进行初始化】
    categoryList: [],
    // 轮播图数据
    bannerList: [],
    // floor数据
    floorList: []
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};
const actions = {
    // 通过API里面的接口函数使用，向服务器发请求，获取服务器数据
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code === 200) {
            commit('CATEGORYLIST', result.data.slice(0, 16))
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code === 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    // 获取floor数据
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code === 200) {
            // 提交mutation
            commit('GETFLOORLIST', result.data)
        }
    }
};
// 计算属性
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}