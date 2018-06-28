import Vue from 'vue'
import Router from 'vue-router'
//分组管理
import addGroup from 'components/admin/groupAdmin/addGroup'
import addType from 'components/admin/groupAdmin/addType'
import groupType from 'components/admin/groupAdmin/groupType'
//用户管理
import roleAdmin from 'components/admin/userAdmin/roleAdmin'
import selectSchool from 'components/admin/userAdmin/selectSchool'
import addUser from 'components/admin/userAdmin/addUser'
import batchImport from 'components/admin/userAdmin/batchImport'
import recycle2 from 'components/admin/userAdmin/recycle2'
//学校管理
import addSchool from 'components/admin/schoolAdmin/addSchool'
import recycle1 from 'components/admin/schoolAdmin/recycle1'


Vue.use(Router);

export default new Router({
  routes: [
     {
      path:'*',
      redirect:'/groupAdmin_addGroup'
    },
    //分组管理
    {
      path:'/groupAdmin_addGroup',//增加分组
      component:addGroup
    },
    {
      path:'/groupAdmin_addType',//增加类型
      component:addType
    },
    {
      path:'/groupAdmin_groupType', //分组类型
      component:groupType
    },
    //用户管理
    {
      path:'/userAdmin_roleAdmin',  //角色管理
      component:roleAdmin
    },{
      path:'/userAdmin_addUser',  //新增用户
      component:selectSchool,
      children:[
        {
          path:':id',
          component:addUser
        }
      ]
    },{
      path:'/userAdmin_batchImport',  //批量导入
      component:batchImport
    },{
      path:'/userAdmin_recycle2',  //批量导入
      component:recycle2
    },
    //学校管理
    {
      path:'/schoolAdmin_addSchool',
      component:addSchool
    },{
      path:'/schoolAdmin_recycle1',
      component:recycle1
    }]
})
