/*
 * @Author: your name
 * @Date: 2022-02-11 16:31:15
 * @LastEditTime: 2022-02-11 17:11:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \commodity\src\plugins\calidate.js
 */
// vee-validate插件：表单验证的区域
import Vue from 'vue'
import VeeValidate from 'vee-validate'
// 引入中文 message（提示信息）
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

// 表单验证
VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
    },
    attributes: { // 给校验的 field 属性名映射中文名称
        phone: '手机号',
        code: '验证码',
        password: '密码',
        confirmPassword: '确认密码',
        agree: '协议'
    }
})

//自定义校验规则
//定义协议必须打勾同意
VeeValidate.Validator.extend('agree', {
    validate: value => {
    return value
    },
    getMessage: field => field + '必须同意'
    })