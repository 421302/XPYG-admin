<template>
  <div class="head">
    <div class="icon">
      <a href="">
        <img src="./icon1.jpg" alt="点击回首页">
      </a>
      <img src="./icon2.jpg" alt="展示图">
    </div>
    <div class="logo">
      <p>欢迎三胖</p>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped >
  .head{
    width:1000px;
    height: 80px;
    margin:0 auto;
    .icon{
      float:left;
      font-size:0;
      img{
        height:80px;
        vertical-align: middle;
      }
    }
    .logo{
      float:right;
      line-height:80px;
      margin-right:30px;
    }
  }

</style>
