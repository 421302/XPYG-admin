<template>
  <div class="my-location">
    <div class="title">
      <i class="el-icon-edit"></i>
      {{schoolName ? schoolName + "-->" : ""}}{{lastName}}
    </div>
    <div class="location">
      您的位置：{{firstName}} -->{{lastName}}
    </div>
  </div>
</template>

<script>
  import {address} from 'api/config.js';
  export default {
    props: {
      address: {
        type: String,
        default: ""
      }
    },
    data(){
      return {
        firstName: "",
        lastName: "",
        schoolName:""
      }
    },
    created(){
        //将获取路由处理然后匹配
      this._urlChange();
    },
    methods: {
      _urlChange(){
        this.schoolName = "";
        let path = this.$route.path;
        let nameIndex = path.indexOf("_");
        let schoolIndex = path.lastIndexOf("/");
        if(!schoolIndex){
          this.firstName = address[path.substring(1, nameIndex)];
          this.lastName = address[path.substr(nameIndex + 1)];
        }else{
          this.firstName = address[path.substring(1, nameIndex)];
          this.lastName = address[path.substring(nameIndex + 1,schoolIndex)];
          this.schoolName = address[path.substr(schoolIndex+1)]
        }
      }

    }

  }
</script>

<style scoped lang="scss">

  .my-location {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #f3f3f3;
    padding: 0 25px;
    .title {
      float: left;
      font-weight: 800;
      i {
        padding-right: 3px;
      };
    }
    .location {
      float: right;
      font-size:14px;
      color:#3485fb;
    }
  }

</style>
