

/**********************导航栏***************************/
//导航栏配置
export const nav = {
    admin:{
      "用户管理":{
        "角色管理":"/userAdmin_roleAdmin",
        "新增用户":"/userAdmin_addUser",
        "批量导入":"/userAdmin_batchImport",
        "回收站":"/userAdmin_recycle2"
      },
      "学校管理":{
        "添加学校":"/schoolAdmin_addSchool",
        "回收站":"/schoolAdmin_recycle1"
      },
      "分组管理":{
        "添加分组":"/groupAdmin_addGroup",
        "添加类型":"/groupAdmin_addType",
        "分组类型":"/groupAdmin_groupType"
      }
    },
    student:{
      "学生管理":{
        "学生1":"/groupAdmin_stu",
        "xues2":"/groupAdmin_stu2",
        "学生3":"/groupAdmin_stu3"
      },
      "学生管理":{
        "学生1":"/groupAdmin_sdf",
        "xues2":"/groupAdmin_fa",
        "学生3":"/groupAdmin_efe"
      }
    }
};

/**********************地址栏***************************/
//地址栏配置  -- 路由
export const address = {
  hg:"湖北工业大学",
  wh:"武汉大学",
  qh:"清华大学",
  bj:"北京大学",

  userAdmin:"用户管理",
  roleAdmin:"角色管理",
  addGroup:"添加分组",
  addType:"添加类型",
  groupType:"分组类型",

  schoolAdmin:"学校管理",
  addSchool:"添加学校",
  recycle1:"回收站",

  groupAdmin:"分组管理",
  addUser:"新增用户",
  batchImport:"批量导入",
  recycle2:"回收站"
};

/**********************分组管理--添加分组***************************/
//类型配置 --学院、系、专业、班级  对应选择状态值
export const radioType = {
  "college":1,
  "department":2,
  "major":3,
  "class":4
};


/**********************学校管理***************************/

/*************学校管理--添加学校************/
//input 提交空提示配置
export const inputErr = {
  "schoolName":"学校名称",
  "englishName":"英文缩写",
  "url":"网址",
  "address":"地址",

};


/**********************用户管理***************************/

/***************用户管理--新增用户***************/
//input 提交空提示配置
export const inputHint = {
  "account":"账号",
  "id":"教师/学生号",
  "password":"密码",
  "repassword":"确认密码",
  "emil":"邮箱",
  "tel":"手机号",
  "name":"姓名",
};
/***********用户管理----角色管理************/
//角色配置
export const roleConfig = [{
  value:"学生",
  label:"student"
},{
  value:"老师",
  label:"teacher"
},{
  value:"教务",
  label:"education"
},{
  value:"管理员",
  label:"admin"
}];

  //性别配置
export const sexConfig =[{
    value:"男",
    label:"male"
  },{
    value:"女",
    label:"female"
  },{
    value:"不明",
    label:"unknown"
  }];

//状态配置
export const stateConfig = [{
  value:"可用",
  label:"abled"
},{
  value:"禁用",
  label:"disabled"
}];

//表格的表头配置
export const tableHead = [{
    prop:"num",
    label:"序号",
    width:"50"
  },{
    prop:"accountNum",
    label:"账号",
    width:"180"
  },{
    prop:"studentNum",
    label:"学号",
    width:"180"
  },{
    prop:"name",
    label:"姓名",
    width:"120"
  },{
    prop:"sex",
    label:"性别",
    width:"80"
  },{
    prop:"emil",
    label:"邮箱",
    width:"200"
  },{
    prop:"tel",
    label:"手机号",
    width:"150"
  },{
    prop:"rol",
    label:"角色",
    width:"80"
  },{
    prop:"state",
    label:"账户状态",
    width:"80"
  },{
    prop:"school",
    label:"学校",
    width:"200"
  },{
    prop:"group",
    label:"分组",
    width:"200"
  }];

