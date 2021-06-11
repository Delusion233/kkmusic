<template>
  <div class="kkSongs">
    <div class="songListHead" @click="getSongList()">
      <div>
        <img :src="songListHead.coverImgUrl" alt="">
      </div>
      <div class="detail">
        <p class="title">精品歌单</p>
        <p class="name">{{songListHead.name}}</p>
        <p class="writer">{{songListHead.copywriter}}</p>
      </div>
    </div>
    <div class="tags">
      <span v-for="(item,index) in tags" :key="index"
      :class="{'chose':currentIndex===index}"
      @click="choseTags(index)"> {{item.name}} </span>
    </div>
    <songList :songList="songList" width="23%" @getSongListId="getSongListId" class="songList"/>
  </div>
</template>

<script>
import songList from 'components/common/songList/SongList'
import { getSongListCategory, getHighqualitySongList } from 'network/base/found'
export default {
  components: {
    songList
  },
  data () {
    return {
      tags:[],
      songListHead:[],
      songList:[],
      currentIndex:-1
    }
  },
  created () {
    this.getSongListCategory()
    this.getHighqualitySongList()
  },
  methods: {
    //歌单分类接口
    getSongListCategory(){
      getSongListCategory().then(res=>{
        // console.log(res.tags);
        res.tags.forEach(v => {
          let obj = {}
          obj.id = v.id
          obj.name = v.name
          this.tags.push(obj)
        });
      })
    },
    //歌单内容接口
    getHighqualitySongList(cat){
      getHighqualitySongList(cat).then(res=>{
        // console.log(res.playlists);
        this.songListHead = res.playlists[0]
        this.songList = res.playlists.filter((ele,ids)=>{
          return ids !== 0;
        })
      })
    },
    //接收歌单id
    getSongListId(playListId){
      // console.log(playListId);
      this.$router.push({
        path:'/playList',
        query:{
          id:playListId
        }
      })
    },
    //点击横幅接收id
    getSongList(){
      this.$router.push({
        path:'/playList',
        query:{
          id:this.songListHead.id
        }
      })
    },
    //点击分类切换歌单
    choseTags(index){
      this.currentIndex = index
      this.getHighqualitySongList(this.tags[index].name);
    }
  }
}
</script>

<style scoped>
.songListHead{
  display: flex;
  padding: 15px;
  background-color: rgba(0,0,0,.7);
  border-radius: 10px;
}
.songListHead:hover{
  cursor: pointer;
}
.songListHead img{
  width: 150px;
  height: auto;
  border-radius: 5px;
}
.detail{
  padding: 20px 10px;
}
.detail p:hover{
  cursor: pointer;
}
.detail .title{
  display: inline-block;
  padding: 5px 20px;
  width: auto;
  border: 2px solid #cccc00;
  color: #cccc00;
  border-radius: 20px;
}
.detail .name{
  font-size: 18px;
  color: #fff;
  margin: 10px 0;
}
.detail .writer{
  font-size: 14px;
  color: #ddd;
}
.tags{
  text-align: right;
  margin: 20px 0;
  font-size: 13px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
}
.tags span{
  padding: 2px 12px;
  text-align: center;
}
.chose{
  border-radius: 15px;
  background-color: #eee;
  color: #e50000;
}
</style>