// 定义一个常量(常量的名字一般都是大写)
const TOKENKEY = "mmtoken";
// 1，获取token，要记得return
export function getToken() {
    return window.localStorage.getItem(TOKENKEY)
}

// 2，设置token，保存token，他有一个参数来接收token值
export function setToken(token) {
    window.localStorage.setItem(TOKENKEY, token)
}

// 3，删除token
export function removeToken() {
    window.localStorage.removeItem(TOKENKEY)
}