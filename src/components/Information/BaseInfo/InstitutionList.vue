<template>
    <div class="pairadd ">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 基本信息 <span class="mlr_10">/</span> 联络机构 <span class="mlr_10">/</span> <b>{{cname}}查询</b></span> </div>
         <div class="content subtable">
             <div class="ptitle mb-20">{{cname}}信息</div>
                <div class="pborder">
                      <el-row class="lh" :gutter="2">
                        <el-col :sm="24" :md="12" :lg="8" v-if='addtype=="4"' class="input-item">
                          <span class="yy-input-text">八大民主党派</span>
                         <el-select v-model="pd.lbss" multiple  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                             <el-option value="0227000006" label="中国国民党革命委员会">
                             </el-option>
                             <el-option value="0227000007" label="中国民主同盟">
                            </el-option>
                            <el-option value="0227000008" label="中国民主建国会">
                            </el-option>
                            <el-option value="0227000009" label="中国民主促进会">
                            </el-option>
                            <el-option value="0227000010" label="中国农工民主党">
                            </el-option>
                            <el-option value="0227000011" label="中国致公党">
                            </el-option>
                            <el-option value="0227000012" label="九三学社">
                            </el-option>
                            <el-option value="0227000013" label="台湾民主自治同盟">
                            </el-option>
                          </el-select>
                      </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">机构名称</span>
                            <el-input placeholder="请输入内容"  size="small" clearable v-model="pd.mc"  class="yy-input-input" ></el-input>
                        </el-col>
                          <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">是否部门</span>
                           <el-select v-model="pd.sfbm"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.sfbm"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                          <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">机构隶属</span>
                            <el-cascader  
                              v-model="pd.sj"
                              :options="jgdata"
                              :show-all-levels="true"
                              :props="{ checkStrictly: true }"
                              clearable filterable size="small" class="yy-input-input">
                            </el-cascader>
                            </el-col>
                     
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                          <span class="yy-input-text">级别</span>
                           <el-select v-model="pd.lvl"  v-if='addtype!="7"' filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.jbb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                            <el-select v-model="pd.lvl" v-else filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.fyjb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">行政区划</span>
                           <el-select v-model="pd.xzqh"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.xzqh"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <!-- <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">专门委员会</span>
                           <el-select v-model="pd.xzqh"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in wyhlist"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                        </el-col> -->
                        <el-col :sm="24" :md="12" :lg="8" v-if='addtype=="1" || addtype=="2"' class="input-item">
                            <span class="yy-input-text">委员会</span>
                           <el-select v-model="pd.zmwyh"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.jgwyh"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">编码</span>
                            <el-input placeholder="请输入内容"  size="small" clearable v-model="pd.bm"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">简称</span>
                            <el-input placeholder="请输入内容"  size="small" clearable v-model="pd.jc"  class="yy-input-input" ></el-input>
                        </el-col>
                       
                            <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">区号</span>
                            <el-input placeholder="请输入内容"  size="small" clearable v-model="pd.qh"  class="yy-input-input" ></el-input>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">固定电话</span>
                            <el-input placeholder="请输入内容"  size="small" clearable v-model="pd.zxdm"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">传真</span>
                            <el-input placeholder="请输入内容"  size="small" clearable v-model="pd.cz"  class="yy-input-input" ></el-input>
                        </el-col>

                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">邮编</span>
                            <el-input placeholder="请输入内容"  size="small" maxlength="6" clearable v-model="pd.yb"  class="yy-input-input" ></el-input>
                        </el-col>
                    
                    </el-row>
                     <el-row class="lh con">
                          <el-col :sm="24" :md="12" :lg="24" class="input-item">
                            <span class="yy-input-text" style="width:9%;">地址</span>
                             <el-input placeholder="请输入内容"  size="small" clearable v-model="pd.dz"  class="yy-input-input" style="width:53.5%!important;"></el-input>
                        </el-col>
                    </el-row>
                    <div class="footer">
                    <el-button type="primary"  style="width:130px;" v-if="querybnt" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)">查 询</el-button>
                     <el-button type="primary"  style="width:130px;" :disabled="true" v-else>查询中</el-button>
                    <el-button style="width:130px;" @click="reset()">重  置</el-button>
                     </div>
                </div>
                <div class="pborder mt-20">
                         <el-row>
                            <el-col :span="16">
                              <el-button type="primary" size="small" @click="getadd(0)" v-if='allshow[0]'>添加</el-button>
                              <el-button type="primary" size="small" :disabled="bnt" @click="add(2)" v-if='allshow[1]'>查看</el-button>
                              <el-button type="primary" size="small" :disabled="bnt" @click="add(1)" v-if='allshow[2]'>修改</el-button>
                              <el-button type="primary" size="small" :disabled="bnt"  @click="delUser" v-if='allshow[3]'>删除</el-button>
                              <!-- <el-button type="primary" size="small"  @click="getDR" v-if='allshow[4]'>导入</el-button> -->
                               &nbsp;
                              </el-col>
                              <el-col :span="8" class="trt">
                               {{cname}}总数 <b class="sumfont" >{{this.TotalResult}}</b> 
                               <span v-if='addtype==7'>家</span><span v-else>个</span>
                              </el-col>
                         </el-row>
                     <el-table
                            ref="multipleTable"
                            :data="tableData"
                            @row-click="clickRow"
                            @selection-change="yhChange">
                            <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                              <el-table-column
                                type="index"
                                label="序号" width="100">
                                 <template slot-scope="scope">
                                    <div>
                                    <span>{{(CurrentPage - 1) * pageSize + scope.$index + 1}}</span>
                                    </div>
                                 </template>
                            </el-table-column>
                             <el-table-column
                                prop="mc"
                                label="机构名称">
                            </el-table-column>
                             
                            <el-table-column
                                prop="jc"
                                label="简称">
                            </el-table-column>
                             <el-table-column
                                prop="bm"
                                label="编码">
                            </el-table-column>
                             <el-table-column
                                prop="sjmc"
                                label="机构隶属" v-if="show">
                            </el-table-column>
                            <el-table-column
                                prop="sjmc"
                                label="上级机构" v-if="!show">
                            </el-table-column>
                             <el-table-column
                                prop="sfbm"
                                label="是否部门">
                            </el-table-column>
                             <el-table-column
                                prop="lvl"
                                label="级别">
                            </el-table-column>
                             <el-table-column
                                prop="xzqh"
                                label="行政区划">
                            </el-table-column>
                     </el-table>
                      <div class="middle-foot">
                                <div class="page-msg">
                                    <div class="">
                                共{{TotalResult}}条记录
                                    </div>
                                    <div class="">
                                    每页显示
                                    <el-select v-model="pageSize" @change="pageSizeChange(pageSize)" placeholder="10" size="mini" class="page-select">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                    条
                                    </div>
                                    <div class="">
                                    共{{Math.ceil(TotalResult/pageSize)}}页
                                    </div>
                                </div>
                                <el-pagination
                                    background
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="CurrentPage"
                                    :page-size="pageSize"
                                    layout="prev, pager, next"
                                    :total="TotalResult">
                                </el-pagination>
                            </div>
                </div>
         </div>

       <el-dialog title="导入文件" :visible.sync="drDialogVisible" :close-on-click-modal='false'  width="630px">
          <UPLOAD :url="vvurl" :type="11"  :urlErr="vvurlErr"  @fatherMethod="fatherMethod" :random="new Date().getTime()"></UPLOAD>
       </el-dialog>

       <el-dialog title="选择八大民主党派" :visible.sync="addDialogVisible" :close-on-click-modal='false'>
        <div style="line-height:50px;">
           <el-radio v-model="lxtype" label="1">中国国民党革命委员会</el-radio>
           <el-radio v-model="lxtype" label="2">中国民主同盟</el-radio>
           <el-radio v-model="lxtype" label="3">中国民主建国会</el-radio>
           <el-radio v-model="lxtype" label="4">中国民主促进会</el-radio>
           <el-radio v-model="lxtype" label="5">中国农工民主党</el-radio>
           <el-radio v-model="lxtype" label="6">中国致公党</el-radio>
           <el-radio v-model="lxtype" label="7">九三学社</el-radio>
           <el-radio v-model="lxtype" label="8">台湾民主自治同盟</el-radio>
        </div>

       <div slot="footer" class="dialog-footer">
         <el-button type="primary" size="small" @click="add(0)">进行录入</el-button>
         <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
       </div>
      </el-dialog>
    </div>
 </template>
