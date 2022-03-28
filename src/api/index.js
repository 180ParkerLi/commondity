/*
 * @Author: your name
 * @Date: 2022-01-06 20:26:23
 * @LastEditTime: 2022-02-11 15:11:01
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \commodity\src\api\index.js
 */
// 当前的这个模块：API进行统一管理

import requests from "./request";
import mockRequests from './mockAjax'

// 三级联动接口
// /api/product/getBaseCategoryList || GET || 无参数
// 发请求:axios发请求返回结果Promise对象
export const reqCategoryList = () =>
    requests({
        url: '/product/getBaseCategoryList',
        method: 'GET',
    })

// 获取banner（Home首页轮播图接口）
export const reqGetBannerList = () =>
    mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList = () =>
    mockRequests.get('/floor')

// 获取Search模块数据
// /api/list  || POST || 需要带参数
/*
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
// 当前的这个接口，给服务器传递参数params：至少是一个空对象
export const reqGetSearchInfo = (params) =>
    requests({
        url: 'list',
        method: 'post',
        data: params
    })
// 获取商品详情接口  /item/{ skuId }  get
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })
// 将商品添加到购物车，或者更新某一个商品的个数        /cart/addToCart/{ skuId }/{ skuNum }   POST
export const reqAddOrUpdataShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
// 获取购物车数据列表 /api/cart/cartList  get
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })
// 删除购物车数据  /cart/deleteCart/{skuId}   delete
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
// 切换商品选中状态   /cart/checkCart/{skuId}/{isChecked}  get
export const reqUpdataCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
// 获取验证码 /api/user/passport/sendCode/{phone} get 
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
// 用户注册   /api/user/passport/register post  
export const reqRegister = (data) => requests({ url: '/user/passport/register', data: data, method: 'post' })
// 用户登录 /api/user/passport/login  post
export const reqUserLogin = (data) => requests({ url: "/user/passport/login", data, method: 'post' })
// 过去用户信息【带着用户的token向服务器要用户的信息】 /user/passport/auth/getUserInfo  get
export const reqUserInfo = () => requests({ url: "/user/passport/auth/getUserInfo", method: 'get' })
// 退出登录  /user/passport/logout  get
export const reqLogOut = () => requests({ url: "/user/passport/logout", method: 'get' })
// 获取用户地址   /user/userAddress/auth/findUserAddressList   get
export const reqUserAddress = () => requests({ url: "/user/userAddress/auth/findUserAddressList", method: 'get' })
// 交易页面数据   /order/auth/trade  get
export const reqTrade = () => requests({ url: '/order/auth/trade', method: 'get' })
// 提交订单  /order/auth/submitOrder?tradeNo={tradeNo}  POST   
// 这里不用vuex  直接在组件中发请求
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
// 获取订单支付信息  /payment/weixin/createNative/{orderId}  get
export const reqPayOrder = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, orderId, method: 'get' })
// 获取支付订单状态 /payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
// 我的订单信息    /order/auth/{page}/{limit}   get
export const reqMyOrder = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
