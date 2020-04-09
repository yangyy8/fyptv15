<template>
 <div class="pairadd ">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 监控和预警
              <span class="mlr_10">/</span>  <b>字典管理</b></span> </div>
         <div class="content subtable">
             <div class="ptitle mb-20">字典管理</div>
                <div class="pborder">
                      <el-row class="lh" :gutter="2">
                        <el-col :sm="24" :md="12" :lg="6">
                            <span class="yy-input-text">字典</span>
                           <el-select v-model="pd.orgId" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in fylist"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="6">
                            <span class="yy-input-text">名称</span>
                            <el-input placeholder="请输入内容" size="small"  clearable v-model="pd.roleName"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="6">
                            <span class="yy-input-text">简称</span>
                            <el-input placeholder="请输入内容" size="small"  clearable v-model="pd.roleName"  class="yy-input-input" ></el-input>
                        </el-col>
                    </el-row>
                    <div class="footer">
                    <el-button type="primary"  style="width:130px;" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)">查 询</el-button>
                    <el-button style="width:130px;" @click="reset()">重  置</el-button>
                </div>
                </div>
                <div class="pborder mt-20">
                    <el-row>
                       <el-button type="primary" size="small" @click="add(0)" >添加</el-button>
                       <el-button type="primary" size="small" :disabled="bnt" @click="add(1)" >编辑</el-button>
                       <el-button type="primary" size="small" :disabled="bnt"  @click="delUser">删除</el-button>
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
                            </el-table-column>
                             <el-table-column
                                prop="roleName"
                                label="名称">
                            </el-table-column>
                             
                            <el-table-column
                                prop="orgName"
                                label="编码">
                            </el-table-column>
                             <el-table-column
                                prop="createUser"
                                label="简称">
                            </el-table-column>
                             <el-table-column
                                prop="createUser"
                                label="曾用名">
                            </el-table-column>
                             <el-table-column
                                prop="createUser"
                                label="上级编码">
                            </el-table-column>
                             <el-table-column
                                prop="createUser"
                                label="排序">
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

        <el-dialog :title="adddia" :visible.sync="addDialogVisible" :close-on-click-modal='false' width="600px">
           
        </el-dialog>

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
            tableData:[],
            addDialogVisible:false,
            bnt:true,

        }
    },
    mounted(){
      
    },
    methods:{
       clickRow(row){
          this.$refs.multipleTable.toggleRowSelection(row)
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
        reset(){
            this.pd={};
        },
        getList(currentPage, showCount, pd){
      
               this.pd.token=this.$store.state.token;
                let p = {
                   
                    'pd':pd,
                    'pageInfo':{
                    'pageNumber':currentPage,
                    'pageSize':showCount
                }

                };
            this.$api.post(this.Global.aport1+'/user/roleList',p,
                r =>{
                      if(r.code==1){
                         this.tableData=r.data.roleInfoVOS;
                         this.TotalResult=r.data.pageInfo.total;
                      }
                });
        },
        add(t){
            if(t==0){
                this.addDialogVisible=true;
            }else{

                if(this.mselect.length==0){
                    this.$message.error('请选择一条数据！');return;
                }else if(this.mselect.length>1){
                    this.$message.error('只能选择一条数据！');return;
                }
                this.addDialogVisible=true;
            }
        }
    },
}
</script>