<template>
  <div class="kkNewSong">
    <div class="tags">
      <span v-for="(item,index) in tags" :key="index"
      :class="{'chose':currentIndex===index}"
      @click="choseTags(index,item.type)"> {{item.name}} </span>
    </div>
    <div v-show="isshow">加载中...</div>
    <topSongList v-show="!isshow" :topSongList="topSongList"/>
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
      topSongList:[],
      tags:[
        {name:'全部',type:0},
        {name:'华语',type:7},
        {name:'欧美',type:96},
        {name:'韩国',type:8},
        {name:'日本',type:16}
      ],
      currentIndex:0,
      isshow:true
    }
  },
  created () {
    this.getTopSongList()
  },
  methods: {
    getTopSongList(type){
      this.isshow = true
      this.topSongList = []
      getTopSongList(type).then(res=>{
        console.log(res);
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
        this.isshow = false
      })
    },
    getTopAlbumList(){
      getTopAlbumList().then(res=>{
        console.log(res);
      })
    },
    //点击分类切换歌单
    choseTags(index,type){
      this.currentIndex = index
      this.getTopSongList(type);
    }
  }
}
</script>

<style scoepd>
.tags{
  text-align: left;
  margin: 20px 0;
  font-size: 13px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
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