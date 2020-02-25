// 这个文件里面放所有跟注册有关的接口
import axios from 'axios'

//1，接口1： 获取手机验证码
// 注意：要写export，因为封装的方法，最终都是要别的文件调用。既然调用就要用export暴露出去。
// 把接口需要的数据，当做data参数传进来
export function sendSMS(data) {
    // 把axios调用后的返回值返回出去了。
    // 那么调用者拿到这个返回值，就可以自己写.then，然后可以做一些相应的操作。
    return axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: 'post',
        data,  //对象结构，es6的简写形式
        // 发送请求，并且携带cookie
        withCredentials: true
    })
}

// 2，接口2：发送注册账号接口请求
export function register(data) {
    return axios({
        url: process.env.VUE_APP_URL + "/register",
        method: 'post',
        data,
        withCredentials: true
    })
}