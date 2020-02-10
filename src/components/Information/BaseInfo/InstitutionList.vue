<template>
    <div class="pairadd subtable">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 基本信息库 <span class="mlr_10">/</span> 联络机构 <span class="mlr_10">/</span> <b>{{cname}}查询</b></span> </div>
         <div class="content">
             <div class="ptitle mb-20">{{cname}}信息</div>
                <div class="pborder">
                      <el-row class="lh" :gutter="2">
                       
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">机构名称</span>
                            <el-input placeholder="请输入内容"  size="small" clearable v-model="pd.mc"  class="yy-input-input" ></el-input>
                        </el-col>
                          <el-col :sm="24" :md="12" :lg="8">
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
                          <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">机构隶属</span>
                            <el-cascader  
                            v-model="pd.sj"
                            :options="jgdata"
                            :show-all-levels="false"
                            :props="{ checkStrictly: true }"
                            clearable filterable size="small" class="yy-input-input" @visible-change="getLWDW()"></el-cascader>
                            </el-col>
                      </el-row>
                       <el-row class="lh" :gutter="2">
                        <el-col :sm="24" :md="12" :lg="8">
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
                         <el-col :sm="24" :md="12" :lg="8">
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
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">编码</span>
                            <el-input placeholder="请输入内容"  size="small" clearable v-model="pd.bm"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">简称</span>
                            <el-input placeholder="请输入内容"  size="small" clearable v-model="pd.jc"  class="yy-input-input" ></el-input>
                        </el-col>
                       
                            <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">区号</span>
                            <el-input placeholder="请输入内容"  size="small" clearable v-model="pd.qh"  class="yy-input-input" ></el-input>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">专线代码</span>
                            <el-input placeholder="请输入内容"  size="small" clearable v-model="pd.zxdm"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">传真</span>
                            <el-input placeholder="请输入内容"  size="small" clearable v-model="pd.cz"  class="yy-input-input" ></el-input>
                        </el-col>

                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">邮编</span>
                            <el-input placeholder="请输入内容"  size="small" maxlength="6" clearable v-model="pd.yb"  class="yy-input-input" ></el-input>
                        </el-col>
                    
                    </el-row>
                     <el-row class="lh con" >
                          <el-col :sm="24" :md="12" :lg="24">
                            <span class="yy-input-text" style="width:9%;">地址</span>
                             <el-input placeholder="请输入内容"  size="small" clearable v-model="pd.dz"  class="yy-input-input" style="width:53.5%!important;"></el-input>
                        </el-col>
                    </el-row>
                    <div class="footer">
                    <el-button type="primary"  style="width:130px;" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)">查 询</el-button>
                    <el-button style="width:130px;" @click="reset()">重  置</el-button>
                     </div>
                </div>

                <div class="pborder mt-20">
                         <el-row>
                            <el-col :span="16">
                              <el-button type="primary" size="small" @click="add(0)">录入</el-button>
                              <el-button type="primary" size="small" :disabled="bnt" @click="add(2)">查看</el-button>
                              <el-button type="primary" size="small" :disabled="bnt" @click="add(1)">修改</el-button>
                              <el-button type="primary" size="small" :disabled="bnt"  @click="delUser">删除</el-button>
                                </el-col>
                              <el-col :span="8" class="trt">
                               {{cname}}总数 <b class="sumfont" >{{this.TotalResult}}</b> 件
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
                                label="序号">
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

     

    </div>
 </template>
<script>
export default {
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
        }
    },
    mounted(){
       this.$store.dispatch("getJbb");
       this.$store.dispatch("getXzqh");
       this.$store.dispatch("getFyjb");
       this.$store.dispatch("getSfbm");
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
        getinit(val){
            this.addtype=val.query.type;
            this.pd={};
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
                        this.pd.lb=this.Global.MZDP
                        
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
          // this.getLWDW();
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
          console.log('---',pd);
          
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
                });
        
        },
          //隶属机构 
          getLWDW(sfbm){
              let p={
                  'lb':this.pd.lb,
                  'orgId':this.$store.state.orgid,
                  'sfbm':sfbm,
                  'xzqh':'',
                
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
        },
        add(t){
        
          if(t==0){
            this.$router.push({name:'InstitutionAdd',query:{type:this.addtype,status:t}});
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
                 
                         this.$message({
                                message: '删除成功！',
                                type: 'success'
                           });

               
                     
                        
                    }).catch(() => {
                        this.$message({
                        type: 'info',
                        message: '已取消删除'
                        });
                    });


               
            }else{
                  this.$message.error("请选择数据！");
            }
        },
    },
}
</script>
 <style scoped>
 
 </style>