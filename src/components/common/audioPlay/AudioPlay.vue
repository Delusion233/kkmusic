<template>
  <div class="audioPlay">
    <div class="songDetail">
      <div class="imgBox">
        <img :src="getSongDetail.picUrl||require('assets/image/bg/fly.jpg')" alt="">
        <i class="el-icon-full-screen" 
        title="展开音乐详情页" 
        v-show="getSongDetail.songUrl"
        @click="showSongDetail()"></i>
      </div>
      <div class="songDetailBox">
        <div class="songNameBox">
          <p>
            <span class="songName" :title="getSongDetail.name?getSongDetail.name:''">{{getSongDetail.name||'让生活充满音乐'}}</span>
            <span class="songerName" :title="getSongDetail.ar?getSongDetail.ar:''">{{getSongDetail.ar?' - ':''}}{{getSongDetail.ar||''}}</span>
          </p>
        </div>
        <div class="songTools">
          <i class="el-icon-star-off" title="喜欢"></i>
          <i class="el-icon-download" title="下载"></i>
          <i class="el-icon-share" title="分享"></i>
        </div>
      </div>
    </div>
    <div class="showSongDetailBox" :class="showSongDetailBox2">
      <lyricsDetail :getSongDetail="getSongDetail" :getCurrentTime="getCurrentTime"/>
    </div>
    <div class="songControl">
      <div class="controlTools">
        <i class="el-icon-refresh" title="循环播放"></i>
        <i class="el-icon-arrow-left" title="上一首" @click="preSong"></i>
        <i class="playBtn" 
        :class="isPlay?'el-icon-video-pause':'el-icon-video-play'"
        :title="isPlay?'停止':'播放'"
        @click="setIsPlay"></i>
        <i class="el-icon-arrow-right" title="下一首" @click="nextSong"></i>
        <span title="歌词">词</span>
      </div>
      <div class="controlBar">
        <span>{{nowDuration}}</span>
        <el-slider
        :max="maxLength"
        v-model="nowLength"
        :show-tooltip="false" 
        @change="changeLength"
        class="songBar">
        </el-slider>
        <span>{{maxDuration}}</span>
      </div>
    </div>
    <div class="songMore">
      <i :class="(nowSoundLength===0)?'el-icon-turn-off-microphone':'el-icon-headset'" 
      :title="(nowSoundLength===0)?'恢复音量':'静音'"
      @click="setSound"></i>
      <div class="controlSound controlBar">
        <el-slider 
        v-model="nowSoundLength"
        :max="maxSoundLength"
        @input="changSoundLength"></el-slider>
      </div>
      <i :class="isOpenSongList?'el-icon-close':'el-icon-s-operation'" 
      class="songListBtn"
      :title="isOpenSongList?'关闭':'播放列表'"  @click="openSongList">
      </i>
      <el-drawer
        :visible.sync="isOpenSongList"
        :with-header="false"
        :modal="false" 
        class="songList">
        <p class="listTitle">播放列表</p>
        <div class="listDetail">
          <span>{{getSongList.length}}首歌曲</span>
          <span @click="clearSongs" class="clearSongs" title="清空"><i class="el-icon-delete"></i>清空</span>
        </div>
        <div v-if="getSongList.length > 0">
          <div v-for="(item,index) in getSongList" 
          :key="index" 
          class="listContainer"
          :class="{'isPlaying':index===$store.state.currentIndex,'isClick':index===clickIndex}"
          @click="clickItem(index)"
          @dblclick="dblclick(index)">
            <span class="listName"><span :title="item.name">{{item.name}}</span></span>
            <span class="listAr" :title="item.ar">{{item.ar}}</span>
            <span class="listDt">{{item.dt | getDuration}}</span>
          </div>
        </div>
        <div v-else class="listNone"><span>歌单空空,去首页</span><router-link to="/found/kkstyle">发现音乐</router-link></div>
      </el-drawer>
    </div>
    <audio :src="getSongDetail.songUrl" autoplay ref="audio"
    @canplay="getDuration" @timeupdate="updateTime"></audio>
  </div>
</template>

<script>
import { getTime } from 'common/util'
import { mapState,mapGetters } from 'vuex'
import lyricsDetail from './LyricsDetail'

