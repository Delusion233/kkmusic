import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {

  }
})

//当调用mutations里的方法的时候，都会进入这个方法，去存储我们的goods商品，这里可以做一些自己的处理
store.subscribe((mutations, state) => {
})

export default store