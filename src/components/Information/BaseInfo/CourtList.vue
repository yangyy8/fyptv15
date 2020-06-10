<template>
    <div class="pairadd subtable">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 基本信息 <span class="mlr_10">/</span> 法院内部管理 <span class="mlr_10">/</span> <b>{{cname}}查询</b></span> </div>
         <div class="content">
             <div class="ptitle mb-20">{{cname}}信息</div>
                <div class="pborder">
                      <el-row class="lh" :gutter="2">
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">机构名称</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.mc"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">简称</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.jc"  class="yy-input-input" ></el-input>
                        </el-col>
                         <el-col  :sm="24" :md="12" :lg="8">
                        <span class="yy-input-text">级别</span>
                        <el-select v-model="pd.jb" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option
                           v-for="(item,ind) in $store.state.fyjb"
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
                </div>
                <div class="pborder mt-20">
                    <el-row>
                        <el-col :span="16">
                              <el-button type="primary" size="small" @click="add(0)">录入</el-button>
                              <el-button type="success" size="small" :disabled="bnt" @click="add(1)">修改</el-button>
                              <el-button type="danger" size="small" :disabled="bnt"  @click="delUser">删除</el-button>
                         </el-col>
                            <el-col :span="8" class="trt">
                                  各级法院和部门总数 <b class="sumfont" >{{this.TotalResult}}</b> 件
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
                                prop="sjmc"
                                label="机构隶属">
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
            addtype:'1',
            show:true,
            cname:'各级法院',
        }
    },
    mounted(){
           this.$store.dispatch('getFyjb');
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
        reset(){
            this.pd={};
        },
        getinit(val){
            this.addtype=val.query.type;
       
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
           this.pd.lb=this.Global.FY;
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
        add(t){
          if(t==0){
          this.$router.push({name:'CourtSystemAdd',query:{type:this.addtype,status:t}});
          }else{
              if(this.mselect.length>1){
                  this.$message.error("只能选择一条数据！");return;
              }
               this.$router.push({name:'CourtSystemAdd',query:{type:this.addtype,status:t,jgid:this.mselect[0].orgid}});
          }
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
                        console.log(array.length);
                        
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
                         
                         
                                 this.$message.success('删除成功！');  

                           
                            
                        }

                    }).catch(() => {
                       
                         this.$message.info('已取消删除');  
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