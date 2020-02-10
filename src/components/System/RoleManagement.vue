<template>
    <div class="pairadd ">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 系统管理 <span class="mlr_10">/</span>  <b>角色管理</b></span> </div>
         <div class="content subtable">
             <div class="ptitle mb-20">角色信息</div>
                <div class="pborder">
                      <el-row class="lh" :gutter="2">
                        <el-col :sm="24" :md="12" :lg="6">
                            <span class="yy-input-text">角色名</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.mc"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="6">
                            <span class="yy-input-text">所属法院</span>
                           <el-select v-model="pd.dwdm" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in fylist"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
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
                              <el-button type="primary" size="small" @click="add(0)">录入</el-button>
                              <el-button type="primary" size="small" :disabled="bnt" @click="add(2)">查看</el-button>
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
                                type="index"
                                label="序号">
                            </el-table-column>
                             <el-table-column
                                prop="roleName"
                                label="角色名称">
                            </el-table-column>
                             
                            <el-table-column
                                prop="orgName"
                                label="应用范围">
                            </el-table-column>
                           
                             <el-table-column
                                prop="createUser"
                                label="创建人">
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

        <el-dialog :title="adddia" :visible.sync="addDialogVisible" width="600px">
            <el-form :model="form" >
                <el-row class="ah-40">
                    <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">*</font> 角色名称：</span>
                        <el-input placeholder="请输入内容" size="small" clearable v-model="form.roleName"  class="yy-input-input" ></el-input>
                    </el-col>
                    <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">*</font> 所属法院：</span>
                        <el-select v-model="form.orgId" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in fylist"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                        </el-select>
                    </el-col>
                        <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">*</font> 画面功能：</span>
                        
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
                          <span class="yy-input-text trt" style="vertical-align: top;">备注：</span>
                        <el-input placeholder="请输入内容" type="textarea" :autosize="{ minRows: 2, maxRows: 3}" size="small" clearable v-model="form.remark"  class="yy-input-input"></el-input>
                    </el-col>
                     
                </el-row>
            </el-form>
              <div slot="footer" class="dialog-footer">
              <el-button type="primary"  size="small" @click="addsave()" v-if="tb!=2">保 存</el-button>
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
            adddia:'新增',
            fylist:[],
            addDialogVisible:false,
            tableData:[],
            menudata:[],
             defaultChecked:[],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            tb:0,
        }
    },
    mounted(){
           this.getFY();
           this.getMenu();
           this.getList(this.CurrentPage, this.pageSize, this.pd);
    },
    methods:{
        clickRow(row){
           this.$refs.multipleTable.toggleRowSelection(row)
  },
         getMenu(){
             this.menudata=[];
             this.$api.post(this.Global.aport1+'/user/funList', null,
                r => {
                if(r.code==1){
                    this.menudata=r.data;
                    // var arr = r.data;
                    // console.log(arr);
                    // this.menurr = [];
                    // this.uniteChildSame(arr);
                    // this.defaultChecked = this.menurr;
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
        getFY(){
              this.$api.get(this.Global.aport1+'/org/getCourtOrg',null,
                r =>{
                  
                      if(r.code==1){
                          this.fylist=r.data;
                      }
                });
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
          this.tb=t;
         
          switch (t) {
              case 0:
                  this.form={};
                  this.adddia="新增";
                  break;
              case 1:
                  this.adddia="修改";
                  break;
              case 2:
                  this.adddia="查看";
                  break;
              default:
                  break;
          }

          if(t!=0){
               if(this.mselect.length>1){
                    this.$message.error('只能选择一条数据！');return;
                }
                  let p = {
                         'roleId':this.mselect[0].roleId,
                         'token':this.$store.state.token,
                   };
                  this.$api.post(this.Global.aport1+'/user/getByRoleId',p,
                  r =>{
                      if(r.code==1){
                         this.form=r.data;
                         this.menudata=r.data.funList;
                         var arr = r.data.funList;
                            console.log(arr);
                            this.menurr = [];
                            this.uniteChildSame(arr);
                           
                            this.defaultChecked = this.menurr;
                      }
                });
          }else{
            this.getMenu();
          }
       
          this.addDialogVisible=true;
        },
        addsave(){

         var  url="/user/saveRole";
         let checkList=this.$refs.tree.getCheckedNodes();
        //  console.log(checkList);
         
        //  var array=checkList;
        if(this.form.roleName=='' || this.form.roleName==undefined){
             this.$message.error('角色不能为空！');return;
        }
        if(this.form.orgId=='' || this.form.orgId==undefined){
             this.$message.error('所属法院不能为空！');return;
        }
            if (checkList.length == 0) {
                this.$message.error('画面功能不能为空！');
                return;
             }
         var childrenlist=new Array();
       
              childrenlist = this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys());
            
                
              
                this.form.token=this.$store.state.token;
                this.form.menuIds=childrenlist;
                
                this.$api.post(this.Global.aport1+url,this.form,
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
        setUser(bb){
            if(this.mselect.length>0){
                var ff=new FormData();
                ff.append("token",this.$store.state.token);
                ff.append("use",bb);
                ff.append("id",this.mselect);
                let p = ff;
                  this.$api.post(this.Global.aport4+'/user/changeUser',p,
                r =>{
                      if(r.code==1){
                         this.tableData=r.data.homeVOList;
                         this.TotalResult=r.data.pageInfo.total;
                      }
                });
            }else{
                  this.$message.error("请选择数据！");
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
                            var srr=[];
                            for (let i = 0; i < array.length; i++) {
                                srr.push(array[i].roleId);
                            }
                            this.$api.post(this.Global.aport4+'/user/deleteUser',srr,
                            r =>{
                                if(r.code==1){
                                this.$message({
                                        message: '删除成功！',
                                        type: 'success'
                                })
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