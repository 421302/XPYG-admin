<template>
  <transition name="slide">
  <div class="add-user">
    <my-location></my-location>
    <div class="user-info">
      <!--账号&学号-->
      <el-row class="user-line">
        <el-col :span="12">
          <div class="user-item">
            <label>账号：</label>
            <input type="text" placeholder="请输入账号！" v-model.trim="inputGroup.account.value" @blur="_blur(inputGroup.account)">
            <span class="err-title">{{inputGroup.account.hint}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="user-item">
            <label>教师/学生号：</label>
            <input type="text" placeholder="请输入教师/学生号！" class="tch-num" v-model.trim="inputGroup.id.value" @blur="_blur(inputGroup.id)">
            <span class="err-title">{{inputGroup.id.hint}}</span>
          </div>
        </el-col>
      </el-row>
      <!--密码&确认密码-->
      <el-row class="user-line">
        <el-col :span="12">
          <div class="user-item">
            <label>密码：</label>
            <input type="text"  placeholder="请输入密码！" v-model.trim="inputGroup.password.value" @blur="_blur(inputGroup.password)">
            <span class="err-title">{{inputGroup.password.hint}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="user-item">
            <label>确认密码：</label>
            <input type="text" placeholder="请确认密码！" class="confirm-pass" v-model.trim="inputGroup.repassword.value" @blur="_blur(inputGroup.repassword)">
            <span class="err-title">{{inputGroup.repassword.hint}}</span>
          </div>
        </el-col>
      </el-row>
      <!--邮箱&手机号-->
      <el-row class="user-line">
        <el-col :span="12"><div class="user-item">
          <label>邮箱：</label>
          <input type="text"  placeholder="请输入邮箱！" v-model.trim="inputGroup.emil.value" @blur="_blur(inputGroup.emil)">
          <span class="err-title">{{inputGroup.emil.hint}}</span>
        </div>
        </el-col>
        <el-col :span="12">
          <div class="user-item">
            <label>手机号：</label>
            <input type="text" placeholder="请输入手机号！" class="tel" v-model.trim="inputGroup.tel.value" @blur="_blur(inputGroup.tel)">
            <span class="err-title">{{inputGroup.tel.hint}}</span>
          </div>
        </el-col>
      </el-row>
      <!--姓名&性别-->
      <el-row class="user-line">
        <el-col :span="12">
          <div class="user-item">
            <label>姓名：</label>
            <input type="text"  placeholder="请输入姓名！" v-model.trim="inputGroup.name.value" @blur="_blur(inputGroup.name)">
            <span class="err-title">{{inputGroup.name.hint}}</span>
          </div>
        </el-col>
        <el-col :span="12"><div class="sex">
          <label class="label">性别：</label>
          <el-radio-group v-model="radioType" class="radio">
            <el-radio :label="1">女</el-radio>
            <el-radio :label="2">男</el-radio>
            <el-radio :label="3">不明</el-radio>
          </el-radio-group>
        </div></el-col>
      </el-row>
      <!--角色-->
      <el-row class="user-line">
        <el-col :span="24"><div class="rol">
          <label class="label">角色：</label>
          <el-checkbox-group v-model="checkList" class="checkbox" @change="checkboxChange">
            <el-checkbox label="student">学生</el-checkbox>
            <el-checkbox label="teacher">老师</el-checkbox>
            <el-checkbox label="education">教务</el-checkbox>
            <el-checkbox label="admin">管理员</el-checkbox>
          </el-checkbox-group>
          <span class="err-title checkbox-tip">{{rolHint}}</span>
        </div></el-col>
    </el-row>
      <!--分类-->
      <el-row class="user-line">
        <el-col :span="24"><div class="rol">
          <label class="label">分类：</label>
          <el-tree
            class="tree"
            :data="options"
            node-key="id"
            accordion
            check-strictly
            show-checkbox
            ref="tree"
            highlight-current
            @check-change="treeChange"
            :props="defaultProps">
          </el-tree>
          <span class="classify">{{classifyHint}}</span>
        </div></el-col>
      </el-row>
      <!--按钮组-->
      <el-row class="btn-group">
        <el-button type="primary" class="btn-item" @click="submit()">提交</el-button>
        <el-button type="primary" class="btn-item" @click="reset()">重置</el-button>
      </el-row>
    </div>
  </div>
  </transition>
</template>

<script>
  import myLocation from 'base/myLocation/myLocation';
  import {inputHint} from 'api/config';   //提示枚举

  export default {
    data(){
      return {
        schoolName:"",
        options:[],                                     //分类数据
        radioType:1,                                   //性别单选框值
        checkList:["student","admin"],                //角色复选框的值
        defaultProps: {
          children: 'children',
          label: 'label'
        },   //element ui tree 属性
        inputGroup:{
            account:{
                value:"",
                hint:""
            },
            id:{
              value:"",
              hint:""
            },
            password:{
                value:"",
                hint:""
            },
            repassword:{
                value:"",
                hint:""
            },
            emil:{
                value:"",
                hint:""
            },
            tel:{
                value:"",
                hint:""
            },
            name:{
                value:"",
                hint:""
            }
        },                           //input 值及提示
        rolHint:"",                                //角色提示
        classifyHint:""                           //分类提示
      }
    },
    created(){
      this.handleRoute();
        //获取不同学校对应的分类
      this.$axios.get('/api/tree',{name:this.schoolName}).then((res) => {
        this.options = res.data.arr;
        console.log(this.schoolName)
      }).catch((err)=>{
        console.log(err);
      });
    },
    components: {
      myLocation
    },
    methods:{
        handleRoute(){
          let schoolName = this.$route.path;
          let index = schoolName.lastIndexOf("/");
          if(!index){
              return;
          }
          this.schoolName = schoolName.substr(index+1);
        },

      // 分类树形结构 的单选功能
      treeChange(data){
          let checkedArr = this.$refs.tree.getCheckedKeys();
          if(checkedArr.length){
              this.classifyHint = "";
              if(checkedArr.length>1){
                this.$refs.tree.setCheckedKeys([data.id]);
              }
          }
      },

      //提交
      submit(){
          //input为空 显示提示内容
          let flag = false;
          for(let key in this.inputGroup){
              if(!this.inputGroup[key].value){
                  this.inputGroup[key].hint = "*请输入"+inputHint[key] + "!";
                  flag = true;
              }
          }
          //角色复选框为空 显示提示
          if(!this.checkList.length){
              this.rolHint = "*请选择角色！";
          }
          //分类为选择  显示提示
          if(!this.$refs.tree.getCheckedKeys().length){
              this.classifyHint = "*请选择分类！";
          }
          //以上验证都通过 发送请求 弹出层显示提交结果
          if(!(flag || this.rolHint || this.classifyHint)){
            let data = {
              "account":this.inputGroup.account.value,
              "id":this.inputGroup.id.value,
              "password":this.inputGroup.password.value,
              "repassword":this.inputGroup.repassword.value,
              "emil":this.inputGroup.emil.value,
              "tel":this.inputGroup.tel.value,
              "name":this.inputGroup.name.value,
              "rol":this.checkList,
              "classify":this.$refs.tree.getCheckedKeys()[0],
              "sex":this.radioType
            };
            this.$axios.post('/addUser',data).then((res)=>{
                if(res.status === 200){
//                    console.log(data);
                    this.$msgbox({
                      message:"提交成功",
                      title:"提示",
                      showConfirmButton:false,
                      closeOnClickModal:false,
                      callback:function () {}
                    });
                }
            }).catch((res)=>{
              this.$msgbox({
                message:res,
                title:"提示",
                showConfirmButton:false,
                closeOnClickModal:false,
                callback:function () {}
              });
            });
          }

      },

      //角色复选框长度大于1 提示为空
      checkboxChange(data){
        if(data.length){
          this.rolHint = "";
        }
      },

      //input 失焦有内容提示为空
      _blur(input){
          if(input.value){
              input.hint = "";
          }
      },

      //重置
      reset(){
          //input 值和提示都置空
          for(let key in this.inputGroup){
              this.inputGroup[key].value = "";
              this.inputGroup[key].hint = "";
          }
          //分类及角色 置空
          this.checkList = [];
          this.rolHint = "";
          this.$refs.tree.setCheckedKeys([]);
          this.classifyHint = "";
      }

    }
  }
</script>

<style scoped lang="scss">
  .slide-enter-active,.slide-leave-active{
    transition:all 0.3s;
  }
  .slide-enter,.slide-leave-to{
    transform:translateY(100%);
  }
  .add-user{
    position: absolute;
    top:90px;
    left:395px;
    width:780px;
    background: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 5px;

    .user-info{
      padding:30px;
      .user-line{
        position: relative;
        margin-bottom:25px;
        .err-title{
          position: absolute;
          top:36px;
          left:10px;
          font-size:14px;
          color:red;
        }
        .checkbox-tip{
          top:6px;
          left:392px;
        }
      /* 性别*/
        .sex{
          position: relative;
          width:80%;
          border:1px solid #ccc;
          border-radius: 5px;
            .label{
              position: absolute;
              top:8px;
              left:10px;
              color:#3485fb;
              font-size:14px;
            }
            .radio{
              margin-left:60px;
              padding-top:10px;
              height: 35px;
            }
        }
  /* 角色*/
      .rol{
        position: relative;
        .label{
          position: absolute;
          top:6px;
          left:10px;
          color:#3485fb;
          font-size:14px;
        }
        .checkbox{
          margin-left:60px;
          padding-top:8px;
          height: 35px;
        }
        .tree{
          width:82%;
          margin-left:60px;
          height: 150px;
          overflow-y: scroll;
          background:#f3f3f3;
        }
        .classify{
          position: absolute;
          bottom:-23px;
          left:68px;
          font-size:14px;
          color:red;
        }
      }
        .user-item{
          position: relative;
          label{
            position: absolute;
            top:8px;
            left:10px;
            color:#3485fb;
            font-size:14px;
          }
          input{
            width:80%;
            height: 35px;
            border-radius: 5px;
            border:1px solid #ccc;
            padding:3px 3px 3px 50px;
          }
          input.tch-num{
            padding-left:100px;
          }
          input.confirm-pass{
            padding-left: 80px;
          }
          input.tel{
            padding-left:68px;
          }
        }
      }
      .btn-group{
        padding-left:150px;
        padding-top:20px;
        .btn-item{
          width:130px;
          margin-right:50px;
        }
      }
    }
  }


</style>
