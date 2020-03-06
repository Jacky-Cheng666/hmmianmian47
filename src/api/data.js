import request from '@/utils/request.js'
// 1，获取顶部数据接口
export function getTop() {
    return request({
        url: "/data/title",
        method: "post"
    })
}

// 2，企业题目数据统计接口
export function statistics() {
    return request({
        url: "/data/statistics",
        method: "post"
    })
}