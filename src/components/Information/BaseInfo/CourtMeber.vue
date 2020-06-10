<template lang="html">
    <div class="personnel">
          <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
          <span>  基本信息 
              <span class="mlr_10">/</span> 法院内部管理
              <span class="mlr_10">/</span> 法院人员  <span class="mlr_10">/</span><b>{{cname}}</b>
               <span class="mlr_10" v-if='xzqhmc!=""'>/</span><b v-if='xzqhmc!=""'>{{xzqhmc}}</b>
              </span> </div>
          <div class="content">
        <el-row>
             <el-col :span="24" class="ptit ptitr">
               <el-row >
                
                   <el-col :span="16">
                     <div class="title"><span>{{fname}}</span>名单</div>
                    <div style="margin:20px 20px 0 20px;">共<span style="color:red"> {{count}} </span>名法院人员</div>
                   </el-col>
                    <el-col :span="8" style="text-align:right">
                          <el-button type="primary" style="width:80px" @click="goto(0)" v-if='allshow[0]'>添加</el-button>
                          <el-button style="width:80px" @click="getDR" v-if='allshow[1]'>导入</el-button>
                          <el-button style="width:80px" @click="$router.push({name:'CourtPersonnelList'})" v-if='allshow[2]'>查询</el-button>
                          <el-button style="width:80px"  @click="$router.go(-1)">返回</el-button>
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
                                    <span class="address" @click="goto(2,t.pbId,t.courtPersonId,t.orgId)">{{t.personName}}{{getSN(t.sex,t.nationality)}}</span>
                               </el-tooltip>
                           </el-col>
                </el-row>

             </el-col>
          
        </el-row>

        </div>
   <el-dialog title="导入文件" :visible.sync="drDialogVisible" :close-on-click-modal='false'  width="630px">
      <UPLOAD :url="vvurl" :type="1000"  :urlErr="vvurlErr"  @drfatherMethod="drfatherMethod" :random="new Date().getTime()"></UPLOAD>
   </el-dialog>
    </div>
</template>
<script>
import UPLOAD from "../../Common/upload"
import {getlljgdbtmenu,getlljgdbtdata} from '@/assets/js/aleainfo.js'
export default {
  components:{UPLOAD},
    data(){
        return{
          cname:'最高院人员',
          Data:[],
          addtype:'1',
          lb:'',
          leveldata:[],
          num:0,
          lvl:'',
          xzqh:'',
          xzqhmc:'',
          RYData:[],
          count:0,
          jb:'',
          personshow:false,
          fname:'',
          tximg:require("../../../assets/img/mrt.png"),
          drDialogVisible:false,
          vvurl:'/courtPerson/import',
          vvurlErr:'',
          alldata:[],
          allshow:[],
          depid:'',
          
        }
    },
    mounted(){
           this.getinit(this.$route);
    },
    watch:{
        $route:function(val){
           this.getinit(val);
        },
    },
    methods:{
        getinit(val){
            this.jb=val.query.jb;
            this.addtype=val.query.type;
            this.xzqh=val.query.xzqh;
            this.xzqhmc=val.query.xzqhmc;
            this.orgid=val.query.orgid;
            this.depid=val.query.depid;
            this.fname=val.query.fname;
            this.cname=val.query.cname;
           
            var mid=getlljgdbtmenu('4',this.jb);
            this.alldata=getlljgdbtdata('4',this.jb);
            
            //权限start
            this.$api.post(this.Global.menuurl,{'menuId':mid},
                     r =>{
                          if(r.code==1 && r.data!=null){
                            for (let i = 0; i < this.alldata.length; i++) {
                               this.allshow[i]=this.global_auth(r.data,this.alldata[i]);
                            
                            }  
                           this.getUser(this.depid);
                          }else if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                     }
            });
         //权限end
        },
         
      getSN(s,n){
            var sum="";
          if(s=="女" && n!="汉族" && n!=null && s!=null){
              sum="(女，"+n+")";
          }else{
              if(s=='女' && n!=null){
                 sum="（女）";
               }
              if(n!="汉族" && n!=null){
                 sum="（"+n+"）";
               }
           }
           return sum;
        },
      getUser(dm)
        {
            
            var url="/baseinfo/listbytype";
            let p={
                 
                  'subOrgId':dm,
                  'personType':this.Global.COURTPERSON,
            };
            this.$api.post(this.Global.aport1+url,p,
             r =>{
                 
                //   if(r.data==null){
                //       this.$message.error('该部门下没有人员！');return;
                //   }
                  this.RYData=r.data;
                  this.count=r.data.length;
                  this.personshow=true;
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
        goto(t,id,dm,orgid){
          
           if(t==0){
                this.$router.push({name:'BaseAdd',query:{type:'4',status:'0',jb:this.jb,xzqh:this.xzqh,xzqhmc:this.xzqhmc,orgdm:this.orgid,depid:this.depid}});
            }else if(t==2){
              console.log(orgid,'orgid');
              
                var state='9';
                if(this.allshow[0]==true){
                  state="1";
                }
            this.$router.push({name:'BaseAdd',query:{type:'4',status:state,pbid:id,reid:dm,orgdm:orgid,jb:this.jb}});
            }
        },
        getDR(){
            this.drDialogVisible=true;
        },
        drfatherMethod(data,t){
            this.drDialogVisible=false;
        },
    },
}
</script>