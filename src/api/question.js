import request from '@/utils/request.js'
// 1，获取题目列表接口
export function questionList(params) {
    return request({
        url: "/question/list",
        method: "get",
        params
    })
}

// 2，发布题目接口
export function questionAdd(data) {
    return request({
        url: "/question/add",
        method: "post",
        data
    })
}

// 3，获取题目信息
export function questionInfo(data) {
    return request({
        url: "/question/one",
        method: "post",
        data
    })
}

// 4，设置题目状态
export function questionStatus(data) {
    return request({
        url: "/question/status",
        method: "post",
        data
    })
}
// 5，删除题目状态
export function questionRemove(data) {
    return request({
        url: "/question/remove",
        method: "post",
        data
    })
}

// 5，编辑题目接口
export function questionEdit(data) {
    return request({
        url: "/question/edit",
        method: "post",
        data
    })
}