import request from '@/utils/request.js'

// 封装对应的接口请求就可以了。
// 1，获取企业列表信息接口
export function businessList(params) {
    return request({
        url: "/enterprise/list",
        method: "get",
        params
    })
}

//2，企业添加接口
export function businessAdd(data) {
    return request({
        url: "/enterprise/add",
        method: "post",
        data
    })
}
// 3，修改企业状态接口
export function businessStatus(data) {
    return request({
        url: "/enterprise/status",
        method: "post",
        data: data
    })
}

// 4，企业删除接口
export function businessDel(data) {
    return request({
        url: "/enterprise/remove",
        method: "post",
        data
    })
}

// 5，企业编辑接口
export function businessEdit(data) {
    return request({
        url: "/enterprise/edit",
        method: "post",
        data
    })
}