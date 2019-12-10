import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

import router from './router'
import store from './store'
import './registerServiceWorker'


//TODO 开发环境-引入mock
if(process.env.NODE_ENV !== 'online'){
  // require('mock')
}


Vue.use(ElementUI);
Vue.config.productionTip = false


//TODO 全局注册指令 复制、拖拽等

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
