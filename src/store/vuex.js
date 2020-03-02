// 导入vuex相关文件
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        username: "",
        avatar: "",
        role: ""
    },
    mutations: {
        getInfo(state, obj) {
            state.username = obj.username;
            state.avatar = process.env.VUE_APP_URL + "/" + obj.avatar;
            state.role = obj.role;
        }
    }
})
export default store