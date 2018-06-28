<template>
  <div class="add-group">
    <my-location></my-location>
    <div class="wrapper">
      <!--父类结构-->
      <div class="input-item">
        <span class="label">父 类：</span>
        <el-cascader
          class="select"
          :options="options"
          change-on-select
          @change="change"
          ref="select"
          clearable
        ></el-cascader>
      </div>

      <!--名称-->
      <div class="input-item">
        <span class="label">名 称：</span>
        <input type="text" ref="name" @blur="_blur()">
        <span class="title" v-show="nameTitle">{{nameTitle}}</span>
      </div>

      <!--类型单选框-->
      <div class="input-item">
        <span class="label">类 型：</span>
        <template>
          <el-radio-group v-model="radioType" class="radio-group" @change="radioChange()">
            <el-radio :disabled="isDisabled[index]"   :label="item.label" :key="item.label" v-for="(item,index) in radio" class="radio-item">{{item.value}}</el-radio>
          </el-radio-group>
        </template>
        <span class="title" v-show="radioTitle">{{radioTitle}}</span>
      </div>

      <!--按钮组-->
      <el-row class="btn-group">
        <el-button type="primary" class="btn-item" @click="submit()">提交</el-button>
        <el-button type="primary" class="btn-item" @click="reset()">重置</el-button>
      </el-row>
    </div>

  </div>
</template>

<script>
  import myLocation from 'base/myLocation/myLocation';
  import {radioType} from 'api/config';
  export default {
    data() {
      return {
        options:[],                                  //父分类数据
        radio:[],                                     //类型单选框数据
        radioType:1,                                //类型单选框值
        fatherType:[],                               //选中的父分类的结构
        isDisabled:[false,false,false,false],      //类型单选框的可用状态
        nameTitle:"",                                 //名称提示
        radioTitle:"",                                 //类型单选框提示
      }
    },
    created(){
        //获取父级分类数据
      this.$axios.get('/api/tree').then((res) => {
        this.options = res.data.arr;
      }).catch((err)=>{
        console.log(err);
      });
      //获取分组类型数据
      this.$axios.get('/api/type').then((res) => {
        this.radio = res.data;
      }).catch((err)=>{
        console.log(err);
      });

    },
    components: {
      myLocation
    },
    methods: {
      //选中分类的改变事件
      change(value){
          this.fatherType = value;
          //类型单选框的重置
          if(!value.length){
            this._seatDisabled(false);
            return;
          }
          this._seatDisabled(false);
          var type = value[value.length-1];
          var index = type.indexOf("_");
          if(index == -1){
            type = type.substr(0);
          }else{
            type = type.substring(0,index);
          }
          //radioType -- 类型匹配 给this.radioType赋值
          let arr = Object.keys(radioType);
          this.radioType = radioType[type]+1;
          if(!radioType[type] || radioType[type] === arr.length){
            this.radioType = 0;
          }
         //单选框在选中状态 提示置空
          if(this.radioType){
              this.radioTitle="";
          }
          //选中结构 不匹配的显示不可用
          for(let i=0;i<radioType[type];i++){
            this.isDisabled[i] = true;
          }

      },
      //提交
      submit(){
        if(!this.$refs.name.value.trim()){
            this.nameTitle = "* 请输入分组名称！";
        }
        if(!this.radioType){
          this.radioTitle = "* 请选择类型！";
        }
        let data = {
            fatherType: this.fatherType,
            name:this.$refs.name.value.trim(),
            radioType:this.radioType
        };
        if(!(this.nameTitle || this.radioTitle)){
            this.$axios.get("/addGroup",data).then((res)=>{
                console.log(res.data);
            }).catch((res)=>{
                console.log(res);
            })
        }

      },
      //重置
      reset(){
          this.$refs.name.value = "";
          this.nameTitle = "";
          this.radioType = 0;
          this.radioTitle = "";
          //联级选择器置空
          let obj = {};
          obj.stopPropagation = () =>{};
          this.$refs.select.clearValue(obj);
      },
      // 改变单选框的时候判断是否显示提示
      radioChange(){
          if(this.radioType <= this.radio.length){
            this.radioTitle = "";
          }
      },
      //联级选择器置空  **********?
      clearValue(ev){
          ev.stopPropagation();
          this.handlepick([],true);
      },

      //设置类型单选框的可用状态
      _seatDisabled(value){
        this.isDisabled = [value,value,value,value];
      },

      //input 失焦判断
      _blur(){
          // 失去焦点如果input里面有内容不显示提示
          if(this.$refs.name.value){
            this.nameTitle = "";
          }
          //失去焦点内容去前后空格
          this.$refs.name.value = this.$refs.name.value.trim();
      },

    }
  }
</script>

<style scoped lang="scss">
  .add-group {
    width: 100%;
    .wrapper {
      padding: 50px 20px;
      .input-item{
        position: relative;
        margin-bottom:30px;
        .label{
          display: inline-block;
          width:180px;
          height: 38px;
          line-height: 38px;
          vertical-align: middle;
          text-align: right;
          margin-right:10px;
        }
        .select {
          width:35%;
        }
        input{
          width:35%;
          height:40px;
          line-height: 40px;
          border-radius: 4px;
          border:1px solid #dcdfe6;
          padding:2px 15px;
        }
        .radio-group{
          width:40%;
          .radio-item{
            height:35px;
            line-height: 35px;
            margin-left:10px;
            margin-right:10px;
          }
        }
        .title{
          margin-left:20px;
          font-size:12px;
          color:red;
        }
      }

  .btn-group{
    position:relative;
    top:0;
    left:180px;
    .btn-item{
      width:100px;
      margin:0 15px 0 25px;
    }
  }



      /*.btn-group{
        padding-left:180px;
        .btn-item{
          width:100px;
          margin:0 15px 0 25px;
        }
      }*/
    }
  }

</style>
