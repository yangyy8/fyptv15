<template>
    <div class="personnel">
          <div class="homebread">
                <i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
                <span> 基本信息 
                <span class="mlr_10">/</span><span> 法院内部管理 </span>
                <span class="mlr_10">/</span><span> {{cname1}} </span>
                <span class="mlr_10">/</span><span> {{cname2}} </span>
                
                </span> 
         </div>
         <div class="content">
               <el-row>
             <el-col :span='22' class="ptit">
                <el-row>
                   <el-col :span='16'>
                       <div class="title">{{title}}</div>
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
                  <el-col :sm="24" :md="12" :lg="ts.mc.length>20?8:6" v-for="(ts,inds) in areadata" :key="inds">
                    <span class="address"  @click="goxj(ts.orgid,ts.mc)">{{ts.mc}}</span>
                  </el-col>
               </el-row>
                <el-row  class="ah-50 pborder mt-20 mb-20 " style="text-align:center" v-else>
                   <el-col :span="24">
                    <span>无数据</span>
                  </el-col>
                </el-row>
             </el-col>
            </el-row>
              <br/><br/>
         </div>
       
    </div>
</template>
<script>
import {getlljgmenu,getlljgdata} from '@/assets/js/aleainfo.js'
import {getmenu,getdata} from '@/assets/js/aleaorg.js'
import {ToArray} from '@/assets/js/ToArray.js'
export default {
    data(){
        return{
           cname1:'',
           cname2:'',
           areadata:[],
           alldata:[],
           allshow:[],
           lvl:1,
           addtype:'',
           jb:'',
           show:true,
           title:'',
           orgid:'',
           orgmc:'',
           info:'',
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
               this.title=this.info.title;
               this.orgid=this.info.orgid;
             
               }catch(e){
                   this.$router.push({name:'limitmsg',query:{type:1}});
               }

               
           }else if(val.query.type!=undefined && val.query.type!=''){
              
               this.addtype=val.query.type;
               this.jb=val.query.jb;
        
           }
          
           
          this.getNameList();
          
            
         },
         getNameList(){
            
             
             var mid='';
             if(this.addtype=='7'){
                 this.cname1="各级法院";
              
                 switch (this.jb) {
                     case 'sj':
                         this.cname2="省高院";
                         break;
                     case 'ds':
                         this.cname2="市中院";
                         break;
                     case 'xq':
                         this.cname2="基层法院";
                         break;
                     default:
                         break;
                 }
               mid=getmenu(this.addtype,this.jb);
               this.alldata=getdata(this.addtype,this.jb);
             }else if(this.addtype=='4'){
                this.cname1="法院人员";
                
                 switch (this.jb) {
                     case 'sj':
                         this.cname2="各省高院人员";
                         break;
                     case 'ds':
                         this.cname2="各市中院人员";
                         break;
                     case 'xq':
                         this.cname2="区县基层法院人员";
                         break;
                     default:
                         break;
                 }
               mid=getlljgmenu(this.addtype,this.jb);
              this.alldata=getlljgdata(this.addtype,this.jb);
             }
           
           //权限start
            this.$api.post(this.Global.menuurl,{'menuId':mid},
                     r =>{
                          if(r.code==1 && r.data!=null){
                            for (let i = 0; i < this.alldata.length; i++) {
                               this.allshow[i]=this.global_auth(r.data,this.alldata[i]);
                            }
                           if(this.lvl==1){
                             this.getLevel();
                           }else if((this.lvl==2 || this.lvl==3) && this.orgid){
                              this.getsub(this.orgid);
                           }
                          // this.getjbinfo();
                          }else if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                          }
            });
         //权限end
        
         },
         getLevel(){
             
                  this.$api.post(this.Global.aport1+'/org/getHighCourt',{},
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
         getsub(orgid){
              this.$api.post(this.Global.aport1+'/org/getOwnUnit',{'orgid':orgid},
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
         goxj(orgid,mc){
           
           if((this.lvl==3 && this.jb=='xq')
             || (this.lvl==2 && this.jb=='ds')
             || (this.lvl==1 && this.jb=='sj')){
                     let p={
                        'cname1':'法院内部管理',
                        'cname2':this.cname1,
                        'cname3':this.cname2,
                        'cname4':this.title,
                        'mzname':this.mzname,
                        'type':this.addtype,
                        'mc':this.title,
                        'jb':this.jb,
                        'orgid':orgid,
                        'orgmc':mc,
                        'sorgid':orgid,
                        'num':1
                        
                    }
                var str=Base64.encode(JSON.stringify(p));
                if(this.addtype=='7'){
                  this.$router.push({path:'InstitutionGroup',query:{info:str}});
                }
                else if(this.addtype=='4'){
                    this.$router.push({path:'Grouplist',query:{info:str}});
                }

           }else{

                let p={
                    'type':this.addtype,
                    'jb':this.jb,
                    'title':mc,
                    'orgid':orgid,
                    'lvl':this.lvl+1,
                }
                var str=Base64.encode(JSON.stringify(p));
                this.$router.push({path:'CourtList',query:{info:str}});
                }
         },
      reset(){
        this.areadata=[];this.info={};
        this.lvl=1;this.code='';
        this.cname1='';this.cname2='';
        this.addtype='';
        this.title='省高院';this.jb='';this.show=true;
        this.jb="";this.orgmc='';
        this.alldata=[];this.allshow=[];
    },
     goBase(){
       if(this.addtype==4){
            this.$router.push({name:'BaseAdd',query:{type:this.addtype,jb:this.jb,xzqh:this.code,xzqhmc:this.codemc,jmc:this.jjbmc,jkey:this.jjb,orgdm:this.orgid,pt:'0'}})
       }else if(this.addtype==7){
           this.$router.push({name:'InstitutionAdd',query:{type:this.addtype,status:'0',title:this.title,jb:this.jb,xzqh:this.code,lx:this.lx,pt:1}});
       }
     },

     },
}
</script>
<style scoped>

</style>