import { reqGetCode, reqRegister, reqUserLogin, reqUserInfo, reqLogOut } from '@/api/index'
import { setToken, getToken, removeToken } from '@/utils/token'
// 登录、注册模块
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    GETLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 清除本地数据
    CLEAR(state) {
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 获取验证码这个接口:把验证码返回，但是正常情况，后台把验证码发送到用户手机上【这里是为了省钱】
        let result = await reqGetCode(phone)
        if (result.code === 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async getRegister({ commit }, user) {
        let result = await reqRegister(user)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录
    async getLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        // 服务器下发token,用户唯一标识符（uuid),将来经常通过带token找服务器要用户信息进行展示
        console.log(result)
        if (result.code === 200) {
            commit('GETLOGIN', result.data.token)
            // 持久化储存token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code === 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async getLogOut({ commit }) {
        let result = await reqLogOut()
        if (result.code === 200) {
            // actions里面不能操作state
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
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