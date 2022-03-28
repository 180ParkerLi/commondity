import { reqCartList, reqDeleteCartById, reqUpdataCheckedById } from '@/api'
const state = {
    cartList: []
}
const mutations = {
    GETCSRTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code === 200) {
            commit('GETCSRTLIST', result.data)
        }
    },
    // 删除购物车中的某一个商品
    async deleteCartByskuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车某一产品的选中状态
    async updataCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdataCheckedById(skuId, isChecked)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除全部勾选的商品
    deleteAllCheckedCart({ dispatch, getters }) {
        // context: 小仓库，commit【提交mutations修改state】 getter【计算属性】 dispatch【派发action】  state【当前仓库数据】
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked === 1 ? dispatch('deleteCartByskuId', item.skuId) : '';
            //  将每一次返回的promise添加到数组当中
            promiseAll.push(promise)
        });
        // 只要全部的p1 p2 都成功，返回结果即为成功，如果有一个返回失败则为失败
        return Promise.all(promiseAll)
    },
    // 全部商品勾选状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach((item) => {
            let promise = dispatch('updataCheckedById', { skuId: item.skuId, isChecked })
            promiseAll.push(promise)
        })
        // 最终返回的结果
        return Promise.all(promiseAll)
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
}
export default {
    state,
    mutations,
    actions,
    getters
}