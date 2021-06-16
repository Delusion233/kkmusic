<template>
  <div class="topSongList">
    <div v-for="item in topSongList" :key="new Date().getTime()+item.id" class="list">
      <span>{{item.index}}</span>
      <div class="image">
        <img :src="item.picUrl" :alt="item.name" @click="sendSongId(item.id)">
        <i class="el-icon-caret-right"></i>
      </div>
      <div class="detail">
        <p class="name" :title="item.name">{{item.name}}</p>
        <p class="ar" :title="item.ar">{{item.ar}}</p>
        <p class="derivation" :title="item.derivation">{{item.derivation}}</p>
        <p class="duration">{{item.dr}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    topSongList:Array
  },
  methods: {
    sendSongId(songId){
      this.$bus.$emit('getSongId',songId);
    }
  }
}
</script>

<style scoped>
.topSongList{

}
.list{
  display: flex;
  margin-top: 10px;
}
.list:hover{
  background-color: rgba(255, 120, 120, .5);
}
.list span{
  margin-top: 25px;
  padding: 0 5px;
}
.list img{
  width: 70px;
  border-radius: 5px;
  margin: 0 15px;
}
.list img:hover{
  cursor: pointer;
}
.detail{
  text-align: left;
  display: flex;
  align-items: center;
  width: calc(100% - 130px);
}
.detail p {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.detail .name{
  width: 38%;
}
.detail .ar{
  width: 20%;
  margin: 0 1%;
}
.detail .derivation{
  width: 29%;
  margin: 0 1% 0 0;
}
.detail .duration{
  width: 9%;
  text-align: right;
  padding-right: 1%;
}
.image{
  position: relative;
}
.image i{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 28px;
  padding: 2px;
  background-color: rgba(255,255,255,.8);
  color: #FF7878;
  border-radius: 50%;
  margin-left: -15px;
}
.image i:hover{
  cursor: pointer;
}
</style>