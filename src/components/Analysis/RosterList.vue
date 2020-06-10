<template>
    <div class="pairadd subtable">
           <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 
               联络对象 <span class="mlr_10">/</span>  
               <b>{{cname}}查询</b></span> 
            </div>
           <div class="content">
                <div class="ptitle mb-20">查询条件</div>
                <div class="pborder">
                     <el-row class="ah-40" :gutter="2">
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">姓名</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.personName"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
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
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">出生日期</span>
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
                        <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">决断单位</span>
                             <el-select v-model="pd.orgId" @change="getWork(pd.orgId,'1');getNJB();getTB(pd.orgId);getWYH()" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                      <el-option
                                        v-for="(item,ind) in dwdata"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.orgid">
                                      </el-option>
                              </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">决断部门</span>
                             <el-select v-model="pd.orgId" @change="getWork(pd.orgId,'1');getNJB();getTB(pd.orgId);getWYH()" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                      <el-option
                                        v-for="(item,ind) in dwdata"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.orgid">
                                      </el-option>
                              </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">决断人</span>
                             <el-select v-model="pd.orgId" @change="getWork(pd.orgId,'1');getNJB();getTB(pd.orgId);getWYH()" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                      <el-option
                                        v-for="(item,ind) in dwdata"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.orgid">
                                      </el-option>
                              </el-select>
                        </el-col>
                     </el-row>
                     <el-row class="lh" v-if="open" >
                          <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">人员类别</span>
                           <el-select v-model="pd.partisans" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.dp"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">级别</span>
                           <el-select v-model="pd.partisans" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.dp"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">届别</span>
                           <el-select v-model="pd.partisans" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.jb"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">团别</span>
                           <el-select v-model="pd.partisans" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.dp"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">界别</span>
                           <el-select v-model="pd.partisans" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.dp"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8" class="input-item">
                            <span class="yy-input-text">特约类别</span>
                           <el-select v-model="pd.partisans" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in $store.state.dp"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        </el-col>
                     </el-row>
                 <div class="footer">
                    <el-button type="primary"  style="width:130px;" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)">查 询</el-button>
                    <el-button style="width:130px;" @click="reset()">重  置</el-button>
                </div>
                <div class="loadmore" v-if="all" @click="getAll(1)">全部展开 <i class="el-icon-arrow-down"></i></div>
                <div class="loadmore" v-else @click="getAll(2)">部分收起 <i class="el-icon-arrow-up"></i></div>
                </div>
        
            <div class="pborder mt-20 ">
                         <el-row>
                            <el-col :span="22">
                              <el-button type="primary" size="small" @click="getgl" >关联</el-button>
                              <el-button type="primary" size="small" :disabled="bnt"  @click="delInfo" >删除</el-button>
                            </el-col>
                         </el-row>
                     <el-table
                            ref="multipleTable"
                            :data="tableData"
                            @row-click="clickRow"
                            @selection-change="yhChange">
                            <el-table-column
                                type="selection"
                                width="100">
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
                                prop="theme"
                                label="姓名">
                                
                            </el-table-column>
                            <el-table-column
                                prop="contents"
                                label="性别">
                            </el-table-column>
                             <el-table-column
                                prop="workRelFileType"
                                label="民族">
                             </el-table-column>
                             <el-table-column
                              prop="year"
                              label="出生日期">
                             </el-table-column>
                             <el-table-column
                                prop="period"
                                label="身份">
                             </el-table-column>
                             <el-table-column
                                prop="instructLeader"
                                label="党派">
                             </el-table-column>
                             <el-table-column
                                prop="instructionTime"
                                label="手机">
                             </el-table-column>
                             <el-table-column
                                prop="entryPerson"
                                label="固话">
                            </el-table-column>
                            <el-table-column
                                prop="entryTime"
                                label="团别">
                            </el-table-column>
                             <el-table-column
                                prop="updatePerson"
                                label="届别">
                            </el-table-column>
                             <el-table-column
                                prop="updateTime"
                                label="学历">
                            </el-table-column>
                             <el-table-column
                                prop="updateTime"
                                label="学位">
                            </el-table-column>
                            <el-table-column
                                prop="updateTime"
                                label="籍贯">
                            </el-table-column>
                            <el-table-column
                                prop="updateTime"
                                label="单位职务">
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
                <br/><br/>
         </div>

     <el-dialog title="人员关联" :visible.sync="addDialogVisible"  :close-on-click-modal='false' >
         <RYGL :data="data" :type='1' @fatherMethod="fatherMethod"></RYGL>
     </el-dialog>

    </div>
       
</template>
<script>
import RYGL from "../Common/workdoc/rygl"
export default {
    components:{RYGL},
    data(){
        return{
             cname:'连任或重名名单',
             CurrentPage: 1,
             pageSize: 10,
             TotalResult: 0,
             pd:{},
             options:this.pl.ps,
             open:false,
             all:true,
             bnt:true,
             dwdata:[],//单位
             bmdata:[],//部门
             rdata:[],//人
             tableData:[],
             mselect:[],
             addDialogVisible:false,
             data:{},

        }
    },
    mounted(){
      this.$store.dispatch("getXb");
      this.$store.dispatch('getTysf');
      this.$store.dispatch('getJb');

    },
    methods:{
         pageSizeChange(val) {
          this.pageSize=val;
          this.getList(this.CurrentPage, val, this.pd);
        },
        handleCurrentChange(val) {
          this.CurrentPage=val;
          this.getList(val, this.pageSize, this.pd);
        },
         getList(currentPage, showCount, pd){
          
          let p={
             
            "pd":this.pd,
             "pageInfo":{
                 "pageNumber":currentPage,
                 "pageSize":showCount,
             }
           };
          this.$api.post(this.Global.aport1+'/WorkFilesController/queryWorkFiles',p,
                     r =>{
                       if(r.code==1){
                         this.tableData=r.data.workFilesVOList;
                         this.TotalResult=r.data.pageInfo.total;

                       }
             });

        },
        //删除
        delInfo(n){
          var mselect=[];
            if(this.mselect.length==0){
                   this.$message.error("请选择一条信息!"); return;
            }else{
                var array=this.mselect;
                   for (let i = 0; i < array.length; i++) {
                     var obj={};
                       obj.workFilesId=array[i].workFilesId;
                       mselect.push(obj);
                       
                   }
            }
           this.$confirm('此操作将删除所有业务关联该人员的信息!', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let p={
                        'workFilesIdList':mselect
                    };
                this.$api.post(this.Global.aport1+'/WorkFilesController/delete',p,
                 r =>{
                  
                      if(r.code==1){
                        
                         this.$message.success('删除成功');
                         this.getList(this.CurrentPage, this.pageSize, this.pd);
                      }
                });

                }).catch(() => {
                   
                    this.$message.info('已取消删除');         
                });
    
        },
        getgl(){
            this.addDialogVisible=true;
        },
         yhChange(val){
             this.mselect=val;
             if(this.mselect.length>0){
                 this.bnt=false;
             }else{
                 this.bnt=true;
             }
        },
        clickRow(row){
           this.$refs.multipleTable.toggleRowSelection(row)
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
        fatherMethod(){
          this.addDialogVisible = false;
        },
    }
}
</script>