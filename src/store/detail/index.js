import { reqGoodsInfo, reqAddOrUpdataShopCart } from "@/api"
// 封装游客身份魔模块uuid ---> 生成一个随机字符串（不可能再变了
import { getUUID } from '@/utils/uuid_token';
const state = {
    goodInfo: {},
    // 游客零时身份
    uuid_token: getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    },
}
const actions = {
    //获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code === 200) {
            commit("GETGOODINFO", result.data);
        }
    },
    // 将产品添加到购物车中
    async getAddOrUpdataShopCart({ commit }, { skuId, skuNum }) {
        /*
            加入购物车返回的解构
            加入购物策划以后（发请求），前台将参数带给服务器
            服务器写入数据成功，并没有返回其他数据，只是返回code === 200，代表这次操作成功
            因为服务器没有返回其他的数据，因此这里不需要三连环存储数据
        */
        let result = await reqAddOrUpdataShopCart(skuId, skuNum)
        if (result.code === 200) {
            return 'ok'
        } else {
            // 加入失败
            return Promise.reject(new Error('faile'))
        }
    }
}
// 简化数据
const getters = {
    categoryView(state) {
        // 当前计算出来的属性值至少是一个空对象
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}