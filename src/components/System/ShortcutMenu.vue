<template>
     <div class="pairadd subtable">
          <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 系统管理 <span class="mlr_10">/</span>  <b>个人快捷菜单设定</b></span> </div>
          <div class="content">
             <div class="pborder" style="text-align:center">
                  
                   <div style="width:800px; margin:0 auto;">
                        <div class="ptitle mb-10">所有快捷菜单</div>
                       <el-row>
                          <el-col :span="24">
                           <el-table
                            ref="multipleTable"
                            :data="tableData"
                             @row-click="clickRow"
                            @selection-change="yhChange">
                            <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                             <!-- <el-table-column
                                prop="mc1"
                                label="画面名称">
                            </el-table-column>
                              <el-table-column
                                prop="mc2"
                                label="按钮">
                            </el-table-column> -->
                            <el-table-column
                                prop="name"
                                label="菜单名称">
                            </el-table-column>
                            
                     </el-table>
                      <div class="middle-foot">
                                <div class="page-msg">
                                    <!-- <div class="">
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
                                    </div> -->
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
                
                          </el-col>                          
                       </el-row>
                  <div slot="footer">
                    <el-button type="primary" size="small" @click="save">保 存 </el-button>
                    <el-button @click="reset" size="small">重 置</el-button>
                    </div>
                <div class="ptitle mt-20">选中后的快捷菜单</div>
                     <div style="width:800px; margin:0 auto;">

                       <el-row>
                          <el-col :span="24">
                           <el-table
                            :data="tableData1"
                             >
                             <!-- <el-table-column
                                prop="mc1"
                                label="画面名称">
                            </el-table-column>
                              <el-table-column
                                prop="mc2"
                                label="按钮">
                            </el-table-column> -->
                            <el-table-column
                                prop="alias"
                                label="菜单名称">
                            </el-table-column>
                             <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                    <div>
                                      <el-button type="text"   class="a-btn"  title="上移"  icon="el-icon-top" @click="getMove(0,scope.row.shortMenuId)"></el-button>
                                       <el-button type="text"   class="a-btn"  title="下移"  icon="el-icon-bottom" @click="getMove(1,scope.row.shortMenuId)"></el-button>
                                    <el-button type="text"   class="a-btn"  title="删除"  icon="el-icon-delete" @click="deletes(scope.row.shortMenuId)"></el-button>
                                     <el-button  size="mini" @click="getOpen(scope.row.id,scope.row.shortMenuId)">修改菜单名称</el-button>
                                     </div>
                                  </template>
                            </el-table-column>
                     </el-table>
                          </el-col>                          
                       </el-row>
                       </div>
             </div>
              <div style="font-size:23px;color:red;font-weight:bold;line-height:50px;">{{msg}}</div>
              </div>
          </div>
          <el-dialog title="修改菜单名称" :visible.sync="addDialogVisible"  width="500px">
              <div>
               <el-row class="mb-20">
                   <el-col>
                      <span class="yy-input-text">菜单名称</span>
                       <el-input placeholder="请输入内容" size="small" clearable v-model="form.showName"    class="yy-input-input" ></el-input>
                     </el-col>
               </el-row>
                <div slot="footer" class="dialog-footer" style="text-align:center"> 
              <el-button type="primary"  size="small" @click="addsave()">提 交</el-button>
              <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
              </div>
               </div>
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
            tableData:[],
            pd:{},
            msg:'',
            tableData1:[],
            mselect:[],
            addDialogVisible:false,
            form:{},
        }
    },
    mounted(){
        this.getList(this.CurrentPage,this.pageSize);
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
        clickRow(row){
           
           this.$refs.multipleTable.toggleRowSelection(row)
        },
         yhChange(val){
            this.mselect=val;
        },
        getList(currentPage, showCount){
                    let p = {
                    'pd':{},
                     "pageInfo":{
                          "pageNumber":currentPage,
                          "pageSize":showCount,
                     }
                };
            this.$api.post(this.Global.aport1+'/menu/getShortcutMenuPage',p,
            r=>{
                      if(r.code==1){
                         this.tableData=r.data.menuInfoList;
                         this.TotalResult=r.data.pageInfo.total;
                      }else{
                          this.$messgae.error(r.message);
                      }
            }); 
            
            
             this.$api.get(this.Global.aport1+'/menu/getShortcutMenu',null,
            r=>{
                      if(r.code==1){
                         this.tableData1=r.data;
                      }else{
                          this.$messgae.error(r.message);
                      }
            });  



        },
        save(){
            if(this.mselect.length==0){
                this.$message.error("请选择快捷菜单!");return;
            }           
             var srr=[];
             var array=this.mselect;
             console.log(this.mselect,'----');
             
               for (let i = 0; i < array.length; i++) {
                   srr.push(array[i].id) ;
                   
               }
                let p = {
                    'menuList':srr
                };
            this.$api.post(this.Global.aport1+'/menu/savePersonMenuList',p,
            r=>{
                      if(r.code==1){
                           this.$message({
                              "type":"success",
                              "message":r.message
                          });
                      }else{
                          this.$message.error(r.message);
                      }
            });
        },
        getOpen(id,mid){
          this.form={};
          this.form.id=id;
          this.form.menuid=mid;
          this.addDialogVisible=true;
        },
        addsave(){
            let p={
                'menuId':this.form.id,
                'shortcutMenuId':this.form.menuid,
                'showName':this.form.showName,
            }
             this.$api.post(this.Global.aport1+'/menu/savePersonMenu',p,
            r=>{
                      if(r.code==1){
                           this.$message({
                              "type":"success",
                              "message":r.message
                          });
                       
                        this.addDialogVisible=false;
                        this.getList(this.CurrentPage,this.pageSize);
                      }else{
                          this.$message.error(r.message);
                      }
            });
        },
        getMove(t,d)
        {
         
        },
        deletes(id){
             this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        let p={
                              'shortcutMenuId':id
                        }
                        this.$api.post(this.Global.aport1+'/menu/deletePersonMenu',p,
                        r =>{
                        
                                if(r.code==1){
                                    this.$message({
                                            type: 'success',
                                            message: '删除成功!'
                                    });
                                    this.getList(this.CurrentPage, this.pageSize);
                                }else{
                                    this.$message.error(r.message);
                                     this.getList(this.CurrentPage, this.pageSize);
                                }
                            });
                       }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
        },
        reset(){
            this.getList(this.CurrentPage,this.pageSize);
        },

    },
}
</script>
<style scoped>
.txtr{text-align: right!important;}
</style>