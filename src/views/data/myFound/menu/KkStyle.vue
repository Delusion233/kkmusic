<template>
  <div class="kkStyle">
    <swiper :banners="banners" @clickBan="clickBan"/>
    <!-- <audio  controls :src="songUrl"></audio> -->
  </div>
</template>

<script>
import swiper from 'components/common/swiper/Swiper'

import { getSwiper,getSongUrl,getSongDetail } from 'network/base/found'
export default {
  components: {
    swiper
  },
  data () {
    return {
      banners:[],
      getSongId:''
    }
  },
  created () {
    this.getSwiper()
  },
  methods: {
    //获取banner内容
    getSwiper(){
      getSwiper().then(res=>{
        // console.log(res);
        this.banners = res.banners;
      })
    },
    clickBan(songId){
      this.getSongId = songId
      //发送id
      this.$bus.$emit('getSongId',this.getSongId);
    }
  }
}
</script>

<style>

</style>