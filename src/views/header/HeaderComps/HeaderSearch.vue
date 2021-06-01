<template>
  <div class="search">
    <i class="el-icon-arrow-left hover1"></i>
    <i class="el-icon-arrow-right hover1"></i>
    <el-input
      :placeholder="placeholder"
      prefix-icon="el-icon-search"
      @focus="focusInput()"
      @blur="blurInput()"
      maxlength="10"
      v-model="input"
      @keyup.enter.native="search">
    </el-input>
  </div>
</template>

<script>
export default {
  data () {
    return {
      placeholder:'搜索',
      input:'',
      oldInput:''
    }
  },
  methods: {
    //input焦点
    focusInput(){
      this.placeholder = ''
    },
    //input失去焦点
    blurInput(){
      this.placeholder = '搜索'
    },
    //用户按下enter键搜索
    search(){
      if(this.oldInput !== this.input && this.input !== ''){
        this.oldInput = this.input
        this.$router.push({
          path:'/search',
          query:{
            txt:this.input
          }
        });
      }
    }
  }
}
</script>

<style scoped>
.search{
  display: flex;
  margin-left: 0px;
  margin-top: 0px;
  line-height: 40px;
}
.search i{
  background-color: rgba(0,0,0,.1);
  border-radius: 50%;
  padding: 8px;
  margin: 5px 5px 5px 0;
}
.unClick{
  pointer-events: none;
}
.canClick{
  pointer-events: auto;
}
</style>
<style>
.el-input{
  margin-left: 10px!important;
}
.el-input--prefix .el-input__inner{
  background-color: rgba(0,0,0,.1)!important;
  border: 0px!important;
  border-radius: 20px!important;
  padding-left: 35px!important;
  color: #fff!important;
}
.el-input__inner::-webkit-input-placeholder { 
/* WebKit browsers */ 
color: rgba(255, 255, 255, 0.445)!important; 
} 
.el-input__inner:-moz-placeholder { 
/* Mozilla Firefox 4 to 18 */ 
color: rgba(255, 255, 255, 0.445)!important; 
} 
.el-input__inner::-moz-placeholder { 
/* Mozilla Firefox 19+ */ 
color: rgba(255, 255, 255, 0.445)!important; 
} 
.el-input__inner:-ms-input-placeholder { 
/* Internet Explorer 10+ */ 
color: rgba(255, 255, 255, 0.445)!important; 
}
.el-input__prefix{
  color: #fff!important;
  left: 10px!important;
}
</style>