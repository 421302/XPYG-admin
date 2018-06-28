<template>
  <div class="add-school">
    <my-location></my-location>
    <div class="school-info">

      <!--学校名称&英文缩写-->
      <el-row class="input-group">
        <el-col :span="12" class="input-item">
          <label>学校名称：</label>
          <input type="text" placeholder="请输入学校名称！" class="add-padding" v-model.trim="inputGroup.schoolName.val" @blur="_blur(inputGroup.schoolName)">
          <span class="err-title">{{inputGroup.schoolName.err}}</span>
        </el-col>
        <el-col :span="12" class="input-item">
          <label>英文缩写：</label>
          <input type="text" placeholder="请输入英文缩写！" class="add-padding" v-model.trim="inputGroup.englishName.val" @blur="_blur(inputGroup.englishName)">
          <span class="err-title">{{inputGroup.englishName.err}}</span>
        </el-col>
      </el-row>

      <!--网址&地址-->
      <el-row class="input-group">
        <el-col :span="12" class="input-item">
          <label>网址：</label>
          <input type="text" placeholder="请输入网址！" v-model.trim="inputGroup.url.val" @blur="_blur(inputGroup.url)">
          <span class="err-title">{{inputGroup.url.err}}</span>
        </el-col>
        <el-col :span="12" class="input-item">
          <label>地址：</label>
          <input type="text" placeholder="请输入地址！" v-model.trim="inputGroup.address.val" @blur="_blur(inputGroup.address)">
          <span class="err-title">{{inputGroup.address.err}}</span>
        </el-col>
      </el-row>

      <!--学校logo-->
      <el-row class="input-group">
        <el-col :span="24" class="input-item">
          <label>学校logo:</label>
          <el-upload
            ref="imgUpload"
            class="uploader-wrapper"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="uploader-img">
            <i v-else class="el-icon-plus uploader-icon"></i>
          </el-upload>
          <div class="upload-shade" :class="{'show':imageUrl}">
            <i class="el-icon-error color" @click="deleteImg()"></i>
          </div>
          <span class="err-title upload">{{imageErr}}</span>
        </el-col>
      </el-row>

      <!--Mackdown-->
      <el-row class="input-group">
        <el-col :span="24" class="input-item">
          <label class="markdown">学校简介:</label>
            <editor-md @markdownData="markdownData"></editor-md>
          <span class="err-title markdown-errorTitle">{{markdownErr}}</span>
        </el-col>
      </el-row>

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
  import editorMd from 'base/markdown/markdown';
  import {inputErr} from 'api/config';   //提示枚举
  export default {
    components: {
      myLocation,
      editorMd
    },
    data() {
      return {
        imageUrl: '',
        inputGroup:{
            schoolName:{
                val:"",
                err:""
            },
            englishName:{
              val:"",
              err:""
            },
            url:{
              val:"",
              err:""
            },
            address:{
              val:"",
              err:""
            },

        },
        imageErr:"",
        markdownErr:"",
        data:""
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.imageErr = "";

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isGIF && !isPNG && !isBMP) {
          this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
      },
      submit(){
        let flag = true;
        for(let key in this.inputGroup){
          if(!this.inputGroup[key].val){
            this.inputGroup[key].err = "*请输入"+inputErr[key] + "!";
            flag = false;
          }
        }
        if(!this.imageUrl){
          this.imageErr = "*请上传学校logo！";
        }
        if(!this.data){
            this.markdownErr = "*请输入学校简介！"
        }
        if(flag && this.imageUrl){
          let data = {
            "schoolName":this.inputGroup.schoolName.val,
            "englishName":this.inputGroup.englishName.val,
            "url":this.inputGroup.url.val,
            "address":this.inputGroup.address.val,
            "imageUrl":this.imageUrl,
            "markdownData":this.data
          };
          this.$axios.post('/addUser',data).then((res)=>{
            if(res.status === 200){
              console.log(data);
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
      reset(){
          for(let key in this.inputGroup){
              this.inputGroup[key].val = "";
              this.inputGroup[key].err = "";
          }
          this.imageUrl = "";
          this.imageErr = "";
          this.markdownErr = "";

      },
      _blur(input){
        if(input.val){
          input.err = "";
        }
      },
      deleteImg(){
          this.imageUrl = "";
      },
      markdownData(data){
          this.data = data;
          if(this.data){
              this.markdownErr = "";
          }
      }
    }
  }
</script>
<style scoped lang="scss">
  .add-school{
    .school-info{
      padding:30px;
      .input-group{
        margin-bottom:25px;
        .input-item{
          position:relative;
          label{
            position: absolute;
            top:8px;
            left:10px;
            color:#3485fb;
            font-size:14px;
          }
          label.markdown{
            position: static;
            display: inline-block;
            height: 35px;
            margin-left:10px;
          }
          input{
            width:80%;
            height: 35px;
            border-radius: 5px;
            border:1px solid #ccc;
            padding:3px 3px 3px 50px;
          }
          input.add-padding{
            padding-left:76px;
          }
          .err-title{
            position: absolute;
            top:36px;
            left:10px;
            font-size:14px;
            color:red;
          }
          .markdown-errorTitle{
            top:2px;
            left:100px;
          }
          span.upload{
            left:310px;
            top:170px;
          }
          /********************上传*************/
          .uploader-wrapper{
            width: 200px;
            margin:10px 0 0 90px;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            overflow: hidden;
            .uploader-img{
              width: 200px;
              height: 178px;
              display: inline-block;
              vertical-align: middle;
              overflow: hidden;
            }
            .uploader-icon{
              font-size: 28px;
              color:#8c939d;
              width: 200px;
              height: 178px;
              line-height: 178px;
              text-align: center;
              cursor: pointer;
            }
          }
          .uploader-wrapper:hover{
            border-color: #409EFF;
          }
          .upload-shade{
            display: none;
            position: absolute;
            top:13px;
            left:266px;
            cursor: pointer;
          }
          .color{
            color:#ccc;
          }
          .show{
            display:inline-block;
            .color:hover{
              color:#3485fb;
            }
          }

        }
      }
      /******************按钮组***************/
      .btn-group{
        text-align:center;
        .btn-item{
          width: 120px;
          margin:0 50px;
        }
      }

    }
  }

</style>
