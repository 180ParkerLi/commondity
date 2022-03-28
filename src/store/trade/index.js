import { reqUserAddress, reqTrade } from '@/api/index'

const state = {
    address: [],
    orderInfo: {}
}
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    GETTRADE(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const actions = {
    // 获取用户地址
    async getUserAddress({ commit }) {
        let result = await reqUserAddress()
        if (result.code === 200) {
            commit('GETUSERADDRESS', result.data)
        }
    },
    // 获取交易页面信息
    async getTrade({ commit }) {
        let result = await reqTrade()
        if (result.code === 200) {
            commit('GETTRADE', result.data)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}