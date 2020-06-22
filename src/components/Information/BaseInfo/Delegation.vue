<template lang="html">
    <div class="personnel">
          <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
            <span> 基本信息
            <span class="mlr_10" v-if="cname1 != ''">/</span><span v-if="cname1 != ''"><i class="iflast">{{cname1}}</i></span>
            <span class="mlr_10" v-if="cname2 != ''">/</span><span v-if="cname2 != ''"><i class="iflast">{{cname2}}</i></span>
            <span class="mlr_10" v-if="cname3 != ''">/</span><span v-if="cname3 != ''"><i class="iflast" :style="getStyle()">{{cname3}}</i></span>
            <span class="mlr_10" v-if="cname4 != ''">/</span><span v-if="cname4 != ''"><i class="iflast" :style="getStyle1()">{{cname4}}</i></span></span>
          </div>
          <div class="content">
        <el-row>
            <el-col :span="addtype=='1'?5:4">
               <div  class="left">
                    <el-row class="ah-40" style="text-align: center;" >
                           <el-col :span="24"  v-if="addtype=='1'">
                                 <!-- <el-row  v-if="code!='' && code!=undefined">
                                    <el-col :sm="24" :md="24" :lg="24"  v-for="(t,ind) in leveldata" :key="ind">
                                         <span class="area" @click="gopro(t.dm,'tb',t.mc)">{{t.mc}}</span>
                                    </el-col>
                                </el-row>
                                <el-row  v-else> -->
                                  <el-row>
                                    <el-col :sm="24" :md="24" :lg="t.mc.length>8?24:12"  v-for="(t,indm) in leveldata" :key="indm + '-only'">
                                         <span class="area" @click="gopro(t.dm,'tb',t.mc)">{{t.mc}}</span>
                                    </el-col>
                                  <!-- <el-col :sm="24" :md="24" :lg="24"  v-for="(ts,inde) in leveldata" :key='inde'>
                                         <span class="area" v-if="ts.dm=='0190900000'"  @click="gopro('0190900000','tb','解放军和武警部队')">解放军和武警部队</span>
                                  </el-col> -->
                                </el-row>
                           </el-col>
                             <el-col :span="24" v-for="(t,inds) in jjblist" :key="inds" v-if="addtype=='2'">
                                <span class="area" @click="gopro(t.dm,'jjb',t.mc)">{{t.mc}}</span>
                           </el-col>
                       </el-row>

               </div>
            </el-col>
             <el-col :span="addtype=='1'?13:14">
               <el-row >
                   <el-col :span="14">
                     <div class="title"><span style="margin-right: 10px;">{{jmc==null?'':jmc}} {{mc}}</span><span v-if="ifZx!=''">代表团</span>名单</div>
                        <div style="margin:20px 20px 0 20px;">共<span style="color:red"> {{count}} </span>名{{mname}}</div>
                   </el-col>
                    <el-col :span="10" style="text-align:right">
                          <el-button type="primary"  @click="goBase()" v-if='allshow[0]'>
                              添加
                            </el-button>
                          <el-button @click="getDR()"  v-if='allshow[1]'>导入</el-button>
                          <el-button @click="goseach()"  v-if='allshow[2]'>查询</el-button>
                          <el-button @click="$router.go(-num)">返回</el-button>
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
                     <div class="title mb-20">历届{{cname4==""?cname3:cname4}}名单</div>
                     <div v-for='(tt,ind) in jblist' :key="ind + '-only'">
                         <div @click="gopro(tt.dm,'jb',tt.mc)"  class="ljinfo">{{tt.mc}}{{cinfo}}</div>
                     </div>
             </el-col>
        </el-row>
          <br/>
        </div>
  <el-dialog title="导入文件" :visible.sync="uploadDialogVisible" :close-on-click-modal='false'  width="630px">
      <UPLOAD :url="uurl" :type="1000"  :urlErr="uurlErr" :periodType='jkey'  @fatherMethod="fatherMethod" :random="new Date().getTime()"></UPLOAD>
   </el-dialog>

   <div class="depopContainer" v-if='loadshow'>
      <div class="main"><i class="el-icon-loading" style="font-size:20px;"></i><br/><span style="font-size:12px;">正在加载中...</span></div>
   </div>
    </div>
</template>
<style>
  .iflast{font-style: normal}

</style>

<script>
import UPLOAD from "../../Common/upload"
import {getlljgdbtmenu,getlljgdbtdata} from '@/assets/js/aleainfo.js'
import {ToArray} from '@/assets/js/ToArray.js'

