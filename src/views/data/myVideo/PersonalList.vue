<template>
  <div class="mvListPage">
    <p>独家放送</p>
    <mvList :mvList="mvList" width="48%" @getMvListId="getMvListId"/>
  </div>
</template>

<script>
import mvList from 'components/common/mvList/MvList'
import { getPrivateContent } from 'network/base/mv'

export default {
  data () {
    return {
      mvList:[]
    }
  },
  components: {
    mvList
  },
  created () {
    this.getPrivateContent();
  },
  methods: {
    //独家放送列表接口
    getPrivateContent(){
      getPrivateContent().then(res=>{
        // console.log(res);
        this.mvList = res.result
      })
    },
    //接收独家放送的id
    getMvListId(mvListId){
      this.$router.push({
        path:'/mvListResult',
        query:{
          id:mvListId
        }
      })
    }
  }
}
</script>

<style scoped>
.mvListPage{
  padding: 20px 40px;
}
.mvListPage>p{
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0 15px 0;
}
</style>