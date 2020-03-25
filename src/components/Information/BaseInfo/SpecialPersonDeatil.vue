<template>
    <div class="personnel">
          <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
            <span> 基本信息库
            <span class="mlr_10">/</span>联络对象</span>
            <span class="mlr_10" >/</span><span ><i class="iflast">特约人员</i></span>
            <span class="mlr_10" v-if="cname1!= ''">/</span><span v-if="cname1!= ''">{{cname1}}</span>
            <span class="mlr_10" v-if="lbmc!= ''">/</span><span v-if="lbmc!= ''">{{lbmc}}</span>
            <span class="mlr_10" v-if="codemc!= ''">/</span><span v-if="codemc!= ''">{{codemc}}</span>
          </div>
          <div class="content">
        <el-row>
             <el-col :span="18" style="padding-left:3%">
               <el-row >
                   <el-col :span="14">
                     <div class="title"><span >{{jmc==null?'':jmc}}{{lbmc}}</span>名单</div>
                        <div style="margin:20px 20px 0 20px;">共<span style="color:red"> {{count}} </span>名特约人员</div>
                   </el-col>
                    <el-col :span="10" style="text-align:right">
                          <el-button type="primary"  @click="goBase()" v-if='allshow[0]'>
                             <span @click="goBase()">添加</span>
                            </el-button>
                            <el-button  @click="getDR"  v-if='allshow[1]'>导入</el-button>
                          <el-button  @click="openfile"  v-if='allshow[2]'>相关文件</el-button>
                          <el-button @click="goseach()"  v-if='allshow[3]'>查询</el-button>
                          <el-button @click="$router.go(-1)">返回</el-button>
                    </el-col>
               </el-row>
               <el-row :gutter="2" class="ah-50 pdz">
                           <el-col :sm="24" :md="12" :lg="6" v-for="(t,ind) in RYData" :key="ind">
                                 <el-tooltip  placement="right" popper-class="test">
                                     <div slot="content">
                                             <el-row style="margin-top:20px;width:300px">
                                                  <el-col :span="24" style="border-bottom:2px #eeeeee solid;">
                                                     <img :src="t.photoUrl==null?tximg:t.photoUrl" width="150" height="180">
                                                  <br/><span style="font-size:20px;font-weight: bold;color: #0168B5;line-height:50px;" >{{t.personName}}</span></el-col>
                                                   <el-col :span="24"  class="tabg">
                                                        <el-tag v-for="(value,key) in t.tags" :key="key" style="margin:3px">{{value==null?"无":value}} </el-tag>
                                                    </el-col>
                                             </el-row>
                                         </div>
                                    <span class="address" @click="goto(t)">{{t.personName}}{{getSN(t.sex,t.nationality)}}</span>
                               </el-tooltip>
                           </el-col>
                </el-row>
             </el-col>
             <el-col :span="6" style="padding-left:45px;">
                     <div class="title mb-20">历届名单</div>
                     <div v-for='(tt,ind) in $store.state.jb' :key="ind">
                         <div  class="ljinfo" @click="gopro(tt.mc,tt.dm)">{{tt.mc}}{{lbmc}}</div>
                     </div>
             </el-col>
        </el-row>
          <br/>
        </div>
  <el-dialog title="特约人员相关文件" :visible.sync="fileDialogVisible" :close-on-click-modal='false' width="700px">
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
  <el-dialog title="上传文件" :visible.sync="uploadDialogVisible" :close-on-click-modal='false' width="630px">
      <UPLOAD :url="uurl" :type="ptype" :periodType='periodType' :urlErr="uurlErr"  @fatherMethod="fatherMethod" :random="new Date().getTime()"></UPLOAD>
   </el-dialog>
 <el-dialog title="导入文件" :visible.sync="drDialogVisible" :close-on-click-modal='false' width="630px">
      <UPLOAD :url="vvurl" :type="1001"  :urlErr="vvurlErr" :periodType='jkey'  @drfatherMethod="drfatherMethod" :random="new Date().getTime()"></UPLOAD>
   </el-dialog>
    </div>
</template>
<style>
  .iflast{font-style: normal}
