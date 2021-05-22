<template>
  <div class="main">
    <router-view/>
  </div>
</template>

<script>
export default {
  name:'Main'
}
</script>

<style scoped>
.main{
  float: right;
  width: calc(100% - 200px - 40px);
  height: 480px;
  padding: 10px 20px;
}
</style>