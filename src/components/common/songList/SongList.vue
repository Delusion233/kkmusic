<template>
  <div class="songList" v-if="Object.keys(songList).length !== 0">
    <div class="songListItem" :style="'width:'+ width" 
    v-for="(item,index) in songList" 
    :key="new Date().getTime() + item.id"
    @mouseenter="hoverImg(index)"
    @mouseout="outImg()"
    @click="emitId(item.id)">
      <img :src="item.picUrl" alt="">
      <p>{{item.name}}</p>
      <img src="~assets/image/main/play.png" v-show="currentIndex===index" class="playImg" alt="">
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      currentIndex:-1
    }
  },
  props: {
    songList:Array,
    width:String
  },
  methods: {
    hoverImg(index){
      this.currentIndex = index
    },
    outImg(){
      this.currentIndex = -1;
    },
    emitId(songListId){
      this.$emit('getSongListId',songListId);
    }
  }
}
</script>

<style>
.songList{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.songListItem{
  text-align: left;
  position: relative;
  transition: transform .5s ease;
}
.songListItem:hover{
  cursor: pointer;
  transform: translateY(-2px);
}
.songListItem img{
  width: 100%;
  max-height: 165px;
  height: auto;
  border-radius: 5px;
}
.songListItem p{
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 10px 0 20px 0;
}
.songListItem p:hover{
  cursor: pointer;
}
.songListItem .playImg{
  position: absolute;
  bottom: 90px;
  right: 10px;
  width: 40px;
  height: 40px;
}
</style>