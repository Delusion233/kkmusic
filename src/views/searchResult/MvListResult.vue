<template>
  <div class="mvListResult">
    <video :src="mvUrl" autoplay  controls="controls" class="video">
      老掉牙浏览器
    </video>
  </div>
</template>

<script>
import { getMvUrl } from 'network/base/mv'
export default {
  data () {
    return {
      id:'',
      mvUrl:''
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getMvUrl();
  },
  methods: {
    getMvUrl(){
      getMvUrl(this.id).then(res=>{
        this.mvUrl = res.data.url
      })
    }
  }
}
</script>

<style scoped>
.mvListResult .video{
  width: 80%;
  height: auto;
}
</style>