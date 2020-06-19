<template>
    <div class="personnel">
      <div class="homebread">
          <i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
          <span> 基本信息 
          <span class="mlr_10">/</span><span>{{cname1}}</span>
          <span class="mlr_10" v-if="cname2 != ''">/</span><span v-if="cname2 != ''"><b>{{cname2}}</b></span>
          <span class="mlr_10" v-if="mzname != ''">/</span><span v-if="mzname != ''"><b>{{mzname}}</b></span>
          <span class="mlr_10" v-if="cname3 != '' || title!=''">/</span><span v-if="cname3 != ''|| title!=''"><b>{{cname3}}{{title}}</b></span>
          <span class="mlr_10" v-if="cname4 != ''">/</span><span v-if="cname4 != ''"><b>{{cname4}}</b></span>
          </span> 
    </div>
    <div class="content">
            <el-row>
             <el-col :span='22' class="ptit">
                <el-row>
                   <el-col :span='16'>
                       <div class="title">{{cname4!=''?cname4:cname3}}{{title}}</div>
                   </el-col>
                    <el-col :span="8" style="text-align:right">
                          <el-button type="primary" style="width:80px" @click="goBase()" v-if='allshow[0]'><span>添加</span></el-button>
                          <el-button @click='getDR' v-if='allshow[1]'>导入 </el-button>
                          <el-button style="width:80px" @click="goseach()" v-if='allshow[2]'>查询</el-button>
                           
                          <el-button style="width:80px" v-if='lvl!="1"' @click="$router.go(-1)">返回</el-button>
                    </el-col>
               </el-row>
                <el-row :gutter="2" class="ah-50 pborder mt-20" v-if='show'>
                  <el-col :sm="24" :md="12" :lg="4" v-for="(ts,inds) in areadata" :key="inds">
                    <span class="address"  @click="goxj(ts.dm,ts.mc)">{{ts.mc}}</span>
                  </el-col>
               </el-row>
                <el-row  class="ah-50 pborder mt-20 mb-20 " style="text-align:center" v-else>
                   <el-col :span="24">
                    <span>无数据</span>
                  </el-col>
                </el-row>
             </el-col>
            </el-row>
    </div>
     <el-dialog title="导入文件" :visible.sync="drDialogVisible" :close-on-click-modal='false' width="630px">
      <UPLOAD :url="vvurl" :type="1001"  :urlErr="vvurlErr"  @drfatherMethod="drfatherMethod" :random="new Date().getTime()"></UPLOAD>
   </el-dialog>
    </div>
