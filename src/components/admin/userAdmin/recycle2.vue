<template>
  <div class="admin-center">
    <router-link to="/userAdmin" tag="div" class="tab-item">
      <span class="tab-link">用户管理</span>
    </router-link>
    <router-link to="/schoolAdmin" tag="div" class="tab-item">
      <span class="tab-link">学校管理</span>
    </router-link>
    <router-link to="/groupAdmin" tag="div" class="tab-item">
      <span class="tab-link">分组管理</span>
    </router-link>
  </div>
</template>

<script>


  export default {

  }
</script>

<style scoped lang="scss">

</style>
