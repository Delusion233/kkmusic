<template>
  <div class="kkStyle">
    <swiper :banners="banners" @clickBan="clickBan"/>
    <titleItem title="推荐歌单" path="/found/kksongs"/>
    <songList :songList="songList" width="19%" @getSongListId="getSongListId"/>
  </div>
</template>

<script>
import swiper from 'components/common/swiper/Swiper'
import songList from 'components/common/songList/SongList'
import titleItem from 'components/content/titleItem/TitleItem'

import { getSwiper,getSongUrl,getSongDetail,getSongList } from 'network/base/found'
export default {
  components: {
    swiper,
    songList,
    titleItem
  },
  data () {
    return {
      banners:[],
      getSongId:'',
      songList:[]
    }
  },
  created () {
    this.getSwiper();
    this.getSongList();
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
    }
  }
}
</script>

<style>

</style>