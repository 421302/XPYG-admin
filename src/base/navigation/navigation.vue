

<template>
  <div class="nav-wrapper">
    <el-row class="tac" ref="tac">
      <h5 class="center-title"><i class="el-icon-menu"></i>管理中心</h5>
      <el-col class="nav-slider">
        <el-menu
          class="el-menu-vertical-demo"
          :default-openeds='[matchRouter.father]'
          :default-active='matchRouter.son'
          :unique-opened="true"
          @select="handleSelect"
        >
          <el-submenu v-for="(items,key1,index1) in list" :index="index1+''" :key="index1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{key1}}</span>
            </template>
            <el-menu-item v-for="(item,key2,index2) in items" :index="index1+'-'+index2" :key="index2">
              <router-link :to="item" tag="div">
                {{key2}}
              </router-link>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {nav} from 'api/config.js';
  import Bus from 'base/bus/bus';
  export default {
    props:{
        //角色配置
      select: {
        type: String,
        default: "student"
      }
    },
    data(){
        return{
          list:{},
          matchRouter:{
              father:"",
              son:""
          }
        }
    },

    created(){
        //获取菜单数据
        this._instanceof();
        //菜单与路由匹配
        this._matchRouter();
       /* Bus.$on('addUser',()=>{
          this.matchRouter.son = "0-1";
        });
        Bus.$on('batchImport',()=>{
          this.matchRouter.son = "0-2";
        });*/
    },
    methods: {
      _instanceof(){
        this.list = nav[this.select];
      },
      _matchRouter(){
        let path = this.$route.path;
        let middle = path.lastIndexOf("/");
        let handleRoute = path;
        if(middle){
          handleRoute = path.substring(0,middle);
        }
          Object.keys(this.list).forEach((item,index)=> {
            Object.keys(this.list[item]).forEach((subItem,subIndex)=> {
                if(handleRoute === this.list[item][subItem]){
                    this.matchRouter.father = index + "";
                    this.matchRouter.son = index + '-' + subIndex;
                    return;
                }
            })
          });
          console.log(this.matchRouter);
      },
      handleSelect(index){
        this._matchRouter();
        this.matchRouter.son = index;
      }
    }
  }

</script>

<style scoped lang="scss">

  .nav-wrapper{
    .nav-slider{
      border:1px solid #e6e6e6;
      border-right:none;
    }
    .center-title{
      width:200px;
      height:50px;
      line-height: 50px;
      padding-left:15px;
      border-radius: 5px 5px 0 0;
      background: #3485fb;
      color:#fff;
      font-size:16px;
    i{
      margin-right:6px;
    }
    }
  }

</style>
