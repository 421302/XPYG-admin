<template>
  <div class="select-school">
    <my-location></my-location>
    <div class="select-box">
      <template>
        <el-select v-model="schoolData" placeholder="*请选择所在校区！" class="select">
          <el-option
            v-for="item in schools"
            :key="item.label"
            :label="item.value"
            :value="item.label">
          </el-option>
        </el-select>
        <el-button type="primary" class="btn-item" @click="next()">下一步</el-button>
      </template>
    </div>

    <router-view></router-view>

  </div>
</template>

<script>
  import myLocation from 'base/myLocation/myLocation';

  export default {
    data(){
      return {
        schoolData:"",
        schools:[],
      }
    },
    created(){
        //获取学校数据
      this.$axios.get('/api/school').then((res) => {
        this.schools = res.data;
      }).catch((err)=>{
        console.log(err);
      })

    },
    components: {
      myLocation
    },
    methods:{
      next(){
        this.$router.push({
          path:`/userAdmin_addUser/${this.schoolData}`
        });

      }

    }
  }
</script>

<style scoped lang="scss">
  .select-school{
    .select-box{
      padding:30px;
      margin-top:20px;
      .select{
        width: 50%;
        margin-left:50px;
        margin-right:20px;
      }
    }
  }


</style>
