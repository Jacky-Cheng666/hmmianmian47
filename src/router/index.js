import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入nprogress(进度条)的包
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'  //导入nprogress的css样式。
// 导入首页登录方法
import { Info } from '@/api/index.js'
import { removeToken } from '../utils/token'
import { Message } from 'element-ui';
import store from '../store/vuex'
// 注册路由
Vue.use(VueRouter)
// 准备组件
import login from '../views/login/index.vue'
import index from '../views/index/index.vue'

// 导入子路由规则
import children from './childrenRoutes'

// 配置路由规则
const routes = [
    {
        path: "/login",
        component: login,
        meta: { title: "黑马面面在线题库-登录页面", roles: ["超级管理员", "管理员", "老师", "学生"] }
    },
    {
        path: "/index",
        component: index,
        meta: { title: "首页", roles: ["超级管理员", "管理员", "老师", "学生"] },
        // index首页的子路由配置规则
        children: children
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
                // 将服务器返回的信息存入vuex数据仓库里面
                // console.log(this);  //undefined
                // 判断登录的用户账号是否有效
                // 1，如果登陆的账号是启用状态，则存储账号信息到vuex，并放行。
                // console.log(res);
                if (res.data.data.status == 1) {
                    store.commit("getInfo", res.data.data)
                    if (from.path == "/login") {
                        Message.success("登录成功");
                    }
                    // 1.1就算账号是启用的，也不能放行。
                    // 还要判断：账号有没有权限访问将要去的页面。
                    // 通过to.meta.roles可以得到要去的页面哪些角色可以访问。
                    // console.log(to);
                    // includes方法：判断一个数组是否包含某个元素，包含true，不包含false; 
                    if (to.meta.roles.includes(res.data.data.role)) {
                        // 如果即将要去的页面里面的权限数组，包含当前账号的角色，准许放行。
                        next();
                    } else {
                        // 否则提示无访问权限。并且打回到之前的页面。
                        Message.error("您无此页面的访问权限")
                        NProgress.done()
                        // 打回到之前的页面。
                        next(from.path)
                    }

                } else {
                    // 2，账号如果被禁用，则提示错误信息，并且打回登录页面
                    Message.error("账号被禁用，请于管理员联系")
                    NProgress.done()
                    next("/login")

                }
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