import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    localSongList: [],//保存当前播放列表,实现上一首下一首
    currentIndex: -1,//当前歌曲的index
    mode: 'sequence',//播放模式
  },
  mutations: {
    addSong(state,payload){
      state.localSongList.push(payload)
      state.currentIndex = state.localSongList.length-1
    }
  },
  getters: {
    //当前播放歌曲
    playingSong(state,getters){
      return state.localSongList[state.currentIndex]
    }
  },
  actions: {
  },
  modules: {

  }
})

//当调用mutations里的方法的时候，都会进入这个方法，这里可以做一些自己的处理
store.subscribe((mutations, state) => {
})

export default store