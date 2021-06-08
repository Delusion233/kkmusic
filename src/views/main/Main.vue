<template>
  <div class="main">
    <router-view v-if="routerAlive"/>
  </div>
</template>

<script>
export default {
  name:'Main',
  data(){
    return{
      routerAlive:true
    }
  },
  provide(){
    return {
      routerRefresh: this.routerRefresh
    }
  },
  methods:{
    routerRefresh(){
      this.routerAlive = false;
      this.$nextTick(()=>{
          this.routerAlive = true;
      });
    },
  }
}
</script>

<style scoped>
.main{
  float: right;
  width: calc(100% - 220px);
  height: 600px;
  overflow-y: auto;
}
</style>