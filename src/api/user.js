import request from '@/utils/request.js'
// 封装用户列表页面接口
export function userList(params) {
    return request({
        url: "/user/list",
        method: "get",
        params
    })
}