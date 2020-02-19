import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入全局样式
import "./style/base.css"

// 导入路由
import router from './router/index'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
