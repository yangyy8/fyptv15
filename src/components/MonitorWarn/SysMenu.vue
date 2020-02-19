<template>
    <div class="pairadd ">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 监控和预警
              <span class="mlr_10">/</span>  <b>快捷菜单设定</b></span> </div>
         <div class="content subtable">
             <div class="ptitle mb-20">快捷菜单</div>
                <div class="pborder">
                      <el-row class="lh" :gutter="2">
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="yy-input-text">画面名称</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.userName"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                             <span class="yy-input-text">按钮</span>
                             <el-input placeholder="请输入内容" size="small" clearable v-model="pd.userName"  class="yy-input-input" ></el-input>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="8">
                              <span class="yy-input-text">菜单名称</span>
                             <el-input placeholder="请输入内容" size="small" clearable v-model="pd.userName"  class="yy-input-input" ></el-input>
                        </el-col>
                    </el-row>
                <div class="footer">
                    <el-button type="primary"  style="width:130px;" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)">查 询</el-button>
                    <el-button style="width:130px;" @click="reset()">重  置</el-button>
                </div>
                </div>

                <div class="pborder mt-20">
                    <el-row>
                              <el-button type="primary" size="small" @click="add(0)">新增</el-button>
                              <el-button type="primary" size="small" :disabled="bnt" @click="add(1)">修改</el-button>
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
                                prop="intranetAccount"
                                label="画面名称">
                            </el-table-column>
                              <el-table-column
                                prop="personName"
                                label="按钮">
                            </el-table-column>
                            <el-table-column
                                prop="orgName"
                                label="菜单名称">
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
        <el-dialog :title="adddia" :visible.sync="addDialogVisible" width="700px">
            <el-form :model="form" >
                <el-row class="ah-40">
                    
                      <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">*</font>  菜单选择：</span>
                        <el-tree
                            :data="menudata"
                            show-checkbox
                            node-key="value"
                            :default-checked-keys="defaultChecked"
                            ref="tree"
                            highlight-current
                            class="yy-input-input"
                            style="padding-left:30%;"
                            :props="defaultProps">
                        </el-tree>
                    </el-col>
                    <el-col :span="24" class="mt-20">
                          <span class="yy-input-text trt">菜单名称：</span>
                        <el-input placeholder="请输入内容" size="small" clearable v-model="form.instructionContents"  class="yy-input-input"></el-input>
                    </el-col>
                </el-row>
            </el-form>
              <div slot="footer" class="dialog-footer">
              <el-button type="primary"  size="small" @click="addsave()">保 存</el-button>
              <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
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
            pd:{},
            form:{},
            options:this.pl.ps,
            bnt:true,
            mselect:[],
            menudata:[],
            menurr:[],
            adddia:'新增',
            fylist:[],
            defaultChecked:[],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            addDialogVisible:false,
            tableData:[],
            tb:0,
    
            sform:{},
        }
    },
    mounted(){
          
           this.getMenu();
           this.getList(this.CurrentPage, this.pageSize, this.pd);
    },
    methods:{
       getMenu(){
             this.$api.post(this.Global.aport1+'/user/funList', null,
                r => {
                if(r.code==1){
                    this.menudata=r.data;
                    var arr = r.data;
                    console.log(arr);
                    this.menurr = [];
                    this.uniteChildSame(arr);
                    this.defaultChecked = this.menurr;
                }
             });
       },
        uniteChildSame(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].check == true || arr[i].children != null) {
                this.selectChildSame(arr[i].children,arr[i].check,arr[i].value);
            }
        }
      },
      selectChildSame(arr,check,value){
         if(arr!=null){
                    for (var i = 0; i < arr.length; i++) {
                            if(arr[i].children!=null){
                                this.selectChildSame(arr[i].children);
                            }else {
                            if(arr[i].check){
                            
                            this.menurr.push(arr[i].value);
                        } 
                            }
                    }
            }else{
                if(check==true){
                   
                       this.menurr.push(value);
                } 
            }
       
        },
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

        reset(){
            this.pd={};
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
          
            let p={
                'pd':pd,
                'pageInfo':{
                    'pageNumber':currentPage,
                    'pageSize':showCount
                }
            }
            this.$api.post(this.Global.aport1+'/menu/getAllShortcutMenu',p,
                r =>{
                      if(r.code==1){
                         this.tableData=r.data;
                         this.TotalResult=r.data.pageInfo.total;
                      }
                });
        
        },
        getRole(orgid){
                 let p = {
                    'pd':{
                        'orgId':orgid,
                        'token':this.$store.state.token
                    },
                 };
            this.$api.post(this.Global.aport1+'/user/roleList',p,
                r =>{
                      if(r.code==1){
                         this.rolelist=r.data;
                      }
                });
        },
        add(t){
          this.tb=t;
          switch (t) {
              case 0:
                  this.form={};
                  this.adddia="新增";
                  break;
              case 1:
                  this.adddia="修改";
                  break;
             
              default:
                  break;
          }
        
         
              if(this.mselect.length>1){
                    this.$message.error('修改时只能选择一条数据！');return;
              } 
          
               //  this.getRole(this.mselect[0].orgId);
             
                  let p = {
                        //  'userId':this.mselect[0].courtPersonId,
                        //  'orgId':this.mselect[0].orgId,
                        //  'token':this.$store.state.token,
                   };
                  this.$api.post(this.Global.aport1+'/user/getByUserId',p,
                  r =>{
                      if(r.code==1){

                            this.form=r.data;
                            this.menudata=r.data.funList;
                            var arr = r.data.funList;
                            this.menurr = [];
                            this.uniteChildSame(arr);
                            this.defaultChecked = this.menurr;
                   
                      }
                });
               
          this.addDialogVisible=true;
        },
        getUserList(usrid,orgid){
             let p = {
                  "userId":usrid,
                  "orgId":orgid,
                  "token":this.$store.state.token,
             };
             this.$api.post(this.Global.aport1+'/user/getByUserId',p,
                r =>{
                      if(r.code==1){
                         this.form=r.data;
                      }
                });
        },
        addsave(){
           var url="/user/saveUserFun";
           var menuArr=[];  
           this.sform={};
           if(this.form.roleIds=='' || this.form.roleIds==undefined){
               this.$message.error("角色不能为空！");return;
           }
      
           var childrenlist=new Array();
           childrenlist = this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys());
            
      
                this.sform.token=this.$store.state.token;
                this.sform.menuIds=childrenlist;
                this.sform.userId=this.form.userId;
                this.sform.orgId=this.form.orgId;
                this.sform.roleIds=this.form.roleIds;
                

                this.$api.post(this.Global.aport1+url,this.sform,
                 r =>{
                      if(r.code==1){
                          this.$message({
                                    message: '保存成功！',
                                    type: 'success'
                                });
                          this.getList(this.CurrentPage, this.pageSize, this.pd);
                          this.addDialogVisible=false;
                         
                      }else{
                           this.$message.error(r.message);
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
                            let p = {
                                'userlist':this.mselect,
                            };
                            this.$api.post(this.Global.aport1+'/user/deleteUser',p,
                            r =>{
                                if(r.code==1){
                                this.$message({
                                        message: '删除成功！',
                                        type: 'success'
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
               
            }else{
                  this.$message.error("请选择数据！");
            }
        },
       
    },
}
</script>
 <style scoped>
 
 </style>