import Vue from 'vue'
import App from './App.vue'
import router from '@/routes/index';
import store from './store';

Vue.config.productionTip = false

// 부트스트랩
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')