export default {
  data () {
    return {
      maxLength:100,
      nowLength:0,
      maxSoundLength:100,
      nowSoundLength:100,
      beforeSoundLength:100,
      songSound:100,
      isPlay:false,
      nowDuration:'0.00',
      maxDuration:'0.00',
      isOpenSongList:false,
      drawer: false,
      clickIndex:-1,
      isshowSongDetail:false,
      showSongDetailBox2:'',
      getCurrentTime:0
    }
  },
  components: {
    lyricsDetail
  },
  props: {
    getSongDetail:{
      type:Object,
      default(){
        return {}
      }
    },
    getSongList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods: {
    //监听浏览器可以播放音频时获取音频时长
    getDuration(){
      //判断当前音频是否为暂停状态
      // if(this.$refs.audio.paused){
      //   //暂停设置播放按钮
      //   this.isPlay=false
      // }else{
        this.isPlay=true
      // }
      const duration = Math.floor(this.$refs.audio.duration);
      // // 将歌曲时长存到vuex中
      //设置进度条最大值
      this.maxLength = duration
      //设置最大时间
      this.maxDuration = getTime(duration);
    },
    //播放音频时获取当前播放时长(一直)
    updateTime(nowLength){
      this.getCurrentTime = nowLength.target.currentTime.toFixed(1)-0;
      const time = parseInt(nowLength.target.currentTime);
      this.nowLength = time;
      this.nowDuration = getTime(time);
      //播放完毕,判断当前播放时间和歌曲时长是否一样
      if (nowLength.target.currentTime >= this.$refs.audio.duration) {
        console.log('完了');
        //最后一首歌曲时,初始化
        if (this.$store.state.currentIndex===this.getSongList.length-1) {
          this.isPlay = false
          this.nowDuration = '0.00'
          this.maxDuration = '0.00'
          this.nowLength = 0
          this.$store.state.currentIndex = -1
          this.showSongDetailBox2 = ''
          console.log('最后一首');
        //下一首
        }else{
          this.$store.state.currentIndex += 1
          this.isPlay = true
          console.log('下一首');
        }
      }
    },
    //拖动进度条
    changeLength(length){
      if (this.getSongDetail.songUrl) {
        //设置audio播放的时间
        this.$refs.audio.currentTime = length
      }else{
        this.nowLength = 0
      }
    },
    //拖动音量进度条
    changSoundLength(length){
      this.nowSoundLength = length;
      //音量不为0才设置历史音量
      if (length!==0) {this.beforeSoundLength = length}
      this.$refs.audio.volume = length/100;
    },
    //播放 or 暂停
    setIsPlay(){
      //有音频才可以控制
      if(this.getSongDetail.songUrl){
        // 如果是播放状态,暂停歌曲
        if (this.isPlay===true) {
          this.$refs.audio.pause();
          this.isPlay = false
        //暂停状态则播放歌曲
        }else{
          this.$refs.audio.play();
          this.isPlay = true
        }
      //播放完成后按播放按钮播放第一首歌
      }else if(this.getSongList.length > 0 && Object.keys(this.getSongDetail).length===0){
        this.$store.state.currentIndex = 0;
        this.isPlay = true
      }else{
        console.log('没有音频');
      }
    },
    //静音 or 不静音
    setSound(){
      if (this.nowSoundLength===0) {
        this.nowSoundLength = this.beforeSoundLength
      }else{
        this.nowSoundLength = 0
      }
      this.$refs.audio.volume = this.nowSoundLength/100;
    },
    //打开 or 关闭 歌曲列表页
    openSongList(){
      this.isOpenSongList = !this.isOpenSongList
    },
    //双击列表item播放对应歌曲
    dblclick(index){
      this.$store.state.currentIndex = index
      this.isPlay = true
    },
    //单击列表改变样式
    clickItem(index){
      this.clickIndex = index
    },
    //上一首
    preSong(){
      if (this.$store.state.currentIndex <= 0) {
        return false
      }else{
        this.$store.state.currentIndex -= 1
      }
    },
    //下一首
    nextSong(){
      if (this.$store.state.currentIndex === this.getSongList.length-1) {
        return false
      }else{
        this.$store.state.currentIndex += 1
      }
    },
    //清空歌曲
    clearSongs(){
      this.isPlay = false
      this.$store.state.localSongList = []
      this.$store.state.currentIndex = -1
      this.showSongDetailBox2 = ''
      this.$refs.audio.load();
    },
    //展示歌曲详情页
    showSongDetail(){
      this.isshowSongDetail = !this.isshowSongDetail;
      if (this.isshowSongDetail) {
        this.showSongDetailBox2 = 'showSongDetailBox2'
      }else{
        this.showSongDetailBox2 = ''
      }
    }
  },
  filters: {
    //处理时长
    getDuration(time){
      return getTime(Math.floor(time/1000))
    }
  },
  watch: {
    //路径改变时关闭歌词详情
    '$route':function() {
      this.showSongDetailBox2 = ''
    }
  }
}
</script>

<style scoped>
.audioPlay{
  height: 50px;
  padding: 10px;
  background-color: rgba(255, 120, 120, 0.3);
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.songDetail{
  display: flex;
  width: 200px;
}
.imgBox{
  width: 50px;
  height: 50px;
  overflow: hidden;
  position: relative;
}
.imgBox img{
  width: 50px;
  max-height: 50px;
  border-radius: 5px;
}
.imgBox i{
  transition: .3s ease all;
  font-size: 0px;
}
.imgBox:hover i{
  cursor: pointer;
  width: 50px;
  height: 50px;
  font-size: 50px;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  background-color: rgba(0,0,0,.5);
  filter: 50%;
  opacity: 60%;
}
.songDetailBox{
  padding-left: 10px;
  font-size: 14px;
}
.songNameBox{
  width: 98px;
  overflow: hidden;
  white-space: nowrap;
}
.songNameBox>p{
  display: inline-block;
  min-width: 98px;
  white-space: nowrap;
  animation: move 5s infinite alternate linear;
  position: relative;
}
@keyframes move {
0% {left:0px;transform: translate(0, 0);}
25% {left:0px;transform: translate(0, 0);}
75% {left: 100%;transform: translate(-100%, 0);}
100% {left: 100%;transform: translate(-100%, 0);}
}
.songDetailBox .songName{
  color: #000;
  overflow: hidden;
}
.songDetailBox .songerName{
  color: rgba(0,0,0,.5);
  font-size: 12px;
}
.showSongDetailBox{
  position: absolute;
  width: 100%;
  height: calc(100% - 70px);
  bottom: 70px;
  left: 0;
  background-color: #FF7878;
  transform: scale(0,0);
  transition: transform 0.2s;
  transform-origin: bottom left;
  overflow: hidden;
  z-index: 9;
}
.showSongDetailBox2{
  transform: scale(1,1);
  transition: transform 0.2s;
  transform-origin: bottom left;
}
.songTools{
  color: rgba(0,0,0,.5);
  font-size: 18px;
  text-align: left;
  margin-top: 8px;
}
.songTools>i{
  margin-right: 12px;
}
.songTools>i:hover{
  cursor: pointer;
  color: #FF7878;
}

.songControl{
  width: 600px;
  position: relative;
}
.songControl .controlBar{
  display: flex;
  justify-content: center;
  vertical-align: middle;
  color: rgba(0,0,0,.5);
  font-size: 12px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.controlTools>i{
  font-size: 16px;
  color: #000;
  margin: 0 15px;
  vertical-align: middle;
}
.controlTools>span{
  font-size: 14px;
}
.controlTools>span:hover{
  cursor: pointer;
  color: #FF7878;
}
.controlTools>i:hover{
  color: #FF7878;
  cursor: pointer;
}
.controlTools>.playBtn{
  font-size: 25px;
}
.controlBar .songBar{
  width: 500px;
  padding: 0 8px;
  margin-top: 7px;
}

.songMore{
  width: 200px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
}
.songMore>i{
  font-size: 18px;
  color: #000;
  vertical-align: middle;
  margin-right: 5px;
}
.songMore>i:hover{
  cursor: pointer;
}
.songMore .controlSound{
  width: 50px;
  margin-left: 5px;
}
.songMore .songListBtn{
  margin-left: 50px;
  z-index: 99999;
}
.songList .listTitle{
  text-align: left;
  font-size: 25px;
  color: #000;
  padding: 30px 25px 0 25px;
}
.songList .listDetail{
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  margin: 10px 25px 20px;
}
.clearSongs:hover{
  cursor: pointer;
}
.songList .listContainer{
  padding: 10px 25px;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.listContainer:hover{
  color: #000;
  background-color: rgba(0,0,0,.1);
}
.listContainer span{
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}
.listContainer>span:first-child{
  text-align: left;
}
.listContainer>span:last-child{
  text-align: right;
}
.listContainer .listName{
  flex: 2;
}
.listContainer .listAr{
  flex: 1;
}
.listContainer .listDt{
  flex: 1;
}
.songList .listNone{
  margin-top: 50%;
}
.isPlaying{
  color: #FF7878!important;
  background-color: rgba(208,208,208,.2);
}
.isClick{
  background-color: rgba(0,0,0,.1);
}
</style>
<style>
.controlBar .el-slider__runway{
  background-color: rgba(208,208,208,.4);
  margin: 0;
  height: 3px;
}
.controlBar .el-slider__button{
  width: 5px;
  height: 5px;
  border-color: #FF7878;
}
.controlBar .el-slider__button.hover,.el-slider__button:hover{
  cursor: auto;
}
.controlBar .el-slider__button-wrapper{
  top: -16px;
}
.controlBar .el-slider__button-wrapper.hover,.el-slider__button-wrapper:hover{
  cursor: auto;
}
.controlBar .el-slider__bar{
  height: 3px;
  background-color: #FF7878;
}
.controlBar .el-slider__runway{
  cursor: auto;
}
.songList .el-drawer{
  font-size: 16px;
  color: rgba(0,0,0,.7);
}
</style>