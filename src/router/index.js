import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入nprogress(进度条)的包
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'  //导入nprogress的css样式。
// 导入首页登录方法
import { Info } from '@/api/index.js'
import { removeToken } from '../utils/token'
import { Message } from 'element-ui';
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
        component: login,
        meta: { title: "黑马面面在线题库-登录页面" }
    },
    {
        path: "/index",
        component: index,
        meta: { title: "首页" },
        // index首页的子路由配置规则
        children: [
            {
                // 子路由一般不加/
                path: "user",
                component: user,
                meta: { title: "用户列表" }
            },
            {
                // 子路由一般不加/
                path: "subject",
                component: subject,
                meta: { title: "学科列表" }
            },
            {
                // 子路由一般不加/
                path: "question",
                component: question,
                meta: { title: "题库列表" }
            },
            {
                // 子路由一般不加/
                path: "chart",
                component: chart,
                meta: { title: "数据概览" }
            },
            {
                // 子路由一般不加/
                path: "business",
                component: business,
                meta: { title: "企业列表" }
            },
        ]
    },
    {
        path: "/",
        redirect: "/login"   //redirect重定向
    },

]
// 创建路由对象。
const router = new VueRouter({
    routes
})
// 路由白名单数组，不需要做权限验证。
let whiteUrl = ["/login", "/register"];
// 我们把导航守卫要写在创建router对象的后面。
// 1，beforeEach这个回调函数是在即将跳转路由之前执行的
// to:到哪里去
// from:从哪里来
// next: 是一个函数，调用这个函数代表放行(让你跳转)
// next调用的时候不传任何参数，就代表原来要到哪里去，就放行到哪里。
// 路由白名单：里面存放了一些不需要做权限验证的路径，遇到白名单里面的路径直接跳转(放行)。
router.beforeEach((to, from, next) => {
    // 开启进度条
    NProgress.start();
    // 可以直接放行的页面，在真实项目中可能有多个
    // 注册，广告页面，给用户看的新闻页面，给普通用户展示的产品页面。
    // if (to.path == "/login") {
    // 如果白名单里面包含了要去访问的名单，直接放行。
    if (whiteUrl.includes(to.path)) {
        next(); //放行
    } else {
        // 要判断token是真还是假
        Info().then(res => {
            if (res.data.code == 200) {
                // 代表token是真的，就放行。
                next();//放行
            } else {//代表token有问题，可能是伪造的
                // 1，给出提示。注意：在路由的js文件里面，this不是vue实例，所以不能识别this.$message。
                Message.error("未登录，请先登录")
                // 2，删除本地token
                removeToken();
                // 手动在这里完成进度条
                NProgress.done()
                // 3，打回登录页
                next("/login")

            }
        })
    }


})
// 2，afterEach这个回调函数是在跳转路由之后执行的
router.afterEach(to => {
    // 进来以后结束进度条
    NProgress.done();
    // 取出当前要去的页面的标签，设置给网页title
    document.title = to.meta.title;

})
export default router