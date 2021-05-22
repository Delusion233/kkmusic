<template>
  <div class="aside">
    <div class="contanier">
      <div class="base" v-for="(item,index) in myBase" 
      :key="new Date().getTime()+index"
      @click="myBaseChose(index,item.path)"
      :class="{'isChoose1':myBaseIndex===index}">
        {{item.txt}}
      </div>
      <p class="title">我的音乐</p>
      <div class="base" v-for="(item,index) in myMusic" 
      :key="new Date().getTime()+item.i"
      @click="myMusicChose(index)"
      :class="{'isChoose2':myMusicIndex===index}">
        <i :class="item.i"></i><span class="txt">{{item.txt}}</span>
      </div>
      <el-menu>
        <el-submenu index="1">
          <template slot="title">
            <i></i>创建的歌单
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="'1-'+index"
              v-for="(item,index) in myMusic"
              :key="item.i"
              @click="myCreateChose(index)"
              :class="{'isChoose2':myCreateIndex===index}">
              <i :class="item.i"></i>
              <span class="txt">{{item.txt}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name:'Asider',
  data () {
    return {
      myBase:[
        {path:'/found',txt:'发现音乐'},
        {path:'/video',txt:'视频'},
        {path:'/friends',txt:'朋友'},
        {path:'/lives',txt:'直播'},
        {path:'/myself',txt:'私人FM'}
        ],
      myMusic:[
        {i:'el-icon-bangzhu',txt:'本地音乐'},
        {i:'el-icon-download',txt:'下载管理'},
        {i:'el-icon-cloudy',txt:'我的音乐云盘'},
        {i:'el-icon-coin',txt:'我的电台'},
        {i:'el-icon-star-off',txt:'我的收藏'}
      ],
      myCreate:[],
      myBaseIndex:0,
      myMusicIndex:-1,
      myCreateIndex:-1
    }
  },
  methods: {
    myBaseChose(index,path){
      this.myBaseIndex = index;
      this.myMusicIndex = -1;
      this.myCreateIndex = -1;
      this.$router.push(path).catch(err=> err);
    },
    myMusicChose(index){
      this.myBaseIndex = -1;
      this.myMusicIndex = index;
      this.myCreateIndex = -1;
    },
    myCreateChose(index){
      this.myBaseIndex = -1;
      this.myMusicIndex = -1;
      this.myCreateIndex = index;
    }
  }
}
</script>

<style scoped>
.aside{
  float: left;
  width: 180px;
  height: 480px;
  padding: 10px;
  text-align: left;
  overflow: hidden;
  box-shadow: 1px 0 0 rgb(0 0 0 / 10%);
}
.contanier{
  width: 180px;
}
.aside:hover{
  overflow-y: auto;
}
.base{
  padding: 8px;
  color: rgba(0, 0, 0, 0.7);
  font-size: 16px;
}
.base:hover{
  cursor: pointer;
  color: rgba(0, 0, 0, 1);
  background-color: rgba(204, 204, 204, 0.3);
}
.txt{
  padding-left: 10px;
}
.title{
  color: rgba(0,0,0,.3);
  font-size: 14px;
}
.isChoose1{
  color: rgba(0, 0, 0, 1);
  font-weight: bold;
  background-color: rgba(204, 204, 204, 0.3);
}
.isChoose2{
  background-color: rgba(204, 204, 204, 0.3);
}
</style>
<style>
.el-menu{
  background-color: rgba(0, 0, 0, 0)!important;
  border: 0px!important;
}
.el-submenu__title{
  padding: 0!important;
  color: rgba(0,0,0,.3)!important;
}
.el-submenu__title:hover{background-color: rgba(0, 0, 0, 0)!important;}
.el-submenu__title:hover i{
  color: rgba(0,0,0,.8)!important;
}
.el-menu-item-group__title{
  padding: 0!important;
}
.el-submenu .el-menu-item{
  padding: 8px!important;
  color: rgba(0, 0, 0, 0.7)!important;
  font-size: 16px!important;
  height: auto!important;
  line-height: normal!important;
  min-width: 0px!important;
}
.el-menu-item:focus, .el-menu-item:hover {
  outline: 0!important;
  color: rgba(0, 0, 0, 1)!important;
  background-color: rgba(204, 204, 204, 0.3)!important;
}
.el-menu-item i{
  color: rgba(0, 0, 0, 0.7)!important;
  font-size: 16px!important;
  vertical-align: middle!important;
  margin-right: 0!important;
  width: auto!important;
  text-align: center!important;
}
</style>