<template>
  <div class="swiper">
    <el-carousel :interval="4000" type="card" height="230px">
      <el-carousel-item v-for="(item,index) in banners" :key="new Date().getTime()+index">
        <img :src="item.imageUrl" alt="" class="img" @click="clickBan(item.encodeId)">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    banners:Array
  },
  methods: {
    //发送id
    clickBan(songId){
      this.$emit('clickBan',songId);
    }
  }
}
</script>

<style scoped>
.swiper .img{
  width: 100%;
  min-height: 200px;
  border-radius: 10px;
}
</style>
<style>
.swiper .el-carousel__item--card {
  width: 70%;
  left: -10%;
  border-radius: 10px;
}
.swiper .el-carousel__mask{
  background-color: rgba(0,0,0,0);
}
.swiper .el-carousel__button{
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: rgba(0,0,0,.3);
}
.swiper .el-carousel__indicator.is-active button{
  background-color: #FF7878;
}
.swiper .el-carousel__indicators--outside .el-carousel__indicator:hover button {
  opacity: 1;
  background-color: #FF7878;
}
</style>