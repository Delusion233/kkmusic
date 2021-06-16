<template>
  <div class="mvList">
    <div class="songListItem" :style="'width:'+ width" 
    v-for="(item,index) in mvList" 
    :key="new Date().getTime() + item.id"
    @mouseenter="hoverImg(index)"
    @mouseout="outImg()"
    @click="emitId(item.id)">
      <img :src="mvList.length > 3 ? item.picUrl:item.sPicUrl" alt="">
      <p>{{item.name}}</p>
      <img v-if="mvList.length===3" src="~assets/image/main/play.png" v-show="currentIndex===index" class="playImg" alt="">
      <i v-if="mvList.length>3" class="el-icon-caret-right"></i>
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
    mvList:Array,
    width:String
  },
  methods: {
    hoverImg(index){
      this.currentIndex = index
    },
    outImg(){
      this.currentIndex = -1;
    },
    emitId(mvListId){
      this.$emit('getMvListId',mvListId);
    }
  }
}
</script>

<style scoped>
.mvList{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.songListItem{
  text-align: left;
  position: relative;
}
.songListItem img:hover{
  cursor: pointer;
}
.songListItem img{
  width: 100%;
  height: auto;
  border-radius: 5px;
}
.songListItem p{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 10px 0 20px 0;
  word-break: break-word;
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
.songListItem>i{
  color: #fff;
  border: 1px solid #fff;
  border-radius: 50%;
  position: absolute;
  top: 8px;
  left: 10px;
  padding: 2px 2px 3px;
  font-size: 24px;
}
.playCount{
  position: absolute;
  top: 4px;
  right: 8px;
  font-size: 12px;
  color: #fff;
}
</style>