import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'
import toast from 'components/common/toast/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.use(toast);//全局配置弹框信息

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
