import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
// 导入饿了么相关组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入仓库对象
import store from './store/vuex'
// 导入全局样式
import "./style/base.css"

// 导入全局过滤器
// 这个文件只需要保证能够执行里面的代码就行了，所以只是简单导入。
import "@/filters/filters.js"
// 导入路由
import router from './router/index'
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

