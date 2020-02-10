<template>
    <div class="pairadd subtable">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
         <span> 基本信息库<span class="mlr_10">/</span>  <b>{{cname}}</b></span> </div>
         <div class="content">
                <div class="ptitle mb-20">{{title}}</div>
                <div class="pborder">
                    <el-row class="lh" :gutter="2">
                        
                         <el-col  :sm="24" :md="12" :lg="8" >
                            <span class="yy-input-text">姓名</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.personName"  class="yy-input-input" ></el-input>
                        </el-col>
                      
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">所属法院</span>
                           <el-select v-model="pd.orgId" @change="getSSBM(pd.orgId)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in ssfydata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">所属部门</span>
                           <el-select v-model="pd.subOrgId" filterable clearable default-first-option placeholder="请先选择法院"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in ssbmdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row class="lh" v-if="open">
                         
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">职业类别</span>
                           <el-select v-model="pd.jobTypeString" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.zylb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                         </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">职业</span>
                              <el-input placeholder="请输入内容" size="small" clearable v-model="pd.job"  class="yy-input-input" ></el-input>
                        </el-col>
                          <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">性别</span>
                           <el-select v-model="pd.sex" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.xb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">民族</span>
                           <el-select v-model="pd.nationality" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.mz"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                       <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">学历</span>
                           <el-select v-model="pd.education" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.xl"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">籍贯</span>
                           <el-select v-model="pd.birthPlace" :filter-method="userFilter" @visible-change="getXz(pd.birthPlace)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in xzdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         
                           <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text" style="width:28%!important;">出生日期</span>
                            <div class="yy-input-input  t-flex  t-date">
                                <el-date-picker
                                v-model="pd.beginBirthday" format="yyyy-MM-dd"
                                type="date" size="small" value-format="yyyy-MM-dd"
                                placeholder="开始时间" >
                                </el-date-picker>
                                <span class="septum">-</span>
                                <el-date-picker
                                    v-model="pd.endBirthday" format="yyyy-MM-dd"
                                    type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="结束时间" >
                                </el-date-picker>
                            </div>
                        </el-col>
                         
                    </el-row>
                </div>
                 <div class="footer">
                    <el-button type="primary"  style="width:130px;" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)">查 询</el-button>
                    <el-button style="width:130px;" @click="reset()">重  置</el-button>
                </div>
                <div class="loadmore" v-if="all" @click="getAll(1)">全部展开 <i class="el-icon-arrow-down"></i></div>
                <div class="loadmore" v-else @click="getAll(2)">部分收起 <i class="el-icon-arrow-up"></i></div>
                <div class="pairleft" >
                    <div class="anseacrch">
                     <el-checkbox-group v-model="checkedList" @change="changeList()">
                      <el-checkbox v-for="item in checkItem" :label="item.code" :key="item.code" :checked="item.checked" :disabled="item.checked">{{item.label}}</el-checkbox>
                     </el-checkbox-group>
                    </div>
                </div>
                <div class="pborder mt-20">
                            <el-row>
                              <el-col :span="16">
                              <el-button type="primary" size="small" @click="add('0','录入')">录入</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="add('9','查看')">查看</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="add('1','修改')">修改</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="dellist">删除</el-button>
                              <!-- <el-button type="primary" size="small"  >导入</el-button> -->
                              <!-- <el-button type="primary"  size="small"  @click="download">下载全部</el-button>
                              <el-button type="primary"  size="small"  @click="download">下载当页</el-button> -->
                                 </el-col>
                              <el-col :span="8" class="trt">
                                法院内部人员总数 <b class="sumfont" >{{this.TotalResult}}</b> 人
                              </el-col>
                       </el-row>
                      <el-table
                            ref="multipleTable"
                            :data="tableData"
                            @row-click="clickRow"
                            @selection-change="handleSelectionChange">
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
                                v-for="(val,i) in configHeader"
                                :key="i"
                                :prop="val.code"
                                :label="val.label">
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
<br/>
         </div>
    </div>
