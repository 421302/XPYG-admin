

const Mock = require('mockjs');
const Random = Mock.Random;
Random.extend({
  colleges: ['计算机学院','机械学院','电气学院','互联网学院','服装设计学院'],
  majors: ['软件专业','机制专业','艺术设计专业','生物专业','英语专业'],
  classs: ['100班','101班','102班','103班','104班'],
  college: function(){
    return this.pick(this.colleges)
  },
  major: function(){
    return this.pick(this.majors)
  },
  class: function(){
    return this.pick(this.classs)
  }
});
Random.college();
Random.major();
Random.class();

//添加分组----父类数据
/*const B = {
  'arr|1-2':[{
    id:'@natural',
    value:'college_' +  '@id',
    label:'@college',
    'children|1-2':[{
      id:'@natural',
      value:'major_'+'@id',
      label: '@major',
      'children|1-2':[{
        id:'@natural',
        value: 'class_'+'@id',
        label: '@class'
      }]
    }]
  }]
};*/

const B = {
  'arr':[{
    id:'1',
    value:'综合系',
    label:'综合系',
    'children':[{
      id:'1-1',
      value:'软件专业',
      label: '软件专业',
      'children':[{
        id:'1-1-1',
        value: '软件专业1班',
        label: '软件专业1班'
      },{
        id:'1-1-2',
        value: '软件专业2班',
        label: '软件专业2班'
      },{
        id:'1-1-3',
        value: '软件专业3班',
        label: '软件专业3班'
      }]
    },{
      id:'1-2',
      value:'机制专业',
      label: '机制专业',
      'children':[{
        id:'1-2-1',
        value: '机制专业1班',
        label: '机制专业1班'
      },{
        id:'1-2-2',
        value: '机制专业2班',
        label: '机制专业2班'
      },{
        id:'1-3-3',
        value: '机制专业3班',
        label: '机制专业3班'
      }]
    }]
  }]
};
//添加分组----分组类型数据
const C = [{
      value:"学院",
      label:1
      },{
      value:"系",
      label:2
    },{
      value:"专业",
      label:3
    },{
      value:"班级",
      label:4
    }];

//新增用户--学校数据
const A = [{
    value:"湖北工业大学",
    label:"hg",
  },{
    value:"武汉大学",
    label:"wh"
  },{
    value:"清华大学",
    label:"qh"
  },{
    value:"北京大学",
    label:"bj"
}];
//角色管理数据
const D = {
      'arr|15':[{
      'num|+3':1,
      accountNum: '@natural',
      studentNum: '@natural',
      name: '@name',
      sex: '女',
      emil: '@email',
      tel: "18674181867",
      rol:"学生",
      state:"可用",
      school:"清华大学",
      group:"综合系/机制专业",
    },{
        'num|+3':2,
        accountNum: '@natural',
        studentNum: '456',
        name: '@name',
        sex: '女',
        emil: '@email',
        tel: "13070259608",
        rol:"管理员",
        state:"禁用",
        school:"湖北工业大学",
        group:"@word()/@word()",
      },{
        'num|+3':3,
        accountNum: '123',
        studentNum: '@natural',
        name: '大宝',
        sex: '女',
        emil: '@email',
        tel: "18674181867",
        rol:"管理员",
        state:"禁用",
        school:"湖北工业大学",
        group:"综合系/机制专业",
      }]
};

Mock.mock('/api/school','get',A);
Mock.mock('/api/tree','get',B);
Mock.mock('/api/type','get',C);
Mock.mock('/api/rolManage','get',D);


Mock.mock('/addGroup','get',{a:"添加分组成功"});

Mock.mock('/addUser','post',{a:"新增用户成功"});
