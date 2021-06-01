<template>
  <div class="myFound">
    <tabControl :tabContent="tabContent" :activeName="activeName" @handleClick="handleClick"/>
    <router-view/>
  </div>
</template>

<script>
import tabControl from 'components/common/tabControl/TabControl'

export default {
  data () {
    return {
      tabContent:[
        { label: "个性推荐", name: "/found/kkstyle", },
        { label: "歌单", name: "/found/kksongs" },
        { label: "主播电台", name: "/found/kkanchor" },
        { label: "排行榜", name: "/found/kklist" },
        { label: "歌手", name: "/found/kksinger" },
        { label: "最新音乐", name: "/found/kknewsongs" },
      ],
      activeName:'/found/kkstyle'
    }
  },
  components: {
    tabControl
  },
  created () {
  },
  methods: {
    //tabControl传过来的点击事件
    handleClick(tab){
      // console.log(tab);
      //设置活跃tab
      this.activeName = tab.name
      //点击tab跳转页面
      this.$router.push(tab.name);
    }
  }
}
</script>

<style scoped>
.myFound{
  padding: 10px 50px;
}
</style>