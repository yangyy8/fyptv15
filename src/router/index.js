import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/Index',
      name: 'Index',
      component: resolve => require(['@/components/Index'], resolve),
    },
    {
      path: '/Message',
      name: 'Message',
      component: resolve => require(['@/components/Message'], resolve),
    },
    
    {
      path: '/screen',
      name: 'screen',
      component: resolve => require(['@/components/Screen/index'], resolve),
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: resolve => require(['@/components/Screen/contacts'], resolve),
    },
    {
      path: '/suggtions',
      name: 'suggtions',
      component: resolve => require(['@/components/Screen/suggtions'], resolve),
    },
    {
      path: '/activities',
      name: 'activities',
      component: resolve => require(['@/components/Screen/activities'], resolve),
    },
    {
      path: '/followcase',
      name: 'followcase',
      component: resolve => require(['@/components/Screen/followcase'], resolve),
    },
    {
      path: '/IndexO',
      name: 'IndexO',
      component: resolve => require(['@/components/Indexold'], resolve),
    },
    {
      path: '/Indexnew',
      name: 'Indexnew',
      component: resolve => require(['@/components/Indexnew'], resolve),
    },
    {
      path: '/AuthoritySwith',
      name: 'AuthoritySwith',
      meta:{title:['系统管理','权限切换']},
      component: resolve => require(['@/components/System/AuthoritySwith'], resolve),
    },
   
    {
      path: '/Home',
      name: 'Home',
      meta: {logined:true},
      component: resolve => require(['@/components/Home'], resolve),
      children: [
        {
          path: '/limitmsg',
          name: 'limitmsg',
          component: resolve => require(['@/components/limitmsg'], resolve),
        },
        {
          path: '/construction',
          name: 'construction',
          component: resolve => require(['@/components/construction'], resolve),
        },
       
        // LiaisonWork(联络工作)  PairWork(结对活动)  AnnualWork(年度工作总结)
        {
          path: 'PairAdd',
          name: 'PairAdd',
          meta:{
          title:['联络工作','结对活动录入'], 
          keepAlive: false // 需要被缓存
          },
          component: resolve => require(['@/components/LiaisonWork/PairWork/PairAdd'], resolve),
        },
        {
          path: 'SpecialAdd',
          name: 'SpecialAdd',
          meta:{title:['联络工作','专项视察录入']},
          component: resolve => require(['@/components/LiaisonWork/PairWork/SpecialAdd'], resolve),
        },
        {
          path: 'AnnualWork',
          name: 'AnnualWork',
          meta:{title:['联络工作','年度工作计划和总结']},
          component: resolve => require(['@/components/LiaisonWork/AnnualWork/AnnualWork'], resolve),
        },
        {
          path: 'GiverAdd',
          name: 'GiverAdd',
          meta:{
          title:['联络工作','赠阅法院报'], 
          keepAlive: false // 需要被缓存
          },
          component: resolve => require(['@/components/LiaisonWork/PairWork/GiverAdd'], resolve),
        },
        {
          path: 'GiverList',
          name: 'GiverList',
          meta:{
          title:['联络工作','赠阅法院报查询'], 
          keepAlive: false // 需要被缓存
          },
          component: resolve => require(['@/components/LiaisonWork/PairWork/GiverList'], resolve),
        },
        {
          path: 'PairList',
          name: 'PairList',
          meta:{title:['联络工作','结对活动列表']},
          component: resolve => require(['@/components/LiaisonWork/PairWork/PairList'], resolve),
        },
        {
          path: 'WorkList',
          name: 'WorkList',
          meta:{title:['联络工作','年度工作总结与计划查询']},
          component: resolve => require(['@/components/LiaisonWork/AnnualWork/WorkList'], resolve),
        },
        // Information(基本信息库)  BaseInfo(基本信息)  
        {
          path: 'BaseAdd',
          name: 'BaseAdd',
          meta:{title:['基本信息库','全部基本信息录入']},
          component: resolve => require(['@/components/Information/BaseInfo/BaseAdd'], resolve),
        },
        {
          path: 'BaseLook',
          name: 'BaseLook',
          meta:{title:['基本信息库','基本信息查看']},
          component: resolve => require(['@/components/Information/BaseInfo/BaseLook'], resolve),
        },
        {
          path: 'AreaList',
          name: 'AreaList',
          meta:{title:['基本信息库','行政区划']},
          component: resolve => require(['@/components/Information/BaseInfo/AreaList'], resolve),
        },
        {
          path: 'GroupList',
          name: 'GroupList',
          meta:{title:['基本信息库','团届别']},
          component: resolve => require(['@/components/Information/BaseInfo/GroupList'], resolve),
        },
        {
          path: 'Personnel',
          name: 'Personnel',
          meta:{title:['基本信息库','人员信息']},
          component: resolve => require(['@/components/Information/BaseInfo/Personnel'], resolve),
        },
        {
          path: 'SpecialPerson',
          name: 'SpecialPerson',
          meta:{title:['基本信息库','特约人员']},
          component: resolve => require(['@/components/Information/BaseInfo/SpecialPerson'], resolve),
        },
        {
          path: 'SpecialPersonDeatil',
          name: 'SpecialPersonDeatil',
          meta:{title:['基本信息库','特约人员详情']},
          component: resolve => require(['@/components/Information/BaseInfo/SpecialPersonDeatil'], resolve),
        },
        {
          path: 'Delegation',
          name: 'Delegation',
          meta:{title:['基本信息库','代表团']},
          component: resolve => require(['@/components/Information/BaseInfo/Delegation'], resolve),
        },
        {
          path: 'BaseList',
          name: 'BaseList',
          meta:{title:['基本信息库','人大代表高级查询']},
          component: resolve => require(['@/components/Information/BaseInfo/BaseList'], resolve),
        },
        {
          path: 'zxBaseList',
          name: 'zxBaseList',
          meta:{title:['基本信息库','政协委员高级查询']},
          component: resolve => require(['@/components/Information/BaseInfo/zxBaseList'], resolve),
        },
        {
          path: 'tyBaseList',
          name: 'tyBaseList',
          meta:{title:['基本信息库','特约人员高级查询']},
          component: resolve => require(['@/components/Information/BaseInfo/tyBaseList'], resolve),
        },
        {
          path: 'InstitutionNew',
          name: 'InstitutionNew',
          meta:{title:['基本信息库','机构信息']},
          component: resolve => require(['@/components/Information/BaseInfo/InstitutionNew'], resolve),
        },
        {
          path: 'InstitutionGroup',
          name: 'InstitutionGroup',
          meta:{title:['基本信息库','机构信息']},
          component: resolve => require(['@/components/Information/BaseInfo/InstitutionGroup'], resolve),
        },
        {
          path: 'Institution',
          name: 'Institution',
          meta:{title:['基本信息库','机构信息']},
          component: resolve => require(['@/components/Information/BaseInfo/Institution'], resolve),
        },
        {
          path: 'InstitutionAdd',
          name: 'InstitutionAdd',
          meta:{title:['基本信息库','机构录入']},
          component: resolve => require(['@/components/Information/BaseInfo/InstitutionAdd'], resolve),
        },
        {
          path: 'InstitutionList',
          name: 'InstitutionList',
          meta:{title:['基本信息库','联系机构',"高级查询"]},
          component: resolve => require(['@/components/Information/BaseInfo/InstitutionList'], resolve),
        },
        {
          path: 'CourtSystemAdd',
          name: 'CourtSystemAdd',
          meta:{title:['基本信息库','法院内部管理',"录入机构"]},
          component: resolve => require(['@/components/Information/BaseInfo/CourtSystemAdd'], resolve),
        },
        {
          path: 'CourtList',
          name: 'CourtList',
          meta:{title:['基本信息库','法院内部管理',"法院系统查询"]},
          component: resolve => require(['@/components/Information/BaseInfo/CourtList'], resolve),
        },
        {
          path: 'CourtInfo',
          name: 'CourtInfo',
          meta:{title:['基本信息库','法院内部管理',"各级法院代表团"]},
          component: resolve => require(['@/components/Information/BaseInfo/CourtInfo'], resolve),
        },
        {
          path: 'CourtMeber',
          name: 'CourtMeber',
          meta:{title:['基本信息库','法院内部管理',"法院人员代表团"]},
          component: resolve => require(['@/components/Information/BaseInfo/CourtMeber'], resolve),
        },
        {
          path: 'CourtPersonnel',
          name: 'CourtPersonnel',
          meta:{title:['基本信息库','法院内部管理',"法院人员代表团"]},
          component: resolve => require(['@/components/Information/BaseInfo/CourtPersonnel'], resolve),
        },
        {
          path: 'CourtPersonnelList',
          name: 'CourtPersonnelList',
          meta:{title:['基本信息库','法院内部管理',"法院人员高级查询"]},
          component: resolve => require(['@/components/Information/BaseInfo/CourtPersonnelList'], resolve),
        },
        // HandlingWork(办理工作)  List(列表信息)  
        {
          path: 'CaseList',
          name: 'CaseList',
          meta:{title:['办理工作','关注案件列表']},
          component: resolve => require(['@/components/HandlingWork/List/CaseList'], resolve),
        },
        {
          path: 'CaseInfo',
          name: 'CaseInfo',
          meta:{title:['办理工作','关注案件信息']},
          component: resolve => require(['@/components/HandlingWork/List/CaseInfo'], resolve),
        },
        {
          path: 'CaseInfoold',
          name: 'CaseInfoold',
          meta:{title:['办理工作','关注案件信息']},
          component: resolve => require(['@/components/HandlingWork/List/CaseInfoold'], resolve),
        },
      
        {
          path: 'SuggestList',
          name: 'SuggestList',
          meta:{title:['办理工作','建议、批评和意见列表']},
          component: resolve => require(['@/components/HandlingWork/List/SuggestList'], resolve),
        },
        {
          path: 'SuggestInfo',
          name: 'SuggestInfo',
          meta:{title:['办理工作','建议、批评和意见信息']},
          component: resolve => require(['@/components/HandlingWork/List/SuggestInfo'], resolve),
        },
        // {
        //   path: 'RepresentativeList',
        //   name: 'RepresentativeList',
        //   meta:{title:['办理工作','代表议案列表']},
        //   component: resolve => require(['@/components/HandlingWork/List/RepresentativeList'], resolve),
        // },
        // {
        //   path: 'RepresentativeInfo',
        //   name: 'RepresentativeInfo',
        //   meta:{title:['办理工作','代表议案信息']},
        //   component: resolve => require(['@/components/HandlingWork/List/RepresentativeInfo'], resolve),
        // },
        // {
        //   path: 'CPPCCList',
        //   name: 'CPPCCList',
        //   meta:{title:['办理工作','政协提案列表']},
        //   component: resolve => require(['@/components/HandlingWork/List/CPPCCList'], resolve),
        // },
        // {
        //   path: 'CPPCCInfo',
        //   name: 'CPPCCInfo',
        //   meta:{title:['办理工作','政协提案信息']},
        //   component: resolve => require(['@/components/HandlingWork/List/CPPCCInfo'], resolve),
        // },
        // {
        //   path: 'ConsiderationList',
        //   name: 'ConsiderationList',
        //   meta:{title:['办理工作','审议意见列表']},
        //   component: resolve => require(['@/components/HandlingWork/List/ConsiderationList'], resolve),
        // },
        // {
        //   path: 'ConsiderationInfo',
        //   name: 'ConsiderationInfo',
        //   meta:{title:['办理工作','审议意见信息']},
        //   component: resolve => require(['@/components/HandlingWork/List/ConsiderationInfo'], resolve),
        // },
        // {
        //   path: 'DailyList',
        //   name: 'DailyList',
        //   meta:{title:['办理工作','日常意见建议列表']},
        //   component: resolve => require(['@/components/HandlingWork/List/DailyList'], resolve),
        // },
        // {
        //   path: 'DailyInfo',
        //   name: 'DailyInfo',
        //   meta:{title:['办理工作','日常意见建议信息']},
        //   component: resolve => require(['@/components/HandlingWork/List/DailyInfo'], resolve),
        // },
        //统计信息
        {
          path: 'CaseCount',
          name: 'CaseCount',
          meta:{title:['统计信息','关注案件统计信息']},
          component: resolve => require(['@/components/Counts/CaseCount'], resolve),
        },
        {
          path: 'PersonnelCount',
          name: 'PersonnelCount',
          meta:{title:['统计信息','人大代表信息统计']},
          component: resolve => require(['@/components/Counts/PersonnelCount'], resolve),
        },
        {
          path: 'PairCount',
          name: 'PairCount',
          meta:{title:['统计信息','联络工作信息统计']},
          component: resolve => require(['@/components/Counts/PairCount'], resolve),
        },
        {
          path: 'SuggestCount',
          name: 'SuggestCount',
          meta:{title:['统计信息','议案信息统计']},
          component: resolve => require(['@/components/Counts/SuggestCount'], resolve),
        },
        {
          path: 'SuggestCountNum',
          name: 'SuggestCountNum',
          meta:{title:['统计信息','议案信息统计']},
          component: resolve => require(['@/components/Counts/SuggestCountNum'], resolve),
        },
        {
          path: 'SuggestCountSum',
          name: 'SuggestCountSum',
          meta:{title:['统计信息','议案信息统计']},
          component: resolve => require(['@/components/Counts/SuggestCountSum'], resolve),
        },
        {
          path: 'SuggestCountList',
          name: 'SuggestCountList',
          meta:{title:['统计信息','议案信息统计']},
          component: resolve => require(['@/components/Counts/SuggestCountList'], resolve),
        },
        {
          path: 'InstitutionCount',
          name: 'InstitutionCount',
          meta:{title:['统计信息','联络机构信息统计']},
          component: resolve => require(['@/components/Counts/InstitutionCount'], resolve),
        },
        
        {
          path: 'BaseCount',
          name: 'BaseCount',
          meta:{title:['统计信息','联络对象信息统计']},
          component: resolve => require(['@/components/Counts/BaseCount'], resolve),
        },
       //监控和预警
        {
          path: 'Sysset',
          name: 'Sysset',
          meta:{title:['监控和预警','系统设定']},
          component: resolve => require(['@/components/MonitorWarn/Sysset'], resolve),
        },
        {
          path: 'SysMenu',
          name: 'SysMenu',
          meta:{title:['监控和预警','快捷菜单设定']},
          component: resolve => require(['@/components/MonitorWarn/SysMenu'], resolve),
        },
        {
          path: 'CourtBriefs',
          name: 'CourtBriefs',
          meta:{title:['监控和预警','法院要闻']},
          component: resolve => require(['@/components/MonitorWarn/CourtBriefs'], resolve),
        },
        {
          path: 'CaseProcess',
          name: 'CaseProcess',
          meta:{title:['监控和预警','办公流程','关注案件']},
          component: resolve => require(['@/components/MonitorWarn/WorkProcess/CaseProcess'], resolve),
        },
        {
          path: 'SuggesProcess',
          name: 'SuggesProcess',
          meta:{title:['监控和预警','办公流程','议案建议']},
          component: resolve => require(['@/components/MonitorWarn/WorkProcess/SuggesProcess'], resolve),
        },
        {
          path: 'SpecialList',
          name: 'SpecialList',
          meta:{title:['监控和预警','办公流程','议案建议']},
          component: resolve => require(['@/components/MonitorWarn/Category/SpecialList'], resolve),
        },
        //系统管理
        {
          path: 'UserManagement',
          name: 'UserManagement',
          meta:{title:['系统管理','用户管理']},
          component: resolve => require(['@/components/System/UserManagement'], resolve),
        },
        {
          path: 'RoleManagement',
          name: 'RoleManagement',
          meta:{title:['系统管理','角色管理']},
          component: resolve => require(['@/components/System/RoleManagement'], resolve),
        },
        {
          path: 'EditPwd',
          name: 'EditPwd',
          meta:{title:['系统管理','修改密码']},
          component: resolve => require(['@/components/System/EditPwd'], resolve),
        },
        {
          path: 'EdituserName',
          name: 'EdituserName',
          meta:{title:['系统管理','修改账号']},
          component: resolve => require(['@/components/System/EdituserName'], resolve),
        },
        {
          path: 'ShortcutMenu',
          name: 'ShortcutMenu',
          meta:{title:['系统管理','快捷菜单']},
          component: resolve => require(['@/components/System/ShortcutMenu'], resolve),
        },
      
      ]
    }
  ]
})
