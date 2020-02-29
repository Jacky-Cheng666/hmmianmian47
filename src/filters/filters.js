// 准备一个过滤器
// 参数1：过滤器的名字
// 参数2：过滤器的具体实现
import Vue from 'vue'
import moment from 'moment'
Vue.filter("formatTime", val => {
    // value是一个日期，我要处理成一个年月日的格式。YYYY-MM-DD
    // 一般要处理日期这种类型的字符串，一般会用到moment库。
    return moment(val).format("YYYY-MM-DD")
})