<template>
    <div class="personnel">
      <div class="homebread">
          <i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
          <span> 基本信息库 
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
                       <div class="title">{{jjbmc==null?'':jjbmc}}{{cname4!=''?cname4:cname5}}{{title}}</div>
                   </el-col>
                    <el-col :span="8" style="text-align:right">
                          <el-button type="primary" style="width:80px" @click="goBase()" v-if='allshow[0]'>
                              <span>添加</span>
                              </el-button>
                          <el-button style="width:80px" @click="goseach()" v-if='allshow[1]'>查询</el-button>
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
             <el-col :span="6" style="padding-left:45px;" v-if='addtype=="1" || addtype=="2"'>
                     <div class="title mb-20">历届{{ltitle}}名单</div>
                     <div v-for='(tt,index) in $store.state.jb' :key="index">
                          <div  class="ljinfo" @click="gojjb(tt.dm,tt.mc)">{{tt.mc}}{{cinfo}}</div>
                     </div>
             </el-col>
            </el-row>
    </div>
        
    </div>
</template>
<script>
import {getlljgmenu,getlljgdata} from '@/assets/js/aleainfo.js'
export default {
     data(){
         return{
           cname1:'',
           cname2:'',
           cname3:'',
           cname4:'',
           cname5:'省级',
           title:'',//当前名字
           ltitle:'',//届别名单
           areadata:'',
           addtype:'',
           jjbmc:'',
           jjb:'',
           cinfo:'',
           info:{},//信息对象
           jb:'',
           lvl:'1',//级
           code:'',
           show:true,
           endlvl:1,
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
             
               this.jjb=this.info.jjb;
               this.jjbmc=this.info.jjbmc;
               }catch(e){
                   this.$router.push({name:'limitmsg',query:{type:1}});
               }

               
           }else if(val.query.type!=undefined && val.query.type!=''){
              
               this.addtype=val.query.type;
               this.jb=val.query.jb;
               this.jjbmc=this.$store.state.jmc;
               this.jjb=this.$store.state.jid;
           }
          var mid=getlljgmenu(this.addtype,parseInt(this.lvl));
          this.alldata=getlljgdata(this.addtype,parseInt(this.lvl));
          
            //权限start
            this.$api.post(this.Global.menuurl,{'menuId':mid},
                     r =>{
                          if(r.code==1 && r.data!=null){
                            for (let i = 0; i < this.alldata.length; i++) {
                               this.allshow[i]=this.global_auth(r.data,this.alldata[i]);
                               console.log(i,'==',this.allshow[i],'++++',r.data,'--',this.alldata[i]);
                            }   
                           this.getNameList();//得到标题的名称
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
        this.title='';this.jb='';this.endlvl=1; this.show=true;
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
         'jjb':this.jjb,
         'jjbmc':this.jjbmc,
     };
    str=Base64.encode(JSON.stringify(p));
    this.$router.push({name:'AreaList',query:{info:str}});
    },
    gonext(xzqh,mc){
      let p={
          'cname1':this.cname1,
          'cname2':this.cname2,
          'cname3':this.cname3,
          'cname4':this.cname4,
          'type':this.addtype,
          'code':xzqh,
          'mc':this.cname4+mc,
          'jb':this.jb,
          'jjb':this.jjb,
          'jjbmc':this.jjbmc,
          'ltitle':this.ltitle,
          'cinfo':this.cinfo,

      }
    var str=Base64.encode(JSON.stringify(p));
    this.$router.push({path:'Grouplist',query:{info:str}});
    },
    gojjb(dm,mc){
     let p={
            'type':this.addtype,
            'lvl':parseInt(this.lvl)+1,
            'jb':this.jb,
            'code':this.code,
            'mc':this.cname4,
            'jjb':dm,
            'jjbmc':mc,
        };
     var str=Base64.encode(JSON.stringify(p));
    this.$router.push({name:'AreaList',query:{info:str}});
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
       
          switch (this.addtype) {
              case '1':
                  this.cname1="联络对象";
                  this.cname2="人大代表";
                  this.ltitle="代表";
                  this.cinfo="人民代表大会";
                  break;
              case '2':
                  this.cname1="联络对象";
                  this.cname2="政协委员";
                  this.ltitle="委员";
                  this.cinfo="政治协商会议委员";
                  break;
              case '3':
                  this.cname1="联络对象";
                  this.cname2="特约人员";
                  break;
              case '4':
                  this.cname1="法院内部管理";
                  this.cname2="法院人员";
                  break;
              default:
                  break;
          }
          switch (this.jb) {
              case 'sj':
                  if(this.addtype=='1' || this.addtype=='2'){
                     this.cname3='省级'+this.cname2;
                  }else if(this.addtype=='3'){
                     this.cname3='省级高级人民法院特约人员';
                  }else if(this.addtype=='4'){
                      this.cname3="各省高院人员"
                  }
                  this.endlvl=1;
                  break;
               case 'ds':
                  if(this.addtype=='1' || this.addtype=='2'){
                     this.cname3='地市'+this.cname2;
                  }else if(this.addtype=='3'){
                     this.cname3='中级人民法院特约人员';
                  }else if(this.addtype=='4'){
                      this.cname3="各市中院人员"
                  }
                   this.endlvl=2;
                  break;
             case 'xq':
                  if(this.addtype=='1' || this.addtype=='2'){
                     this.cname3='县区'+this.cname2;
                  }else if(this.addtype=='3'){
                     this.cname3='基层人民法院特约人员';
                  }else if(this.addtype=='4'){
                      this.cname3="区县基层法院人员"
                  }
                  this.endlvl=3;
                  break;
              default:
                  break;
          }
          this.title="行政区划";
          
     },
     goBase(){
            this.$router.push({name:'BaseAdd',query:{type:this.addtype,jb:this.jb,xzqh:this.code,xzqhmc:this.codemc,jmc:this.jjbmc,jkey:this.jjb}})
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