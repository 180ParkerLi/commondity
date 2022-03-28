// 先引入mockjs模块
import Mock from 'mockjs'
// 把JSON数据格式引入进来【为啥没暴露，也能引入？】
// webpack默认对外暴露的：图片、JSON数据格式
import banner from '@/mock/banner.json'
import floor from '@/mock/floor.json'

// mock数据,第一个参数：请求的地址   第二个：请求的数据
Mock.mock('/mock/banner', { code: 200, data: banner }) //模拟首页大的轮播图的数据
Mock.mock('/mock/floor', { code: 200, data: floor })
