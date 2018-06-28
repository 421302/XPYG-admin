<template>
  <div class="role-admin">
    <my-location></my-location>
    <div class="role-box">
      <div class="btn-group">
        <el-button type="primary" class="btn-item" icon="el-icon-edit" @click="addUser()">新增用户</el-button>
        <el-button type="primary" class="btn-item" icon="el-icon-tickets" @click="batchImport()">批量添加</el-button>
        <el-button type="primary" class="btn-item" icon="el-icon-close" @click=" ">批量禁用</el-button>
        <el-button type="primary" class="btn-item" icon="el-icon-check" @click=" ">批量解禁</el-button>
        <el-button type="primary" class="btn-item" icon="el-icon-delete" @click=" ">批量删除</el-button>
      </div>
      <!--搜索条件框-->
      <div class="input-box">
        <!--学校-->
        <div class="input-item">
          <label class="label">学校：</label>
          <el-select v-model="selectData.school" @change="schoolChange" clearable placeholder="请选择校区" class="input">
            <el-option
              v-for="item in schools"
              :key="item.label"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--分组-->
        <div class="input-item">
          <label class="label">分组：</label>
          <el-cascader
            class="input"
            ref="select"
            :options="options"
            @change="groupChange"
            change-on-select
            clearable
          ></el-cascader>
        </div>
        <!--角色-->
        <div class="input-item">
          <label class="label">角色：</label>
          <el-select v-model="selectData.rol" clearable placeholder="请选择角色" class="input">
            <el-option
              v-for="item in rols"
              :key="item.label"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--性别-->
        <div class="input-item">
          <label class="label">性别：</label>
          <el-select v-model="selectData.sex" clearable placeholder="请选择性别" class="input">
            <el-option
              v-for="item in sex"
              :key="item.label"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--账号状态-->
        <div class="input-item">
          <label class="label">账号状态：</label>
          <el-select v-model="selectData.state" clearable placeholder="账号状态" class="input">
            <el-option
              v-for="item in state"
              :key="item.label"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--其他-->
        <div class="input-item">
          <label class="label">其他：</label>
          <el-input  placeholder="请输入账号/学号/姓名/邮箱/手机号" class="input" v-model.trim="selectData.else"></el-input>
        </div>
      </div>
      <!--搜索按钮-->
      <div class="select-btn">
        <el-button type="primary" class="btn-item" :disabled="btnDisabled" icon="el-icon-search" @click="search()">模糊搜索</el-button>
      </div>
      <!--表格-->
      <div class="tab-box">
        <template>
          <el-table
            class="tab"
            :data="tableData"
            style="width:100%"
            stripe
            height="404">
            <el-table-column
              fixed
              align="center"
              type="selection"
              width="50">
            </el-table-column>

            <el-table-column
              v-for="item in tableHead"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :key="item.prop"
              align="center"
            >
            </el-table-column>

            <el-table-column
              fixed="right"
              align="center"
              prop="operation"
              label="操作"
              width="90">
                <template slot-scope="scope">
                  <el-button type="text" size="small" class="tab-btn" @click="disabled(scope.row)">禁用</el-button>
                  <el-button type="text" size="small" class="tab-btn" @click="remove(scope.row)">删除</el-button>
                  <el-button type="text" size="small" class="tab-btn" @click="look(scope.row)">查看</el-button>
                  <el-button type="text" size="small" class="tab-btn" @click="editor(scope.row)">编辑</el-button>
                </template>
            </el-table-column>

          </el-table>
        </template>
        <!--分页-->
        <template>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="paging.currentPage"
              :page-size="paging.page"
              :page-sizes="[paging.page]"
              layout="total, prev, pager, next, jumper"
              :total="paging.pageLen">
            </el-pagination>
          </div>

        </template>

      </div>
    </div>
  </div>
