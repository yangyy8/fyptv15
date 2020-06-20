<template>
    <div class="personnel">
         <div class="homebread">
          <i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
          <span> 基本信息 
          <span class="mlr_10">/</span><span>{{cname1}}</span>
          <span class="mlr_10" v-if="cname2 != ''">/</span><span v-if="cname2 != ''"><b>{{cname2}}</b></span>
          <span class="mlr_10" v-if="cname3 != ''">/</span><span v-if="cname3 != ''"><b>{{cname3}}</b></span>
          <span class="mlr_10" v-if="cname4 != ''">/</span><span v-if="cname4 != ''"><b>{{cname4}}</b></span>
          </span> 
    </div>
     <div class="content">
           <el-row>
             <el-col :span='(addtype=="1" || addtype=="2")?18:22' class="ptit">
                <el-row>
                   <el-col :span='16'>
                       <div class="title">{{jjbmc==null?'':jjbmc}}{{cname4==''?orgmc:cname4}}{{cname2}}</div>
                   </el-col>
                    <el-col :span="8" style="text-align:right">
                          <el-button type="primary" style="width:80px" @click="goBase()" v-if='allshow[0] && addtype!="3"' key='0'><span>添加</span></el-button>
                          <el-button style="width:80px" @click="goseach()" v-if='allshow[1]' key='1'>查询</el-button>
                          <el-button style="width:80px" @click="$router.go(-1)" v-if="back">返回</el-button>
                    </el-col>
               </el-row>
               <el-row :gutter="2" class="ah-50 pborder mt-20" v-if='!show'>
                   <el-col style="text-align:center">无数据</el-col>
               </el-row> 
               
                <el-row :gutter="2" class="ah-50 pborder mt-20" v-if='addtype=="1" && show'>
                   <el-col :sm="24" :md="12" :lg="4" v-for="(t,ind) in leveldatatb" :key="ind" >
                    <span class="address"  @click="gopro(t.dm,'tb',t.mc)">{{t.mc}}</span>
                  </el-col>
                </el-row>
                 <el-row :gutter="2" class="ah-50 pborder mt-20" v-else-if='addtype=="2" && show'>
                    <el-col :sm="24" :md="12" :lg="6" v-for="(t,ind) in jjblist" :key="ind">
                      <span class="address"  @click="gopro(t.dm,'jjb',t.mc)">{{t.mc}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="2" class="ah-50 pborder mt-20" v-else-if='addtype=="3" && show'>
                    <el-col :sm="24" :md="12" :lg="8" v-for="(te,indm) in tylblist" :key="indm">
                       <span class="address" style="font-weight:bold;" @click="getlb(te.dm,te.mc)"> {{te.mc}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="2" class="ah-50 pborder mt-10 mb-20" v-else-if='addtype=="4" && show'>
                     <el-col :sm="24" :md="12" :lg="6" v-for="(t,ind) in fydata" :key="ind">
                        <span class="address"  @click="gotoFy(t.orgid,t.sj,t.mc)">{{t.mc}}</span>
                     </el-col>
                </el-row>
             </el-col>
             <el-col :span="6" style="padding-left:45px;" v-if='addtype=="1" || addtype=="2"'>
                     <div class="title mb-20">历届{{cname4}}{{cname3}}名单</div>
                     <div v-for='(tt,index) in jblist' class="ljinfo" :key="index">
                        <span @click="gojjb(tt.dm,tt.mc)">{{tt.mc}}{{cinfo}}</span>
                     </div>
             </el-col>
            </el-row>
     </div>
     <el-dialog title="选择届别" :visible.sync="jbDialogVisible" :close-on-click-modal='false' width="500px">
         <div>
             <span class="yy-input-text">届别</span>
                           <el-select v-model="lbpd.tyjb" @change="getJbmc(lbpd.tyjb)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in tyjblist"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                        </el-option>
             </el-select>
         </div>
           <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="savelist">确 定</el-button>
                <el-button @click="jbDialogVisible = false" size="small">取 消</el-button>
                </div>
     </el-dialog>

    </div>
  
</template>
<script>
import {getlljgtbmenu,getlljgtbdata} from '@/assets/js/aleainfo.js'
import {ToArray} from '@/assets/js/ToArray.js'
export default {
    data(){
        return{
           cname1:'',
           cname2:'',
           cname3:'',
           cname4:'',
           tyjb:'',
           leveldatatb:[],
           jbDialogVisible:false,
           addtype:'',
           jb:'',
           jjb:'',
           jjbmc:'',
           code:'',
           mc:'',
           ltitle:'',
           cinfo:'',
           lvltype:'',//用于特约人员
           leveltype:'',//用于代表和政协
           fydata:[],
           show:true,
           back:true,//返回按钮
           alldata:[],
           allshow:[],
           jblist:[],//届别列表
           tylblist:[],
           jjblist:[],
           tyjblist:[],
           lbpd:{},
           orgid:'',
           orgmc:'',
           sorgid:'',
           falg:false,
          
        }
    },
    mounted(){
        // this.$store.dispatch("getJb");
        // this.$store.dispatch("getTb");
        // this.$store.dispatch("getJjb");
        // this.$store.dispatch("getTylb");
        this.getinit(this.$route);
    },
    watch:{
        $route:function(val){
            this.getinit(val);
        },
    },
    methods:{
       
        getinit(val){
         
     
        
         //权限end
        this.reset();
        if((val.query.type==undefined || val.query.type=='')
            && (val.query.info==undefined || val.query.info=='')){
              this.$router.push({name:'limitmsg'});
         }else if(val.query.info!=undefined && val.query.info!=''){
             try{
              this.info=JSON.parse(Base64.decode(val.query.info));
              
                         
               this.addtype=this.info.type;
               this.jb=this.info.jb;
               this.cname1=this.info.cname1;
               this.cname2=this.info.cname2;
               this.cname3=this.info.cname3;
               this.cname4=this.info.mc;
               this.code=this.info.code;
               this.jjb=this.info.jjb;
               this.jjbmc=this.info.jjbmc;
               this.mc=this.info.mc;
               this.ltitle=this.info.ltitle;
               this.cinfo=this.info.cinfo;
               this.orgid=this.info.orgid;
               this.orgmc=this.info.orgmc;
               this.sorgid=this.info.sorgid;
               
               }catch(e){
                   this.$router.push({name:'limitmsg',query:{msg:'该地址参数不对！'}});
               }
           }else if(val.query.type!=undefined && val.query.type!=''){
              
               this.addtype=val.query.type;
               this.jb=val.query.jb;
           
               this.back=false;
               this.getTitle();
           }

            var mid=getlljgtbmenu(this.addtype,this.jb);
             this.alldata=getlljgtbdata(this.addtype,this.jb);
              //权限start
            this.$api.post(this.Global.menuurl,{'menuId':mid},
                     r =>{
                          if(r.code==1 && r.data!=null){
                            for (let i = 0; i < this.alldata.length; i++) {
                              this.allshow[i]=this.global_auth(r.data,this.alldata[i]);
                            
                                
                            }   
                             this.getInfo();
                          }else if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                          }
            });
     
               
        },
        getjbinfo(){

            if(this.addtype=='1' || this.addtype=='2')
           {
                    var lb="";
                    switch (this.addtype) {
                        case '1':
                            lb=this.Global.REPRESENTATIVE;
                            break;
                        case '2':
                            lb=this.Global.CPPCMEMBER;
                            break;
                        case '3':
                            lb=this.Global.SPECIALPERSON;
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
                                if(r.code==1 && r.data && r.data.length>0){
                                this.jblist=ToArray(r.data,'1');
                                if(this.jjbmc==null || this.jjbmc==""){
                                    this.jjbmc=this.jblist[0].mc;
                                }
                                 if(this.jjb==null || this.jjb==""){
                                    this.jjb=this.jblist[0].dm;
                                }

                                 if(this.addtype=='2'){
                
                                        let p={
                                                'level':this.leveltype,
                                                'administrativeDivision':this.code,
                                                'sessionType':this.jjb
                                            };
                                            this.$api.post(this.Global.jjburl,p,
                                                    r =>{
                                                        this.jjblist=ToArray(r.data);
                                                        
                                            });
                                    }
                            }
                      });
            }else if(this.addtype=='3'){
                   let p={
                        'level':this.lvltype,
                        'administrativeDivision':this.code,
                    };
                    this.$api.post(this.Global.tylburl,p,
                            r =>{
                            this.tylblist=ToArray(r.data);
                              
                    });
            }

           
        },
        getlb(dm,mc){
           this.lbpd={};
           this.lbpd.dm=dm,
           this.lbpd.mc=mc;
            let pp={
                        'level':this.lvltype,
                        'administrativeDivision':this.code,
                        'specialType':dm,
                    };
                    this.$api.post(this.Global.tyjburl,pp,
                            r =>{
                           this.tyjblist=ToArray(r.data,'1');
                });
            this.jbDialogVisible=true;
        },
        savelist(){
            if(this.lbpd.tyjb=="" || this.lbpd.tyjb==null || this.lbpd.tyjb==undefined){
                this.$message.error("请选择届别");return;
            }else{
                 this.getline();
            }
        },
        getJbmc(val){
             var obj = {};
                     obj = this.tyjblist.find(item =>{
                        return item.dm === val
               });
               this.lbpd.tyjbmc=obj.mc;
        },
      reset(){
               this.addtype='';
               this.jb='';
               this.cname1='';
               this.cname2='';
               this.cname3='';
               this.cname4='';
               this.code='';
               this.jjb='';
               this.jjbmc='';
               this.mc='';
               this.ltitle='';
               this.cinfo='';     
               this.back=true;
               this.leveldatatb=[];
               this.fydata=[];
               this.orgmc='';
               this.orgid='';
               this.sorgid='';
      },
      getInfo(){
           if(this.addtype=='1' || this.addtype=='2'){
               
                switch (this.jb) {
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
                 this.getTB(this.leveltype,this.code);
              }else   if(this.addtype=='3' || this.addtype=='4'){
               
                switch (this.jb) {
                     case 'qg':
                        this.lvltype='0222000001';
                        break;
                    case 'sj':
                        this.lvltype='0222000002';
                        break;
                    case 'ds':
                        this.lvltype='0222000003';
                        break;
                    case 'xq':
                        this.lvltype='0222000004';
                        break;
                    default:
                        break;
                }

                
              
              }
              if(this.addtype!='4'){
                 this.getjbinfo();
              }else if(this.addtype=='4'){
                   this.getFY();
              }
           
      },
      getTitle(){
          switch (this.addtype) {
              case '1':
               this.cname1="联络对象";
               this.cname2="人大代表";
               this.cname3="全国人大代表";
               this.ltitle="代表";
               this.cinfo="人民代表大会";
                  break;
               case '2':
               this.cname1="联络对象";
               this.cname2="政协委员";
               this.cname3="全国政协委员";
               this.ltitle="委员";
               this.cinfo="政治协商会议委员";
                  break;
               case '3':
               this.cname1="联络对象";
               this.cname2="特约人员";
               this.cname3="最高法人民法院特约人员";
               this.jjbmc="";
                  break;
               case '4':
               this.cname1="法院内部管理";
               this.cname2="法院人员";
               this.cname3="最高院人员";
               this.jjbmc="";
                  break;
          
              default:
                  break;
          }
      },
   gojjb(dm,mc){
     let p={
          'cname1':this.cname1,
          'cname2':this.cname2,
          'cname3':this.cname3,
          'cname4':this.cname4,
          'type':this.addtype,
          'code':this.code,
          'mc':this.mc,
          'jb':this.jb,
          'jjb':dm,
          'jjbmc':mc,
          'ltitle':this.ltitle,
          'cinfo':this.cinfo,
        };
    var str=Base64.encode(JSON.stringify(p));
    this.$router.push({path:'Grouplist',query:{info:str}});
    },
    gopro(d,t,mc){
        let p={
            'type':this.addtype,
            'vv':t,
            'key':d,
            'mc':mc,
            'code':this.code,
            'codemc':this.mc,
            'jb':this.jb,
            'jmc':this.jjbmc,
            'jkey':this.jjb

        };
    var str=Base64.encode(JSON.stringify(p));
    this.$router.push({path:'Delegation',query:{info:str}});
    },
    //特约人员
      getline(){
         
           this.$router.push({name:'SpecialPersonDeatil',query:{lb:this.lbpd.dm,lbmc:this.lbpd.mc,mc:this.cname3,jb:this.jb,jblv:this.lvltype,code:this.code,codemc:this.mc,jkey:this.lbpd.tyjb,jmc:this.lbpd.tyjbmc}});
       },
    
      gotoFy(orgid,sjOrgId,mc){
 
        let pp={
                'orgId':orgid,
            };
            this.$api.get(this.Global.aport1+'/org/getSubDept',pp,
            r=>{
                if(r.code==1){
                    if(r.data && r.data.length>0){
                          let p={
                            'cname1':this.cname1,
                            'cname2':this.cname2,
                            'cname3':this.cname3,
                            'cname4':this.cname4,
                            'type':this.addtype,
                            'code':this.code,
                            'mc':this.mc,
                            'jb':this.jb,
                            'jjb':this.jjb,
                            'jjbmc':this.jjbmc,
                            'ltitle':this.ltitle,
                            'cinfo':this.cinfo,
                            'sorgid':sjOrgId,
                            'orgid':orgid,
                            'orgmc':mc,
                            
                            };
                            var str=Base64.encode(JSON.stringify(p));
                            this.$router.push({path:'Grouplist',query:{info:str}});
                    }
                    else{
                         this.$router.push({name:'CourtMeber',query:{orgid:sjOrgId,depid:orgid,jb:this.jb,type:this.addtype,xzqh:this.code,xzqhmc:this.mc,cname:this.cname3,fname:mc}});
                    }
                }
            });
     
       },
        getListBM(sjOrgId,orgid,mc){
      
            let p={
                'orgId':orgid,
            };
            this.$api.get(this.Global.aport1+'/org/getSubDept',p,
            r=>{
                if(r.code==1){
                   
                      
                         this.fydata=r.data;
                           if(r.data.length>0){
                                this.show=true;
                            }else{
                                this.show=false;
                       }
                    
                }
            })
        },

        //团别
      getTB(l,v){
          
               let p={
                    'level':l,
                    'administrativeDivision':v
                  };
                  this.$api.post(this.Global.aport1+this.Global.tburl,p,
                  r =>{
                          if(r.code==1){
                            this.leveldatatb=ToArray(r.data);
                                                        
                            if(this.leveldatatb.length>0){
                                this.show=true;
                            }else{
                                this.show=false;
                            }
                          }
                   });
        },
     //法院机构
     getFY(){
         
         
          if(this.orgid!='' && this.orgmc!='' && this.sorgid!='' && this.orgid!=undefined && this.orgmc!=undefined && this.sorgid!=undefined){
          
            
           this.getListBM(this.sorgid,this.orgid,this.orgmc);
         }else{
            let p={
                'lb':this.Global.FY,
                'xzqh':this.code,
                'lvl':this.lvltype
            };
            this.$api.post(this.Global.aport1+'/org/getOrgByTypeAndArea',p,
            r=>{
                if(r.code==1){
                    this.fydata=r.data;
                     if(r.data.length>0){
                                this.show=true;
                            }else{
                                this.show=false;
                       }
                }
            })
        }
        },
      goBase(){
           this.$router.push({name:'BaseAdd',query:{type:this.addtype,jb:this.jb,xzqh:this.code,xzqhmc:this.codemc,jmc:this.jjbmc,jkey:this.jjb,orgdm:this.orgid}})
        },
     goseach(){
           switch (this.addtype) {
             case '1':
               this.$router.push({name:'BaseList'})
               break;
             case '2':
               this.$router.push({name:'zxBaseList'})
               break;
            case '3':
               this.$router.push({name:'tyBaseList'})
               break;
            case '4':
               this.$router.push({name:'CourtPersonnelList'})
               break;
             default:
               break;
           }
        },
    },
}
</script>