<script>
  import UPLOAD from "../../Common/upload"
export default {
  components:{UPLOAD},
    data(){
        return{
            CurrentPage: 1,
            pageSize: 10,
            TotalResult: 0,
            pd:{},
            form:{},
            options:this.pl.ps,
            bnt:true,
            mselect:[],
            adddia:'新增',
            tableData:[],
            xzqhlist:[],
            jgdata:[],
            addtype:'1',
            show:true,
            cname:'人大系统',
            wyhlist:[],
            alldata:['','','','',''],//0录入,1查询,2修改,3删除,4导入
            allshow:[],
            drDialogVisible:false, 
            addDialogVisible:false,
            vvurl:'/courtPerson/import',
            vvurlErr:'',
            lx:'',
            lxtype:'',
            querybnt:'',

        }
    },
    mounted(){
       this.$store.dispatch("getJbb");
       this.$store.dispatch("getXzqh");
       this.$store.dispatch("getFyjb");
       this.$store.dispatch("getSfbm");
       this.$store.dispatch("getJgwyh");
       this.getinit(this.$route);
           
    },
      watch:{
        $route:function(val){
              this.getinit(val);
        },
    },
    methods:{
        clickRow(row){
           this.$refs.multipleTable.toggleRowSelection(row)
        },
        getXQ(type){
          var menuid='';
             switch (type) {
               case '1'://人大
                 menuid="11262144";
                 this.alldata=['21443322','21443323','21443324','21443325','21443326'];
                 break;
               case '2'://政协
                 menuid="11322152";
                 this.alldata=['21523348','21523349','21523350','21523351','21523352'];
                 break;
               case '3'://统战部
                 menuid="11382160";
                 this.alldata=['21603374','21603375','21603376','21603377','21603378'];
                 break;
              case '4':// 民主党派
                 menuid="11442168";
                 this.alldata=['21683400','21683401','21683402','21683403','21683404'];
                 break;
              case '5':// 工商联
                 menuid="11502176";
                 this.alldata=['21763426','21763427','21763428','21763429','21763430'];
                 break;
              case '6':// 台联
                 menuid="11562184";
                 this.alldata=['21843452','21843453','21843454','21843455','21843456'];
                 break;
              case '7':// 各级法院
                 menuid="11632192";
                 this.alldata=['21923478','21923479','21923480','21923481','21923482'];
                 break;
               default:
                 break;
             }
              //权限start
                 this.$api.post(this.Global.menuurl,{'menuId':menuid},
                     r =>{
                     
                          if(r.code==1 && r.data!=null){
                            for (let i = 0; i < this.alldata.length; i++) {
                                this.allshow[i]=this.global_auth(r.data,this.alldata[i]);
                         
                            }   
                          }else if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                          }
                  });
              //权限end
        },
        getinit(val){
          
            this.addtype=val.query.type;
            this.lx=val.query.lx;
            this.getXQ(val.query.type);
            this.reset();
            switch (this.addtype) {
                  case '1':
                        this.cname="人大系统";
                        this.pd.lb=this.Global.RD
                        this.getWYH(this.pd.lb);
                      break;
                   case '2':
                        this.cname="政协系统";
                        this.pd.lb=this.Global.ZX
                        this.getWYH(this.pd.lb);
                      break;
                   case '3':
                        this.cname="统战部系统";
                        this.pd.lb=this.Global.TZB
                      break;
                 case '4':
                        this.cname="民主党派系统";
                         switch (this.lx) {
                           case '1':
                              this.lb=this.Global.MZDP1;
                               break;
                           case '2':
                              this.lb=this.Global.MZDP2;
                               break;
                           case '3':
                              this.lb=this.Global.MZDP3;
                               break;
                           case '4':
                              this.lb=this.Global.MZDP4;
                               break;
                           case '5':
                              this.lb=this.Global.MZDP5;
                               break;
                           case '6':
                              this.lb=this.Global.MZDP6;
                               break;
                           case '7':
                              this.lb=this.Global.MZDP7;
                               break;
                           case '8':
                              this.lb=this.Global.MZDP8;
                               break;
                           default:
                               break;
                       }
                  break;
                        
                      break;
                 case '5':
                        this.cname="工商联系统";
                        this.pd.lb=this.Global.GSL
                        
                      break;
                case '6':
                        this.cname="台联系统";
                        this.pd.lb=this.Global.TL
                       
                      break;
                 case '7':
                        this.cname="各级法院";
                        this.pd.lb=this.Global.FY
                       
                      break;
                  default:
                      break;
              }
          this.getLWDW();
          this.getList(this.CurrentPage, this.pageSize, this.pd);
        },
        yhChange(val){
             this.mselect=val;
             if(this.mselect.length>0){
                 this.bnt=false;
             }else{
                 this.bnt=true;
             }
        },
        pageSizeChange(val) {
          this.pageSize=val;
          this.getList(this.CurrentPage, val, this.pd);
        },
        handleCurrentChange(val) {
          this.CurrentPage=val;
          this.getList(val, this.pageSize, this.pd);
        },
      
        getList(currentPage, showCount, pd){
           if((this.pd.lbss=='' || this.pd.lbss==null || this.pd.lbss==undefined) && this.addtype=="4"){
             this.pd.lbs=[this.Global.MZDP1,this.Global.MZDP2,this.Global.MZDP3,this.Global.MZDP4,this.Global.MZDP5,this.Global.MZDP6,this.Global.MZDP7,this.Global.MZDP8];
           }else if(this.addtype=="4"){
             this.pd.lbs=this.pd.lbss;
           }
           this.querybnt=false;
           this.tableData=[];
           let p={
               'token':this.$store.state.token,
               'pd':this.pd,
                "pageInfo":{
                 "pageNumber":currentPage,
                 "pageSize":showCount,
             }

           };
            
            this.$api.post(this.Global.aport1+'/org/query',p,
                r =>{
                      if(r.code==1){
                         this.tableData=r.data.orgInfoVOList;
                         this.TotalResult=r.data.pageInfo.total;
                        
                      }
                      this.querybnt=true;
                });
        
        },
          //隶属机构 
          getLWDW(sfbm){
              let p={
                  'lb':this.pd.lb,
                  'orgId':this.$store.state.orgid,
                  'sfbm':sfbm,
                  'xzqh':'',
                  'pageType':'1',
                  
              };
                this.$api.post(this.Global.aport1+'/org/getOrgTree',p,
                r =>{
                    if(r.code==1){
                      
                          this.jgdata=r.data.vos;
                      
                    }
                });
         },
           //得到行政区划
        getxzqh(l,v){
               let p={
                    'code':v,
                    'level':l
                  };
                  this.$api.get(this.Global.aport4+'/service/getxzqh',p,
                  r =>{
                    if(r.code==1){
                        this.xzqhlist=r.data;
                    }
                   });
        },
        reset(){
            this.pd={};
            this.CurrentPage=1;
            console.log('this.type',this.type,this.CurrentPage);
        },
        getadd(t){
          if(this.addtype=='4'){
            this.addDialogVisible=true;
          }else{
            this.$router.push({name:'InstitutionAdd',query:{type:this.addtype,status:t,pt:0}});
          }
        },
        add(t){
        
          if(t==0){
             
                if(this.lxtype==''){
                  this.$message.error("请选择八大民主党派");return;
                }
                this.addDialogVisible=false;
              
            this.$router.push({name:'InstitutionAdd',query:{type:this.addtype,status:t,lx:this.lxtype,pt:0}});
          }else{
              if(this.mselect.length>1){
                  this.$message.error("只能选择一条数据！");return;
              }
                this.$router.push({name:'InstitutionAdd',query:{type:this.addtype,status:t,jgid:this.mselect[0].orgid}});
          }
        },      
        getWYH(lb){
               let p = {
                   'lb':lb,
                    };
                   this.$api.post(this.Global.aport1+'/org/getSpecialCommittees',p,
                     r =>{
                          if(r.code==1){
                            this.wyhlist=r.data;
                          }
                   });
        }, 
        delUser()
        {
              if(this.mselect.length>0){
                    this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var array=this.mselect;
                        var flag=false;
                          for (let i = 0; i < array.length; i++) {
                             
                            let p = {
                                'orgId':array[i].orgid
                            };
                            this.$api.get(this.Global.aport1+'/org/delete',p,
                            r =>{
                                if(r.code==1){
                                  this.getList(this.CurrentPage, this.pageSize, this.pd); 
                                }

                             });
                         }
                 
                       

                this.$message.success('删除成功！');
                     
                        
                    }).catch(() => {
                      
                        this.$message.info('已取消删除');
                    });


               
            }else{
                  this.$message.error("请选择数据！");
            }
        },
        getDR(){
            this.drDialogVisible=true;
        },
          fatherMethod(data,t){
            this.drDialogVisible=false;
          },
    },
}
</script>
 <style >
 .el-cascader--small{
   line-height:40px!important;
 }
 </style>
 <style scoped>
  .yy-input-text{font-size: 14px;}
  </style>
 