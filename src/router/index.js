import Vue from 'vue'
import VueRouter from 'vue-router'
// 注册路由
Vue.use(VueRouter)
// 准备组件
import login from '../views/login/index.vue'
// 配置路由规则
const routes = [
    {
        path: "/login",
        component: login
    }
]
const router = new VueRouter({
    routes
})
export default router