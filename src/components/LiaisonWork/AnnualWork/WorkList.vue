
<template>
    <div class="pairadd subtable indexList">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 联络工作 <span class="mlr_10">/</span>  <b>
             {{cname}}</b></span> </div>
         <div class="content">
                <div class="ptitle mb-20">{{cinfo}}</div>
                <div class="pborder">
                  <el-row class="ah-40">
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">年份</span>
                           <el-select v-model="pd.year" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in yearlist"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">工作相关文件类型</span>
                           <el-select v-model="pd.workRelFileType" @change="getHDName(pd.activityType)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.zzxgwjlx"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="24" :lg="24">
                            <span class="yy-input-text" style="width:9%!important;">主题</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.theme"  class="yy-input-input"  style="width:86.8%!important;"></el-input>
                        </el-col>
                         
                    </el-row>
                    <el-row class="lh" v-if="open">
                       
                     
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">录入单位</span>
                           <el-select v-model="pd.entryUnitId" @change="getcbbm(pd.entryUnitId,1)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in fydwdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">录入部门</span>
                           <el-select v-model="pd.entryDepartmentId" @change="getJBR(pd.entryUnitId,pd.entryDepartmentId,0)"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in fybmdata1"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                        </el-col>
                      <el-col :sm="24" :md="12" :lg="8">
                       <span class="yy-input-text">录入人</span>
                         <el-select v-model="pd.entryPersonId"   filterable clearable  default-first-option placeholder="请选择"  size="small" class="yy-input-input">
                         <el-option
                          v-for="(item,ind) in fydata"
                          :key="ind"
                          :label="item.fullName"
                          :value="item.courtPersonId">
                         </el-option>
                        </el-select>
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
                            <el-col :span="16" class="ah-40">
                              <el-button type="primary" size="small" @click="getCK('0')">录入</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="getCK('9')">查看</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="getCK('1')">修改</el-button>
                              <el-button type="primary" size="small"  :disabled="bnt" @click="delpair">删除</el-button>
                                </el-col>
                              <el-col :span="8" class="trt">
                                  {{cinfo}}总数 <b class="sumfont" >{{this.TotalResult}}</b> 件
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
import {format,getYear} from '@/assets/js/date.js'
import UPLOAD from "../../Common/upload"
import {sortByKey} from '@/assets/js/ToArray.js'
export default {
    components:{UPLOAD},
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
            checkedList:[],
            addtype:'1',
            cname:'联络工作信息查询',
            cinfo:'联络工作信息',
            yearlist:getYear(),
            uploadDialogVisible:false,
            addDialogVisible:false,
            tableData:[],
            configHeader:[],
            checkItemReal:[],
            cc:true,
            multipleSelection:[],
            xmdata:[],
            checkItem:[],
            fydwdata:[],
            fybmdata:[],
            status:'',
            cdrdata:[],
            fydata:[],
            fybmdata1:[],
            opendata:[],//需要传的对象
            txtname:'审核',
            sendtype:'0',//审核
        }
    },
    mounted(){
      
         this.$store.dispatch("getZzxgwjlx");
      
         this.getinit(this.$router);
    },
    watch:{
        $router:function (val) {
                this.getinit(val);
        }
    },
    methods:{
        clickRow(row){
           this.$refs.multipleTable.toggleRowSelection(row)
        },
        getinit(val){
          this.tableData=[];
          this.getCheckList();
          this.getFY();
          this.getList(this.CurrentPage, this.pageSize, this.pd);
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
          if(this.multipleSelection.length>0){
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
        getCK(t){
         if(t=='0'){
          this.$router.push({name:'AnnualWork',query:{}});
         }else{
           if(this.multipleSelection.length>1){
               this.$message.error("只能选择一条数据!");return;
             }else if(this.multipleSelection.length==0){
               this.$message.error("请选择一条数据!");return;
             }
            var array=this.multipleSelection[0].workRelFilesId;
            this.$router.push({name:'AnnualWork',query:{state:t,workRelFilesId:this.multipleSelection[0].workRelFilesId}});
         }
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
                  'type':'0246000013'
              };
              this.$api.post(this.Global.aport2+'/CaseHomeController/getCaseListInfo',p,
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
          this.$api.post(this.Global.aport2+'/WorkRelFilesController/queryWorkRelFiles',p,
                r =>{

                      if(r.code==1){
                          this.tableData=r.data.workRelFilesVOList;
                          this.TotalResult=r.data.pageInfo.total;
                      }else{
                          this.tableData=[];
                          this.TotalResult=0;
                         
                      }
                 
                });

        },
        delpair(){
            if(this.multipleSelection.length>0){
                    this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                           var obj={};
                           var arr=[];
                           
                            for (let i = 0; i < this.multipleSelection.length; i++) {
                                obj.workRelFilesId=this.multipleSelection[i].workRelFilesId;
                                arr.push(obj);
                            }
                            let p = {
                                'idList':arr
                            };
                            this.$api.post(this.Global.aport2+'/WorkRelFilesController/delete',p,
                            r =>{
                                if(r.code==1){
                                     this.$message({
                                        message: '删除成功！',
                                        type: 'success'
                                  })

                                  this.getList(this.CurrentPage, this.pageSize, this.pd); 
                                }
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

        //法院单位
        getFY(){
            let p={
                'name':'',
            };
          this.$api.get(this.Global.aport1+'/org/getCourtOrg',p,
                r =>{
                    if(r.code==1){
                        this.fydwdata=r.data;
                    }
           });
        },
        //审批领导
         getJBR(orgid,suborgid,t){
             if(t==0){
                  this.$set(this.pd,'entryPersonId','');
                  this.fydata=[];
             }
              let p={
               'orgId':orgid,
               'subOrgId':suborgid,
             };
            this.$api.post(this.Global.aport1+'/courtPerson/queryByOrg',p,
                r =>{
                    if(r.code==1){
                      
                          this.fydata=r.data;
                      
                    }
                });
         },
       
          //法院部门
        getcbbm(orgid,t){
            if(t==1){
            
              this.$set(this.pd,'entryDepartmentId','');
              this.$set(this.pd,'entryPersonId','');
               this.fydata=[];
               this.fybmdata1=[];
            }
            if(orgid=='' || orgid==null){
                return;
            }

          let p={
            "orgId":orgid==null?this.$store.state.orgId:orgid
          };
             this.$api.get(this.Global.aport1+'/org/getSubOrg',p,
                r =>{
                    if(r.code==1){
                        this.fybmdata1=r.data;
                    }
                });
        },
        
      
    },
}
</script>
<style scoped>
.yy-input-text{font-size: 14px;}
</style>