</template>
<script>
import {format} from '@/assets/js/date.js'
import {ToArray,sortByKey} from '@/assets/js/ToArray.js'
export default {
    data(){
        return{
            CurrentPage: 1,
            pageSize: 10,
            TotalResult: 0,
            pd:{},
            options:this.pl.ps,
            open:false,
            all:true,
            bnt:true,
            cname:'法院内部人员查询',
            title:'法院内部人员信息',
            checkedList:[],
            tableData:[],
            configHeader:[],
            checkItemReal:[],
            cc:true,
            multipleSelection:[],
            checkItem:[],
            addtype:'1',
            ssfydata:[],
            ssbmdata:[],
            xzList:[],
            xzdata:[],
        }
    },
    mounted(){
            this.$store.dispatch("getXb");
            this.$store.dispatch("getMz");
            this.$store.dispatch("getXl");
            this.$store.dispatch("getZylb");
            this.getinit(this.$route);
      
    },
    watch:{
        $route:function(val){
              this.getinit(val);
            
         //this.changeList();
      
        }
    },
    methods:{
          clickRow(row){
           this.$refs.multipleTable.toggleRowSelection(row)
        },
          getinit(val){
                this.addtype=val.query.type;
                this.getSSFY();
                this.getCheckList();
                this.getList(this.CurrentPage, this.pageSize, this.pd);
                if(val.query.jgid && val.query.sjid){
                    this.pd.orgId=val.query.sjid;
                    this.getSSBM(val.query.sjid);
                    this.pd.subOrgId=val.query.jgid;
                }
          },
         handleSelectionChange(val) {
          this.multipleSelection = val;
          if(this.multipleSelection && this.multipleSelection.length>0){
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
        reset(){
            this.pd={};
        },
        getAll(n){
            if(n==1){
                this.open=true;
                this.all=false;
            }else{
                this.open=false;
                this.all=true;
            }
        },
         getCheckList(){
              let p={
                  'type':'0246000004'
              };
              this.$api.post(this.Global.aport1+'/CaseHomeController/getCaseListInfo',p,
                r =>{
                  
                      if(r.code==1){

                          this.checkItem=r.data;
                       
                          this.configHeader=[];
                            for(var j=0;j<this.checkItem.length;j++){
                                if(this.checkItem[j].checked)
                                    this.configHeader.push(this.checkItem[j])
                                }
                       
                          if(this.configHeader.length==0){
                                this.cc=false;
                            }else{
                                this.cc=true;
                            }
                       }
                    
                      
                });
        },
        changeList(){
            this.configHeader=[];
            for(var i=0;i<this.checkedList.length;i++){
            for(var j=0;j<this.checkItem.length;j++){
              if(this.checkedList[i] == this.checkItem[j].code){
                this.configHeader.push(this.checkItem[j])
              }
            }
           }
           if(this.configHeader.length==0){
                this.cc=false;
           }else{
                this.cc=true;
            }    
          this.configHeader=sortByKey(this.configHeader,'sort');        
        },
        getList(currentPage, showCount, pd){
          this.changeList();
          let p={
             "pd":this.pd,
             "pageInfo":{
                 "pageNumber":currentPage,
                 "pageSize":showCount,
             }
          };
          this.$api.post(this.Global.aport1+'/courtPerson/query',p,
                r =>{
                  
                      if(r.code==1){
                          this.tableData=r.data.courtPersonList;
                          this.TotalResult=r.data.pageInfo.total;
                      }
                });
        
        },
        getSSFY(){
                 this.$api.get(this.Global.aport1+'/org/getCourtOrg',null,
                r =>{
                  
                      if(r.code==1){

                          this.ssfydata=r.data;
                      }
                });
        },
        getSSBM(orgid){
          
            this.$set(this.pd,"subOrgId","");
            this.ssbmdata=[];
            if(orgid=='' || orgid==null){return;}
            let p={
                'orgId':orgid,
            }
            this.$api.get(this.Global.aport1+'/org/getSubOrg',p,
                r =>{
                  
                      if(r.code==1){
                          this.ssbmdata=r.data;
                      }
                });
        },
        add(t,mc){
            if(t=='0'){
                this.$router.push({name:'BaseAdd',query:{type:'4',status:t}});
            }else{
                if(this.multipleSelection && this.multipleSelection>1)
                {
                  this.$message.error("只能选择一条数据！");return;
                }
                this.$router.push({name:'BaseAdd',query:{type:'4',status:t,wtitle:mc,pbid:this.multipleSelection[0].pbId,reid:this.multipleSelection[0].courtPersonId}});
            }
        },
         dellist(){
            var mselect=[];
            if(this.multipleSelection.length==0){
                   this.$message.error("请选择一条信息!"); return;
            }else{
                var array=this.multipleSelection;
                   for (let i = 0; i < array.length; i++) {
                       mselect.push(array[i].pbId);
                    
                   }
            }
           this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let p={
                        'pbIds':mselect
                    };
                this.$api.post(this.Global.aport1+'/courtPerson/delete',p,
                 r =>{
                  
                      if(r.code==1){
                         this.$message({
                                type: 'success',
                                message: '删除成功!'
                        });
                        this.getList(this.CurrentPage, this.pageSize, this.pd);
                      }
                });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });

        },
      
     //获取行政区划
    getXz(val){
      this.$api.get(this.Global.aport4+this.Global.jg,null,
        r =>{
          if(r.success){
            this.xzList = ToArray(r.data);
            this.userFilter();
          }
        })
    },
    userFilter(query = '') {
             let arr = this.xzList.filter((item) => {
            
              if(item.mc!=undefined){
                  return item.mc.includes(query)
               }
             })
             if (arr.length > 200) {
               this.xzdata = arr.slice(0, 200)
             } else {
               this.xzdata= arr
             }
           },
    },
}
</script>
<style scoped>
.yy-input-text{font-size: 14px;}
.txtx{width: 40%!important;}
.inputx{width: 50%!important;}
</style>