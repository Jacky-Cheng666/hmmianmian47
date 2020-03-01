import request from '@/utils/request.js'
// 1，封装用户列表页面接口
export function userList(params) {
    return request({
        url: "/user/list",
        method: "get",
        params
    })
}

// 2，创建用户接口
export function useAdd(data) {
    return request({
        url: "/user/add",
        method: "post",
        data
    })
}

// 3，修改用户状态接口
export function userStatus(data) {
    return request({
        url: "/user/status",
        method: "post",
        data
    })
}

// 4，删除用户接口
export function userDelete(data) {
    return request({
        url: "/user/remove",
        method: "post",
        data
    })
}

// 5，编辑用户接口
export function userEdit(data) {
    return request({
        url: "/user/edit",
        method: "post",
        data
    })
}

