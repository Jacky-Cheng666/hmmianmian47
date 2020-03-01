import axios from 'axios'
import { getToken } from '@/utils/token.js'
let request = axios.create({
    baseURL: process.env.VUE_APP_URL,
    // 携带cookie
    withCredentials: true
})
// 请求拦截里面携带token
request.interceptors.request.use(function (config) {
    // (1)在发送请求之前做些什么
    config.headers.token = getToken();//这句代码就是，每次首页里面的请求在发送后都会被拦截下来，自动加上一个token值。
    return config;
}, function (error) {
    //(2) 对请求错误做些什么
    return Promise.reject(error);
});
export default request;