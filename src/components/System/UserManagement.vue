<template>
    <div class="pairadd">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 系统管理 <span class="mlr_10">/</span>  <b>用户管理</b></span> </div>
         <div class="content subtable">
             <div class="ptitle mb-20">用户信息</div>
                <div class="pborder">
                      <el-row class="lh" :gutter="2">
                        <el-col :sm="24" :md="12" :lg="6">
                            <span class="yy-input-text">姓名</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.userName"  class="yy-input-input" ></el-input>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="6">
                            <span class="yy-input-text">所属法院</span>
                           <el-select v-model="pd.orgId" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
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
                              <el-button type="primary" size="small" :disabled="bnt" @click="add(0)">赋权</el-button>
                              <el-button type="primary" size="small" :disabled="bnt" @click="add(2)">查看</el-button>
                              <!-- <el-button type="primary" size="small" :disabled="bnt" @click="add(1)">修改</el-button> -->
                              <el-button type="primary" size="small" :disabled="bnt"  @click="delUser">删除</el-button>
                              <el-button type="primary" size="small" :disabled="bnt" @click="setUser()">解冻</el-button>
                              <el-button type="primary" size="small" :disabled="bnt" @click="setPwd()">重置密码</el-button>
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
                             <!-- <el-table-column
                                prop="intranetAccount"
                                label="登录名">
                            </el-table-column> -->
                              <el-table-column
                                prop="personName"
                                label="姓名">
                            </el-table-column>
                            <el-table-column
                                prop="orgName"
                                label="所属法院">
                            </el-table-column>
                             <el-table-column
                                prop="subOrgName"
                                label="所属部门">
                            </el-table-column>
                             <el-table-column
                                prop="subOrgPosition"
                                label="职务">
                            </el-table-column>
                             <el-table-column
                                prop="lockStatus"
                                label="状态">
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
                        <span class="yy-input-text trt">所属法院：</span>
                         {{form.orgName}}
                    </el-col>
                     <el-col :span="24">
                        <span class="yy-input-text trt">姓名：</span>
                        {{form.userName}}
                    </el-col>
                      <el-col :span="24">
                        <span class="yy-input-text trt"><font class="red">*</font> 角色：</span>
                        <el-select v-model="form.roleIds" :disabled="ck" multiple filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in rolelist"
                                 :key="ind"
                                 :label="item.roleName"
                                 :value="item.roleId">
                                 </el-option>
                        </el-select>
                    </el-col>
                      <el-col :span="24">
                        <span class="yy-input-text trt"> 菜单功能：</span>
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
                      <el-col :span="24">
                        <span class="yy-input-text trt">  画面功能：</span>
                        <el-tree
                            :data="menudata1"
                            show-checkbox
                            node-key="value"
                            :default-checked-keys="defaultChecked1"
                            ref="tree1"
                            highlight-current
                            class="yy-input-input"
                            style="padding-left:30%;"
                            :props="defaultProps1">
                        </el-tree>
                    </el-col>
                    <el-col :span="24" class="mt-20">
                          <span class="yy-input-text trt" style="vertical-align: top;">备注：</span>
                        <el-input placeholder="请输入内容"  :disabled="ck"  type="textarea" :autosize="{ minRows: 2, maxRows: 3}" size="small" clearable v-model="form.instructionContents"  class="yy-input-input"></el-input>
                    </el-col>
                </el-row>
            </el-form>
              <div slot="footer" class="dialog-footer">
              <el-button type="primary"  size="small" @click="addsave()" v-if="tb!=2">保 存</el-button>
              <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="解冻信息" :visible.sync="jdDialogVisible" width="700px">
             <el-row>
                  <el-col :span="24">
                  <div class="yy-input-text trt topt" style="width:15%;"> 
                    解冻原因：</div>                
                 <el-input placeholder="请输入内容" type="textarea"  :autosize="{ minRows:4, maxRows: 4}" size="small" clearable v-model="checkContents"  class="yy-input-input" style='width:80%!important' ></el-input>
             </el-col>
             </el-row>
              <div slot="footer" class="dialog-footer">
              <el-button type="primary"  size="small" @click="setadd()" >保 存</el-button>
              <el-button @click="jdDialogVisible = false" size="small">取 消</el-button>
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
            menudata1:[],
            menurr:[],
            menurr1:[],
            adddia:'赋权',
            fylist:[],
            defaultChecked:[],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            defaultChecked1:[],
            defaultProps1: {
                children: 'children',
                label: 'label'
            },
            addDialogVisible:false,
            jdDialogVisible:false,
            tableData:[],
            tb:0,
            rolelist:[],//角色列表
            sform:{},
            checkContents:'',//解冻原因
            ck:false,
        }
    },
    mounted(){
           this.getFY();
           this.getMenu();
           this.getHMGN();
           this.getList(this.CurrentPage, this.pageSize, this.pd);
    },
    methods:{
       getMenu(){
             this.$api.post(this.Global.aport1+'/user/funList', null,
                r => {
                if(r.code==1){
                    this.menudata=r.data;
                    //var arr = r.data;
                    //console.log(arr);
                    //this.menurr = [];
                    //this.uniteChildSame(arr);
                    //this.defaultChecked = this.menurr; 
                }
             });
       },
        uniteChildSame(arr,t) {
        for (var i = 0; i < arr.length; i++) {
            if(t==2){arr[i].disabled = true }
            if (arr[i].check == true || arr[i].children != null) {
                this.selectChildSame(arr[i].children,arr[i].check,arr[i].value,t);
            }
        }
      },
      
      selectChildSame(arr,check,value,t){
         
         if(arr!=null){
                    for (var i = 0; i < arr.length; i++) {
                            if(arr[i].children!=null){
                                var srr=arr[i].children;
                                if(t==2){
                                    for(var j = 0; j < srr.length; j++){
                                        srr[j].disabled = true
                                    }
                                 }
                                 this.selectChildSame(srr,'','',t);
                             }else {
                               if(arr[i].check){
                                  this.menurr.push(arr[i].value);
                                } 
                             }
                         if(t==2){arr[i].disabled = true }
                    }
            }else{
                if(check==true){
                    this.menurr.push(value);
                } 
                
            }
        },
        uniteChildSame1(arr,t) {
        for (var i = 0; i < arr.length; i++) {
            if(t==2){arr[i].disabled = true }
            if (arr[i].check == true || arr[i].children != null) {
                this.selectChildSame1(arr[i].children,arr[i].check,arr[i].value,t);
            }
        }
      },
      selectChildSame1(arr,check,value,t){
         if(arr!=null){
                    for (var i = 0; i < arr.length; i++) {
                            if(arr[i].children!=null){
                                var srr=arr[i].children;
                                if(t==2){
                                    for(var j = 0; j < srr.length; j++){
                                        srr[j].disabled = true
                                    }
                                 }
                                this.selectChildSame1(srr,'','',t);
                            }else {
                                if(arr[i].check){
                                    this.menurr1.push(arr[i].value);
                                } 
                            }
                          if(t==2){arr[i].disabled = true }
                    }
            }else{
                if(check==true){
                    this.menurr1.push(value);
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
        getFY(){
             let p={
             'name':'',
             'sj':this.$store.state.orgid,
              
             }
              this.$api.get(this.Global.aport1+'/org/getCourtOrg',p,
                r =>{
                  
                      if(r.code==1){
                          this.fylist=r.data;
                      }
                });
        },
          getHMGN(){
            this.menudata1=[];
            this.$api.post(this.Global.aport1+'/menu/pageList',null,
            r=>{
                      if(r.code==1){
                         this.menudata1=r.data;
                      }
                      
            });
        },
        getList(currentPage, showCount, pd){
          
            this.pd.token=this.$store.state.token;
          
            if(this.pd.userName!="" && this.pd.userName!=undefined){
                    this.pd.personName=this.pd.userName;
            }else{  this.pd.personName='';}
       
            let p={
                'pd':pd,
                'pageInfo':{
                    'pageNumber':currentPage,
                    'pageSize':showCount
                }
            }
            this.$api.post(this.Global.aport1+'/courtPerson/getUser',p,
                r =>{
                      if(r.code==1){
                         this.tableData=r.data.courtPersonList;
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
          this.ck=false;
          switch (t) {
              case 0:
                  this.form={};
                  this.adddia="赋权";
                  break;
              case 1:
                  this.adddia="修改";
                  break;
              case 2:
                  this.ck=true;
                  this.adddia="查看";
                  break;
              default:
                  break;
          }
        
              if(this.mselect.length>1){
                    this.$message.error('修改时只能选择一条数据！');return;
              } 
          
                 this.getRole(this.mselect[0].orgId);
                //  this.getUserList(this.mselect[0].courtPersonId,this.mselect[0].orgId);
                  let p = {
                         'userId':this.mselect[0].courtPersonId,
                         'orgId':this.mselect[0].orgId,
                         'token':this.$store.state.token,
                   };
                  this.$api.post(this.Global.aport1+'/user/getByUserId',p,
                  r =>{
                      if(r.code==1){

                         this.form=r.data;
                     
                            this.$set(this.form,'roleIds',r.data.roleList);
                          
                            this.menudata=r.data.funList;
                            var arr = r.data.funList;
                            this.menurr = [];
                            this.uniteChildSame(arr,t);
                            this.defaultChecked = this.menurr;
                           
                            this.menudata1=r.data.pageList;
                            var arr1 = r.data.pageList;
                            this.menurr1 = [];
                            this.uniteChildSame1(arr1,t);
                            this.defaultChecked1 = this.menurr1;
                            
                            
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
        //    let checkList=this.$refs.tree.getCheckedNodes();
        //    let checkList1=this.$refs.tree1.getCheckedNodes();
            // if (checkList.length == 0) {
            //     this.$message.error('菜单功能不能为空！');
            //     return;
            //  }
            //  if (checkList1.length == 0) {
            //     this.$message.error('画面功能不能为空！');
            //     return;
            //  }
           var childrenlist=new Array();
            var childrenlist1=new Array();
           childrenlist = this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys());
           childrenlist1 = this.$refs.tree1.getHalfCheckedKeys().concat(this.$refs.tree1.getCheckedKeys());
           
           for (let ii = 0; ii < childrenlist1.length; ii++) {
                childrenlist.push(childrenlist1[ii]);
                
            }
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
        setUser(){
            if(this.mselect.length>0){
                this.checkContents="";
              this.jdDialogVisible=true;
            }else{
                  this.$message.error("请选择数据！");
            }
             
        },
        setadd(){
            // if(this.checkContents==null || this.checkContents=="" || this.checkContents==undefined){
            //     this.$message.error("解冻原因不能为空！");return;
            // }
            
             if(this.mselect.length>0){
                var array=this.mselect;
            
                for (let i = 0; i < array.length; i++) {
                
                var ff=new FormData();
                    ff.append("userId",array[i].courtPersonId);
                    ff.append("reason",this.checkContents);
                    let p=ff;

             this.$api.post(this.Global.aport4+'/user/unLockUser',p,
                r =>{
                      if(r.code==1){
                          this.$message({
                                   message: '操作成功！',
                                   type: 'success'
                                });
                           this.jdDialogVisible=false;
                           this.getList(this.CurrentPage, this.pageSize, this.pd);
                      }else{
                      this.$message.error(r.message);
                      }
                });
                   
                }
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
                                var obj={};
                                obj.userId=array[i].courtPersonId;
                                obj.orgId=array[i].orgId;
                                srr.push(obj);
                                
                            }
                            this.$api.post(this.Global.aport1+'/user/deleteUser',srr,
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
        setPwd(){
            if(this.mselect.length>0){
                 var array=this.mselect;
                            var srr=[];
                            for (let i = 0; i < array.length; i++) {
                              
                                srr.push(array[i].courtPersonId);
                            }
           
            var url = this.Global.aport1 + '/user/reset';
            this.$confirm('您是否要重置密码为123456？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               
                this.$api.post(url, srr,
                r => {
                    if (r.code==1) {
                    this.$message({
                        message: '重置密码成功！',
                        type: 'success'
                    });
                    this.getList(this.CurrentPage, this.pageSize, this.pd);
                    } else {
                       this.$message.error(r.message);
                    }
                }, e => {
                    this.$message.error('失败了');
                });
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消重置'
                });
            });
              }else{
                  this.$message.error("请选择数据！");
            }
        },
    },
}
</script>