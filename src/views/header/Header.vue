<template>
  <div class="header">
    <HLogo/>
    <HSearch/>
    <HLogin/>
    <HTools/>
  </div>
</template>

<script>
import HLogo from './HeaderComps/HeaderLogo'
import HSearch from './HeaderComps/HeaderSearch'
import HLogin from './HeaderComps/HeaderLogin'
import HTools from './HeaderComps/HeaderTools'
export default {
  name:'Header',
  components: {
    HLogo,
    HSearch,
    HLogin,
    HTools
  }
}
</script>

<style scoped>
.header{
  color: #fff;
  font-size: 14px;
  display: flex;
  background-color: rgba(255 , 120, 120);
  padding: 15px 20px;
  justify-content: space-between;
}
</style>