</style>
<script>
import UPLOAD from "../../Common/upload"
import {getlljgdbtmenu,getlljgdbtdata} from '@/assets/js/aleainfo.js'
export default {
    components:{UPLOAD},
    data(){
        
        return{
          cname:'代表名单',
          title:'代表名单',
          cname1:'',
          RYData:[],
          imgs:"",
          count:0,
          group:'',
          type:'',
          cinfo:'',
          mc:'',
          leveldata:[],
          code:'',
          codemc:'',
          ifZx:'1',
          tximg:require("../../../assets/img/mrt.png"),
          lbmc:'',
          lb:'',
          jmc:'',
          jblv:'',
          jkey:'',
          periodType:'',
          ptype:'',
          fileDialogVisible:false,
          uploadDialogVisible:false,
          drDialogVisible:false,
          filedata0:[],
          filedata1:[],
          filedata2:[],
          uurl:'/specialPerson/savepersonfile',
          uurlErr:'',
          vvurl:'/specialPerson/import',
          vvurlErr:'',
          jb:'',
           alldata:[],
          allshow:[],
            
       }
    },
    mounted(){
        this.$store.dispatch("getJb");
        this.$store.dispatch("getTb");
        this.$store.dispatch("getJjb");
        this.getinit(this.$route);
    },
    watch:{
        $route:function(val){
            this.getinit(val);
        },
    },
    methods:{
        getinit(val){
            this.count=0;
            this.cname1=val.query.mc;
            this.code=val.query.code;
            this.codemc=val.query.codemc;
            this.lbmc=val.query.lbmc;
            this.lb=val.query.lb;
            this.jmc=val.query.jmc;
            this.jblv=val.query.jblv;
            this.jb=val.query.jb;
            this.jkey=val.query.jkey==null?'0156000013':val.query.jkey;
            console.log(this.jkey,'---');
            
            if(this.jmc==null)
              {
                this.jmc=this.$store.state.jmc;
              }
            var mid=getlljgdbtmenu('3',this.jb);
           this.alldata=getlljgdbtdata('3',this.jb);
            
            //权限start
            this.$api.post(this.Global.menuurl,{'menuId':mid},
                     r =>{
                          if(r.code==1 && r.data!=null){
                            for (let i = 0; i < this.alldata.length; i++) {
                               this.allshow[i]=this.global_auth(r.data,this.alldata[i]);
                               console.log(this.alldata,'--',this.alldata[i],'===',r.data);
                               
                            }   
                              this.getList(this.lb,this.code,this.jkey);
                          }else if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                          }
            });
         //权限end
          
        },
        
        getSN(s,n){
            var sum="";
          if(s=="女性" && n!="汉族" && n!=null && s!=null){
              sum="(女，"+n+")";
          }else{
              if(s=='女性' && n!=null){
                 sum="（女）";
               }
              if(n!="汉族" && n!=null){
                 sum="（"+n+"）";
               }
           }
           return sum;
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
         getUpload(t){
          if(this.periodType=="" || this.periodType==undefined)
          {
            this.$message.error("届别不能为空！");return;
          }
            this.ptype=t;
            this.uploadDialogVisible=true;
        },
         openfile()
        {
            this.periodType="";
            this.filedata0=[];
            this.filedata1=[];
            this.filedata2=[];
            this.fileDialogVisible=true;
        },
        getDR(){
            this.drDialogVisible=true;
        },
          drfatherMethod(data,t){
            this.drDialogVisible=false;
          },
          fatherMethod(data,t){

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
         getTB(l,v){
            let p={
                    'code':v,
                    'level':l
               };
             this.$api.get(this.Global.aport4+'/service/getGroupType',p,
              r =>{
                   if(r.code==1){
                     this.leveldata=r.data;

                    }
            });
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
        getList(dm,code,jb)
        {
            
            var url="/baseinfo/listbytype";
            let p={
                  'periodType':jb,//届别0156000013
                  'personType':this.Global.SPECIALPERSON,
                  'specialType':dm,
                  'xzqh':code,
                  'levelType':this.jblv
                  
            };
            this.$api.post(this.Global.aport1+url,p,
             r =>{
                  this.RYData=r.data;
                  this.count=r.data.length;
                  this.labellist=r.data.tags;
            });
        },
        gopro(mc,dm){
           this.$router.push({name:'SpecialPersonDeatil',query:{lb:this.lb,lbmc:this.lbmc,mc:this.cname1,jblv:this.jblv,code:this.code,codemc:this.codemc,jmc:mc,jkey:dm}});
        },
        goto(t){
            var reid=t.specialPersonId;
          var state="9";
          if(this.allshow[0]==true){
            state="1";
          }
            this.$router.push({name:'BaseAdd',query:{type:'3',status:state,pbid:t.pbId,reid:reid}});
        },
        goBase(){
              this.$router.push({name:'BaseAdd',query:{type:'3',jb:this.jb,xzqh:this.code,xzqhmc:this.codemc,lb:this.lb,jmc:this.jmc,jkey:this.jkey}})
        },
        goseach(){
              this.$router.push({name:'tyBaseList'});
        },
    },
}
</script>



