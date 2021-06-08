<template>
  <div id="app" onselectstart="return false">
    <Home v-if="isRouterAlive"/>
  </div>
</template>

<script>
import Home from './views/home/Home'
export default {
  name: 'App',
  components: {
    Home
  },
  provide(){
    return{
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    //重载页面===刷新页面(部分刷新,不会影响整个网页)
    reload(){
      this.isRouterAlive = false
      this.$nextTick(()=>{
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
@import '~@/assets/css/base.css';

#app{
  height: 100vh;
  position: relative;
}
#app::before{
  content:'';
  position:absolute;
  top:0;
  left:0;
  height: 100vh;
  width: 100%;
  z-index: -1;
  background: url('~assets/image/bg/bj.jpg') center center no-repeat;
  background-size: cover;
  filter: blur(5px);
}
</style>
