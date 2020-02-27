import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入nprogress(进度条)的包
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'  //导入nprogress的css样式。
// 注册路由
Vue.use(VueRouter)
// 准备组件
import login from '../views/login/index.vue'
import index from '../views/index/index.vue'
// 导入组件
import user from '../views/index/user/user.vue'
import subject from '../views/index/subject/subject.vue'
import question from '../views/index/question/question.vue'
import chart from '../views/index/chart/chart.vue'
import business from '../views/index/business/business.vue'
// 配置路由规则
const routes = [
    {
        path: "/login",
        component: login
    },
    {
        path: "/index",
        component: index,
        // index首页的子路由配置规则
        children: [
            {
                // 子路由一般不加/
                path: "user",
                component: user
            },
            {
                // 子路由一般不加/
                path: "subject",
                component: subject
            },
            {
                // 子路由一般不加/
                path: "question",
                component: question
            },
            {
                // 子路由一般不加/
                path: "chart",
                component: chart
            },
            {
                // 子路由一般不加/
                path: "business",
                component: business
            },
        ]
    },

]
// 创建路由对象。
const router = new VueRouter({
    routes
})
// 我们把导航守卫要写在创建router对象的后面。
// 这个回调函数是在即将跳转路由之前调用的
// to:到哪里去
// from:从哪里来
// next: 是一个函数，调用这个函数代表放行(让你跳转)
// next调用的时候不传任何参数，就代表原来要到哪里去，就放行到哪里。
router.beforeEach((to, from, next) => {
    // 开启进度条
    NProgress.start();
    next(); //放行
})
router.afterEach(() => {
    // 进来以后结束进度条
    NProgress.done();

})
export default router