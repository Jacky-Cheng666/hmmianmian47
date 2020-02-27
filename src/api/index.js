import axios from 'axios'
import { getToken } from '../utils/token'

// 克隆(create)一个axios对象出来，它的名字叫indexRequest
// 它有一些初始基因，就是设置了基地址，以及设置了请求头携带token。
// 所以以后，如果要是通过indexRequest这个对象去发请求，就会自动有基地址和token了
let indexRequest = axios.create({
    baseURL: process.env.VUE_APP_URL,
    // headers: {
    //     token: getToken()    //第一次启动项目还没有用户登录，所以这里获取到的token为Null。这里获取token项目会存在这个bug。
    // }
})

// 添加请求拦截器
// 以后只要是indexRequest发送的请求都会被拦截下来。
indexRequest.interceptors.request.use(function (config) {
    // (1)在发送请求之前做些什么
    // config参数就是被拦截下来的请求的配置。
    // 解决方案：只要在config里面headers加一个token，就代表你这次发的请求带有token了。
    // window.console.log(config)
    config.headers.token = getToken();//这句代码就是，每次首页里面的请求在发送后都会被拦截下来，自动加上一个token值。
    return config;
}, function (error) {
    //(2) 对请求错误做些什么
    return Promise.reject(error);
});

// 1，获取用户信息接口
export function Info() {
    return indexRequest({
        url: "/info",
        method: "get",

    })
}
// 2，登录接口
export function logout() {
    return indexRequest({
        url: "/logout",
        method: "get",

    })
}