import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang/index.js'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import enLocale from 'element-ui/lib/locale/lang/en'
import VueClipboard from 'vue-clipboard2'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import './assets/js/rem.js'
import {general_util} from "./mixins/mixin.js";
import 'animate.css'



import './assets/css/common.css'
import './assets/css/scroll-animate.css'
import './assets/css/reset-element-ui.css'
import './assets/css/reset-vxe-table.scss'
import './assets/css/reset-wallet-connect.css'



Vue.use(VueClipboard)
Vue.mixin(general_util);
Vue.use(ElementUI,{locale:enLocale});
Vue.use(VXETable)

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this//安装全局事件总线
  }
}).$mount('#app')