</template>
<script>
  import myLocation from 'base/myLocation/myLocation';
  import Bus from 'base/bus/bus';
  import * as config from 'api/config';
  export default {
    data(){
      return{
        schools:[],  //学校数据
        rols:[],  //角色数据
        sex:[],  //性别数据
        state:[],  //状态
        selectData:{       //input框选择值
          school:"",
          rol:"",
          sex:"",
          state:"",
          group:"",
          else:""
        },
        options:[{
          value: 'select',
          label:'*请先选择学校,再来选择分组！',
          disabled: true,
        }],
        //表格数据
        tableHead:[],
        tableData:[],
        checked: true,
        allData:[],  //请求的所有数据
        filterData:[],  //过滤后的数据
        //分页配置
        paging:{
          currentPage:1,
          page:5,
          pageLen:0
        },
        btnDisabled:true,   //模糊搜索按钮的可以状态

      }
    },
    created(){
      /************渲染前的配置，数据获取****************/
        //角色数据
        this.rols = config.roleConfig;
        //性别
        this.sex = config.sexConfig;
        //状态
        this.state = config.stateConfig;
      //获取学校数据
      this.$axios.get('/api/school').then((res) => {
        if(res.status === 200){
          this.schools = res.data;
        }
      }).catch((err)=>{
        console.log(err);
      });

    },
    mounted(){
      /************表格数据获取****************/
      //表头数据
      this.tableHead = config.tableHead;
      //表格数据
      this.$axios.get('/api/rolManage').then((res) => {
        if(res.status === 200){
            let data = res.data.arr;
            if(!data.length){
              this.btnDisabled = true;
                return;
            }
          this.allData = res.data.arr;
          this.filterData = this.allData;
          this.handleTabData(this.filterData,0,this.paging.page);
        }
      }).catch((err)=>{
        console.log(err);
      });
    },
    components: {
      myLocation
    },
    methods:{
        //表格分页数据处理
      handleTabData(data,startIndex,endIndex){
        this.btnDisabled = false;
        this.paging.pageLen = data.length;
        this.tableData = data.slice(startIndex,endIndex);
      },
 /************选择学校后获取分组数据****************/
      schoolChange(data){
          //分组置空
         let obj = {};
         obj.stopPropagation = () =>{};
         this.$refs.select.clearValue(obj);

        if(data){
          this.$axios.get('/api/tree',{"data":data}).then((res) => {
             if(res.status === 200){
               this.options = res.data.arr;
             }
           }).catch((err)=>{
            console.log(err);
           });
        }else{
          this.options = [{
            value: 'select',
            label:'*请先选择学校,再来选择分组！',
            disabled: true,
          }];
        }

      },
      //学校变化后分组置空
      clearValue(ev){
        ev.stopPropagation();
        this.handlepick([],true);
      },
 /***********************按钮组**************************/
 //路由跳转
      addUser(){
         this.$router.push({
           path:"/userAdmin_addUser"
         });
         Bus.$emit('addUser',"/userAdmin_addUser");
         //  window.location.reload();
       },
      batchImport(){
        this.$router.push({
          path:"/userAdmin_batchImport"
        });
        Bus.$emit('batchImport',"/userAdmin_batchImport");
      },
      //表格数据操作
      disabled(row){
          console.log("禁用");
      },
      remove(row){
        console.log(123);
      },
      look(row) {
        console.log("查看");
        console.log(row);
      },
      editor(row){
          console.log("编辑");
      },
/***********************分页**************************/
      handleCurrentChange(val) {
        this.handleTabData(this.filterData,(val*this.paging.page-this.paging.page),val*this.paging.page)

      },
      /***********************分组赋值**************************/
      groupChange(val){
          if(val){
            this.selectData.group = val.join("/");
          }
      },
      /***********************模糊搜索**************************/
      search(){
        if(!this.allData){
            return
        }
        let range = {};
        let flag = false;
        for(let key in this.selectData){
            if(this.selectData[key]){
              if( key !== "else"){
                range[key] = this.selectData[key];
              }else{
                  flag = true;
              }
            }
        }
        let keys = Object.keys(range);
        this.filterData = this.allData.filter((item)=>{
            //条件有问题
            if(flag){
                if(keys.length){
                  return keys.every(key => {
                    return (this.selectData[key] === item[key] && (this.selectData.else === item.accountNum || this.selectData.else === item.studentNum || this.selectData.else === item.name || this.selectData.else === item.emil || this.selectData.else === item.tel));
                  });
                }else{
                  return this.selectData.else === item.accountNum || this.selectData.else === item.studentNum || this.selectData.else === item.name || this.selectData.else === item.emil || this.selectData.else === item.tel;
                }
            }else{
              return keys.every(key => {
                return this.selectData[key] === item[key];
              });

            }


        });
        this.handleTabData(this.filterData,0,this.paging.page);
      },

    }
  }
</script>
<style scoped lang="scss">
  .role-admin{
    .role-box{
      padding:30px;
      .btn-group{
        margin-bottom:30px;
      }
      .input-box{
        .input-item{
          display: inline-block;
          width: 49%;
          margin-bottom:20px;
          .label{
            display: inline-block;
            width: 70px;
            text-align: right;
            font-size: 14px;
          }
          .input{
            width: 70%;
          }
        }
      }
    .select-btn{
      margin-bottom:30px;
      padding-right:40px;
      text-align: right;
    }
    .tab-box{
      margin:0  -25px 20px -20px;
      .tab{
        margin-bottom:20px;
        .tab-btn{
          margin-left:0;
          padding:0;
        }
      }

      .block{
        text-align: right;
      }
    }
    }
  }

</style>
<style>
  .el-table th{
    background: #409EFF;
    color:#fff;
  }
  .el-table__empty-text{
    left:23%;
  }

</style>
