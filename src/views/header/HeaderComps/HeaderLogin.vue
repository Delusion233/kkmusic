<template>
  <div class="login">
    <img :src="avatarUrl||require('assets/image/bg/fly.jpg')" alt="">
    <div class="loginText">
      <el-dropdown v-if="isLogin" trigger="click"  @command="handleCommand">
        <span class="el-dropdown-link hover1">
          {{nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="dropdownMenu">
          <el-dropdown-item command="vvvip" icon="el-icon-grape">会员中心<i class="el-icon-arrow-right"></i>
          </el-dropdown-item>
          <el-dropdown-item command="grade" icon="el-icon-watermelon">等级<i class="el-icon-arrow-right"></i>
          </el-dropdown-item>
          <el-dropdown-item command="shop" icon="el-icon-apple">商城<i class="el-icon-arrow-right"></i>
          </el-dropdown-item>
          <el-dropdown-item command="message" icon="el-icon-pear">个人信息<i class="el-icon-arrow-right"></i>
          </el-dropdown-item>
          <hr>
          <el-dropdown-item command="logout" icon="el-icon-orange">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span v-else class="hover1" @click="isOpen = true">登录</span>
    </div>
    <div class="loginBox" v-show="isOpen">
      <p class="close" title="关闭" @click="isOpen = false"></p>
      <input class="input" type="text" 
      placeholder="请输入手机号" v-model="input">
      <br><input class="input" type="password" 
      placeholder="请输入密码" v-model="password" @keyup.enter="submit">
      <br><input class="btn" type="submit" value="登录" @click="submit">
      <br><a href="#">注册</a>
      <p class="agree">
        <input id="color-input-red" 
        class="chat-button-location-radio-input" 
        type="checkbox" name="color-input-red"
        value="#f0544d"
        v-model="checked">
        <label for="color-input-red"></label>
        同意<span>《服务条款》《隐私政策》</span>
      </p>
    </div>
  </div>
</template>

<script>
import { getLogin, logout } from 'network/base/header'
import { setItem, getItem } from 'common/util'
export default {
  data () {
    return {
      avatarUrl:'',
      nickname:'',
      isLogin:false,
      isOpen:false,
      input:'18122467454',
      password:'',
      checked:false
    }
  },
  inject: ['reload'],
  created () {
    if (getItem('login')) {
      this.isLogin = true
      this.avatarUrl = getItem('login').avatarUrl
      this.nickname = getItem('login').nickname
    }
  },
  methods: {
    //登录
    submit(){
      if (!this.checked) {
        this.$toast.show('请勾选同意条款',1500);
      }else if (this.input === '' || this.password === '') {
        this.$toast.show('请输入账号或者密码',1500);
      }else if(!this.isPhoneNum(this.input)){
        this.$toast.show('请输入正确的手机号码',1500);
      }else{
        this.getLogin();
      }
    },
    //登录接口
    getLogin(){
      getLogin(this.input,this.password).then(res=>{
        console.log(res);
        if (res.code===200) {
          this.isOpen = false
          this.isLogin = true
          // this.$toast.show('登录成功',1500);
          this.avatarUrl = res.profile.avatarUrl
          this.nickname = res.profile.nickname
          setItem('login',{
            userId:res.profile.userId,
            avatarUrl:res.profile.avatarUrl,
            nickname:res.profile.nickname
          })
          //刷新页面
          this.reload();
        }else{
          this.$toast.show('登录失败',1500);
        }
      })
    },
    //登出接口
    logout(){
      logout().then(res=>{
        if (res.code===200) {
          this.$toast.show('退出成功',1500);
          //清除信息
          window.localStorage.removeItem('login');
          //跳回至首页
          this.$router.replace('/');
          //刷新页面
          this.reload();
        }
      })
    },
    isPhoneNum(phone) {
      return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)
    },
    //下拉菜单监听
    handleCommand(command){
      switch (command) {
        case 'vvvip': console.log('会员中心'); break;
        case 'grade': console.log('等级'); break;
        case 'shop': console.log('商城'); break;
        case 'message': console.log('个人信息'); break;
        case 'logout': this.logout(); break;
      }
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
.loginBox{
  width: 400px;
  height: 400px;
  background-color: #FFF;
  box-shadow: 0 0 10px #ccc;
  position: fixed;
  top: 55%;
  margin-top: -300px;
  margin-left: -200px;
  left: 50%;
  right: 50%;
  z-index: 9;
  padding-top: 100px;
}
.close{
  position: absolute;
  top: 10px;
  right: 20px;
  color: #000;
  font-size: 15px;
}
.close::before{
  display: block;
  content:"\2718";
  width: 20px;
  height: 20px;
  color: #000;
}
.agree{
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  color: #666;
  font-size: 13px;
}
.agree>span{
  color: rgba(86,86,206,1);
  cursor: pointer;
}
input[type=checkbox]{
	visibility: hidden;
}
#color-input-red +label{
  display: block;
  width: 12px;
  height: 12px;
  cursor: pointer;
  position: absolute;
  top: 1px;
  left: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
#color-input-red:checked{
  border: 10px;
}
#color-input-red:checked +label::before{
  display: block;
  content: "\2714";
  width: 12px;
  height: 12px;
  border-radius: 3px;
  text-align: center;
  font-size: 12px;
  color: white;
  background: #FF7878;
  border: 1px solid #FF7878;
  position: absolute;
  left: -1px;
  top: -1px;
  line-height: 13px;
}
.close:hover{
  cursor: pointer;
}
.btn{
  width: 250px;
  height: 46px;
  border: 0px;
  color: #fff;
  background-color: #FF7878;
  margin: 20px 0 10px 0;
  border-radius: 5px;
  font-size: 16px;
  transition: .5s ease background-color;
  box-shadow: 0 0 10px #eee;
}
.btn:hover,.btn:active{
  background-color: rgb(197, 94, 94);
}
.input{
  width: 210px;
  height: 40px;
  border: 0px;
  color: #FF7878;
  box-shadow: 0 0 10px #eee;
  margin-top: 10px;
  border: 0;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
  padding: 0 20px;
}
::-webkit-input-placeholder { color:#999; }
::-moz-placeholder { color:#999; } /* firefox 19+ */
:-ms-input-placeholder { color:#999; } /* ie */
input:-moz-placeholder { color:#999; }
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