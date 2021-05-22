<template>
  <div id="app" onselectstart="return false">
    <Home/>
  </div>
</template>

<script>
import Home from './views/home/Home'
export default {
  name: 'App',
  components: {
    Home
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
