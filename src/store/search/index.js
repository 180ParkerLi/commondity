// Search模块的小仓库
import { reqGetSearchInfo } from '@/api'
const state = {
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};
const actions = {
    // 获取数据
    async getSearchList({ commit }, params = {}) {
        // params参数:是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code === 200) {
            commit('GETSEARCHLIST',result.data)
        }
    }
};
// 计算属性，在项目当中，为了简化仓库数据而生
const getters = {
    // 当前形参state，是当前仓库中的state，并非大仓库中的state
    goodsList (state) {
        return state.searchList.goodsList||[]
    },
    trademarkList (state) {
        return state.searchList.trademarkList
    },
    attrsList (state) {
        return state.searchList.attrsList
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}