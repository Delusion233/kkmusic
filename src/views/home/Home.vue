<template>
  <div class="home">
    <Header/>
    <div class="container">
      <Aside/>
      <Main/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from 'views/header/Header'
import Aside from 'views/aside/Aside'
import Main from 'views/main/Main'
import Footer from 'views/footer/Footer'
export default {
  name:'Home',
  components: {
    Header,
    Aside,
    Main,
    Footer
  }
}
</script>

<style scoped>
.home{
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 0 20px rgb(0 0 0 / 20%);
}
.container{
  width: 100%;
  height: 600px;
}
</style>