<template>
  <div class="newSong">
    <div class="list left" v-if="newSongList.left.length>0">
      <div v-for="item in newSongList.left" :key="new Date().getTime()+item.id">
        <span>{{item.index}}</span>
        <div class="image">
          <img :src="item.picUrl" :alt="item.name" @click="sendSongId(item.id)">
          <i class="el-icon-caret-right"></i>
        </div>
        <div class="detail">
          <p class="name">{{item.name}}</p>
          <p class="ar">{{item.ar}}</p>
        </div>
      </div>
    </div>
    <div class="list right" v-if="newSongList.right.length>0">
      <div v-for="item in newSongList.right" :key="new Date().getTime()+item.id">
        <span>{{item.index}}</span>
        <div class="image">
          <img :src="item.picUrl" :alt="item.name" @click="sendSongId(item.id)">
          <i class="el-icon-caret-right"></i>
        </div>
        <div class="detail">
          <p class="name">{{item.name}}</p>
          <p class="ar">{{item.ar}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    newSongList:Object
  },
  methods: {
    sendSongId(songId){
      this.$bus.$emit('getSongId',songId);
    }
  }
}
</script>

<style scoped>
.newSong{
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.newSong .left{
  width: 49%;
}
.newSong .right{
  width: 49%;
}
.list>div{
  display: flex;
  margin-top: 10px;
}
.list>div:hover{
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
}
.detail .name{
  margin-top: 10px;
}
.detail .ar{
  margin-top: 5px;
  font-size: 14px;
  color: #666;
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