<template>
  <div class="login">
    <img src="~assets/image/bg/fly.jpg" alt="">
    <div class="loginText">
      <el-dropdown v-if="isLogin" trigger="click">
        <span class="el-dropdown-link hover1">
          kk.<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="dropdownMenu">
          <el-dropdown-item icon="el-icon-grape">会员中心<i class="el-icon-arrow-right"></i></el-dropdown-item>
          <el-dropdown-item icon="el-icon-watermelon">等级<i class="el-icon-arrow-right"></i></el-dropdown-item>
          <el-dropdown-item icon="el-icon-apple">商城<i class="el-icon-arrow-right"></i></el-dropdown-item>
          <el-dropdown-item icon="el-icon-pear">个人信息<i class="el-icon-arrow-right"></i></el-dropdown-item>
          <hr>
          <el-dropdown-item icon="el-icon-orange">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span v-else class="hover1">登录</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLogin:true
    }
  }
}
</script>

<style scoped>
.login{
  display: flex;
  margin-left: 0px;
}
.login img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.login img:hover{
  cursor: pointer;
}
.loginText{
  margin-left: 10px;
  line-height: 40px;
}
.dropdownMenu{
  width: 200px;
}
.dropdownMenu i{
  float: right;
  margin-top: 12px;
  margin-right: 0;
}
hr{
  margin: 5px 0;
}
</style>
<style>
.el-dropdown{
  color: rgba(255, 255, 255, 0.8)!important;
}
.el-dropdown:hover{
  color: rgba(255, 255, 255, 1)!important;
}
.el-dropdown-menu{
  border: 0px!important;
}
.el-dropdown-menu__item{
  padding: 0 10px!important;
}
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
  color: #606266!important;
  background-color: rgba(204, 204, 204, 0.3)!important;
}
</style>