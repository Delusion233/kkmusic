<template>
  <div class="kkStyle">
    <swiper :banners="banners" @clickBan="clickBan"/>
    <titleItem title="推荐歌单" path="/found/kksongs"/>
    <songList :songList="songList" width="19%" @getSongListId="getSongListId"/>
    <titleItem title="独家放送" path="/mvList"/>
    <mvList :mvList="mvList" width="32%" @getMvListId="getMvListId"/>
    <titleItem title="最新音乐" path="/found/kknewsongs"/>
  </div>
</template>

<script>
import swiper from 'components/common/swiper/Swiper'
import titleItem from 'components/content/titleItem/TitleItem'
import songList from 'components/common/songList/SongList'
import mvList from 'components/common/mvList/MvList'

import { getSwiper,getSongUrl,getSongDetail,getSongList,getPersonalized } from 'network/base/found'
export default {
  components: {
    swiper,
    titleItem,
    songList,
    mvList
  },
  data () {
    return {
      banners:[],
      getSongId:'',
      songList:[],
      mvList:[]
    }
  },
  created () {
    console.log('created');
    this.getSwiper();
    this.getSongList();
    this.getPersonalized();
  },
  methods: {
    //获取banner内容
    getSwiper(){
      getSwiper().then(res=>{
        // console.log(res);
        this.banners = res.banners;
      })
    },
    //获取推荐歌单
    getSongList(){
      getSongList().then(res=>{
        // console.log(res.result)
        this.songList = res.result;
      });
    },
    //获取独家放送
    getPersonalized(){
      getPersonalized().then(res=>{
        this.mvList = res.result
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