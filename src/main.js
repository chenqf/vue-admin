import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import config from "@/config";
import DomPortal from "vue-dom-portal";
import importDirective from "@/directive";
import router from "./router";
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
//实心
import { fas } from "@fortawesome/free-solid-svg-icons";
//品牌
import { fab } from "@fortawesome/free-brands-svg-icons";

import "./libs/global_catch";
import "./registerServiceWorker";

// font-awesome 图标使用
library.add(fas);
library.add(fab);
// library.add(regular);
Vue.component("font-awesome-icon", FontAwesomeIcon);

//TODO 开发环境-引入mock
if (config.DEBUG) {
  require("@/mock");
  Vue.config.productionTip = false;
} else {
  Vue.config.productionTip = true;
}

Vue.use(ElementUI);
Vue.use(DomPortal);

/**
 * 注册指令
 */
importDirective(Vue);

//TODO 全局注册指令 复制、拖拽等

window.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
