<template>
  <div class="kkNewSong">
    <topSongList :topSongList="topSongList"/>
  </div>
</template>

<script>
import topSongList from 'components/content/topSongList/TopSongList'
import { getTime } from 'common/util'
import { getTopSongList,getTopAlbumList } from 'network/base/found'
export default {
  components: {
    topSongList
  },
  data () {
    return {
      topSongList:[]
    }
  },
  created () {
    this.getTopSongList()
  },
  methods: {
    getTopSongList(){
      getTopSongList().then(res=>{
        console.log(res.data);
        let data = res.data
        let arr = []
        data.forEach((e,index)=>{
          let obj = {}
          index+1 >= 10 ? obj.index = index+1 : obj.index = "0"+(index+1)
          obj.id = e.id
          obj.picUrl = e.album.picUrl//歌曲图片
          obj.name = e.name//歌曲名字
          let newAr = [];
          //如有多个演唱者则通过'/'拼接
          e.artists.map(value=>{ newAr.push(value.name)})
          obj.ar = newAr.join('/')//歌曲演唱者
          obj.derivation = e.album.name
          obj.dr = getTime(e.duration/1000)//歌曲时长
          arr.push(obj);
        })
        this.topSongList = arr
      })
    },
    getTopAlbumList(){
      getTopAlbumList().then(res=>{
        console.log(res);
      })
    }
  }
}
</script>

<style>

</style>