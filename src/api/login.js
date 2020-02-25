import axios from 'axios'
// 暴露一个登录的方法出来
export function login(data) {
    return axios({
        url: process.env.VUE_APP_URL + "/login",
        method: 'post',
        data,
        withCredentials: true
    })
}