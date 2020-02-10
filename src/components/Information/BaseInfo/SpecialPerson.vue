<template>
    <div class="personnel">
          <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
            <span> 基本信息库 <span class="mlr_10">/</span> 联络对象 <span class="mlr_10">/</span>  {{cname}}</span>
            <span class="mlr_10" v-if="cname1 != ''">/</span><span v-if="cname1 != ''"><b>{{cname1}}</b></span>
          </div>
          <div class="content">
        <el-row>
             <el-col :span="21" class="ptit">
               <el-row >
                   <el-col :span="16">
                       <div class="title">{{title}}</div>
                   </el-col>
                    <el-col :span="8" style="text-align:right">
                          <el-button type="primary"  @click="goBase()">录入</el-button>
                          <!-- <el-button >导入</el-button> -->
                          <el-button  @click="openfile">相关文件</el-button>
                          <el-button @click="$router.push({name:'tyBaseList'})">查询</el-button>
                    </el-col>
               </el-row>
               <el-row  class="ah-50 pborder mt-20" v-if="qgshow">
                 <el-col v-for="(te,indm) in $store.state.tylb" :key="indm">
                    <span style="font-weight:bold"> {{te.mc}}</span>
                    <el-row :gutter="2" style="margin-left:50px;"  v-if="te.dm=='0185000001'">
                               <el-col :sm="24" :md="12" :lg="4" v-for="(t,inde) in tydata1" :key="inde">
                                 <el-tooltip  placement="right" popper-class="test"  >
                                     <div slot="content">
                                             <el-row style="margin-top:20px;width:300px;">
                                                  <el-col :span="24" style="border-bottom:2px #eeeeee solid;">
                                                      <img :src="t.photoUrl==null?tximg:t.photoUrl" width="150" height="180">
                                                  <br/><span style="font-size:20px;font-weight: bold;color: #0168B5;line-height:50px;" >{{t.personName}}</span></el-col>
                                                   <el-col :span="24"  class="tabg">
                                                        <el-tag v-for="(value,key) in t.tags" :key="key" style="margin:3px">{{value==null?"无":value}} </el-tag>
                                                    </el-col>
                                             </el-row>
                                         </div>
                                    <span style="color:#0168B5;cursor:pointer" @click="goto(t.pbId,t.specialPersonId)">{{t.personName}}</span>
                               </el-tooltip>
                           </el-col>
                  </el-row>
                  <el-row :gutter="2" style="margin-left:50px;"  v-if="te.dm=='0185000002'">
                        <el-col :sm="24" :md="12" :lg="4" v-for="(t,inds) in tydata2" :key="inds" >
                                 <el-tooltip  placement="right" popper-class="test">
                                     <div slot="content">
                                             <el-row style="margin-top:20px;width:300px;">
                                                  <el-col :span="24" style="border-bottom:2px #eeeeee solid;">
                                                      <img :src="t.photoUrl==null?tximg:t.photoUrl" width="150" height="180">
                                                  <br/><span style="font-size:20px;font-weight: bold;color: #0168B5;line-height:50px;" >{{t.personName}}</span></el-col>
                                                   <el-col :span="24"  class="tabg">
                                                        <el-tag v-for="(value,key) in t.tags" :key="key" style="margin:3px">{{value==null?"无":value}} </el-tag>
                                                    </el-col>
                                             </el-row>
                                         </div>
                                    <span  style="color:#0168B5;cursor:pointer" @click="goto(t.pbId,t.specialPersonId)">{{t.personName}}</span>
                               </el-tooltip>

                           </el-col>
                    </el-row>
                </el-col>
               </el-row>

                <el-row  class="ah-50 pborder mt-20" v-else>
                 <el-col :sm="24" :md="12" :lg="6" v-for="(ts,inds) in leveldata" :key="inds">
                     <div  v-if="jb=='sj' || jb=='ds' || jb=='xq'">
                        <span class="address"  @click="goxj(ts.dm,'jjb',ts.mc,jb)">{{ts.mc}}</span>
                        </div>
                  </el-col>
                </el-row>

             </el-col>
        </el-row>
           <br/>  <br/>
        </div>

         <el-dialog title="特约人员相关文件" :visible.sync="fileDialogVisible" width="700px">
             <el-row class="ah-50">
               <el-col :span="24">
                  <span class="yy-input-text trt" style="width:200px;">届别：</span>
                   <el-select v-model="periodType"  @change="getFile(periodType)" filterable clearable default-first-option placeholder="请选择"  size="small" >
                         <el-option
                           v-for="(item,ind) in $store.state.jb"
                           :key="ind"
                           :label="item.mc"
                           :value="item.dm">
                           </el-option>
                        </el-select>
               </el-col>
               <el-col :span="24">
                              <span class="yy-input-text trt" style="width:200px;">相关工作文件：</span>
                               <el-button type="primary" plain style="width:150px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('0171000001')">上传文件</el-button> <span class="ts"></span>
                         </el-col>
                      <el-col :span="24" class="mb-20" v-if="filedata0 && filedata0.length>0">
                           <el-table
                            :data="filedata0">
                            <el-table-column
                                type="index"
                                label="序号" width="80">
                            </el-table-column>
                             <el-table-column
                                prop="fileName"
                                label="文件名称">
                            </el-table-column>
                            <el-table-column
                                prop="fileSuffix"
                                label="文件类型">
                            </el-table-column>
                             <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                      <el-button type="text"  class="a-btn"  title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button>
                                    <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="del(scope.row)"></el-button>
                                  </div>
                                </template>
                            </el-table-column>
                           </el-table>
                        </el-col>
                         <el-col :span="24">
                              <span class="yy-input-text trt" style="width:200px;">相关工作规定文件：</span>
                               <el-button type="primary" plain style="width:150px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('0171000002')">上传文件</el-button> <span class="ts"></span>
                         </el-col>
                        <el-col :span="24" class="mb-20" v-if="filedata1 && filedata1.length>0">
                           <el-table
                            :data="filedata1">
                            <el-table-column
                                type="index"
                                label="序号" width="80">
                            </el-table-column>
                             <el-table-column
                                prop="fileName"
                                label="文件名称">
                            </el-table-column>
                            <el-table-column
                                prop="fileSuffix"
                                label="文件类型">
                            </el-table-column>
                          
                             <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                      <el-button type="text"  class="a-btn"  title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button>
                                    <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="del(scope.row)"></el-button>
                                  </div>
                                </template>
                            </el-table-column>
                           </el-table>
                        </el-col>

                          <el-col :span="24">
                              <span class="yy-input-text  trt" style="width:200px;">相关工作聘任决定文件：</span>
                               <el-button type="primary" plain style="width:150px;font-size:14px;" size="small" icon="el-icon-plus" @click="getUpload('0171000003')">上传文件</el-button> <span class="ts"></span>
                         </el-col>
                        <el-col :span="24" class="mb-20" v-if="filedata2 && filedata2.length>0">
                           <el-table
                            :data="filedata2">
                            <el-table-column
                                type="index"
                                label="序号">
                            </el-table-column>
                             <el-table-column
                                prop="fileName"
                                label="文件名称">
                            </el-table-column>
                            <el-table-column
                                prop="fileSuffix"
                                label="文件类型">
                            </el-table-column>
                           
                             <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                   <div>
                                      <el-button type="text"  class="a-btn"  title="下载"  icon="el-icon-download" @click="downData(scope.row)"></el-button>
                                    <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="del(scope.row)"></el-button>
                                  </div>
                                </template>
                            </el-table-column>
                           </el-table>
                        </el-col>
                </el-row>
        </el-dialog>
