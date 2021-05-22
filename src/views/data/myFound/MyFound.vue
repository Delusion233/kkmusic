<template>
  <div class="myFound">
    myFound
  </div>
</template>

<script>
import { getSwiper } from 'network/base/found'
export default {
  data () {
    return {
      
    }
  },
  created () {
    // this.getSwiper();
  },
  methods: {
    getSwiper(){
      getSwiper().then(res=>{
        console.log(res);
      })
    }
  }
}
</script>

<style>

</style>