export default {
   components:{UPLOAD},
    data(){
        return{
          cname:'代表名单',
          title:'代表名单',
          cname1:'',
          cname2:'',
          cname3:'',
          cname4:'',
          RYData:[],
          imgs:"",
          mname:'代表',
          count:0,
          group:'',
          type:'',
          cinfo:'',
          mc:'',
          addtype:'',
          leveldata:[],
          jjblist:[],
          jblist:[],
          code:'',
          codemc:'',
          jb1:'',
          ifZx:'1',
          tximg:require("../../../assets/img/mrt.png"),
          jkey:'',
          jmc:'',
          uurl:'/representative/import',
          uurlErr:'',
          uploadDialogVisible:false,
          info:{},
          alldata:[],
          allshow:[],
          num:1,
          leveltype:'',
          loadshow:false,
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
          
          if(val.query.info==undefined || val.query.info==''){
              this.$router.push({name:'limitmsg'});
         }else if(val.query.info!=undefined && val.query.info!=''){
             try{
              this.info=JSON.parse(Base64.decode(val.query.info));
        
            this.count=0;
            this.addtype=this.info.type;
            this.group=this.info.key;
            this.type=this.info.vv;
            this.mc=this.info.mc;
            this.code=this.info.code;
            this.codemc=this.info.codemc;
            this.jb1 = this.info.jb;
            this.jmc=this.info.jmc;
            this.num=this.info.num==null?1:this.info.num;
            if(this.jmc==null)
              {
                this.jmc=this.$store.state.jmc;
              }
            this.jkey=this.info.jkey==null?'':this.info.jkey;
            var mid=getlljgdbtmenu(this.addtype,this.jb1);
            this.alldata=getlljgdbtdata(this.addtype,this.jb1);
            
            //权限start
            this.$api.post(this.Global.menuurl,{'menuId':mid},
                     r =>{
                          if(r.code==1 && r.data!=null){
                            for (let i = 0; i < this.alldata.length; i++) {
                               this.allshow[i]=this.global_auth(r.data,this.alldata[i]);
                              //  console.log(this.alldata,'--',this.alldata[i],'===',r.data);
                               
                            }   
                             switch (this.jb1) {
                                case 'qg':
                                    this.leveltype='0150000001';
                                    break;
                                case 'sj':
                                    this.leveltype='0150000002';
                                    break;
                                case 'ds':
                                    this.leveltype='0150000003';
                                    break;
                                case 'xq':
                                    this.leveltype='0150000004';
                                    break;
                                default:
                                    break;
                            }
                            if(this.type=="tbxq"){
                                this.getLevel('3',this.code);
                            }else if(this.type=="tb"){
                             
                              this.getTB(this.leveltype,this.code);
                            }else if(this.type=='jjb'){
                              this.getJJB();
                            }
                            this.getJB();
                            this.getList(this.addtype,this.type,this.group,this.jb1);
                          }else if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                          }
            });
         //权限end
          
             }catch(e){
                this.$router.push({name:'limitmsg',query:{type:1}});
             }
         }
          
          
        },
        getStyle(){
            if(this.cname3&&!this.cname4){
                return "font-weight:bold"
            }else{
              return "font-weight:normal"
            }
        },
        getStyle1(){
         if(this.cname3&&this.cname4){
            return "font-weight:bold"
          }else{
            return "font-weight:normal"
          }
        },
        getDR(){
          this.uploadDialogVisible=true;
        },
         fatherMethod(data,t){
                this.uploadDialogVisible=false;
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
         getTB(l,v){
              let p={
                    'level':l,
                    'administrativeDivision':v,
                    'sessionType':this.jkey
                  };
                  this.$api.post(this.Global.aport1+this.Global.tburl,p,
                  r =>{
                          if(r.code==1){
                            this.leveldata=ToArray(r.data);
                          }
                   });

             
        },
        getJJB(){
           let p={
                    'level':this.leveltype,
                    'administrativeDivision':this.code,
                    'sessionType':this.jkey
                    };
                 this.$api.post(this.Global.jjburl,p,
                        r =>{
                          this.jjblist=ToArray(r.data);
               });
        },
        getJB(){
          var lb="";
                    switch (this.addtype) {
                        case '1':
                            lb=this.Global.REPRESENTATIVE;
                            break;
                        case '2':
                            lb=this.Global.CPPCMEMBER;
                            break;
                        default:
                            break;
                    }
                    let p={
                        'level':this.leveltype,
                        'administrativeDivision':this.code,
                        'identityType':lb,
                    };
                    this.$api.post(this.Global.jburl,p,
                            r =>{
                                this.jblist=ToArray(r.data,'1');
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
                                
                                this.leveldata=r.data;
                          }
                   });
        },
        getList(tt,vv,kk,jb1)
        {
             this.loadshow=true;
            
            var url="/baseinfo/listbytype";
            let p={};
            this.RYData=[];
            switch (tt) {
                case '1':
                    this.mname="代表";
                    this.cinfo="人民代表大会";
                    this.ifZx = '1';
                    this.cname2 = '人大代表';
                    this.cname1 = '联络对象';
                    this.uurl='/representative/import';
                    // console.log(jb1)
                    if(jb1=='qg'){
                      this.cname3 = '全国人大代表';
                      this.cname4 = '';
                    }else if(jb1=='sj'){
                  
                      this.cname3 = '省级人大代表';
                      this.cname4 = this.codemc+'人大代表';
                    }else if(jb1=='ds'){
                      
                      this.cname3 = '市级人大代表';
                      this.cname4 = this.codemc+'人大代表';
                    }else if(jb1=='xq'){
                  
                      this.cname3 = '区县人大代表';
                      this.cname4 = this.codemc+'人大代表';
                    }
                    if(vv=='tb' || vv=="tbxq"){
                        p={
                            'groupType':kk,//团别
                            'circlesType':'',
                            'periodType':this.jkey,
                            'personType':this.Global.REPRESENTATIVE,
                            'xzqh':this.code,
                        };
                    }else if(vv=='jb'){

                       p={
                            'periodType':this.jkey,//届别
                            'circlesType':'',
                            'groupType':kk ,//团别
                            'personType':this.Global.REPRESENTATIVE,
                            'xzqh':this.code,
                        };
                    }
                    break;
                case '2':

                    // this.title="委员名单";
                    this.mname="委员";
                    this.cinfo="政治协商会议委员";
                    this.cname1 = '联络对象';
                    this.cname2 = '政协委员';
                   this.ifZx = '';
                   this.uurl='/cppcMember/import';
                    if(jb1=='qg'){
                     
                      this.cname3 = '全国政协委员';
                      this.cname4 = '';
                    }else if(jb1=='sj'){
                      
                      this.cname3 = '省级政协委员';
                      this.cname4 = this.codemc+'省政协委员';
                    }else if(jb1=='ds'){
                  
                      this.cname3 = '市级政协委员';
                      this.cname4 = this.codemc+'政协委员';
                    }else if(jb1=='xq'){
                     
                      this.cname3 = '区县政协委员';
                      this.cname4 = this.codemc+'政协委员';
                    }
                        if(vv=='jb'){
                            p={
                            'groupType':'',
                            'circlesType':kk,
                            'periodType':this.jkey,
                            'personType':this.Global.CPPCMEMBER,
                            'xzqh':this.code,
                           };
                        }else if(vv=='jjb'){
                            p={
                            'periodType':this.jkey,
                            'circlesType':kk,
                            'groupType':'',
                            'personType':this.Global.CPPCMEMBER,
                            'xzqh':this.code,
                          };
                        }
                    break;
                default:
                    break;
            }
           this.$api.post(this.Global.aport1+url,p,
             r =>{
                  this.loadshow=false;
                  this.RYData=r.data;
                  this.count=r.data.length;
                  this.labellist=r.data.tags;
                
                  
                 
            });
        },
        gopro(d,t,mc){
            // if(this.type=="tbxq"){
            //     t="tbxq";
            // }
            if(t=="jb"){
               let p={
                      'type':this.addtype,
                      'vv':t,
                      'key':this.group,
                      'mc':this.mc,
                      'code':this.code,
                      'codemc':this.codemc,
                      'jb':this.jb1,
                      'jmc':mc,
                      'jkey':d,
                      'num':this.num+1
                  };
 
                var str=Base64.encode(JSON.stringify(p));
                this.$router.push({path:'Delegation',query:{info:str}});
            //  this.$router.push({name:'Delegation',query:{type:this.addtype,vv:t,key:this.group,
            //  mc:this.mc,code:this.code,jb:this.jb1,codemc:this.codemc,jmc:mc,jkey:d}});
            }else{
                 let p={
                      'type':this.addtype,
                      'vv':t,
                      'key':d,
                      'mc':mc,
                      'code':this.code,
                      'codemc':this.codemc,
                      'jb':this.jb1,
                      'jmc':this.jmc,
                      'jkey':this.jkey,
                      'num':this.num+1
                  };
               
                
                var str=Base64.encode(JSON.stringify(p));
                this.$router.push({path:'Delegation',query:{info:str}});
                // this.$router.push({name:'Delegation',query:{type:this.addtype,vv:t,key:d,mc:mc,
                // code:this.code,jb:this.jb1,codemc:this.codemc,jmc:this.jmc,jkey:this.jkey}});
            }
           
           //this.getList(this.addtype,t,d);
        },
        goto(t){
            var reid="";
            if(this.addtype=='1'){
                reid=t.representativeId;
            }else if(this.addtype=='2'){
                reid=t.cppcMemberId;
            }
            var state='9';
            if(this.allshow[0]==true){
              state="1";
            }
            this.$router.push({name:'BaseAdd',query:{type:this.addtype,status:state,pbid:t.pbId,reid:reid}});
        },
        goBase(){
            this.$router.push({name:'BaseAdd',query:{type:this.addtype,jb:this.jb1,code:this.group,codemc:this.mc,jmc:this.jmc,jkey:this.jkey,xzqh:this.code,xzqhmc:this.codemc}})
        },
        goseach(){
          switch (this.addtype) {
            case '1':
              this.$router.push({name:'BaseList'});
              break;
            case '2':
              this.$router.push({name:'zxBaseList'});
              break;
            default:
              break;
          }
        
        },
    },
}
</script>



