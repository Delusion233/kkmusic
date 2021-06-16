<template>
  <div class="kkStyle">
    <swiper :banners="banners" @clickBan="clickBan"/>
    <titleItem title="推荐歌单" path="/found/kksongs"/>
    <songList :songList="songList" width="19%" @getSongListId="getSongListId"/>
    <titleItem title="独家放送" path="/mvList"/>
    <mvList :mvList="mvList" width="32%" @getMvListId="getMvListId"/>
    <titleItem title="最新音乐" path="/found/kknewsongs"/>
    <newSong :newSongList="newSongList"/>
  </div>
</template>

<script>
import swiper from 'components/common/swiper/Swiper'
import titleItem from 'components/content/titleItem/TitleItem'
import songList from 'components/common/songList/SongList'
import mvList from 'components/common/mvList/MvList'
import newSong from 'components/common/newSong/NewSong'

import { getSwiper,getSongUrl,getSongDetail,getSongList,getPersonalized,getNewSongList } from 'network/base/found'
export default {
  components: {
    swiper,
    titleItem,
    songList,
    mvList,
    newSong
  },
  data () {
    return {
      banners:[],
      getSongId:'',
      songList:[],
      mvList:[],
      newSongList:{
        left:[],
        right:[]
      }
    }
  },
  created () {
    console.log('created');
    this.getSwiper();
    this.getSongList();
    this.getPersonalized();
    this.getNewSongList();
  },
  methods: {
    //获取banner内容接口
    getSwiper(){
      getSwiper().then(res=>{
        // console.log(res);
        this.banners = res.banners;
      })
    },
    //获取推荐歌单接口
    getSongList(){
      getSongList().then(res=>{
        // console.log(res.result)
        this.songList = res.result;
      });
    },
    //获取独家放送接口
    getPersonalized(){
      getPersonalized().then(res=>{
        this.mvList = res.result
      })
    },
    //获取最新音乐接口
    getNewSongList(){
      getNewSongList().then(res=>{
        // console.log(res.result);
        let result = res.result
        let arrLeft = []
        let arrRight = []
        result.forEach((v,i)=>{
          let obj = {};
          i+1>=10 ? obj.index=i+1 : obj.index = "0"+(i+1)//index
          obj.id = v.id;//歌曲Id
          obj.name = v.name;//歌曲名字
          obj.picUrl = v.picUrl;//歌曲图片
          let newAr = [];
          //如有多个演唱者则通过'/'拼接
          v.song.artists.map(value=>{ newAr.push(value.name)})
          obj.ar = newAr.join('/')//歌曲演唱者
          if (i<5) {
            arrLeft.push(obj)
          }else{
            arrRight.push(obj)
          }
        })
        this.newSongList.left = arrLeft
        this.newSongList.right = arrRight
      })
    },
    //发送banner id
    clickBan(songId){
      this.getSongId = songId
      //发送id
      this.$bus.$emit('getSongId',this.getSongId);
    },
    //接收推荐歌单id
    getSongListId(playListId){
      // console.log(playListId);
      this.$router.push({
        path:'/playList',
        query:{
          id:playListId
        }
      })
    },
    //接收独家放送的id
    getMvListId(mvListId){
      this.$router.push({
        path:'/mvListResult',
        query:{
          id:mvListId
        }
      })
    }
  }
}
</script>

<style>

</style>