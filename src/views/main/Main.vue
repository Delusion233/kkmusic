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
  width: calc(100% - 220px - 100px);
  height: 530px;
  padding: 10px 50px;
}
</style>