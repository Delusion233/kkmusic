<template>
  <div class="playListResult">
    <div class="head">
      <div class="left">
        <img :src="playListResult.coverImgUrl" alt="">
      </div>
      <div class="right">
        <p class="title"><span>歌单</span>{{playListResult.name}}</p>
        <div class="creator">
          <img :src="playListResult.avatarUrl" alt="">
          <span>{{playListResult.nickname}}</span><span>{{playListResult.createTime}}创建</span>
        </div>
        <div class="btn">
          <el-button type="danger" icon="el-icon-caret-right" title="播放全部" round>播放全部</el-button>
          <el-button type="danger" icon="el-icon-star-off" title="收藏" round>收藏</el-button>
        </div>
        <div class="describe">
          <span>歌曲：{{playListResult.tracksLength}}</span><span>播放：{{playListResult.playCount}}</span>
          <div>
            简介：{{playListResult.description}}
          </div>
        </div>
      </div>
    </div>
    <div class="detail">
      <tabControl :tabContent="tabContent" :activeName="activeName" @handleClick="handleClick">
        <!-- 歌单 -->
        <div slot="songs" class="songs">
          <el-table
            ref="singleTable"
            :data="playListResult.tracks"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%"
            @row-dblclick="playSong">
            <el-table-column property="name" label="歌曲" width="480"></el-table-column>
            <el-table-column property="sr" label="歌手" width="150"></el-table-column>
            <el-table-column property="al" label="专辑" width="200"></el-table-column>
            <el-table-column property="dt" label="时长" width="150"></el-table-column>
          </el-table>
        </div>
        <!-- 评论 -->
        <div slot="comments" class="comments">
          评论
        </div>
      </tabControl>
    </div>
  </div>
</template>

<script>
import { getPlayList } from 'network/base/found'
import { getDate,getTime } from 'common/util'
import tabControl from 'components/common/tabControl/TabControl'
export default { 
  data () {
    return {
      playListId:'',
      playListResult:{},
      tabContent:[
        { label: "歌曲列表", name: "songs", },
        { label: "评论", name: "comments" }
      ],
      activeName:"songs"
    }
  },
  components: {
    tabControl
  },
  created () {
    //接收歌单id
    this.playListId = this.$route.query.id;
    //调用歌单详情接口
    this.getPlayList();
  },
  methods: {
    //歌单详情接口
    getPlayList(){
      getPlayList(this.playListId).then(res=>{
        const result = res.playlist
        // console.log(res.playlist);
        let list = {}
        list.coverImgUrl = result.coverImgUrl//歌单图片
        list.name = result.name//歌单名字
        list.description = result.description//歌单描述
        list.createTime = getDate(result.createTime)//歌单创建时间
        list.playCount = result.playCount/10000 > 1 ? parseInt(result.playCount/10000)+'万':result.playCount//歌单播放次数
        list.nickname = result.creator.nickname//作者名字
        list.avatarUrl = result.creator.avatarUrl//作者图片
        list.userId = result.creator.userId//作者id
        //歌单歌曲
        const tracks = result.tracks;
        // console.log(tracks);
        let songs = []
        tracks.forEach((element,index) => {
          let arr = {}
          arr.songId = element.id//id
          arr.name = element.name//名字
          let newAr = [];
          element.ar.map(res=>{ newAr.push(res.name)})
          arr.sr = newAr.join('/')//歌手
          arr.al = element.al.name//专辑
          arr.dt = getTime(element.dt/1000);//时长
          songs[index] = arr
        });
        list.tracks = songs//歌单
        list.tracksLength = result.tracks.length//歌单长度

        this.playListResult = list
      })
    },
    //切换条目
    handleClick(tab){
      //设置活跃tab
      this.activeName = tab.name
    },
    handleCurrentChange(val) {
      // this.currentRow = val;
    },
    //双击播放歌曲
    playSong(row){
      //发送id
      this.$bus.$emit('getSongId',row.songId);
    }
  }
}
</script>

<style scoped>
.head{
  display: flex;
  padding: 40px;
}
.right{
  text-align: left;
  padding-left: 30px;
}
.left>img{
  width: 200px;
  height: auto;
  border-radius: 5px;
}
.title{
  font-size: 25px;
  font-weight: bold;
  position: relative;
  padding-left: 50px;
}
.title>span{
  border: 1px solid #FF7878;
  border-radius: 3px;
  color: #FF7878;
  font-size: 14px;
  font-weight: normal;
  padding: 0 4px;
  margin-right: 10px;
  position: absolute;
  left: 0;
  top: 8px;
}
.creator{
  margin: 10px 0;
  display: flex;
  line-height: 32px;
  font-size: 14px;
  color: #5c5c5c;
}
.creator img{
  width: 32px;
  height: auto;
  border-radius: 50%;
  background-color: #eee;
}
.creator span{
  margin-left: 10px;
}
.btn {
  margin: 15px 0;
}
.describe{
  font-size: 14px;
  color: #666;
  margin: 10px 0;
}
.describe>span{
  margin-right: 15px;
}
.describe>div{
  margin-top: 5px;
}
</style>
<style>
.btn>.el-button.is-round>span:hover{
  cursor: pointer;
}
.btn>.el-button.is-round{
  font-size: 15px;
  padding: 10px 23px;
}
.detail .el-tabs__header{
  padding: 0 40px;
}
.detail .el-tabs__item.is-active{
  font-size: 16px;
}
.songs .el-table, .el-table__expanded-cell{
  background-color: rgba(0, 0, 0, 0);
}
.songs .el-table thead{
  color: #000;
}
.el-tabs__content{
  padding-left: 30px;
}
.el-table th,.el-table tr {
  background-color: rgba(0, 0, 0, 0);
}
.el-table td, .el-table th.is-leaf{
  border-bottom: 0px;
}
.el-table::before{
  height: 0;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: rgba(255, 255, 255, .2);
}
.el-table__body tr.current-row>td{
  background-color: rgba(255, 120, 120, .5)!important;
}
</style>