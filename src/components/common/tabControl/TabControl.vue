<template>
  <el-tabs v-model="name" @tab-click="handleClick" class="tab">
    <el-tab-pane 
    v-for="item in tabContent"
    :key="item.name"
    :label="item.label"
    :name="item.name">
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      name:this.$route.path,
      currenTab:''
    }
  },
  methods: {
    handleClick(tab) {
      if(this.currenTab !== tab.label){
        this.currenTab = tab.label
        this.$emit('handleClick',tab);
      }
    }
  },
  props: {
    tabContent:Array
  }
}
</script>

<style>
.tab .el-tabs__active-bar{
  height: 3px;
  background-color: #FF7878;
}
.tab .el-tabs__item.is-active {
  color: #000;
  font-size: 20px;
  font-weight: bold;
}
.tab .el-tabs__item:hover{
  color: #000;
}
.tab .el-tabs__item{
  color: rgba(0, 0, 0, .6);
  font-size: 16px;
  padding: 0 15px;
}
.tab .el-tabs__nav-wrap::after{
  height: 0;
}
</style>