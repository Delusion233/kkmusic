import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'
import toast from 'components/common/toast/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'

Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.use(toast);//全局配置弹框信息
// 配置项
Vue.use(VueLazyload, {//图片懒加载
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading: require('@/assets/image/main/loading.jpg'),
  attempt: 1
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
