import axios from 'axios'
import { getToken } from '../utils/token'
// 创建一个新的请求对象。
let subjectRequest = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})

// 请求拦截里面携带token
subjectRequest.interceptors.request.use(function (config) {
    // (1)在发送请求之前做些什么
    config.headers.token = getToken();//这句代码就是，每次首页里面的请求在发送后都会被拦截下来，自动加上一个token值。
    return config;
}, function (error) {
    //(2) 对请求错误做些什么
    return Promise.reject(error);
});

// 1，封装获取学科列表的接口
export function subjectList(params) {
    return subjectRequest({
        url: "/subject/list",
        method: "get",
        params
    })
}

// 2，设置学科状态接口
export function subjectStatus(data) {
    return subjectRequest({
        url: "/subject/status",
        method: "post",
        data
    })
}