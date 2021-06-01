<template>
  <div class="search">
    <el-table
      ref="singleTable"
      :data="songs"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
      @row-dblclick="playSong">
      <el-table-column property="name" label="歌曲" width="480"></el-table-column>
      <el-table-column property="sr" label="歌手" width="150"></el-table-column>
      <el-table-column property="al" label="专辑" width="200"></el-table-column>
      <el-table-column property="dr" label="时长" width="150"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSearchResult } from 'network/base/search'
import { getTime } from 'common/util'

export default {
  data () {
    return {
      songs:[],
      txt:''
    }
  },
  created() {
    this.txt = this.$route.query.txt
    this.getSearchResult(this.txt);
  },
  watch: {
    //监听route.query的变化
    '$route':function(){
      this.txt = this.$route.query.txt
      this.getSearchResult(this.txt);
    }
  },
  methods: {
    //搜索结果接口
    getSearchResult(txt){
      this.songs = []
      getSearchResult(txt).then( res => {
        const getSongs = res.result.songs;
        getSongs.forEach((res,index) => {
          // console.log(res,index);
          let result = {}
          // 歌曲id
          result.songId = res.id
          // 歌曲名
          result.name = res.name
          // 歌曲演唱者,如有多个演唱者则通过'/'拼接
          let newAr = [];
          res.artists.map(res=>{ newAr.push(res.name)})
          result.sr = newAr.join('/')
          // 歌曲专辑
          result.al = res.album.name
          // 歌曲时长
          result.dr = getTime(res.duration/1000);
          this.songs.push(result)
        });
      })
    },
    handleCurrentChange(val) {
      this.currentRow = val;
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
.search{
  padding-left: 10px;
}
</style>
<style>
.search .el-table{
  height: 550px;
  overflow-y: auto;
}
.search .el-table, .el-table__expanded-cell{
  background-color: rgba(0, 0, 0, 0);
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
.search .el-table thead{
  color: #000;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: rgba(255, 255, 255, .2);
}
.el-table__body tr.current-row>td{
  background-color: rgba(255, 120, 120, .5)!important;
}
</style>