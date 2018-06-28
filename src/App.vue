<template>
  <div id="app">
    <div class="head-wrapper">
      <head-icon></head-icon>
    </div>
    <admin-center></admin-center>
  </div>
</template>

<script>
  import headIcon from 'components/headIcon/headIcon.vue';
  import adminCenter from 'components/admin/adminCenter.vue';

  export default {
    components:{
        headIcon,
        adminCenter
    },

  }
</script>

<style scoped lang="scss">
  #app{
    width:100%;
    height:100%;
    .head-wrapper{
      width:100%;
      background: #f3f3f3;
    }

  }
</style>