</template>
<script>
import UPLOAD from "../../Common/upload"
import {getmenu,getdata} from '@/assets/js/aleaorg.js'
export default {
       components:{UPLOAD},
     data(){
         return{
           cname1:'',
           cname2:'',
           cname3:'',
           cname4:'',
           mzname:'',
           areadata:'',
           addtype:'',
           info:{},//信息对象
           title:'',
           jb:'',
           lvl:'1',//级
           code:'',
           endlvl:1,
           show:true,
           drDialogVisible:false, 
           vvurl:'/org/import',
           vvurlErr:'',
           alldata:[],
           allshow:[],
           lx:'',

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


           this.reset();
            
           if((val.query.type==undefined || val.query.type=='')
            && (val.query.info==undefined || val.query.info=='')){
            
               this.$router.push({name:'limitmsg'});
           }else if(val.query.info!=undefined && val.query.info!=''){
             try{
               this.info=JSON.parse(Base64.decode(val.query.info));
               
               this.addtype=this.info.type;
               this.jb=this.info.jb;
               this.lvl=this.info.lvl;
               this.cname4=this.info.mc;
               this.code=this.info.code;
               this.lx=this.info.lx;
               }catch(e){
                   this.$router.push({name:'limitmsg',query:{type:1}});
               }
           }else if(val.query.type!=undefined && val.query.type!=''){
              
               this.addtype=val.query.type;
               this.jb=val.query.jb;
               this.jjbmc=this.$store.state.jmc;
               this.jjb=this.$store.state.jid;
               this.lx=val.query.lx;
           }
           this.getNameList();//得到标题的名称
           //权限start
           var mid=getmenu(this.addtype,this.jb,this.lx);
           this.alldata=getdata(this.addtype,this.jb,this.lx);
           
           this.$api.post(this.Global.menuurl,{'menuId':mid},
                     r =>{
                     
                          if(r.code==1 && r.data!=null){
                            for (let i = 0; i < this.alldata.length; i++) {
                                this.allshow[i]=this.global_auth(r.data,this.alldata[i]);
                                 
                            }   
                             this.getLevel(this.lvl,this.code);
                          }else if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                          }
            });
         //权限end

         
        },
    reset(){
        this.areadata=[];this.info={};
        this.lvl='1';this.code='';this.cinfo='';
        this.cname1='';this.cname2='';this.cname3='';
        this.cname4='';this.addtype='';this.ltitle='';
        this.title='';this.jb='';this.endlvl=1;this.lx="";
    },
    goxj(code,mc){
    if(this.lvl>=this.endlvl){
       this.gonext(code,mc);
       return;
    }

     mc=this.cname4+mc;
     var str='';
     let p={
         'type':this.addtype,
         'lvl':parseInt(this.lvl)+1,
         'jb':this.jb,
         'code':code,
         'mc':mc,
         'lx':this.lv,
     };
    str=Base64.encode(JSON.stringify(p));
    this.$router.push({name:'InstitutionNew',query:{info:str}});
    },
    gonext(xzqh,mc){
      let p={
          'cname1':this.cname1,
          'cname2':this.cname2,
          'cname3':this.cname3,
          'cname4':this.cname4+mc,
          'mzname':this.mzname,
          'title':this.title,
          'type':this.addtype,
          'code':xzqh,
          'mc':mc,
          'jb':this.jb,
          'lx':this.lx,
          
      }
    var str=Base64.encode(JSON.stringify(p));
    this.$router.push({path:'InstitutionGroup',query:{info:str}});
    },
  
    //得到行政区划
    getLevel(l,v){
             
               let p={
                    'code':v,
                    'level':l
                  };
                  this.$api.get(this.Global.aport4+'/service/getxzqh',p,
                  r =>{
                          if(r.code==1){
                                this.areadata=r.data;
                                if(r.data.length>0){
                                    this.show=true;
                                }else{
                                    this.show=false;
                                }
                          }
                   });
    },

    //得到标题的名称
    getNameList(){
        this.cname1="联络机构";
       
          switch (this.addtype) {
              case '1':
                  this.cname2="人大系统";
                  this.title="人民代表大会";
                  break;
              case '2':
                  this.cname2="政协系统";
                  this.title="地方委员会";
                  break;
              case '3':
                  this.cname2="统战部系统";
                  this.title="统战部";
                  break;
              case '4':
                  this.cname2="民主党派系统";
                  // this.title="民主党派";
                
                     
                  switch (this.lx) {
                      case '1':
                            this.mzname="中国国民党革命委员会";
                            this.title="国民党革命委员会";
                        break;
                      case '2':
                            this.mzname="中国民主同盟";
                            this.title="民主同盟";
                        break;
                      case '3':
                            this.mzname="中国民主建国会";
                            this.title="民主建国会";
                        break;
                      case '4':
                            this.mzname="中国民主促进会";
                            this.title="民主促进会";
                        break;
                      case '5':
                            this.mzname="中国农工民主党";
                            this.title="农工民主党";
                        break;
                      case '6':
                            this.mzname="中国致公党";
                            this.title="致公党";
                        break;
                      case '7':
                            this.mzname="九三学社";
                            this.title="九三学社";
                        break;
                      case '8':
                            this.mzname="台湾民主自治同盟";
                            this.title="台湾民主自治同盟";
                        break;
                      default:
                        break;
                    }
                  break;
              case '5':
                  this.cname2="工商联系统";
                  this.title="工商联";
                  break;
              case '6':
                  this.cname2="台联系统";
                  this.title="台联";
                  break;
              case '7':
                  this.cname1="法院内部管理";
                  this.cname2="各级法院";
                  break;
              default:
                  break;
          }
     
        
         switch (this.jb) {
              case 'sj':
                  
                  if(this.addtype=='7'){
                    this.cname3='省高院';
                  }else{
                    this.cname3='各省';
                  }
                  this.endlvl=1;
                  break;
               case 'ds':
                  if(this.addtype=='7'){
                    this.cname3='市中院';
                  }else{
                    this.cname3='各市';
                  }
                   this.endlvl=2;
                  break;
             case 'xq':
                  if(this.addtype=='7'){
                    this.title='基层法院';
                  
                  }else if(this.lx!=""){
                    this.cname3='各县';
                  }else{
                    this.cname3='区县';
                  }
                  this.endlvl=3;
                  break;
              default:
                  break;
          }
         
     },
      goBase(){  
       this.$router.push({name:'InstitutionAdd',query:{type:this.addtype,status:'0',title:this.title,jb:this.jb,xzqh:this.code,lx:this.lx,pt:1}});
      },
      goseach(){
          this.$router.push({name:'InstitutionList',query:{type:this.addtype,lx:this.lx}})
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