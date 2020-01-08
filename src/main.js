import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import config from '@/config';
import DomPortal from 'vue-dom-portal'
import importDirective from '@/directive'
import router from './router'
import store from './store'
import './registerServiceWorker'


//TODO 开发环境-引入mock
if(config.DEBUG){
  require('@/mock') 
  Vue.config.productionTip = false
}else{
  Vue.config.productionTip = true
}


Vue.use(ElementUI);
Vue.use(DomPortal)


/**
 * 注册指令
 */
importDirective(Vue)


//TODO 全局注册指令 复制、拖拽等

window.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
