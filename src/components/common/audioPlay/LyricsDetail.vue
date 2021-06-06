<template>
  <div class="lyrics">
    <div class="lyricsBox">
      <div class="lyricsImg">
        <img :src="getSongDetail.picUrl" alt="">
      </div>
      <div class="lyricsDetail">
        <p class="lyricName">{{getSongDetail.name}}</p>
        <p class="lyricAr">歌手:{{getSongDetail.ar}}</p>
        <div ref="contanier" class="contanier">
          <div class="lyricObj">
            <p ref="lyric"
            v-for="(item,index) in lyric" 
            :key="index"
            :data-index="index"
            class="row"
            :class="{'active':lyricIndex===index}">{{item.lyric}}</p>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { getLyric } from 'network/base/lyric'

export default {
  data () {
    return {
      songId:'',
      lyric:'',
      lyricIndex:-1
    }
  },
  props: {
    getSongDetail:Object,
    getCurrentTime:Number
  },
  created () {
    if (Object.keys(this.getSongDetail).length !== 0) {
      this.songId = this.getSongDetail.songId
      this.getLyric()
    }
  },
  methods: {
    //获取歌词详情
    getLyric(){
      getLyric(this.songId).then(res=>{
        // this.lyric = res.lrc.lyric
        // console.log(res.lrc.lyric);
        let arr = []
        if (res) {
          arr = res.lrc.lyric.split("\n");
        }
        // console.log(arr);
        let lyricArr = []
        for (var i = 0; i < arr.length-1; i++) {
          //分离时间
          let newArr = arr[i].match(/\[(\d+:.+?)\]/g);
          //分离歌词
          let index = arr[i].lastIndexOf(']');
          let newLyric = arr[i].substring(index+1,arr[i].length);
          //如有多个时间则添加多次
          newArr.forEach(res=>{
            let main = {}
            //时间数组
            res = res.replace('[','');
            res = res.replace(']','');
            res = (res.split(':')[0]*60+(res.split(':')[1]-0)).toFixed(1);
            main.time = res;
            //歌词数组
            main.lyric = newLyric;
            //添加到总的数组
            lyricArr.push(main)
          })
        }
        this.lyric = lyricArr.sort((a,b)=>{return a.time - b.time;})
      })
    }
  },
  watch: {
    //监听歌曲的变化
    'getSongDetail.songId':function () {
      this.songId = this.getSongDetail.songId
      this.lyricIndex = 0
      this.$refs.contanier.scrollTop = 0
      this.getLyric();
    },
    //监听当前播放时长的变化
    getCurrentTime(){
      // console.log(this.getCurrentTime);
      
      if (this.lyricIndex > 0) {
        let lyricOffsetTop = this.$refs.lyric[this.lyricIndex].offsetTop-300;
        this.$refs.contanier.scrollTop = lyricOffsetTop
        // this.$refs.contanier.animate({
          //   scrollTop:lyricOffsetTop
        // },500)
      }
      // 匹配歌词
      for (let i = 0; i < this.lyric.length; i++) {
        if (this.getCurrentTime > this.lyric[i].time) {
          const index = this.$refs.lyric[i].dataset.index
          if (i === parseInt(index)) {
            this.lyricIndex = i
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.lyrics{
  width: 100%;
  height: 100%;
}
.lyricsBox{
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.lyricsImg{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lyricsImg img{
  width: 400px;
  height: 400px;
}
.lyricsDetail{
  flex: 1;
  padding: 50px 0;
}
.lyricName{
  font-size: 26px;
  color: #ecf5ff;
}
.lyricAr{
  margin: 10px 0;
  color: #ecf5ff;
}
.contanier{
  height: 400px;
  overflow: auto;
  color: #5d5d5d;
  margin-top: 50px;
}
.row{
  margin-top: 15px;
}
.active{
  color: #3a8ee6;
  font-size: 24px;
}
</style>