<el-dialog title="上传文件" :visible.sync="uploadDialogVisible"  width="630px">
      <UPLOAD :url="uurl" :type="ptype" :periodType='periodType' :urlErr="uurlErr"  @fatherMethod="fatherMethod" :random="new Date().getTime()"></UPLOAD>
   </el-dialog>

    </div>
</template>
<script>
import UPLOAD from "../../Common/upload"
export default {
    components:{UPLOAD},
    data(){
        return{
          cname:'',
          cname1:'',
          cinfo:'特约人员',
          title:'特约人员',
          Data:[],
          Lydata:[],
          addtype:'1',
          jb:'qg',
          tydata1:[],
          tydata2:[],
          qgshow:false,
          leveldata:[],
          uurl:'/specialPerson/savepersonfile',
          uurlErr:'',
          num:0,
          imgs:"",
          filedata0:[],
          filedata1:[],
          filedata2:[],
          ptype:'',
          tximg:require("../../../assets/img/mrt.png"),
          fileDialogVisible:false,
          uploadDialogVisible:false,
          periodType:'',
          xzqh:'',
          xzqhmc:'',
          lvltype:'',//级别
        }
    },
    mounted(){
    this.getinit(this.$route);
     this.$store.dispatch("getTylb");

     this.$store.dispatch("getJb");
    },
    watch:{
        $route:function(val){
            this.getinit(val);
        },
    },
    methods:{
        getinit(val){
              this.addtype=val.query.type;
              this.jb=val.query.jb;
              this.qgshow=false; this.num=0;
              switch (this.addtype) {
                   case '1':
                          if(this.jb=='qg'){
                             this.lvltype="0222000001";
                            this.qgshow=true;
                            this.title="最高法人民法院特约人员";
                            this.cname="特约人员";
                            this.cname1 = "最高法人民法院特约人员";
                            this.getry();
                        }else if(this.jb=='sj'){
                            // this.title="高级人民法院特约人员";
                            this.lvltype="0222000002";
                            this.title="省级行政区划";
                            this.getLevel('1','');
                            this.cname="特约人员";
                            this.cname1 = "高级人民法院特约人员";
                        }else if(this.jb=='ds'){
                            // this.title="中级人民法院特约人员";
                             this.lvltype="0222000003";
                            this.cname="特约人员";
                            this.cname1 = "中级人民法院特约人员";
                            this.title="省级行政区划";
                            this.getLevel('1','');
                        }
                        else if(this.jb=='xq'){
                            // this.title="基层人民法院特约人员";
                            this.lvltype="0222000004";
                            this.cname="特约人员";
                            this.cname1 = "基层人民法院特约人员";
                            this.title="省级行政区划";
                            this.getLevel('1','');
                        }
                      break;
                  default:
                      break;
              }

        },
        goBase(){
              this.$router.push({name:'BaseAdd',query:{type:'3',jb:this.jb,xzqh:this.xzqh,xzqhmc:this.xzqhmc}})
        },
        openfile()
        {
            this.periodType="";
            this.filedata0=[];
            this.filedata1=[];
            this.filedata2=[];
            this.fileDialogVisible=true;
        },
        getUpload(t){
          if(this.periodType=="" || this.periodType==undefined)
          {
            this.$message.error("届别不能为空！");return;
          }
            this.ptype=t;
            this.uploadDialogVisible=true;
        },
        getFile(val){
          this.filedata0=[];
          this.filedata1=[];
          this.filedata2=[];
            let p={
                    'periodType':val,
                    'fileType':'0171000001'
                  };
                  this.$api.post(this.Global.aport1+'/specialPerson/getpersonfile',p,
                  r =>{
                          if(r.code==1 ){
                       
                            
                            if(r.data!=null){
                               this.filedata0.push(r.data);
                            }
                            console.log(this.filedata0,this.filedata0.length);
                          }
                  });
                  let pp={
                    'periodType':val,
                    'fileType':'0171000002'
                  };
                  this.$api.post(this.Global.aport1+'/specialPerson/getpersonfile',pp,
                  r =>{
                          if(r.code==1){
                             if(r.data!=null){
                              this.filedata1.push(r.data);
                             }
                          }
                  });
                   let ppp={
                    'periodType':val,
                    'fileType':'0171000003'
                  };
                  this.$api.post(this.Global.aport1+'/specialPerson/getpersonfile',ppp,
                  r =>{
                          if(r.code==1){
                             if(r.data!=null){
                            this.filedata2.push(r.data);
                             }
                          }
                  });
        },
        del(n){
          this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {

                      let p={
                          'fileId':n.specialPersonRelFileId,
                          'token':this.$store.state.token
                        };
                        this.$api.post(this.Global.aport1+'/specialPerson/delpersonfile',p,
                        r =>{
                                if(r.code==1){
                                     this.$message({
                                      message: r.message,
                                      type: 'success'
                                     });
                                     this.getFile(this.periodType);
                                }else{
                                  this.$message.error(r.message);
                                }
                        });
                     }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
        },
            fatherMethod(data,t){

  console.log(t,data);
   
         if(t=='0171000001')
         {
           if(this.filedata0 && this.filedata0.length>0){
             for (let i = 0; i < data.length; i++) {
               this.filedata0.push(data[i]);
             }
           }else{
              this.filedata0=[];
              this.filedata0=data;
           }
         }
          if(t=='0171000002')
         {
           if(this.filedata1 && this.filedata1.length>0){
             
             for (let i = 0; i < data.length; i++) {
               this.filedata1.push(data[i]);

             }
           }else{
              this.filedata1=[];
              this.filedata1=data;
           }
         }
         else if(t=='0171000003')
         {
          
           if(this.filedata2 && this.filedata2.length>0){
              
             for (let i = 0; i < data.length; i++) {
                
               this.filedata2.push(data[i]);
             }
           }else{
              this.filedata2=[];
              this.filedata2=data;
           }
         }
       
         this.getFile(this.periodType);
        this.uploadDialogVisible = false;
            },
      goxj(d,t,mc,jb){
            this.xzqh=d;
            this.xzqhmc=mc;
            if(jb=='sj'){
                 this.getry(d);
                 this.qgshow=true;
                this.title="高级人民法院特约人员";
            }else if(jb=='ds'){
                if(this.num==2){
                    this.getry(d);
                   this.qgshow=true;
                  this.title="中级人民法院特约人员";
                }else{
                  this.title="市级行政规划";
                    this.getLevel('2',d);
                }
            }else if(jb=='xq'){
                if(this.num==3){
                    this.getry(d);
                    this.qgshow=true;
                  this.title="基层人民法院特约人员";
                }else if(this.num==2){
                  this.getLevel('3',d);
                  this.title="县区行政规划";
                }else{
                 this.getLevel('3',d);
                  this.title="市级行政规划";
                }
            }
        },
      getLevel(l,v){
               let p={
                    'code':v,
                    'level':l
                  };
                  this.$api.get(this.Global.aport4+'/service/getxzqh',p,
                  r =>{
                          if(r.code==1){
                                this.num++;
                                this.leveldata=r.data;
                          }

                   });
        },
        downData(n){
          // window.location.href=n.serverpath;
          var alink = document.createElement("a");
          alink.href = n.serverPath
          alink.setAttribute('download',n.fileName)
          document.body.appendChild(alink)
          alink.click()
        },
        getry(s){
             this.getTY('0185000001',s);
             this.getTY('0185000002',s);
        },
        getTY(t,s){
        
            let p={
                  'periodType':'0156000013',//届别
                  'personType':this.Global.SPECIALPERSON,
                  'specialType':t,
                  'xzqh':s,
                  'levelType':this.lvltype
                  
            };
             this.$api.post(this.Global.aport1+'/baseinfo/listbytype',p,
                r =>{

                      if(r.code==1){
                         if(t=="0185000002"){
                             this.tydata2=r.data;
                         }else{
                             this.tydata1=r.data;
                         }
                      }
                });

        },
        goto(t,n){
            console.log(n);

            this.$router.push({name:'BaseAdd',query:{type:'3',status:'1', pbid:t,reid:n}});
        },

    },
}
</script>
