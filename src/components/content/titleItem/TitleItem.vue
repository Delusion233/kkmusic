<template>
  <div class="titleItem">
    <router-link :to="path">
      <span>{{title}}</span><i class="el-icon-arrow-right"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    title:String,
    path:{
      type:String,
      default:'/'
    }
  }
}
</script>

<style>
.titleItem{
  text-align: left;
  font-size: 20px;
  margin: 10px 0;
  font-weight: bold;
}
.titleItem a{
  text-decoration: none;
}
.titleItem span{
  color: rgba(0,0,0,.7);
}
.titleItem i{
  color: rgba(0,0,0,1);
}
.titleItem span:hover{
  cursor: pointer;
  color: rgba(0,0,0,1);
}
</style>