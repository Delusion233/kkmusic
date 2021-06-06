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
  width: calc(100% - 220px);
  height: 600px;
  overflow-y: auto;
}
</style>