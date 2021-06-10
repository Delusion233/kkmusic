<template>
  <div class="footer">
    <audioPlay :getSongDetail="playingSong" :getSongList="songList"/>
  </div>
</template>

<script>
import audioPlay from 'components/common/audioPlay/AudioPlay'
import { getSongUrl,getSongDetail } from 'network/base/found'
import { mapState,mapGetters } from 'vuex'//vuex封装的方法，可以让我们快速拿到vuex中的数据

export default {
  name:'Footer',
  data () {
    return {
      // getSongDetail:[],
      getSongId:''
    }
  },
  components: {
    audioPlay
  },
  computed: {
    ...mapState({//vuex state写法
      songList:state=>state.localSongList
    }),
    ...mapGetters({
      playingSong:'playingSong'
    })
  },
  mounted () {
    //接收id
    this.$bus.$on('getSongId',res=>{
      this.getSongId = res
    })
  },
  methods: {
    //api获取音频详细
    getSongUrl(id){
      //1.获取歌曲播放地址
      getSongUrl(id).then(res=>{
        const data = res.data[0];
        console.log(data);
        let songDetail = {};
        songDetail.songUrl = data.url;//歌曲url
        //2.如果存在歌曲或者传过来的id不相同则 播放歌曲 和 获取歌曲详情
        if(data.code===200){
          //保存传过来的id来判断之后的是否相同
          this.getSongId = id
          //3.获取歌曲详情
          getSongDetail(id).then(res=>{
            console.log(res.songs[0]);
            // if(res.songs.length > 0){
              const songMsg = res.songs[0];
              songDetail.songId = id;//歌曲id
              songDetail.name = songMsg.name//歌曲名字
              songDetail.picUrl = songMsg.al.picUrl//歌曲图片
              songDetail.dt = songMsg.dt//歌曲时长
              let newAr = [];
              //如有多个演唱者则通过'/'拼接
              songMsg.ar.map(res=>{ newAr.push(res.name)})
              songDetail.ar = newAr.join('/')//歌曲演唱者
              //将歌曲信息存到vuex中
              let i = 0;//判断列表中是否已存在，存在则直接播放对应歌曲
              const ishas = this.songList.some((item,index)=>{
                i = index
                return item.songId === id
              })
              // console.log(i);
              //列表存在歌曲,则播放对应歌曲
              if (ishas) {
                this.$store.state.currentIndex = i
              //不存在则添加到列表
              }else{
                this.$store.commit('addSong',songDetail);
              }
            // }
          })
        }else{
          console.log('专辑页面');
        }
      })
    }
  },
  watch: {
    //监听id的变化,调用api
    getSongId(){
      this.getSongUrl(this.getSongId);
    }
  }
}
</script>

<style scoped>
.footer{
  box-shadow: 0 -1px 0px rgba(0,0,0,.1);
}
</style>