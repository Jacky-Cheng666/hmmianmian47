import request from '@/utils/request.js'
// 1，封装获取学科列表的接口
export function subjectList(params) {
    return request({
        url: "/subject/list",
        method: "get",
        params
    })
}

// 2，设置学科状态接口
export function subjectStatus(data) {
    return request({
        url: "/subject/status",
        method: "post",
        data
    })
}

// 3，新增学科的接口
export function subjectAdd(data) {
    return request({
        url: "/subject/add",
        method: "post",
        data
    })
}

// 4，编辑学科接口
export function subjectEdit(data) {
    return request({
        url: "/subject/edit",
        method: "post",
        data
    })
}

// 5，删除学科接口
export function subjectDelete(data) {
    return request({
        url: "/subject/remove",
        method: "post",
        data
    })
}