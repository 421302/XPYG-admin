<template>
  <div class="admin-center">
    <div class="nav">
      <!--使用navigation组件需传递一个角色-->
      <navigation :select="roleType"></navigation>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navigation from 'base/navigation/navigation'
  export default {
    data(){
      return{
        roleType:"admin"
      }
    },
    components:{
        navigation
    }
  }

</script>

<style scoped lang="scss">
  .admin-center{
    width:1000px;
    margin:0 auto;
    padding-top:10px;
    .nav{
      float:left;
      width:200px;
    }
    .content{
      float:right;
      width: 780px;
      min-height:500px;
      border:1px solid #e6e6e6;
      border-radius: 5px;
    }
  }

</style>
