// 存储toekn
export const setToken = (token) => {
    localStorage.setItem('TOKEN', token)
}
// 获取toekn
export const getToken = () => {
    return localStorage.getItem('TOKEN')
}
// 清除本地存储的token
export const removeToken =()=>{
    localStorage.removeItem("TOKEN")
}